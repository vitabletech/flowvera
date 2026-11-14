# FlowVera

Responsive Next.js App Router site for FlowVera, built from the supplied design and local media.

## Local development

- Requires Node.js 20.9 or newer and npm.
- Run `npm install`, then `npm run dev`.

## Static build and deployment

`npm run build` exports every route to the `out/` directory. The GitHub Actions workflow at `.github/workflows/deploy.yml` deploys to both GitHub Pages and GoDaddy on pushes to `main` and on manual runs. The destinations build independently: GitHub Pages uses `https://vitabletech.github.io/flowvera/`, while GoDaddy uses the domain root so asset and navigation paths work in `public_html`.

### GitHub Pages

In the repository's GitHub settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. Keep this deployment at the GitHub project URL. The production domain's DNS should point to GoDaddy, not GitHub Pages.

### Deployed build version

Every successful `npm run build` runs a `postbuild` script that writes `out/version.json`. Both hosting destinations deploy it alongside the site. Every page footer displays the build run and attempt (for example **Build 42.1**), matching the `build.42.1` suffix in the version file; development and local exports display **Local build**. The footer label is embedded at build time and needs no client request. Run numbers are scoped to each workflow, so use the commit and workflow URL in `version.json` when distinguishing builds from different workflows. This is a public static file intended for developer inspection, not an authenticated endpoint, and contains no secrets.

- GoDaddy: `http://www.flowveraarabia.com/version.json`
- GitHub Pages: `https://vitabletech.github.io/flowvera/version.json`

The JSON contains `version` (for example `1.0.0+build.42.1`), `releaseVersion`, `buildNumber`, `runAttempt`, full `commitSha`, UTC `builtAt`, and `workflowRunUrl`. The release version comes from `package.json`; GitHub's workflow run number and rerun attempt supply automatic build IDs. Both destinations have the same ID for the same run/attempt, although their build timestamps differ. Reruns increase the attempt number, not necessarily the run number. Missing or invalid CI metadata fails the build.

For a new release, run `npm version patch --no-git-tag-version` (or `minor`/`major`) and commit the updated `package.json` and `package-lock.json`. Deployments do not increment or commit release versions automatically. Run numbers are scoped to this workflow, not a global release sequence.

Local builds require Git and a checked-out commit. They use `1.0.0+local.<short-sha>` with null build/run fields; the commit identifies the checkout, not uncommitted edits. The timestamp distinguishes local builds. `version.json` is generated in ignored build output, not committed source. Use `npm run build`, not a direct `next build`, to include it.

To avoid reading an older browser/proxy-cached copy, inspect with a cache-busting query:

```sh
curl --fail --show-error -H 'Cache-Control: no-cache' \
  "http://www.flowveraarabia.com/version.json?t=$(date +%s)"
```

GoDaddy deployment verifies the uploaded version file against the local build over SSH. It describes the uploaded build, not an atomic release guarantee: a failed/partial deployment can still leave mixed site assets, so check the workflow result as well as the version file.

### GoDaddy SSH deployment

The workflow uploads **the contents of `out/`**, not the source repository, `.next/`, or `node_modules/`, to:

- Host: `132.148.180.150`, SSH port `22`
- User: `bykocjpmriup`
- Destination: `/home/bykocjpmriup/public_html/`

Create the `godaddy` GitHub environment under **Settings → Environments** (optionally require deployment approval). Add these secrets there, or under **Settings → Secrets and variables → Actions**:

| Secret | Value |
| --- | --- |
| `GODADDY_SSH_PRIVATE_KEY` | The complete private key corresponding to the public key authorized for this hosting account, for example your local `~/.ssh/hosting_key`. Use a dedicated deployment key without a passphrase; keep its contents out of the repository and logs. |
| `GODADDY_SSH_KNOWN_HOSTS` | The verified OpenSSH known-hosts entry for `132.148.180.150`. |

To prepare the host entry locally:

```sh
ssh-keyscan -p 22 -H 132.148.180.150 > godaddy-known-hosts
ssh-keygen -lf godaddy-known-hosts
```

**Before saving it as a secret, verify every fingerprint against the hosting provider or a trusted existing SSH connection.** A key scan alone does not authenticate the host. For example, use your existing trusted connection to run `ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub` for the corresponding host key if the provider allows access. Save the verified contents as `GODADDY_SSH_KNOWN_HOSTS`, then remove the local temporary file. The workflow requires strict host-key checking and fails on missing secrets, authentication failures, or host-key mismatches.

Both the GitHub runner and GoDaddy account must have `rsync` available; the workflow checks this before uploading. Confirm through your existing SSH connection with `command -v rsync`. If unavailable, ask GoDaddy to enable it before running the workflow.

Optionally set the `SITE_URL` repository or `godaddy` environment variable to the production URL. Its default is `http://www.flowveraarabia.com/`; GoDaddy rejects URLs containing a path such as `/flowvera/`. Use HTTPS only after the hosting certificate is active.

The upload overwrites matching build files and deletes stale files **only** in the site-owned paths listed in `.github/deploy/godaddy.rsync-filter`. This includes `_next/`, `assets/`, the site's route folders, generated root HTML/text/SEO files, and the legacy `book-demo/` route. These directories are exclusively owned by the build: do not store manual uploads there. When removing or renaming routes, retain their old directory entries in the filter so stale routes can be cleaned up.

Everything else is protected from deletion, including `test.flowveraarabia.com/`, `cgi-bin/`, `.htaccess`, `.well-known/`, `404.shtml`, and unrelated hosting files. New build files are still uploaded; add new site-owned root directories/files to the filter if they should support stale-file cleanup. Back up the current site before the first deployment. Deployment runs are serialized and replacement files/deletions are delayed until the transfer finishes, but this is not an atomic whole-site release or a backup.

After configuring secrets, run **Actions → Deploy static site to GitHub Pages and GoDaddy → Run workflow** on `main`. Both deployment jobs report their own results; a Pages failure does not block GoDaddy or vice versa.

To preview the static export locally, run `npm run preview` after the build, then open http://localhost:4173.

The source images remain in `assets/`. The site uses high-quality WebP delivery copies in `public/assets/optimized/`, the supplied industry logo files, and both supplied MP4 videos.

## UI, accessibility and SEO

The existing visual design is retained with clearer hero actions, visible contact details, keyboard focus indicators, a skip link, larger carousel controls and tablet/mobile navigation. The header has an outlined quotation action and a keyboard-accessible product dropdown. The service and project-image carousels auto-rotate while visible, pause on mouse hover, keyboard focus or dragging, and support mouse dragging and touch swiping alongside dots, looping seamlessly in both directions without empty space or rewind animations. The trusted industry leaders section features a continuous, hardware-accelerated infinite marquee loop that flows steadily from right to left with no breaks or pauses across desktop, tablet, and mobile. Dots represent original slides, not repeated copies. Card widths and gaps are measured on resize, preserving previews across screen sizes. Offscreen copies are excluded from keyboard navigation and assistive technology. Autoplay stops for hidden browser tabs and offscreen sliders. Vertical touch scrolling is preserved; dragging a service card does not open its product link. Service cards bring the next-card preview into view when focused. Section content is visible before JavaScript loads.

The fixed navigation sits outside the hero's isolated stacking layer and main content, keeping the header and its desktop/mobile menus above images, videos and animated sections when scrolling.

The supplied water treatment overview automatically plays muted and loops when at least 15% of its frame is visible, pauses when scrolled out of view or the browser tab is hidden, and resumes from the same position when visible again. Native video controls allow sound and manual pausing; a manual pause remains paused when scrolling away and back. Reduced-motion preferences disable automatic startup, with a keyboard-accessible play button available instead. The overview uses `preload="none"` until playback is requested. Playback/load errors are shown explicitly; a direct video-file link appears only if playback fails. The full video remains visible without cropping on mobile.

The floating WhatsApp button and contact shortcut use the same inline phone-in-bubble logo, with no external icon request.

The shared footer includes a development credit linking the Vitabletech team to `https://vitabletech.in/`. The link opens in a new tab with an accessible notice and `noopener noreferrer`.

The default production URL is `http://www.flowveraarabia.com/`. Canonical links, Open Graph/Twitter sharing images, organization URL/logo and the sitemap use this domain, including in local previews. The public URL contains no credentials or secrets and is stored in `lib/site-url.ts`.

Override it with the build-time `SITE_URL` environment variable, or the `SITE_URL` repository/environment variable for GoDaddy GitHub Actions. The GoDaddy build passes that variable into the build; an unset/empty value uses the production default. The separate GitHub Pages build uses its fixed project URL. URL paths determine the asset base path and are included exactly once. Invalid URLs fail the build explicitly. Project-page robots files are served under the project path; search engines look for robots rules at the domain root.

Once DNS and a valid TLS certificate are active, set `SITE_URL=https://www.flowveraarabia.com/`, enable HTTP-to-HTTPS redirection at the host and rebuild. HTTPS could not be verified when the domain was configured, so the supplied HTTP URL is retained rather than assuming TLS support. Domain/DNS provisioning is not performed by the build.

Validation uses `npm test` for build-version, carousel-loop and GoDaddy sync regression tests (requires `rsync`), `npm run lint`, `npx tsc --noEmit`, `npm run build` and browser checks of mobile/desktop layout, keyboard navigation, reduced motion and generated metadata. Tests use Node's built-in test runner and the existing TypeScript compiler without additional npm dependencies. Version tests check automatic build IDs, reruns, local builds, invalid CI metadata and the generated JSON file. The deployment test checks replacement and deletion of stale build output while preserving subdomains and hosting files.

## Products, requests and legal pages

`/products/` lists six solution categories. The five core service detail pages share a responsive design based on the supplied water-treatment reference: image hero, engineering and application overview, five solution cards, a four-stage process, performance features, contact action and office presence map. Each has its own application-specific copy and local images, configured in `lib/service-pages.ts`. The water-treatment page uses WebP delivery copies of the supplied `assets/services-page/` images in `public/assets/optimized/service-details/`; its small supplied icons are statically imported. The specialty-chemicals page retains its existing layout. The header, service cards, chemicals action and footer use the same catalog in `lib/services.ts`.

The service pages reuse the homepage contact section. Email and WhatsApp shortcuts include the selected service, and **Prepare a project enquiry** expands the existing product-specific enquiry form without adding an always-visible form to the reference layout. Solution cards and the main contact action link to this section. The technical and commercial content should be reviewed by FlowVera before publication; equipment specifications, performance and service scope must be confirmed for each application.

`/enquiry/` prepares general quotations; `/book-demo/` collects a solution, contact information and optional preferred date/time. Requests are previews only: the user must open WhatsApp or their email app and finish sending. Demo dates are not confirmed bookings. The site has no submission backend, request storage, automated confirmations or calendar integration. Inputs are held in page memory only and forms remain disabled until JavaScript is ready to prevent accidental native GET submissions. Editing invalidates the prepared message. No personal information is sent during validation; WhatsApp/email URLs contain the entered text only when the user chooses those channels.

`/terms/` and `/privacy/` contain original **draft** website policies, clearly marked as unapproved and without an effective date. Business/legal review is required, including legal identity, deployed hosting practices, retention, applicable law and certification/address claims. These pages are `noindex` and excluded from the XML sitemap until approved; do not treat them as final legal advice. When publishing approved text, remove the draft notices, change their metadata to indexable and include them in `app/sitemap.ts`.

`/site-map/` is the visible HTML sitemap linked from every footer. `/sitemap.xml` includes the homepage, product index, six product detail pages, enquiry, demo and HTML sitemap with production canonical URLs. Each page has its own title, description, canonical and sharing metadata.

## Office network animation

The presence map uses reference-aligned branch positions and decorative rings, with glowing location dots and staggered moving pixels following the dotted connections from Al Khobar to every branch. Route endpoints and markers share the same coordinates so they stay aligned on desktop and mobile. Reduced-motion preferences disable travelling pixels and marker pulses while keeping all locations and connections visible.

# FlowVera

Responsive Next.js App Router site for FlowVera, built from the supplied design and local media.

## Local development

- Requires Node.js 20.9 or newer and npm.
- Run `npm install`, then `npm run dev`.

## Static build and GitHub Pages

`npm run build` exports every route to the `out/` directory. The project includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds and deploys `out/` to GitHub Pages on pushes to `main` and on manual runs.

In the repository’s GitHub settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. For the production custom domain, configure **Pages → Custom domain** as `www.flowveraarabia.com` and the corresponding DNS records with your domain provider. Custom-domain builds use the root path. To deploy to a GitHub project URL instead, set `SITE_URL` to its complete URL including the repository path.

To preview the static export locally, run `npm run preview` after the build, then open http://localhost:4173.

The source images remain in `assets/`. The site uses high-quality WebP delivery copies in `public/assets/optimized/`, the supplied industry logo files, and both supplied MP4 videos.

## UI, accessibility and SEO

The existing visual design is retained with clearer hero actions, visible contact details, keyboard focus indicators, a skip link, larger carousel controls and tablet/mobile navigation. The header has an outlined quotation action and a keyboard-accessible product dropdown. All three carousels auto-rotate every 4.2 seconds while visible, pause on mouse hover, keyboard focus or dragging, and support mouse dragging and touch swiping alongside arrows/dots. The service and project-image rows loop seamlessly in both directions: the three gallery images repeat 1-2-3-1-2-3 without empty space or a rewind animation. Dots represent original slides, not repeated copies. Card widths and gaps are measured on resize, preserving the next-card preview across screen sizes. Offscreen copies are excluded from keyboard navigation and assistive technology. A pause/resume button provides persistent control. Autoplay stops for reduced-motion preferences, hidden browser tabs and offscreen sliders. Vertical touch scrolling is preserved; dragging a service card does not open its product link. Service cards bring the next-card preview into view when focused. Section content is visible before JavaScript loads.

The process preview plays the water treatment overview inline on click with native video controls, without an extra video selector or file link below it. It does not autoplay on page load or preload MP4 files. Playback/load errors are shown explicitly; a direct video-file link appears only if playback fails.

The floating WhatsApp button and contact shortcut use the same inline phone-in-bubble logo, with no external icon request.

The default production URL is `http://www.flowveraarabia.com/`. Canonical links, Open Graph/Twitter sharing images, organization URL/logo and the sitemap use this domain, including in local previews. The public URL contains no credentials or secrets and is stored in `lib/site-url.ts`.

Override it with the build-time `SITE_URL` environment variable, or the `SITE_URL` repository variable for GitHub Actions. The deployment workflow passes that variable into the build; an unset/empty value uses the production default. URL paths determine the asset base path and are included exactly once. Invalid URLs fail the build explicitly. Project-page robots files are served under the project path; search engines look for robots rules at the domain root.

Once DNS and a valid TLS certificate are active, set `SITE_URL=https://www.flowveraarabia.com/`, enable HTTP-to-HTTPS redirection at the host and rebuild. HTTPS could not be verified when the domain was configured, so the supplied HTTP URL is retained rather than assuming TLS support. Domain/DNS provisioning is not performed by the build.

Validation uses `npm test` for pure carousel-loop regression tests, `npm run lint`, `npx tsc --noEmit`, `npm run build` and browser checks of mobile/desktop layout, keyboard navigation, reduced motion and generated metadata. Unit tests use Node's built-in test runner and the existing TypeScript compiler without additional dependencies.

## Products, requests and legal pages

`/products/` lists six solution categories. Each `/products/[slug]/` page has application details, useful information to share and a product-specific enquiry form. The header, service cards, chemicals action and footer use the same catalog in `lib/services.ts`.

`/enquiry/` prepares general quotations; `/book-demo/` collects a solution, contact information and optional preferred date/time. Requests are previews only: the user must open WhatsApp or their email app and finish sending. Demo dates are not confirmed bookings. The site has no submission backend, request storage, automated confirmations or calendar integration. Inputs are held in page memory only and forms remain disabled until JavaScript is ready to prevent accidental native GET submissions. Editing invalidates the prepared message. No personal information is sent during validation; WhatsApp/email URLs contain the entered text only when the user chooses those channels.

`/terms/` and `/privacy/` contain original **draft** website policies, clearly marked as unapproved and without an effective date. Business/legal review is required, including legal identity, deployed hosting practices, retention, applicable law and certification/address claims. These pages are `noindex` and excluded from the XML sitemap until approved; do not treat them as final legal advice. When publishing approved text, remove the draft notices, change their metadata to indexable and include them in `app/sitemap.ts`.

`/site-map/` is the visible HTML sitemap linked from every footer. `/sitemap.xml` includes the homepage, product index, six product detail pages, enquiry, demo and HTML sitemap with production canonical URLs. Each page has its own title, description, canonical and sharing metadata.

## Office network animation

The presence map uses reference-aligned branch positions and decorative rings, with glowing location dots and staggered moving pixels following the dotted connections from Al Khobar to every branch. Route endpoints and markers share the same coordinates so they stay aligned on desktop and mobile. Reduced-motion preferences disable travelling pixels and marker pulses while keeping all locations and connections visible.

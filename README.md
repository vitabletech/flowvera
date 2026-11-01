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

The existing visual design is retained with clearer hero actions, visible contact details, keyboard focus indicators, a skip link, larger carousel controls and tablet/mobile navigation. Carousels are manually controlled so visitors can read at their own pace. The process dialog contains keyboard focus, closes with Escape and restores focus. Section content is visible before JavaScript loads.

The floating WhatsApp button and contact shortcut use the same inline phone-in-bubble logo, with no external icon request.

The default production URL is `http://www.flowveraarabia.com/`. Canonical links, Open Graph/Twitter sharing images, organization URL/logo and the sitemap use this domain, including in local previews. The public URL contains no credentials or secrets and is stored in `lib/site-url.ts`.

Override it with the build-time `SITE_URL` environment variable, or the `SITE_URL` repository variable for GitHub Actions. The deployment workflow passes that variable into the build; an unset/empty value uses the production default. URL paths determine the asset base path and are included exactly once. Invalid URLs fail the build explicitly. Project-page robots files are served under the project path; search engines look for robots rules at the domain root.

Once DNS and a valid TLS certificate are active, set `SITE_URL=https://www.flowveraarabia.com/`, enable HTTP-to-HTTPS redirection at the host and rebuild. HTTPS could not be verified when the domain was configured, so the supplied HTTP URL is retained rather than assuming TLS support. Domain/DNS provisioning is not performed by the build.

Validation uses `npm run lint`, `npx tsc --noEmit`, `npm run build` and browser checks of mobile/desktop layout, keyboard navigation, reduced motion and generated metadata. No unit-test tooling is included.

## Office network animation

The presence map keeps its existing layout, with glowing location dots and staggered moving pixels following the dotted connections from Al Khobar to every branch. Route endpoints and markers share the same coordinates so they stay aligned on desktop and mobile. Reduced-motion preferences disable travelling pixels and marker pulses while keeping all locations and connections visible.

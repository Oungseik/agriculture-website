# Moshi Moshi — Living Fields

An English-only informational site for five crop-labeled Moshi Moshi biostimulants. Built with SvelteKit, Svelte 5, TypeScript, Tailwind CSS and pnpm; deployed as a prerendered static site.

## Experience

- A panoramic farm opening, crop-focus image, illustrative bottle and five-crop selector.
- Rice is the initial state, not a recommendation. Selecting a crop updates its image, label, bottle and product link together.
- An interruptible 520ms Web Animations API transition connects the thumbnail to the focus image. Scroll, resize and reduced-motion changes cancel it; reduced motion updates immediately.
- All five product articles, before-use reading, About and section navigation remain available without JavaScript.
- Responsive layouts, visible keyboard focus and accessible selection feedback.
- The existing Paraglide integration uses English as its only active locale.

## Development

```sh
pnpm install
pnpm dev
```

Stop the development server before production compilation so the development and production compilers do not rewrite the same generated Paraglide directory concurrently.

```sh
pnpm exec paraglide-js compile --project ./project.inlang --outdir ./src/lib/paraglide --emit-ts-declarations
pnpm check
pnpm lint
pnpm format:check
pnpm test
pnpm build
pnpm preview
```

Regenerate Paraglide on a fresh checkout or after changing locale configuration, before type checking. Generated output is ignored by Git.

The static adapter writes the deployable site to `build/`. The root layout enables prerendering. Deploy that directory to a static host; there is no checkout, sales form, dealer endpoint or application-advice API.

## GitHub Pages

- Repository: https://github.com/Oungseik/agriculture-website
- Live site: https://oungseik.github.io/agriculture-website/
- `.github/workflows/pages.yml` builds and deploys `build/` on every push to `main`; it can also be run manually from GitHub Actions.
- GitHub Pages uses **GitHub Actions** as its deployment source. The workflow supplies Pages' base path through `BASE_PATH`, so assets and internal links work under the repository URL.
- Routes use trailing slashes and prerender to `index.html` files so product and blog links can be opened directly on the static host.

To reproduce the Pages build locally:

```sh
BASE_PATH=/agriculture-website pnpm build
BASE_PATH=/agriculture-website pnpm preview
```

Without `BASE_PATH`, development and builds remain rooted at `/`.

## Source map

| File                                       | Responsibility                                                       |
| ------------------------------------------ | -------------------------------------------------------------------- |
| `src/routes/+page.svelte`                  | Responsive homepage, crop selection, motion and reading content      |
| `src/lib/crops.ts`                         | Crop identifiers, label names, image paths and factual reading notes |
| `src/lib/components/product-bottle.svelte` | Illustrative bottle with a semantic crop label                       |
| `src/routes/layout.css`                    | Shared palette, fonts and browser-surface styling                    |
| `src/routes/+layout.svelte`                | Root rendering and sun favicon                                       |
| `src/routes/+layout.ts`                    | Static prerendering                                                  |
| `project.inlang/settings.json`             | English-only active locale                                           |

## Product and design records

`PRODUCT.md` records confirmed facts and constraints. Application rates, methods, ingredients, safety instructions, pack sizes, manufacturer details, prices, availability and performance claims remain unconfirmed. `DESIGN.md` describes the implemented visual system.

The eight optimized WebP images in `static/images/` are production assets. Their exact generation prompts, timestamps, native-output metadata, processing steps and limitations are retained in `assets/provenance.json`, outside the public deployment directory. The landscape is 1672 × 941 and was not upscaled.

Crop scenes are illustrations, not efficacy evidence. The bottle, crop-coloured HTML labels and sun mark are not original packaging reproductions. Original packaging artwork is unavailable.

## Repository hygiene and tooling

Completed design mocks, review screenshots, comparison diffs, scaffolds and duplicate native image outputs have been removed. `.impeccable/` is ignored for future local design exploration; production assets and durable documentation remain in the repository.

Unused starter greeting components, example tests and the Svelte favicon have been removed. Vitest's client/server configuration remains available, but there are currently no application tests; `pnpm test` explicitly permits an empty suite and does not establish behavior coverage. Verify crop interactions and responsive layouts in the running site.

The configured shadcn-svelte primitives and development add-ons remain available. Oxlint checks Svelte script blocks; `pnpm check` covers templates and TypeScript. Oxfmt formats supported files using tabs, single quotes and a 100-character print width, but does not format Svelte files. Shipping Svelte components use those same conventions, formatted with Prettier's Svelte plugin.

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
pnpm dlx sv@1.1.0 create --template minimal --types ts --add vitest="usages:unit,component" tailwindcss="plugins:typography,forms" enhanced-img sveltekit-adapter="adapter:static" mdsvex paraglide="languageTags:en, mm+demo:no" ai-tools="ide:opencode,other" experimental="features:async,remoteFunctions" --install pnpm ./
```

## Adding features

Add features to your project with `sv add`:

```sh
npx sv add
```

For example, to add Tailwind CSS:

```sh
npx sv add tailwindcss
```

## UI components

[shadcn-svelte](https://www.shadcn-svelte.com/docs) is configured with the classic Vega preset, neutral colors, and Inter. Configuration lives in `components.json`; light/dark theme tokens live in `src/routes/layout.css`. The existing Tailwind forms and typography plugins remain enabled.

The `Button` component is installed:

```svelte
<script lang="ts">
	import { Button } from '#lib/components/ui/button/index.js';
</script>

<Button onclick={() => console.log('clicked')}>Save</Button>
```

Add more components using the installed CLI:

```sh
pnpm exec shadcn-svelte add dialog input
```

Components are copied into `src/lib/components/ui`, use the project's `#lib` imports, and can be edited directly. Add the `dark` class to the root `<html>` element to activate the dark theme.

## Linting and formatting

[Oxlint](https://oxc.rs/docs/guide/usage/linter.html) and
[Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) are installed as development dependencies.

```sh
pnpm lint          # Check code; errors and warnings fail the command
pnpm lint:fix      # Apply safe lint fixes
pnpm format        # Format the project in place
pnpm format:check  # Check formatting without writing files
```

Oxfmt uses a **100-character print width**, tabs, single quotes, and no trailing commas.
The configuration lives in `.oxfmtrc.json`; print width is a wrapping target, not a hard limit
for unbreakable strings or URLs.

Oxlint uses correctness rules configured in `.oxlintrc.json`. The empty-file rule is disabled
to allow the starter's comment-only library entrypoint. In `.svelte` files, Oxlint checks script
blocks only; use `pnpm check` for Svelte component/template and type diagnostics.

[`@shadcn/lint`](https://github.com/shadcn-ui/lint/blob/main/docs/svelte.md) runs as an Oxlint
JavaScript plugin. Both `pnpm lint` and `pnpm lint:fix` use Oxlint only.

The `shadcn/no-restyle` rule allows layout classes on design-system components but rejects
appearance overrides such as padding; use component variants instead. The rule is disabled
inside `src/lib/components/ui/**` so components can define their own styles.

**Svelte limitation:** Oxlint checks script blocks only. This setup does not enforce design-system
styling rules on Svelte markup or scoped `<style>` blocks. The plugin's script-only notice is
expected. `pnpm check` provides Svelte/type diagnostics, not design-system style checks.

Both tools respect `.gitignore` and explicitly exclude generated `.svelte-kit`, `build`,
`src/lib/paraglide`, and `project.inlang` files. The pnpm lockfile is not formatted.
VS Code recommends the official Oxc extension and uses it for formatting on save and lint fixes
on explicit save.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

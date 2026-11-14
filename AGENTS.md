# AGENTS.md

Design system for `somehow.digital` projects: Vue 3 components on Reka UI, styled with UnoCSS and documented in Storybook (Vite+, pnpm).

## Code

- Keep the public API small. Everything consumers can import is exported from `src/index.ts`.
- Write components as Vue single-file components (virtual DOM runtime, no Vapor) and style them with UnoCSS utility classes. Use Reka UI primitives where behavior matters.
- Keep UnoCSS classes in `.vue` files or the built output. Classes in `.ts` files, such as stories, are not scanned.
- The preset (`src/unocss.ts`) adds the classes found in `dist/ui.js` to the UnoCSS safelist. Keep it free of a `Preset` return type, because that type makes the declaration build take about a minute.
- Don't abbreviate names.
- Use code comments sparingly. Comment only what the code can't say, and keep the wording precise and concise.

## Components

- Give every component a story with a `play` test in `*.stories.ts` next to it. Use offline fixtures such as `.storybook/fixtures.ts`, not remote images.
- Support light and dark mode (class based, `dark:` variants) and check both in Storybook.
- Keep the component list in `README.md` in line with the exports.

## Checks

- Iterate with focused checks, e.g. `pnpm lint:vue`, `pnpm lint:eslint` or `pnpm test`.
- Run `pnpm lint`, `pnpm test` and `pnpm build` before finishing.
- Auto-fix with `pnpm fix`.
- Never weaken a check to make it pass: no new ignores, `@ts-expect-error` or lowered thresholds. Fix the cause.

## Release

- Releases run through semantic-release on `main` and publish to npm. The version in `package.json` is managed by it.
- `pnpm pack` builds `dist` through `prepack`. Test the package in a separate consumer project after changes to exports, the preset or the build.

## Git

- Commit only when asked.
- Use Conventional Commits, e.g. `feat: add badge component`.
- Don't add AI attribution such as co-author trailers or generated-by footers.

# UI

> Design system for `somehow.digital` projects (Vue, Reka UI, UnoCSS).

---

**install**

```sh
pnpm add @somehow-digital/ui vue reka-ui unocss
```

**use**

Add the preset to your UnoCSS config. It adds every class the components use to the UnoCSS safelist, so no content scanning of `node_modules` is needed.

```ts
// uno.config.ts
import preset from '@somehow-digital/ui/preset';
import { defineConfig } from 'unocss';

export default defineConfig({
	presets: [preset()],
});
```

```vue
<script setup lang="ts">
import { Button, Heading, Logo } from '@somehow-digital/ui';
</script>

<template>
	<Logo />
	<Heading :level="2">
		Hello
	</Heading>
	<Button href="https://somehow.digital">
		Visit
	</Button>
</template>
```

**components**

- `Logo` — scales with the surrounding `font-size`, colored via `currentColor`. `animated` plays the reveal on mount (skipped for `prefers-reduced-motion`). Server-rendered HTML shows the plain logo, so without hydration it simply stays static; with hydration it may flash briefly before the reveal starts.
- `Button` — renders `<a>` with `href`, otherwise `<button>`; supports `as` and `asChild`.
- `Badge` — `variant`: `neutral` (default) or `accent`.
- `Heading` — `level` sets the element, `size` the visual step (fluid).
- `Image` — requires `alt`, `width` and `height`; lazy by default. `rounded` (default `true`) controls the corner radius.
- `Gallery` — scroll-snap carousel; put `Image` components in the default slot; the gallery rounds its own edge and removes the radius of its slides.

**notes**

- Dark mode is class based: add `dark` to a parent element (usually `<html>`).
- `Logo` and `Heading` use the `Gabarito Variable` font, which is not bundled. Load it yourself, e.g. `import '@fontsource-variable/gabarito';`.

---

[somehow digital.](https://somehow.digital)

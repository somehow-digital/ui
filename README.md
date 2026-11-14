# UI

> Design System for `somehow.digital` projects.

---

**Installation**

```sh
pnpm add @somehow-digital/ui vue reka-ui unocss
```

**Usage**

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

---

[`somehow digital.`](https://somehow.digital/)

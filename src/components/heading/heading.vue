<script setup lang="ts">
import { computed } from 'vue';
import { getFluidSize } from '../../utils/typography.ts';

// `level` is the semantic element, `size` the visual step (defaults to level).
const props = withDefaults(
	defineProps<{
		level?: 1 | 2 | 3 | 4 | 5 | 6;
		size?: 1 | 2 | 3 | 4 | 5 | 6;
	}>(),
	{ level: 1 },
);

defineSlots<{ default: (props: Record<string, never>) => unknown }>();

// h1 is the largest step (5), h6 the smallest (0).
const fontSize = computed(() => getFluidSize(6 - (props.size ?? props.level)));
</script>

<template>
	<component :is="`h${level}`" class="m-0 font-['Gabarito_Variable',sans-serif] font-500 leading-tight" :style="{ fontSize }">
		<slot />
	</component>
</template>

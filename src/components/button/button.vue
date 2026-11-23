<script setup lang="ts">
import type { PrimitiveProps } from 'reka-ui';
import { Primitive } from 'reka-ui';
import { computed } from 'vue';

// Renders <a> when `href` is set, otherwise <button>; `as`/`asChild` come from Reka.
const props = withDefaults(defineProps<PrimitiveProps & { href?: string; type?: HTMLButtonElement['type'] }>(), {
	type: 'button',
});

defineSlots<{ default: (props: Record<string, never>) => unknown }>();

const tag = computed(() => props.as ?? (props.href ? 'a' : 'button'));
// `type` only belongs on a real <button>, not on links or an `asChild` target.
const type = computed(() => (!props.asChild && tag.value === 'button'
	? props.type
	: undefined));
</script>

<template>
	<Primitive
		:as="tag"
		:as-child="props.asChild"
		:href="props.href"
		:type="type"
		class="inline-flex flex-row items-center gap-1rem cursor-pointer leading-snug px-2rem py-0.75rem text-1.25rem font-600 text-white bg-gray-900 rounded-0.25rem hover:bg-gray-700 dark:(bg-gray-100 text-gray-900 hover:bg-gray-300)"
	>
		<slot />
	</Primitive>
</template>

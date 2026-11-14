<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'neutral' | 'accent' }>(), { variant: 'neutral' });

defineSlots<{ default: (props: Record<string, never>) => unknown }>();
</script>

<template>
	<span
		class="inline-block px-0.375rem py-0.125rem rounded-0.25rem border border-solid font-mono text-0.75rem leading-none"
		:class="variant === 'accent'
			? 'text-blue-900 bg-blue-100 border-blue-300 dark:(text-blue-100 bg-blue-900 border-blue-700)'
			: 'text-gray-700 bg-gray-200 border-gray-300 dark:(text-gray-300 bg-gray-800 border-gray-700)'"
	>
		<slot />
	</span>
</template>

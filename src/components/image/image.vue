<script setup lang="ts">
// width/height are required so the browser can reserve space and avoid layout shift.
withDefaults(
	defineProps<{
		src: string;
		alt: string;
		width: number;
		height: number;
		loading?: 'lazy' | 'eager';
		rounded?: boolean;
	}>(),
	{ loading: 'lazy', rounded: true },
);
</script>

<template>
	<img :src="src" :alt="alt" :width="width" :height="height" :loading="loading" :class="{ 'rounded-0.25rem': rounded }" class="block max-w-full h-auto">
</template>

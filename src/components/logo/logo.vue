<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

const props = withDefaults(defineProps<{ animated?: boolean }>(), { animated: false });

// Mirrors the bars of the somehow.digital website logo.
const barClasses = [
	'self-end h-80%',
	'h-full',
	'self-start h-80%',
	'h-full',
	'h-60%',
];

const base = useTemplateRef<HTMLElement>('base');
const mark = useTemplateRef<HTMLElement>('mark');
const dot = useTemplateRef<HTMLElement>('dot');
const first = useTemplateRef<HTMLElement>('first');
const second = useTemplateRef<HTMLElement>('second');
const barElements = useTemplateRef<HTMLElement[]>('bars');

// Visible in server-rendered HTML so a page that never hydrates still shows the logo;
// the client hides it on mount and the reveal makes it visible again.
const hidden = ref(false);
let unmounted = false;
let controls: { stop: () => void } | undefined;

// shortcut: `animated` is only read on mount, toggling it later does not replay; remount with a key instead.
onMounted(async () => {
	if (!props.animated || matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return;
	}

	hidden.value = true;

	try {
		const { animation } = await import('./logo.animation.ts');

		if (unmounted) {
			return;
		}
		if (!base.value || !mark.value || !dot.value || !first.value || !second.value || !barElements.value?.length) {
			throw new Error('logo elements missing');
		}

		controls = animation({
			bars: barElements.value,
			base: base.value,
			dot: dot.value,
			mark: mark.value,
			type: [first.value, second.value],
		});
	}
	catch (error) {
		console.error('logo animation failed', error);
		hidden.value = false;
	}
});

onUnmounted(() => {
	unmounted = true;
	controls?.stop();
});
</script>

<template>
	<span
		ref="base"
		class="inline-flex flex-row-reverse gap-[0.35em] items-center font-['Gabarito_Variable',sans-serif] font-450 leading-[1em] tracking-[-0.025em]"
		:class="{ invisible: hidden }"
		role="img"
		aria-label="somehow.digital"
	>
		<span class="flex-none block relative top-[-0.09em] overflow-x-clip" aria-hidden="true">
			<span ref="first" class="block">somehow</span>
			<span ref="second" class="block">digital<span ref="dot">.</span></span>
		</span>

		<span ref="mark" class="flex flex-none flex-row gap-[0.05em] aspect-square items-center" aria-hidden="true">
			<span v-for="(bar, index) in barClasses" :key="index" ref="bars" class="block w-[0.3125em] origin-bottom rounded-[0.025em] bg-current" :class="bar" />
		</span>
	</span>
</template>

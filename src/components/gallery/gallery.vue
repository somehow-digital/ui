<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue';

withDefaults(defineProps<{ label?: string }>(), { label: 'Gallery' });

defineSlots<{ default: (props: Record<string, never>) => unknown }>();

const track = useTemplateRef<HTMLElement>('track');
const labels = ref<string[]>([]);
const index = ref(0);

// shortcut: slides are read once on mount, slot changes afterwards are not tracked; use a key to remount.
onMounted(() => {
	labels.value = Array.from(track.value!.children, (slide, position) => slide.getAttribute('alt') ?? `Slide ${position + 1}`);
});

function update() {
	index.value = Math.round(track.value!.scrollLeft / track.value!.clientWidth);
}

function go(target: number) {
	track.value!.scrollTo({ behavior: 'smooth', left: target * track.value!.clientWidth });
}
</script>

<template>
	<section class="group" aria-roledescription="carousel" :aria-label="label">
		<div class="relative">
			<div
				ref="track"
				class="flex overflow-x-auto snap-x snap-mandatory rounded-0.25rem [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:flex-none [&>*]:w-full [&>*]:snap-start [&>*]:!rounded-none"
				tabindex="0"
				@scroll.passive="update"
				@keydown.left="go(index - 1)"
				@keydown.right="go(index + 1)"
			>
				<slot />
			</div>

			<button
				v-for="side in ['prev', 'next'] as const"
				:key="side"
				type="button"
				:aria-label="side === 'prev' ? 'Previous slide' : 'Next slide'"
				:disabled="side === 'prev' ? index === 0 : index === labels.length - 1"
				class="absolute top-1/2 -translate-y-1/2 flex items-center justify-center size-2.5rem m-0 p-0 border-0 rounded-full text-white bg-black/45 cursor-pointer opacity-0 transition-opacity group-hover:not-disabled:opacity-100 focus-visible:opacity-100 disabled:cursor-default [@media(hover:none)]:hidden"
				:class="side === 'prev' ? 'left-0.75rem' : 'right-0.75rem'"
				@click="go(index + (side === 'prev' ? -1 : 1))"
			>
				<svg class="size-1.25rem fill-none stroke-current [stroke-width:2.5] [stroke-linecap:round] [stroke-linejoin:round]" viewBox="0 0 24 24" aria-hidden="true">
					<path :d="side === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'" />
				</svg>
			</button>
		</div>

		<div class="flex justify-center gap-0.5rem mt-0.75rem">
			<button
				v-for="(text, position) in labels"
				:key="position"
				type="button"
				:aria-label="`Show ${text}`"
				:aria-current="position === index"
				class="h-0.5rem m-0 p-0 border-0 rounded-full cursor-pointer transition-all"
				:class="position === index ? 'w-1.5rem bg-gray-900 dark:bg-gray-100' : 'w-0.5rem bg-gray-400 dark:bg-gray-600'"
				@click="go(position)"
			/>
		</div>
	</section>
</template>

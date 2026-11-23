// @ts-expect-error missing types
import base from '@somehow-digital/unocss-preset';

// `getBuiltinModule` instead of an import: the library build targets browsers and would stub `node:fs`.
// eslint-disable-next-line node/prefer-global/process -- see above
const { readFileSync } = globalThis.process.getBuiltinModule('node:fs');

const whitespace = /\s+/;
const edges = /^["'`]+|["'`,;)]+$/g;

// Consumers' UnoCSS skips node_modules and (unlike a safelist) ignores `content` set by presets,
// so every token in the built components goes on the safelist; tokens that match no rule generate nothing.
function classes() {
	try {
		const code = readFileSync(new URL('ui.js', import.meta.url), 'utf-8');
		return [
			...new Set(code.split(whitespace).map(token => token.replace(edges, '')).filter(Boolean)),
		];
	}
	catch {
		return [];
	}
}

// No `Preset` return type on purpose: checking against unocss's `Preset` made the d.ts bundling take ~60s.
export default function preset() {
	return {
		name: 'somehow-digital-ui',
		presets: [
			base(),
		],
		outputToCssLayers: true,
		safelist: classes(),
	};
}

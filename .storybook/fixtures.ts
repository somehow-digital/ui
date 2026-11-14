// Offline placeholder images so stories and tests don't depend on the network.
export function slide(label: string, color: string) {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800"><rect width="100%" height="100%" fill="${color}"/><text x="50%" y="50%" fill="#fff" font-size="96" font-family="sans-serif" text-anchor="middle">${label}</text></svg>`;

	return { alt: label, src: `data:image/svg+xml,${encodeURIComponent(svg)}` };
}

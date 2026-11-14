import { defineConfig } from 'unocss';
import preset from './src/unocss';

export default defineConfig({
	presets: [preset()],
});

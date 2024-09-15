import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/Boulder-Browse',
	plugins: [react()],
	resolve: {
		alias: {
			elkjs: path.resolve(__dirname, 'node_modules/elkjs/lib/elk.bundled.js'),
		},
	},
	build: {
		rollupOptions: {
			external: [
				'elkjs/lib/elk.bundled.js',
				'@fortawesome/react-fontawesome',
				'@fortawesome/free-solid-svg-icons',
			],
		},
	},
});

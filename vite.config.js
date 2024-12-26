import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				shortcode: path.resolve(__dirname, "./src/components/shortcode.jsx"),
				admin: path.resolve(__dirname, "./src/index.jsx"),
			},
			output: {
				entryFileNames: "[name].bundle.js",
				dir: "build-others",
				format: "iife", // Ensure WordPress compatibility
				manualChunks: undefined, // Prevent Vite from splitting code
			},
			external: [
				"@wordpress/element",
				"@wordpress/components",
				"@wordpress/i18n",
			],
		},
		target: "es2018", // Ensure compatibility with modern browsers
		emptyOutDir: false, // Prevent clearing the output directory
		modulePreload: false, // Avoid additional preload requests
	},
});

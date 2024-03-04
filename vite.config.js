import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: './index.js',
            name: 'vanilla-toaster',
            formats: ['es'],
            fileName: (format) => `vanilla-toaster.js`
        },
        outDir: "./dist/",
        emptyOutDir: true,
    }
});

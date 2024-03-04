import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: './index.js',
            name: 'toaster',
            formats: ['es'],
            fileName: (format) => `toaster.js`
        },
        outDir: "./dist/",
        emptyOutDir: true,
    }
});

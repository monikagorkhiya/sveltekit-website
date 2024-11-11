import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import adapter from '@sveltejs/adapter-static';


export default defineConfig({
	kit: {
        adapter: adapter(),
        paths: {
            base: process.env.NODE_ENV === 'production' ? '/sveltekit-website' : '',
        },
    },
    
	plugins: [sveltekit()],
	build: {
		rollupOptions:
		{
			output:{
				manualChunks:(id) =>
				{
					return "app-bundle";

				}
			}
		},
	}
});


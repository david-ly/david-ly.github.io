import {defineConfig} from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), sitemap(), react()]
, prefetch: true
, site: 'https://davidmacly.dev'
, vite: {plugins: [tailwindcss()]}
})

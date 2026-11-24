import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

/**
 * Generates public/sitemap.xml at build time from VITE_SITE_URL.
 * Falls back to a documented placeholder so the file is always valid.
 */
function sitemapPlugin() {
  return {
    name: 'sitemap-generator',
    apply: 'build' as const,
    closeBundle() {
      const env = loadEnv('production', process.cwd(), '')
      const base = (env.VITE_SITE_URL || 'https://example.com').replace(/\/$/, '')
      const routes = ['', '/projects', '/about', '/contact']
      const slugs = [
        'metaphore',
        'metaphore-client',
        'deliverypro',
        'sat',
        'smtr-carre',
        'fleet-management-reporting',
      ]
      const urls = [...routes, ...slugs.map((s) => `/projects/${s}`)]
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')}
</urlset>
`
      fs.mkdirSync(path.resolve(process.cwd(), 'dist'), { recursive: true })
      fs.writeFileSync(path.resolve(process.cwd(), 'dist/sitemap.xml'), xml)
    },
  }
}

export default defineConfig({
  plugins: [vue(), tailwindcss(), sitemapPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.ts'],
  },
})

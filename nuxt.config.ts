import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    '@nuxt/eslint',
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  site: {
    url: 'https://soufianenamouhi.dev',
    name: 'Soufiane Namouhi',
    description:
      'Software developer based in Morocco, building enterprise web applications, logistics systems and modern frontend experiences with Vue.js, Java, Spring Boot and PostgreSQL.',
    defaultLocale: 'en',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · Soufiane Namouhi',
      meta: [{ name: 'theme-color', content: '#09090b' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  fonts: {
    families: [
      { name: 'Space Grotesk', provider: 'google', weights: [400, 500, 600, 700] },
      { name: 'Inter', provider: 'google', weights: [400, 500, 600] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500, 600] },
    ],
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  experimental: {
    viewTransition: false,
  },
})

// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import 'dotenv/config'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@pinia/nuxt'],
  css: ['~/assets/css/main.css', 'animate.css/animate.min.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: 'DASH',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  devServer: {
    host: '0.0.0.0',
  },
  runtimeConfig: {
    public: {
      appMode: process.env.APP_MODE,
    },
  },
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app:{
    head: {
      title: 'Better Call Bert',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Better Call Bert' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', type: 'image/x-icon', href: '/apple-touch-icon-180x180.png' }
      ]
    },
  },

  modules: [
    '@bootstrap-vue-next/nuxt',
    'unplugin-icons/nuxt',
    '@vite-pwa/nuxt',
  ],

  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '~/assets/css/custom-theme.scss',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Better Call Bert',
      short_name: 'BetterCallBert',
      display: 'standalone',
      description: 'Better Call Bert',
      lang: 'fr-FR',
      theme_color: '#17a2b8',
      icons: [
        {
          "src": "pwa-64x64.png",
          "sizes": "64x64",
          "type": "image/png"
        },
        {
          "src": "pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          "src": "maskable-icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    },
    devOptions: {
      enabled: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: "module"
    }
  },

  runtimeConfig: {
    FIREBASE_API_KEY: process.env.NUXT_FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.NUXT_FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.NUXT_FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.NUXT_FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
    public: {
      FIREBASE_API_KEY: process.env.NUXT_FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.NUXT_FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: process.env.NUXT_FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: process.env.NUXT_FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.NUXT_FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.NUXT_FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.NUXT_FIREBASE_MEASUREMENT_ID,
    }
  }
})
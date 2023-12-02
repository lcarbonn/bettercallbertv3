// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //devtools: { enabled: true },
  app:{
    head: {
      title: 'Better Call Bert',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Better Call Bert' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
      short_name: 'bettercallbert',
      display: 'standalone',
      description: 'Better Call Bert',
      lang: 'fr-FR'
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

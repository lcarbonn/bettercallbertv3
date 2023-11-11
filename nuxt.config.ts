// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //devtools: { enabled: true },
  modules: [
    '@bootstrap-vue-next/nuxt',
    'unplugin-icons/nuxt',
    '@vite-pwa/nuxt'
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

})

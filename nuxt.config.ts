// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',  
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
    '@nuxt/ui',
    '@vite-pwa/nuxt',
    'nuxt-auth-utils',
    '@nuxtjs/i18n'
  ],

  /* i18n conf */
  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'fr',
    vueI18n: './i18n.config.ts'
  },

  css: ['~/assets/css/main.css'],
  
  pwa: {
    /* PWA options */
    registerType: 'autoUpdate',
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
    public: {
      token:'',
      baseApiUrl:'',
      baseUrl:'',
      baseId:'',
      baseName:'',
      tableCard:'',
      tableTheme:'',
    }
  }  
})
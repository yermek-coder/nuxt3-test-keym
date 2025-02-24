// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css',
          rel: 'stylesheet',
        }
      ]
    }
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  components: [
    '~/components',
    {
      path: '~/components/common',
      pathPrefix: false,
    },
  ],

  typescript: {
    typeCheck: true
  },

  modules: ['@pinia/nuxt'],
})
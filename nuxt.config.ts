// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  plugins: [
    '~/plugins/modal'
  ],
  components: [
    '~/components',
    {
      global: true,
      path: '~/components/global'
    },
    {
      path: '~/components/common',
      pathPrefix: false,
    },
  ],
  typescript: {
    typeCheck: true
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "https://www.fruityvice.com/api",
        changeOrigin: true,
        prependPath: true,
      }
    }
  },
})

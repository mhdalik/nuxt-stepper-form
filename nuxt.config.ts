// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  modules: ["vuetify-nuxt-module"],

  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {},
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      API_BASE_URL_V1_AUTH: process.env.API_BASE_URL_V1_AUTH,
      IMAGE_URL_PREFIX: process.env.IMAGE_URL_PREFIX,
      APP_ENV: process.env.APP_ENV,
    },
  },

  compatibilityDate: "2024-08-16",
});

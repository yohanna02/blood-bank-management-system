// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],

  tailwindcss: {
      // add '~tailwind.config` alias
      exposeConfig: true
  },

  runtimeConfig: {
      jwtScecret: "sfsdfsdgdfgdfhdfbhfdbhdfbhdfgsd",
      jwtScecret2: "sdssfsdfsdfsdgdfgdfhdfbhfdbhdfbhdfgsd"
  },

  compatibilityDate: "2024-09-13"
});
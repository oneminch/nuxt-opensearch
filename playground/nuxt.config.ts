export default defineNuxtConfig({
  modules: ['nuxt-opensearch'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  opensearch: {
    name: 'My Awesome Site',
    description: 'Search my awesome site',
  },
})

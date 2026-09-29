import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [MyModule],
  opensearch: {
    name: 'Search & Discover <Site>',
    description: 'Find "anything" here & more',
    searchUrl: '/search?q={searchTerms}&lang=en',
  },
})

import MyModule from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    MyModule,
  ],
  opensearch: {
    name: 'Test Search',
    searchUrl: '/search?q={searchTerms}',
    description: 'Test search engine',
  },
})

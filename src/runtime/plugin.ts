import { defineNuxtPlugin, useHead, useRuntimeConfig } from '#app'

export default defineNuxtPlugin(() => {
  const { name, routePath } = useRuntimeConfig().public.opensearch as { name: string, routePath: string }

  useHead({
    link: [{
      rel: 'search',
      type: 'application/opensearchdescription+xml',
      href: routePath || '/opensearch.xml',
      title: name || 'Search',
    }],
  })
})

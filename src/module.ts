import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addServerHandler,
  addServerTemplate,
} from '@nuxt/kit'

export interface ModuleOptions {
  /**
   * Name of the search engine shown in the browser's search UI and used as
   * the `<ShortName>` element in the generated file. Keep it under 16
   * characters for best browser compatibility.
   *
   * @default 'Search'
   */
  name?: string

  /**
   * Description of what your search covers. Shown to users in some
   * browsers when they manage their search engines. Maps to `<Description>`.
   *
   * @default 'Search this site'
   */
  description?: string

  /**
   * Relative URL template browsers use to run a search. The literal string
   * `{searchTerms}` is replaced with the user's query at search time.
   * Maps to the `<Url template="…">` element.
   *
   * @default '/search?q={searchTerms}'
   * @example 'https://example.com/search?q={searchTerms}'
   */
  searchUrl?: string

  /**
   * URL of a small icon (typically a 16×16 favicon) associated with the
   * search engine. When provided, maps to the `<Image>` element.
   *
   * @example 'https://example.com/favicon.ico'
   */
  icon?: string

  /**
   * Contact email for the search engine provider. Maps to `<Contact>`.
   *
   * @example 'search@example.com'
   */
  contact?: string

  /**
   * BCP 47 language tag for the search results. Maps to `<Language>`.
   *
   * @example 'en-US'
   */
  language?: string

  /**
   * Character encoding of the search results returned by the server.
   * Maps to `<OutputEncoding>`.
   *
   * @default 'UTF-8'
   */
  outputEncoding?: string

  /**
   * Character encoding expected for the search query submitted to the server.
   * Maps to `<InputEncoding>`.
   *
   * @default 'UTF-8'
   */
  inputEncoding?: string

  /**
   * URL path at which the browser helper file is served. The injected
   * `<link rel="search">` head tag always points here.
   *
   * @default '/opensearch.xml'
   */
  routePath?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-opensearch',
    configKey: 'opensearch',
  },
  defaults: {
    name: 'Search',
    searchUrl: '/search?q={searchTerms}',
    description: 'Search this site',
    outputEncoding: 'UTF-8',
    inputEncoding: 'UTF-8',
    routePath: '/opensearch.xml',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Bake config into a virtual module so the server route reads static
    // values without touching runtimeConfig at request time.
    addServerTemplate({
      filename: '#nuxt-opensearch/config.mjs',
      getContents: () => `export const config = ${JSON.stringify(options)}`,
    })

    // Only the fields the client plugin needs go into runtimeConfig.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nuxt.options.runtimeConfig.public.opensearch = { name: options.name, routePath: options.routePath } as any

    addPlugin(resolver.resolve('./runtime/plugin'))

    addServerHandler({
      route: options.routePath!,
      handler: resolver.resolve('./runtime/server/routes/opensearch.xml.get'),
    })
  },
})

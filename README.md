<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: Nuxt OpenSearch
- Package name: nuxt-opensearch
- Description: OpenSearch discovery integration for Nuxt
-->

# Nuxt OpenSearch

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

OpenSearch discovery integration for Nuxt applications. This module allows your Nuxt site to be added as a search engine in browsers via the OpenSearch protocol.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)

## Features

- 🔍 Auto-generate `opensearch.xml` from configuration
- 🎨 Support for custom `opensearch.xml` files
- 🚀 Auto-serve OpenSearch description at `/opensearch.xml`
- 📝 Automatic HTML head injection with OpenSearch link tag
- ⚙️ Full TypeScript support with comprehensive configuration options
- 🎯 Sensible defaults for all required fields
- 📋 Support for all OpenSearch specification fields

## Quick Setup

Install the module to your Nuxt application:

```bash
npx nuxt module add nuxt-opensearch
```

## Usage

Add `nuxt-opensearch` to your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-opensearch'],
  
  opensearch: {
    siteName: 'My Site',
    searchUrl: 'https://example.com/search?q={searchTerms}',
    description: 'Search my site',
  }
})
```

The module will:
1. Auto-generate an `opensearch.xml` file based on your configuration
2. Serve it at `/opensearch.xml`
3. Inject the OpenSearch link tag into your HTML head

Browsers will detect the OpenSearch description and allow users to add your site as a search engine.

## Configuration

### Required Options

- `siteName` (string): Display name for your search engine (default: `'Search'`)
- `searchUrl` (string): URL template for search requests with `{searchTerms}` placeholder (default: `'/search?q={searchTerms}'`)

### Optional Options

- `description` (string): Brief description of the search functionality (default: `'Search this site'`)
- `shortName` (string): Short name (10 characters or less) for the search engine. Defaults to `siteName`
- `icon` (string): URL to a small image icon for the search engine
- `contact` (string): Email address for the search provider
- `language` (string): Language code for the search engine (e.g., `'en-US'`)
- `outputEncoding` (string): Output encoding (default: `'UTF-8'`)
- `inputEncoding` (string): Input encoding (default: `'UTF-8'`)
- `queryParamName` (string): Query parameter name in the search URL (default: `'q'`)
- `routePath` (string): Path to serve the OpenSearch description (default: `'/opensearch.xml'`)
- `customPath` (string): Path to a custom `opensearch.xml` file in the `public` directory (bypasses auto-generation if provided)

## Advanced Usage

### Custom OpenSearch Description

If you want to use a custom `opensearch.xml` file, place it in your `public` directory and configure the `customPath` option:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-opensearch'],
  
  opensearch: {
    customPath: 'opensearch.xml'
  }
})
```

The custom file will be served instead of the auto-generated one.

### Custom Route Path

Serve the OpenSearch description at a different path:

```ts
export default defineNuxtConfig({
  modules: ['nuxt-opensearch'],
  
  opensearch: {
    siteName: 'My Site',
    searchUrl: 'https://example.com/search?q={searchTerms}',
    routePath: '/discovery.xml'  // Served at /discovery.xml instead of /opensearch.xml
  }
})
```

### Full Example

```ts
export default defineNuxtConfig({
  modules: ['nuxt-opensearch'],
  
  opensearch: {
    siteName: 'My Awesome Site',
    shortName: 'MasSite',
    searchUrl: 'https://example.com/search?q={searchTerms}',
    description: 'Search across all content on My Awesome Site',
    icon: 'https://example.com/favicon.ico',
    contact: 'support@example.com',
    language: 'en-US',
    outputEncoding: 'UTF-8',
    inputEncoding: 'UTF-8',
  }
})
```

This generates the following `opensearch.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
  <ShortName>MasSite</ShortName>
  <Description>Search across all content on My Awesome Site</Description>
  <Url type="text/html" template="https://example.com/search?q={searchTerms}" />
  <OutputEncoding>UTF-8</OutputEncoding>
  <InputEncoding>UTF-8</InputEncoding>
  <Image>https://example.com/favicon.ico</Image>
  <Language>en-US</Language>
  <Contact>support@example.com</Contact>
</OpenSearchDescription>
```

## Resources

- [OpenSearch Protocol Specification](https://opensearchfoundation.org/)
- [Browser OpenSearch Implementation Guide](https://developer.mozilla.org/en-US/docs/Web/OpenSearch)

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install

  # Generate type stubs
  npm run dev:prepare

  # Develop with the playground
  npm run dev

  # Build the playground
  npm run dev:build

  # Run ESLint
  npm run lint

  # Run Vitest
  npm run test
  npm run test:watch

  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-opensearch/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-opensearch
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-opensearch.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt-opensearch
[license-src]: https://img.shields.io/npm/l/nuxt-opensearch.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-opensearch
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com


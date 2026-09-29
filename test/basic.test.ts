import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<div>basic</div>')
  })

  it('serves opensearch.xml with correct content-type', async () => {
    const response = await $fetch('/opensearch.xml', { responseType: 'text' })
    expect(response).toContain('<?xml version="1.0"')
    expect(response).toContain('<OpenSearchDescription')
    expect(response).toContain('</OpenSearchDescription>')
  })

  it('generates opensearch.xml with name', async () => {
    const response = await $fetch('/opensearch.xml', { responseType: 'text' })
    expect(response).toContain('<ShortName>')
  })

  it('generates opensearch.xml with searchUrl', async () => {
    const response = await $fetch('/opensearch.xml', { responseType: 'text' })
    expect(response).toContain('<Url')
    expect(response).toContain('type="text/html"')
    expect(response).toContain('template=')
  })

  it('injects opensearch link in head', async () => {
    const html = await $fetch('/')
    expect(html).toContain('rel="search"')
    expect(html).toContain('application/opensearchdescription+xml')
    expect(html).toContain('href="/opensearch.xml"')
  })

  it('includes encoding in opensearch.xml', async () => {
    const response = await $fetch('/opensearch.xml', { responseType: 'text' })
    expect(response).toContain('<OutputEncoding>')
    expect(response).toContain('<InputEncoding>')
  })

  it('properly escapes special characters in attribute values', async () => {
    const response = await $fetch('/opensearch.xml', { responseType: 'text' })
    const templateMatch = response.match(/template="([^"]*)"/)
    if (templateMatch) {
      const templateValue = templateMatch[1]
      expect(templateValue).not.toContain('&q=')
    }
  })

  it('reflects configured name in ShortName element', async () => {
    const response = await $fetch('/opensearch.xml', { responseType: 'text' })
    expect(response).toContain('<ShortName>Test Search</ShortName>')
  })

  it('reflects configured description in Description element', async () => {
    const response = await $fetch('/opensearch.xml', { responseType: 'text' })
    expect(response).toContain('<Description>Test search engine</Description>')
  })

  it('reflects configured searchUrl in Url template attribute', async () => {
    const response = await $fetch('/opensearch.xml', { responseType: 'text' })
    expect(response).toContain('template="/search?q={searchTerms}"')
  })

  it('head link title matches configured name', async () => {
    const html = await $fetch('/')
    expect(html).toContain('title="Test Search"')
  })
})

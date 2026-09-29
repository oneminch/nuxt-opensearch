import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('search metadata settings', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/special-chars', import.meta.url)),
  })

  it('escapes ampersands in name', async () => {
    const response = await $fetch('/opensearch.xml', { responseType: 'text' })
    expect(response).toContain('Search &amp; Discover')
    expect(response).not.toContain('Search & Discover')
  })

  it('escapes angle brackets in name', async () => {
    const response = await $fetch('/opensearch.xml', { responseType: 'text' })
    expect(response).toContain('&lt;Site&gt;')
    expect(response).not.toContain('<Site>')
  })

  it('escapes quotes in description', async () => {
    const response = await $fetch('/opensearch.xml', { responseType: 'text' })
    expect(response).toContain('&quot;anything&quot;')
  })

  it('escapes ampersands in searchUrl template attribute', async () => {
    const response = await $fetch('/opensearch.xml', { responseType: 'text' })
    const templateMatch = response.match(/template="([^"]*)"/)
    expect(templateMatch).not.toBeNull()
    const templateValue = templateMatch![1]
    expect(templateValue).toContain('&amp;lang=en')
    expect(templateValue).not.toContain('&lang=en')
  })
})

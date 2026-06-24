import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { SITE_URL } from '@/lib/seo'

// Revalidate the sitemap hourly so new products/collections get picked up.
export const revalidate = 3600

// trailingSlash is enabled in next.config.js, so every URL ends with "/" to
// match the canonical served URL and avoid redirect chains for crawlers.
function url(path: string): string {
  if (path === '/') return `${SITE_URL}/`
  const clean = path.replace(/^\/+|\/+$/g, '')
  return `${SITE_URL}/${clean}/`
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url('/'), lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: url('/shop'), lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: url('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: url('/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: url('/size-guide'), lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: url('/shipping'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: url('/returns'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: url('/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: url('/privacy'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ]

  let dynamicRoutes: MetadataRoute.Sitemap = []

  try {
    const [products, collections] = await Promise.all([
      client.fetch<Array<{ slug: string; updatedAt?: string }>>(
        `*[_type == "product" && isActive == true && defined(slug.current)]{
          "slug": slug.current,
          "updatedAt": coalesce(updatedAt, _updatedAt)
        }`
      ),
      client.fetch<Array<{ slug: string; updatedAt?: string }>>(
        `*[_type == "collection" && isActive == true && defined(slug.current)]{
          "slug": slug.current,
          "updatedAt": _updatedAt
        }`
      ),
    ])

    const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
      url: url(`/product/${p.slug}`),
      lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    const collectionRoutes: MetadataRoute.Sitemap = collections.map((c) => ({
      url: url(`/collection/${c.slug}`),
      lastModified: c.updatedAt ? new Date(c.updatedAt) : now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    dynamicRoutes = [...collectionRoutes, ...productRoutes]
  } catch (error) {
    console.error('Error building dynamic sitemap routes:', error)
  }

  return [...staticRoutes, ...dynamicRoutes]
}

import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export const dynamic = 'force-static'

function formatDate(date: string | Date): string {
  return new Date(date).toISOString().split('T')[0] // → "2025-08-29"
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: formatDate(post.lastmod || post.date),
    }))

  const routes = ['', 'blog'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: formatDate(new Date()),
  }))

  return [...routes, ...blogRoutes]
}

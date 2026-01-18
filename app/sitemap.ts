import { MetadataRoute } from 'next'
import { portfolioData } from '../data/portfolio'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://estudioperpetuo401.com'
    const locales = ['en', 'es']

    const routes = ['', '/portfolio', '/contact', '/about']

    const sitemapEntries: MetadataRoute.Sitemap = []

    // Add main routes for each locale
    locales.forEach(locale => {
        routes.forEach(route => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: route === '' ? 1 : 0.8,
            })
        })
    })

    // Add portfolio category routes
    const categories = Object.keys(portfolioData)
    locales.forEach(locale => {
        categories.forEach(category => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}/portfolio/${category}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 0.6,
            })
        })
    })

    return sitemapEntries
}

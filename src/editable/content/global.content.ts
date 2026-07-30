import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Digital growth platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Digital growth platform',
    primaryLinks: [
      { label: 'Solutions', href: '/article' },
      { label: 'Features', href: '/image-sharing' },
      { label: 'Services', href: '/listings' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Get Started', href: '/' },
      secondary: { label: 'Contact', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Empowering businesses with intelligent solutions',
    description: 'A connected platform for business profiles, visual showcases, articles, and professional resources designed to accelerate your digital presence.',
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Gallery', href: '/image-sharing' },
          { label: 'Articles', href: '/articles' },
          { label: 'Resources', href: '/pdf' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for modern business discovery.',
  },
  commonLabels: {
    readMore: 'Learn more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const

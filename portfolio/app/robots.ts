import type { MetadataRoute } from 'next';

const siteUrl = 'https://arikhossain.dev'; // TODO(verify): confirm the production domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

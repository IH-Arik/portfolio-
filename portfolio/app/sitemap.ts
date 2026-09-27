import type { MetadataRoute } from 'next';
import { projects } from '../content/site';

const siteUrl = 'https://arikhossain.dev'; // TODO(verify): confirm the production domain

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), priority: 1 },
    { url: `${siteUrl}/about`, lastModified: new Date(), priority: 0.6 },
    { url: `${siteUrl}/research`, lastModified: new Date(), priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    priority: project.featured ? 0.8 : 0.5,
  }));

  return [...staticRoutes, ...projectRoutes];
}

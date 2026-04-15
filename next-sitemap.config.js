/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.adiphotography.pk',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.adiphotography.pk'}/image-sitemap.xml`,
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  transform: async (config, path) => {
    // Custom priority for key pages
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/services/')) {
      priority = 0.9;
    } else if (path.startsWith('/portfolio')) {
      priority = 0.8;
    } else if (path === '/areas' || path.startsWith('/areas/')) {
      priority = 0.8;
    } else if (path.startsWith('/blog/')) {
      priority = 0.7;
      changefreq = 'weekly';
    } else if (path.startsWith('/locations/')) {
      priority = 0.8;
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};

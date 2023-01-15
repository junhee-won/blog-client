/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://example.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/admin", "/server-sitemap.xml"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/admin"],
        allow: "/",
      },
    ],
    additionalSitemaps: [process.env.SITE_URL + "/server-sitemap.xml"],
  },
};

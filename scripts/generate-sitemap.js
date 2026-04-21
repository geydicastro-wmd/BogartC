import fs from "fs";
import { staticRoutes } from "../src/routes/staticRoutes.js";

const DOMAIN = "https://yourdomain.com";

const urls = staticRoutes
  .map((route) => {
    return `
  <url>
    <loc>${DOMAIN}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  })
  .join("");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

fs.writeFileSync("dist/sitemap.xml", sitemap);

console.log("✅ Sitemap generated successfully");
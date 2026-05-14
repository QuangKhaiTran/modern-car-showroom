import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { cars } from "@/data/cars";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", priority: "1.0", changefreq: "weekly" },
          { path: "/xe", priority: "0.9", changefreq: "daily" },
          { path: "/thuong-hieu", priority: "0.7", changefreq: "monthly" },
          { path: "/tra-gop", priority: "0.6", changefreq: "monthly" },
          { path: "/tin-tuc", priority: "0.7", changefreq: "weekly" },
          { path: "/ve-chung-toi", priority: "0.5", changefreq: "monthly" },
          { path: "/lien-he", priority: "0.5", changefreq: "monthly" },
          ...cars.map((c) => ({ path: `/xe/${c.slug}`, priority: "0.8", changefreq: "weekly" })),
        ];
        const urls = entries.map(
          (e) => `  <url><loc>${BASE_URL}${e.path}</loc><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});

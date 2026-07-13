import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://www.mgc.mu";

const PATHS = [
  "/",
  "/the-club/history",
  "/the-club/committee",
  "/the-club/careers",
  "/the-club/tenders",
  "/the-club/rules",
  "/sports",
  "/sports/golf",
  "/sports/tennis",
  "/sports/squash",
  "/sports/fitness",
  "/sports/pool",
  "/dining",
  "/venue-hire",
  "/events",
  "/gallery",
  "/membership",
  "/membership/reciprocal",
  "/contact",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = PATHS.map(
          (p) =>
            `  <url><loc>${BASE_URL}${p}</loc><changefreq>${p === "/" ? "weekly" : "monthly"}</changefreq><priority>${p === "/" ? "1.0" : "0.7"}</priority></url>`,
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/start?*"],
    },
    sitemap: "https://finnitrex.com/sitemap.xml",
  };
}

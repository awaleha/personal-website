import { site } from "@/resources/content";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${site.baseURL}/sitemap.xml`,
  };
}

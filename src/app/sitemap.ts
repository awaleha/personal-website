import { getPosts } from "@/lib/posts";
import { site } from "@/resources/content";

export const dynamic = "force-static";

export default function sitemap() {
  const works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `${site.baseURL}/work/${post.slug}`,
    lastModified: (post.metadata.publishedAt as string) ?? new Date().toISOString().split("T")[0],
  }));

  const routes = ["", "/about", "/work", "/gallery", "/uses", "/friends"].map((route) => ({
    url: `${site.baseURL}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...works];
}

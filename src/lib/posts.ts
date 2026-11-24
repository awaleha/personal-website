import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  metadata: Record<string, unknown> & {
    title?: string;
    summary?: string;
    publishedAt?: string;
  };
  content: string;
};

export function getPosts(parts: string[]): Post[] {
  const dir = path.join(process.cwd(), ...parts);
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .sort();
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    return { slug: file.replace(/\.mdx$/, ""), metadata: data, content };
  });
}

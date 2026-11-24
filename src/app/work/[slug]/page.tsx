import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPosts } from "@/lib/posts";
import { site } from "@/resources/content";

const DIR = ["src", "app", "work", "projects"];

export function generateStaticParams() {
  return getPosts(DIR).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPosts(DIR).find((p) => p.slug === slug);
  if (!post) return {};
  const title = post.metadata.title ?? slug;
  const description = post.metadata.summary ?? site.description;
  return {
    title,
    description,
    alternates: { canonical: `${site.baseURL}/work/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.metadata.publishedAt,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPosts(DIR).find((p) => p.slug === slug);
  if (!post) notFound();

  const date = post.metadata.publishedAt
    ? new Date(post.metadata.publishedAt).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const status = (post.metadata.status as string | undefined) ?? "";
  const stack = Array.isArray(post.metadata.stack) ? post.metadata.stack.join(" · ") : "";

  return (
    <article className="pt-14 md:pt-24">
      <header className="max-w-[40rem]">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link href="/work" className="mono-label transition-colors hover:text-cyan">
            work
          </Link>
          <span className="mono-label text-mute">/</span>
          {date && <span className="mono-label">{date}</span>}
          {status && (
            <span className={`mono-label ${status === "production" ? "text-cyan" : ""}`}>
              {status}
            </span>
          )}
        </div>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-5xl">
          {post.metadata.title ?? slug}
        </h1>
        {post.metadata.summary && (
          <p className="mt-4 text-lg leading-relaxed text-mute">
            {post.metadata.summary as string}
          </p>
        )}
        {stack && <p className="mono-label mt-5">{stack}</p>}
      </header>
      <div className="machine-prose mt-12">
        <MDXRemote source={post.content} />
      </div>
      <nav className="mt-20 flex justify-between border-t border-line pt-6 text-sm">
        <Link href="/work" className="link-quiet">
          all work
        </Link>
        <Link href="/" className="link-quiet">
          home
        </Link>
      </nav>
    </article>
  );
}

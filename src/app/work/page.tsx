import type { Metadata } from "next";
import { ProjectRow } from "@/components/ProjectRow";
import { projects, site } from "@/resources/content";

export const metadata: Metadata = {
  title: "work",
  description: `Projects by Awale Hassan — ${projects.length} things built, from a homelab status service to banking dashboards.`,
  alternates: { canonical: `${site.baseURL}/work` },
};

export default function Work() {
  const sorted = [...projects].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <>
      <header className="pt-14 md:pt-24">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">work</h1>
        <p className="mt-4 max-w-xl leading-relaxed text-mute">
          Things I've built, newest first. The case studies carry the detail — architecture,
          decisions, and the parts that didn't survive contact with reality.
        </p>
      </header>
      <div className="mt-12 border-t border-line">
        {sorted.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}

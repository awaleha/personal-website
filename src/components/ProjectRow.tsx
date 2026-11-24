import Link from "next/link";
import type { Project } from "@/resources/content";

const statusColor: Record<Project["status"], string> = {
  production: "text-cyan",
  "in progress": "text-mute",
  local: "text-mute",
  archived: "text-mute",
};

export function ProjectRow({ project }: { project: Project }) {
  const year = project.publishedAt.slice(0, 4);
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-8 gap-y-1 border-b border-line py-5 transition-colors hover:bg-panel/60"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-display text-lg font-medium tracking-tight transition-colors group-hover:text-cyan">
            {project.title}
          </span>
          <span className={`mono-label ${statusColor[project.status]}`}>{project.status}</span>
        </div>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-mute">{project.summary}</p>
      </div>
      <div className="font-mono text-[0.8125rem] tabular-nums text-mute">{year}</div>
    </Link>
  );
}

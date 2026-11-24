import type { Metadata } from "next";
import { friends, site } from "@/resources/content";

export const metadata: Metadata = {
  title: "friends",
  description:
    "links i hand to people i trust — the apps on this domain that friends get access to.",
  alternates: { canonical: `${site.baseURL}/friends` },
};

export default function Friends() {
  return (
    <>
      <header className="pt-14 md:pt-24">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          friends
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-mute">{friends.intro}</p>
      </header>
      <div className="mt-12 border-t border-line">
        {friends.apps.map((app) => (
          <a
            key={app.name}
            href={app.href}
            target="_blank"
            rel="noopener"
            className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-8 gap-y-1 border-b border-line py-5 transition-colors hover:bg-panel/60"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-lg font-medium tracking-tight transition-colors group-hover:text-cyan">
                  {app.name}
                </span>
                <span className="mono-label text-cyan">{app.status}</span>
              </div>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-mute">
                {app.description}
              </p>
            </div>
            <div className="font-mono text-[0.8125rem] tabular-nums text-mute">
              {app.host}
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { site, uses } from "@/resources/content";

export const metadata: Metadata = {
  title: "uses",
  description:
    "the stack Awale Hassan actually runs: hardware, services, software. reported by the machines themselves.",
  alternates: { canonical: `${site.baseURL}/uses` },
};

export default function Uses() {
  return (
    <>
      <header className="pt-14 md:pt-24">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">uses</h1>
        <p className="mt-4 max-w-xl leading-relaxed text-mute">{uses.intro}</p>
      </header>
      {uses.sections.map((section) => (
        <section key={section.title} className="mt-14">
          <h2 className="font-display text-xl font-semibold tracking-tight">{section.title}</h2>
          <div className="mt-4 border-t border-line">
            {section.items.map((item) => (
              <div
                key={item.name}
                className="grid gap-1 border-b border-line py-4 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8"
              >
                <div className="font-display text-base font-medium tracking-tight">{item.name}</div>
                <div className="text-sm leading-relaxed text-mute">{item.detail}</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

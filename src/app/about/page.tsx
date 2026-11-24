import Link from "next/link";
import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { about, person, site } from "@/resources/content";

export const metadata: Metadata = {
  title: "about",
  description: `${person.name}, software engineer in Toronto — seven years of banking and fintech software, and the self-hosted stack that runs from the apartment.`,
  alternates: { canonical: `${site.baseURL}/about` },
};

export default function About() {
  return (
    <>
      <header className="pt-14 md:pt-24">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">about</h1>
      </header>

      <div className="mt-12 grid gap-10 md:grid-cols-[12rem_minmax(0,1fr)]">
        <figure>
          <img
            src="/images/avatar.jpg"
            alt={`Portrait of ${person.name}`}
            width={192}
            height={192}
            className="w-48 rounded-[3px] border border-line"
          />
          <figcaption className="mono-label mt-2.5">{person.location}</figcaption>
        </figure>
        <div className="max-w-[40rem] space-y-5 text-lg leading-relaxed">
          {about.intro.map((paragraph, i) => (
            <p key={i} className={i > 0 ? "text-mute" : ""}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <Section title="technical skills">
        {about.skills.map((skill) => (
          <div
            key={skill.name}
            className="grid gap-1 border-b border-line py-5 md:grid-cols-[14rem_minmax(0,1fr)_auto] md:gap-8"
          >
            <h3 className="font-display text-base font-medium tracking-tight">{skill.name}</h3>
            <p className="text-sm leading-relaxed text-mute">{skill.detail}</p>
            <div className="text-sm">
              {skill.evidence && (
                <Link href={skill.evidence.href} className="link-quiet">
                  {skill.evidence.label}
                </Link>
              )}
            </div>
          </div>
        ))}
      </Section>
    </>
  );
}

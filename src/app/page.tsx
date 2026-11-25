import Link from "next/link";
import { Section } from "@/components/Section";
import { ProjectRow } from "@/components/ProjectRow";
import { StatusStrip } from "@/components/status";
import { about, gallery, home, person, projects } from "@/resources/content";

export default function Home() {
  const featured = projects.slice(0, 3);
  return (
    <>
      <section className="pt-14 md:pt-24">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_26rem]">
          <div className="rise">
            <h1 className="whitespace-pre-line font-display text-[2.75rem] font-semibold leading-[1.04] tracking-tight md:text-[3.9rem]">
              {home.headline}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">{home.subline}</p>
            <div className="mt-8 flex gap-6 text-[0.9375rem]">
              <Link href="/work" className="link-quiet">
                the work
              </Link>
              <Link href="/about" className="link-quiet">
                about me
              </Link>
            </div>
          </div>
          <figure className="rise-2">
            <img
              src={home.tower.src}
              alt={home.tower.alt}
              width={1500}
              height={749}
              className="w-full rounded-[3px] border border-line"
            />
            <figcaption className="mono-label mt-2.5 text-right">{home.tower.caption}</figcaption>
          </figure>
        </div>
      </section>

      <div className="mt-12 md:mt-16">
        <StatusStrip />
      </div>

      <Section title="selected work" href="/work" linkLabel="all work">
        {featured.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </Section>

      <Section title="about" href="/about" linkLabel="more">
        <div className="grid gap-10 pt-6 md:grid-cols-[10rem_minmax(0,1fr)]">
          <img
            src="/images/avatar.jpg"
            alt={`Portrait of ${person.name}`}
            width={160}
            height={160}
            className="size-40 rounded-[3px] border border-line object-cover"
          />
          <div className="max-w-[40rem]">
            <p className="leading-relaxed text-mute">{about.intro[0]}</p>
            <p className="mt-4 text-sm text-mute">
              <span className="text-text">{person.role}</span> · {person.location}
            </p>
          </div>
        </div>
      </Section>

      <Section title="gallery" href="/gallery" linkLabel="all photos">
        <div className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-3">
          {gallery.images.slice(0, 3).map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="aspect-square w-full rounded-[3px] border border-line object-cover"
            />
          ))}
        </div>
      </Section>
    </>
  );
}

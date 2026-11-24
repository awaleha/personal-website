import type { Metadata } from "next";
import { gallery, site } from "@/resources/content";

export const metadata: Metadata = {
  title: "gallery",
  description: "pictures from the desk and the apartment.",
  alternates: { canonical: `${site.baseURL}/gallery` },
};

export default function Gallery() {
  return (
    <>
      <header className="pt-14 md:pt-24">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">gallery</h1>
        <p className="mt-4 max-w-xl leading-relaxed text-mute">
          pictures from the desk and the apartment — {gallery.images.length} so far, more as the
          phone fills up.
        </p>
      </header>
      <div className="mt-12 columns-2 gap-4 md:columns-3">
        {gallery.images.map((image) => (
          <figure key={image.src} className="mb-4 break-inside-avoid">
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="w-full rounded-[3px] border border-line"
            />
            <figcaption className="mono-label mt-2">{image.caption}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}

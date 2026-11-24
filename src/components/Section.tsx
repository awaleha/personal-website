import Link from "next/link";
import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  href?: string;
  linkLabel?: string;
  children: ReactNode;
};

export function Section({ title, href, linkLabel, children }: SectionProps) {
  return (
    <section className="mt-20 md:mt-28">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
        {href && (
          <Link href={href} className="link-quiet text-sm">
            {linkLabel ?? "see all"}
          </Link>
        )}
      </div>
      <div className="mt-5 border-t border-line">{children}</div>
    </section>
  );
}

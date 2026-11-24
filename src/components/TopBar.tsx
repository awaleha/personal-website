"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock } from "./Clock";
import { nav, person } from "@/resources/content";

export function TopBar() {
  const pathname = usePathname() ?? "";
  const active = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="sticky top-3 z-20">
      <div className="flex h-14 items-center justify-between gap-5 rounded-lg border border-line bg-panel/75 px-4 backdrop-blur-md sm:px-5 md:gap-6">
        <Link
          href="/"
          className="font-display text-[1.0625rem] font-semibold tracking-tight lowercase transition-colors hover:text-cyan"
        >
          awale hassan
        </Link>
        <nav className="flex items-center gap-4 text-[0.9375rem] sm:gap-5">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                active(item.href) ? "text-cyan" : "text-mute hover:text-text"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2.5 md:inline-flex">
            <Clock timeZone={person.timeZone} />
            <span className="mono-label hidden lg:inline">{person.location}</span>
          </span>
          <Link
            href="/uses"
            title="system status: stygai"
            aria-label="system status: stygai"
            className="size-2 rounded-full bg-cyan"
          />
        </div>
      </div>
    </header>
  );
}

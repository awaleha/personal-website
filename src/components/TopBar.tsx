"use client";

import { nav, person } from "@/resources/content";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Clock } from "./Clock";

export function TopBar() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastPath = useRef(pathname);
  const active = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      setOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header className="sticky top-3 z-20">
      <div ref={menuRef} className="relative">
        <div className="flex h-14 items-center justify-between gap-5 rounded-lg border border-line bg-panel/75 px-4 backdrop-blur-md sm:px-5 md:gap-6">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="whitespace-nowrap font-display text-[1.0625rem] font-semibold tracking-tight lowercase transition-colors hover:text-cyan"
          >
            awale hassan
          </Link>
          <nav
            aria-label="primary"
            className="hidden items-center gap-4 text-[0.9375rem] sm:flex sm:gap-5"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active(item.href) ? "page" : undefined}
                className={`py-2 transition-colors ${
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
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="mono-label -mx-2 px-2 py-4 sm:hidden"
            >
              {open ? "close" : "menu"}
            </button>
            <Link
              href="/uses"
              onClick={() => setOpen(false)}
              title="system status: stygai"
              aria-label="system status: stygai"
              className="flex size-8 shrink-0 items-center justify-center"
            >
              <span className="size-2 rounded-full bg-cyan" />
            </Link>
          </div>
        </div>
        {open && (
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full mt-2 rounded-lg border border-line bg-panel p-1.5 sm:hidden"
          >
            <nav aria-label="mobile" className="flex flex-col divide-y divide-line">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active(item.href) ? "page" : undefined}
                  className={`px-3 py-3 text-[0.9375rem] transition-colors ${
                    active(item.href) ? "text-cyan" : "text-mute hover:text-text"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

"use client";

import { useEffect } from "react";

// Two frames of favgif.gif, exported as 16x16 PNGs. Chrome, Edge and Safari
// only paint the first frame of an animated GIF favicon, and Firefox 147+
// rasterizes favicons to a static image before displaying them. Swapping the
// icon is the only way left to animate it. Holds match the gif delays
// (700ms, then 500ms).
//
// Each frame gets a brand-new <link> node with a cache-busted url. Replacing
// the node instead of just changing the existing link's href is the reliable
// way to get Firefox to reload the tab icon for each frame. Other icon links
// are swept every tick so the browser always has exactly one candidate; a
// competing static link kept the tab pinned to the first frame.
//
// public/favicon.ico is the no-JS fallback; without any link, browsers fall
// back to /favicon.ico themselves.
const frames = [
  { src: "/favicon-0.png", hold: 700 },
  { src: "/favicon-1.png", hold: 500 },
];

function firstFaviconLink(): HTMLLinkElement {
  const existing = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (existing) return existing;

  const link = document.createElement("link");
  link.rel = "icon";
  link.setAttribute("sizes", "16x16");
  document.head.append(link);
  return link;
}

export function AnimatedFavicon() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let link = firstFaviconLink();
    let index = 0;
    let version = 0;
    let timer = 0;

    const step = () => {
      const frame = frames[index];
      const next = document.createElement("link");
      next.rel = "icon";
      next.type = "image/png";
      next.setAttribute("sizes", "16x16");
      next.href = `${frame.src}?v=${version}`;
      version += 1;
      document.head.append(next);
      link.remove();
      link = next;
      for (const other of document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]')) {
        if (other !== next) other.remove();
      }
      index = (index + 1) % frames.length;
      timer = window.setTimeout(step, frame.hold);
    };

    const start = () => {
      if (timer) return;
      step();
    };
    const stop = () => {
      window.clearTimeout(timer);
      timer = 0;
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    if (document.visibilityState === "visible") start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return null;
}

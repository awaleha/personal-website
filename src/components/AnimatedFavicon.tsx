"use client";

import { useEffect } from "react";

// Two frames of favgif.gif, exported as 16x16 PNGs. Chrome, Edge and Safari
// only paint the first frame of an animated GIF favicon, and Firefox 147+
// rasterizes favicons to a static image before displaying them. Swapping the
// icon link is the only way left to animate it. Holds match the gif delays
// (700ms, then 500ms).
const frames = [
  { src: "/favicon-0.png", hold: 700 },
  { src: "/favicon-1.png", hold: 500 },
];

function faviconLink(): HTMLLinkElement {
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

    const link = faviconLink();
    let index = 0;
    let timer = 0;

    const step = () => {
      const frame = frames[index];
      link.href = frame.src;
      link.type = "image/png";
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

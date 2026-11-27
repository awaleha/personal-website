"use client";

import { useEffect } from "react";

// The two frames of favgif.gif, exported as 16x16 PNG data URLs. Chrome, Edge
// and Safari only paint the first frame of an animated GIF favicon, so the
// animation has to be driven by swapping the icon link. Firefox animates the
// GIF itself; the swap gives every other browser the same result.
const frames = [
  {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAADFBMVEUAAAAAfPAAAAD///+q1q+CAAAAAXRSTlMAQObYZgAAADVJREFUGNNjYEAHjGgAU4AJDTAwMaMLoImAtDCjC6CIQAxlJqAC3Qx0WyB8ZhBAGIqsgiAAANPoAY+WQaPBAAAAAElFTkSuQmCC",
    hold: 70,
  },
  {
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAADFBMVEUAAAAAfPAAAAD///+q1q+CAAAAAXRSTlMAQObYZgAAADBJREFUGNOFjrENAAAIwlD+/9kYJ+tgx0ZAiQS4IoHSFDAdMcUyU+rngh1cuX9AvBTSxgGKE0vI5AAAAABJRU5ErkJggg==",
    hold: 50,
  },
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

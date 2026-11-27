// Boots the favicon animation during html parsing, before react hydrates.
// the static test pages (public/favicon-subtle.html, favicon-blink.html) use
// this exact technique and animate in firefox, while the same loop run from a
// react effect does not.
export const faviconScript = String.raw`(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var frames = [
    { src: "/favicon-0.png", hold: 700 },
    { src: "/favicon-1.png", hold: 500 }
  ];
  var link = document.querySelector('link[rel~="icon"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  var index = 0;
  var version = 0;
  var timer = 0;

  function step() {
    var frame = frames[index];
    var next = document.createElement("link");
    next.rel = "icon";
    next.type = "image/png";
    next.setAttribute("sizes", "16x16");
    next.href = frame.src + "?v=" + version++;
    document.head.appendChild(next);
    link.remove();
    link = next;

    var others = document.querySelectorAll('link[rel~="icon"]');
    for (var i = 0; i < others.length; i++) {
      if (others[i] !== next) others[i].remove();
    }

    index = (index + 1) % frames.length;
    timer = window.setTimeout(step, frame.hold);
  }

  function start() {
    if (!timer) step();
  }

  function stop() {
    window.clearTimeout(timer);
    timer = 0;
  }

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") start();
    else stop();
  });

  if (document.visibilityState === "visible") start();
})();`;

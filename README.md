# awalehassan.com

Personal site, v3 — "Machine Room". Next.js 16, static export, deployed to Cloudflare Pages.

## Stack

- **Next.js 16** (app router, `output: "export"`) + **Tailwind CSS v4** + **Motion**
- Type: Space Grotesk (display) / Geist (body) / JetBrains Mono (machine data only)
- Case studies: MDX via `next-mdx-remote`, with inline SVG diagrams
- No component library — the design system is ~200 lines of tokens in `src/app/globals.css`

## The status strip

The hero strip reports real system facts from
[stygai-status](https://github.com/awaleha/stygai-status):

- **in dev** — `/api/status` proxies live to the API on the docker network, so the
  preview shows live data (`source: "live"`)
- **in the static export** — `/api/status` is force-static: it bakes a fresh snapshot
  at build time, falling back to the committed `public/status.json`

`public/status.json` is refreshed by hand:

```sh
docker exec site-dev node scripts/fetch-status.mjs
```

## Development

No node on the host — everything runs in the dev container (also gives it the
docker network for the live status proxy):

```sh
docker run -d --name site-dev --network traefik_proxy \
  -p 127.0.0.1:3050:3000 \
  -v "$(pwd)":/app -w /app node:22 sleep infinity
docker exec site-dev npm install
docker exec site-dev npm run dev   # http://127.0.0.1:3050
```

Tailnet preview: `tailscale serve --bg --https=8443 http://127.0.0.1:3050`
→ `https://stygai.taild24ec5.ts.net:8443`

## Build

```sh
docker exec site-dev sh -c "npm run build && rm -rf /app/.next /app/out"
```

Content lives in `src/resources/content.ts` (copy, nav, projects, gallery, /uses)
and `src/app/work/projects/*.mdx` (case studies).

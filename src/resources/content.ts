/**
 * Site content — plain data, no JSX.
 * The single place to edit copy, nav, projects, gallery and /uses.
 * Style: lowercase everywhere except proper nouns.
 */

export const site = {
  baseURL: "https://awalehassan.com",
  title: "Awale Hassan — software engineer",
  description:
    "software engineer in Toronto. seven years of banking software by day; a self-hosted stack, reported live from the server in my apartment, by night.",
};

export const person = {
  name: "Awale Hassan",
  firstName: "Awale",
  role: "software engineer",
  email: "awalehassan@gmail.com",
  location: "Toronto, Canada",
  timeZone: "America/Toronto",
};

export const social = [
  { name: "github", href: "https://github.com/awaleha" },
  { name: "email", href: `mailto:${person.email}` },
];

export const nav = [
  { label: "work", href: "/work" },
  { label: "about", href: "/about" },
  { label: "gallery", href: "/gallery" },
  { label: "uses", href: "/uses" },
];

export const home = {
  headline: "the internet,\nwrit small.",
  subline:
    "full-stack engineer in Toronto — seven years of banking software by day, a self-hosted stack by night. this page ships from Cloudflare's edge; the instruments below report from the server in my apartment.",
  tower: {
    src: "/images/stygai-tower.jpg",
    alt: "stygai — the homelab server, a compact tower",
    caption: "stygai · Intel N100 · 16 gb · zfs stag 10.9 tb",
  },
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  status: "production" | "in progress" | "local" | "archived";
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "stygai-status-a-homelab-status-service",
    title: "stygai-status",
    summary:
      "one Go service that turns the homelab's internals into a JSON API — containers, ZFS, hardware, backups — and pages my phone when something breaks.",
    publishedAt: "2026-11-18",
    status: "production",
    stack: ["go", "docker", "zfs", "tailscale"],
  },
  {
    slug: "wg-messenger",
    title: "wg-messenger",
    summary:
      "a private messenger that rides my WireGuard network — no public listener, messages only ever travel inside the tunnel.",
    publishedAt: "2026-05-05",
    status: "in progress",
    stack: ["go", "wireguard"],
  },
  {
    slug: "finance-dashboard",
    title: "finance-dashboard",
    summary:
      "a privacy-first spending dashboard: credit card statements in, categorized transactions out, all data staying local in PostgreSQL.",
    publishedAt: "2026-03-13",
    status: "local",
    stack: ["next.js", "typescript", "prisma", "postgresql"],
  },
  {
    slug: "lol-match-data-app",
    title: "lol-match-data-app",
    summary:
      "a Next.js explorer for League of Legends match data on Riot's developer API, with a Python companion for the data plumbing.",
    publishedAt: "2025-12-09",
    status: "archived",
    stack: ["next.js", "riot api", "python"],
  },
];

export const gallery = {
  title: "gallery",
  images: [
    {
      src: "/images/gallery/stygai-tower.jpg",
      alt: "the homelab tower",
      caption: "stygai, the tower",
      width: 1500,
      height: 749,
    },
    {
      src: "/images/gallery/slash.jpg",
      alt: "a cat",
      caption: "slash",
      width: 379,
      height: 376,
    },
    {
      src: "/images/gallery/oldtown.jpg",
      alt: "the workstation",
      caption: "oldtown, the workstation",
      width: 387,
      height: 516,
    },
    {
      src: "/images/gallery/tower-vertical.jpg",
      alt: "the homelab tower, upright",
      caption: "stygai, upright",
      width: 427,
      height: 640,
    },
    {
      src: "/images/gallery/awale.jpg",
      alt: "portrait of Awale",
      caption: "awale, 2021",
      width: 818,
      height: 613,
    },
  ],
};

export const uses = {
  title: "uses",
  intro:
    "the stack i actually run — hardware, services, and software — as of november 2026. the hardware numbers are reported by the machines themselves.",
  sections: [
    {
      title: "hardware",
      items: [
        {
          name: "stygai",
          detail:
            "Intel N100 · 16 gb · 500 gb system disk · 10.9 tb zfs pool (stag) · Debian 12 · Docker Compose",
        },
        {
          name: "oldtown",
          detail:
            "the daily-driver workstation — backups land on stygai via restic every night",
        },
        { name: "phone", detail: "iPhone, Tailscale on always" },
      ],
    },
    {
      title: "services i run",
      items: [
        {
          name: "Traefik + Cloudflare",
          detail: "every *.awalehassan.com host; tailnet-only where it matters",
        },
        {
          name: "media",
          detail: "Jellyfin, Plex, the *arr suite, qBittorrent behind Tailscale",
        },
        { name: "immich", detail: "self-hosted photos, synced from the phone" },
        { name: "vaultwarden", detail: "passwords, on the tailnet" },
        {
          name: "ntfy + healthchecks",
          detail: "the failure path: services ping healthchecks, failures push to my phone",
        },
        {
          name: "stygai-status",
          detail: "the status API this site reads — wrote it myself, in Go",
        },
        {
          name: "homepage, diun, Home Assistant",
          detail: "the dashboard, update notices, and the apartment",
        },
      ],
    },
    {
      title: "software i reach for",
      items: [
        { name: "VS Code", detail: "where the code happens" },
        { name: "Tailscale", detail: "the network is the computer" },
        { name: "Bitwarden", detail: "with the vault self-hosted" },
      ],
    },
  ],
};

export const about = {
  intro: [
    "i am a full-stack software developer with seven years of experience building and deploying web applications in banking and fintech. i currently work at Propel Holdings, where i led front-end development for the FreshLine credit brand launch — React and TypeScript dashboards backed by Spring Boot — and refactored a compliance-critical email batching pipeline. before Propel, i spent six years at Home Trust Financial building enterprise content management applications with Next.js, Java Spring, and MySQL, and automating AWS deployments.",
    "when not writing code, i run a small home lab: a Tailscale-only network serving media, monitoring, photos, and a handful of self-written services under a single Cloudflare-fronted domain — built with Docker Compose, Traefik, and a healthy respect for keeping things boring.",
  ],
  skills: [
    {
      name: "Go",
      detail:
        "small, stdlib-first services. stygai-status runs in production on the homelab and pages the phone when something breaks.",
      evidence: {
        href: "/work/stygai-status-a-homelab-status-service",
        label: "case study",
      },
    },
    {
      name: "TypeScript & Next.js",
      detail:
        "React and Redux frontends at Propel; Next.js applications at Home Trust — and this site.",
      evidence: null,
    },
    {
      name: "Java & Spring Boot",
      detail:
        "six years of enterprise Java at Home Trust — Spring, Hibernate, JPA — plus Spring Boot integrations at Propel.",
      evidence: null,
    },
    {
      name: "Node.js & AWS",
      detail:
        "typed REST APIs, SQS/SNS event-driven workers, S3 deployments, CloudWatch monitoring behind least-privilege IAM.",
      evidence: null,
    },
    {
      name: "Python",
      detail:
        "automation and data plumbing on the server: backups, health checks, an iCloud-to-Immich sync bridge.",
      evidence: null,
    },
    {
      name: "databases",
      detail: "MySQL system reporting and migrations in production; PostgreSQL on the homelab.",
      evidence: null,
    },
    {
      name: "self-hosted infrastructure",
      detail:
        "Docker Compose, Traefik, Cloudflare, Tailscale — every service on this domain rides that stack.",
      evidence: { href: "/uses", label: "the stack" },
    },
  ],
};

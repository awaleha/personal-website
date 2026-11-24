/**
 * Site content — plain data, no JSX.
 * The single place to edit copy, nav, projects, gallery and /uses.
 */

export const site = {
  baseURL: "https://awalehassan.com",
  title: "Awale Hassan — software engineer",
  description:
    "Software engineer in Toronto. Seven years of banking software by day; a self-hosted stack, reported live from the server in my apartment, by night.",
};

export const person = {
  name: "Awale Hassan",
  firstName: "Awale",
  role: "Software Engineer",
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
  headline: "I run a small internet.",
  subline:
    "Full-stack engineer in Toronto — seven years of banking software by day, a self-hosted stack by night. This page ships from Cloudflare's edge; the instruments below report from the server in my apartment.",
  tower: {
    src: "/images/stygai-tower.jpg",
    alt: "stygai — the homelab server, a compact tower",
    caption: "stygai · intel n100 · 16 gb · zfs stag 10.9 tb",
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
      "One Go service that turns the homelab's internals into a JSON API — containers, ZFS, hardware, backups — and pages my phone when something breaks.",
    publishedAt: "2026-11-18",
    status: "production",
    stack: ["go", "docker", "zfs", "tailscale"],
  },
  {
    slug: "wg-messenger",
    title: "wg-messenger",
    summary:
      "A private messenger that rides my WireGuard network — no public listener, messages only ever travel inside the tunnel.",
    publishedAt: "2026-05-05",
    status: "in progress",
    stack: ["go", "wireguard"],
  },
  {
    slug: "finance-dashboard",
    title: "finance-dashboard",
    summary:
      "A privacy-first spending dashboard: credit card statements in, categorized transactions out, all data staying local in PostgreSQL.",
    publishedAt: "2026-03-13",
    status: "local",
    stack: ["next.js", "typescript", "prisma", "postgresql"],
  },
  {
    slug: "lol-match-data-app",
    title: "lol-match-data-app",
    summary:
      "A Next.js explorer for League of Legends match data on Riot's developer API, with a Python companion for the data plumbing.",
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
      alt: "The homelab tower",
      caption: "stygai, the tower",
      width: 1500,
      height: 749,
    },
    {
      src: "/images/gallery/slash.jpg",
      alt: "A cat",
      caption: "slash",
      width: 379,
      height: 376,
    },
    {
      src: "/images/gallery/oldtown.jpg",
      alt: "The workstation",
      caption: "oldtown, the workstation",
      width: 387,
      height: 516,
    },
    {
      src: "/images/gallery/tower-vertical.jpg",
      alt: "The homelab tower, upright",
      caption: "stygai, upright",
      width: 427,
      height: 640,
    },
    {
      src: "/images/gallery/awale.jpg",
      alt: "Portrait of Awale",
      caption: "awale, 2021",
      width: 818,
      height: 613,
    },
  ],
};

export const uses = {
  title: "uses",
  intro:
    "The stack I actually run — hardware, services, and software — as of November 2026. The hardware numbers are reported by the machines themselves.",
  sections: [
    {
      title: "hardware",
      items: [
        {
          name: "stygai",
          detail:
            "intel n100 · 16 gb · 500 gb system disk · 10.9 tb zfs pool (stag) · debian 12 · docker compose",
        },
        {
          name: "oldtown",
          detail: "the daily-driver workstation — backups land on stygai via restic every night",
        },
        { name: "phone", detail: "iphone, tailscale on always" },
      ],
    },
    {
      title: "services I run",
      items: [
        {
          name: "traefik + cloudflare",
          detail: "every *.awalehassan.com host; tailnet-only where it matters",
        },
        { name: "media", detail: "jellyfin, plex, the *arr suite, qbittorrent behind tailscale" },
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
          name: "homepage, diun, home assistant",
          detail: "the dashboard, update notices, and the apartment",
        },
      ],
    },
    {
      title: "software I reach for",
      items: [
        { name: "vs code", detail: "where the code happens" },
        { name: "tailscale", detail: "the network is the computer" },
        { name: "bitwarden", detail: "with the vault self-hosted" },
        { name: "feeeed", detail: "rss, for reading offline on the commute" },
      ],
    },
  ],
};

export const about = {
  intro: [
    "Awale is a full-stack software developer with seven years of experience building and deploying web applications in banking and fintech. He currently works at Propel Holdings, where he led front-end development for the FreshLine credit brand launch — React and TypeScript dashboards backed by Spring Boot webhooks — and refactored a compliance-critical email batching pipeline with structured SLF4J/Log4j2 logging. Before Propel, he spent six years at Home Trust Financial building enterprise content management applications with Next.js, Java Spring, and MySQL, and automating AWS deployments.",
    "When not writing code, Awale runs a small home lab: a Tailscale-only network serving media, monitoring, photos, and a handful of self-written services under a single Cloudflare-fronted domain — built with Docker Compose, Traefik, and a healthy respect for keeping things boring.",
  ],
  skills: [
    {
      name: "Go",
      detail:
        "Small, stdlib-first services. stygai-status runs in production on the homelab and pages the phone when something breaks.",
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
        "Six years of enterprise Java at Home Trust — Spring, Hibernate, JPA — plus Spring Boot webhook integrations at Propel.",
      evidence: null,
    },
    {
      name: "Node.js & AWS",
      detail:
        "Typed REST APIs, webhook handlers, SQS/SNS workers, S3 deployments, CloudWatch monitoring behind least-privilege IAM.",
      evidence: null,
    },
    {
      name: "Python",
      detail:
        "Automation and data plumbing on the server: backups, health checks, an iCloud-to-Immich sync bridge.",
      evidence: null,
    },
    {
      name: "Databases",
      detail: "MySQL system reporting and migrations in production; PostgreSQL on the homelab.",
      evidence: null,
    },
    {
      name: "Self-hosted infrastructure",
      detail:
        "Docker Compose, Traefik, Cloudflare, Tailscale — every service on this domain rides that stack.",
      evidence: { href: "/uses", label: "the stack" },
    },
  ],
};

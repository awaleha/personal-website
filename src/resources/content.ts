/**
 * Site content — plain data, no JSX.
 * The single place to edit copy, nav, projects, gallery and /uses.
 * Style: lowercase everywhere except proper nouns, no em dashes.
 */

export const site = {
  baseURL: "https://awalehassan.com",
  title: "Awale Hassan · software engineer",
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
  { label: "uses", href: "/uses" },
  { label: "friends", href: "/friends" },
  { label: "gallery", href: "/gallery" },
];

export const home = {
  headline: "internet,\nwrit small.",
  subline:
    "software engineer in the greatest city north of the 43rd parallel. banking and fintech software savant by day, exhausted self-hosted sysadmin by night. this page ships from Cloudflare's edge; the stats below report live the server on my desk.",
  tower: {
    src: "/images/stygai-tower.jpg",
    alt: "stygai, the homelab server, a compact tower",
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
      "one Go service that turns the homelab's internals into a JSON API: containers, ZFS, hardware, backups. it pages my phone when something breaks.",
    publishedAt: "2026-11-18",
    status: "production",
    stack: ["go", "docker", "zfs", "tailscale"],
  },
  {
    slug: "personal-website",
    title: "personal-website",
    summary:
      "the site you're reading: a hand-built Next.js static export, with a status strip that reports the homelab from the hero. no template, no component library.",
    publishedAt: "2026-11-24",
    status: "production",
    stack: ["next.js", "typescript", "tailwind css", "mdx", "cloudflare pages"],
  },
  {
    slug: "wg-messenger",
    title: "wg-messenger",
    summary:
      "a private messenger that rides my WireGuard network. no public listener, messages only ever travel inside the tunnel.",
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

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

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
      src: "/images/gallery/oldtown.jpg",
      alt: "the workstation",
      caption: "oldtown, the workstation",
      width: 387,
      height: 516,
    },
    {
      src: "/images/gallery/awale.jpg",
      alt: "portrait of Awale",
      caption: "awale, 2021",
      width: 818,
      height: 613,
    },
    {
      src: "/images/gallery/img_4056.jpg",
      alt: "photo",
      caption: "2026",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/gallery/img_6226.jpg",
      alt: "photo",
      caption: "2025",
      width: 1600,
      height: 1067,
    },
    {
      src: "/images/gallery/img_1678.jpg",
      alt: "photo",
      caption: "2025",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/gallery/img_1983.jpg",
      alt: "photo",
      caption: "2025",
      width: 1600,
      height: 1200,
    },
    {
      src: "/images/gallery/img_1578.jpg",
      alt: "photo",
      caption: "2025",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/gallery/img_0610.jpg",
      alt: "photo",
      caption: "2024",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/gallery/img_5413.jpg",
      alt: "photo",
      caption: "2021",
      width: 1067,
      height: 1600,
    },
    {
      src: "/images/gallery/img_5412.jpg",
      alt: "photo",
      caption: "2021",
      width: 1067,
      height: 1600,
    },
    {
      src: "/images/gallery/img_4153.jpg",
      alt: "photo",
      caption: "2021",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/gallery/005007240017.jpg",
      alt: "photo",
      caption: "2025",
      width: 1600,
      height: 1061,
    },
    {
      src: "/images/gallery/16107599_1488872577820359_322571038_o.jpg",
      alt: "photo",
      caption: "2025",
      width: 1600,
      height: 1069,
    },
    {
      src: "/images/gallery/5bdd6df2-1aac-42a0-83a3-1738904269de.jpg",
      alt: "photo",
      caption: "2025",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/gallery/7f74227f-e564-40f2-a1bf-8e1a944240d9.jpg",
      alt: "photo",
      caption: "2025",
      width: 1200,
      height: 1600,
    },
    {
      src: "/images/gallery/img_2464.jpg",
      alt: "photo",
      caption: "2025",
      width: 720,
      height: 1280,
    },
  ],
};

export const friends = {
  title: "friends",
  intro:
    "this page is public. the links are not: each app has its own login, and i'm the one who hands them out.",
  apps: [
    {
      name: "seerr",
      href: "https://seerr.awalehassan.com",
      host: "seerr.awalehassan.com",
      description: "request movies and shows. i approve them, the stack fetches them.",
      status: "open",
    },
  ],
};

export const uses = {
  title: "uses",
  intro:
    "the stack i actually run: hardware, services, and software, as of november 2026. the hardware numbers are reported by the machines themselves.",
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
          detail: "the daily-driver workstation. backups land on stygai via restic every night",
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
          detail: "the status API this site reads. wrote it myself, in Go",
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
    "i'm a full-stack software engineer with seven years under my belt. the bulk of my experience is building software specialized for banking and fintech. currently working at Propel Holdings Inc., where i translate business ideas into real software for brand launches: React and TypeScript dashboards backed by Spring Boot, while refactoring compliance-critical customer communication pipelines. before Propel, i cut my teeth at Home Trust Financial building content management apps with Next.js, Java Spring, and MySQL, plus automating AWS deployments.",
    "when not writing code, me and Claude run a small home lab: a Tailscale-only network serving media, monitoring, photos, and a handful of self-written services under a single Cloudflare-fronted domain. built with Docker Compose, Traefik, and a healthy respect for keeping things boring.",
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
      detail: "React and Redux frontends at Propel, Next.js applications at Home Trust, and this site.",
      evidence: null,
    },
    {
      name: "Java & Spring Boot",
      detail:
        "six years of enterprise Java at Home Trust: Spring, Hibernate, JPA. plus Spring Boot integrations at Propel.",
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
        "Docker Compose, Traefik, Cloudflare, Tailscale. every service on this domain rides that stack.",
      evidence: { href: "/uses", label: "the stack" },
    },
  ],
};

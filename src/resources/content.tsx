import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Awale",
  lastName: "Hassan",
  name: `Awale Hassan`,
  role: "Software Engineer",
  avatar: "/images/avatar.jpg",
  email: "awalehassan@gmail.com",
  location: "America/Toronto", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Occasional notes on software and self-hosting</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/awaleha",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website of ${person.name}, a software engineer based in Toronto`,
  headline: <>Software engineer building self-hosted systems and tools</>,
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">stygai-status</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/stygai-status-a-homelab-status-service",
  },
  subline: (
    <>
      I'm Awale, a software engineer based in Toronto. I build small services, dashboards, and
      the self-hosted stack that runs them — most of it live on a home server as you read this.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from Toronto`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: false,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Awale is a Toronto-based software engineer. When not writing code, he runs a small home
        lab: a Tailscale-only network serving media, monitoring, photos, and a handful of
        self-written services under a single Cloudflare-fronted domain — built with Docker
        Compose, Traefik, and a healthy respect for keeping things boring.
      </>
    ),
  },
  work: {
    display: false, // set to false to hide this section
    title: "Work Experience",
    experiences: [],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Go",
        description: (
          <>Small, stdlib-first services. stygai-status runs in production on the homelab and pages the phone when something breaks.</>
        ),
        tags: [
          {
            name: "Go",
            icon: "go",
          },
        ],
        images: [],
      },
      {
        title: "TypeScript & Next.js",
        description: (
          <>Web apps and dashboards — this portfolio included, built on Next.js.</>
        ),
        tags: [
          {
            name: "Next.js",
            icon: "nextjs",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
        ],
        images: [],
      },
      {
        title: "Python",
        description: (
          <>Automation and data plumbing on the server: backups, health checks, and an iCloud-to-Immich sync bridge.</>
        ),
        tags: [
          {
            name: "Python",
            icon: "python",
          },
        ],
        images: [],
      },
      {
        title: "Self-hosted infrastructure",
        description: (
          <>Docker Compose, Traefik, Cloudflare, and Tailscale — every service on *.awalehassan.com rides this stack.</>
        ),
        tags: [
          {
            name: "Docker",
            icon: "docker",
          },
          {
            name: "Traefik",
            icon: "traefik",
          },
          {
            name: "Cloudflare",
            icon: "cloudflare",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Notes on software and self-hosting...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/work/projects
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };

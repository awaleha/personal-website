import type { Metadata } from "next";
import "./globals.css";
import { AnimatedFavicon } from "@/components/AnimatedFavicon";
import { Footer } from "@/components/Footer";
import { TopBar } from "@/components/TopBar";
import { fonts } from "@/lib/fonts";
import { person, site } from "@/resources/content";

export const metadata: Metadata = {
  metadataBase: new URL(site.baseURL),
  title: {
    default: site.title,
    template: `%s · ${person.name}`,
  },
  description: site.description,
  icons: {
    icon: [{ url: "/favicon.gif", type: "image/gif", sizes: "16x16" }],
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: site.baseURL,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/images/og/awale-hassan-2026.jpg",
        width: 1200,
        height: 630,
        alt: person.name,
      },
    ],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: person.name,
  jobTitle: person.role,
  email: person.email,
  url: site.baseURL,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressCountry: "CA",
  },
  sameAs: ["https://github.com/awaleha"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fonts.display.variable} ${fonts.body.variable} ${fonts.mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <AnimatedFavicon />
        <div className="mx-auto flex min-h-screen w-full max-w-[68rem] flex-col px-4 sm:px-6">
          <TopBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

import { person, social } from "@/resources/content";
import { StatusLine } from "./status";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-sm text-mute">
          © 2026 {person.name.toLowerCase()} · {person.location}
        </div>
        <StatusLine />
        <div className="flex gap-5 text-sm">
          {social.map((link) => (
            <a key={link.name} href={link.href} className="link-quiet inline-block py-1">
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

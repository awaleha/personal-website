import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-start justify-center">
      <p className="mono-label text-alarm">404 — no such route</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
        that page is not in the routing table
      </h1>
      <Link href="/" className="link-quiet mt-8">
        home
      </Link>
    </div>
  );
}

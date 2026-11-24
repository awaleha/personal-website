import { readFileSync } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

/**
 * /api/status — the status strip's data source.
 *
 * - dev: proxies live to the stygai-status API inside the docker network
 * - build (force-static): pre-renders once at build time — a fresh snapshot
 *   lands with every deploy; if the API is unreachable (CF Pages build),
 *   the committed public/status.json is used
 *
 * The payload carries its own `source` so the UI labels itself honestly.
 */

export const dynamic = "force-static";

const UPSTREAM = process.env.STATUS_API_URL ?? "http://stygai-status:8082";

async function aggregate() {
  const fetchOne = async (ep: string) => {
    try {
      const res = await fetch(`${UPSTREAM}/api/v1/${ep}`, {
        signal: AbortSignal.timeout(2500),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  };

  const [system, zfs, backups, docker] = await Promise.all([
    fetchOne("system"),
    fetchOne("zfs"),
    fetchOne("backups"),
    fetchOne("docker"),
  ]);

  return {
    generatedAt: new Date().toISOString(),
    system,
    zfs,
    backups,
    docker: {
      total: Array.isArray(docker) ? docker.length : null,
      running: Array.isArray(docker) ? docker.filter((c) => c.state === "running").length : null,
      unhealthy: Array.isArray(docker)
        ? docker.filter((c) => c.state === "running" && c.health === "unhealthy").length
        : null,
    },
  };
}

export async function GET() {
  if (process.env.NODE_ENV === "development") {
    const data = await aggregate();
    return NextResponse.json(
      { ...data, source: "live" },
      { headers: { "cache-control": "no-store" } },
    );
  }

  // Build-time pre-render: try the live API once, then fall back to the
  // committed snapshot so CF Pages builds never fail.
  try {
    const data = await aggregate();
    if (data.system) {
      return NextResponse.json({ ...data, source: "snapshot" });
    }
  } catch {
    // unreachable — use the committed snapshot below
  }

  const snapshot = JSON.parse(
    readFileSync(path.join(process.cwd(), "public", "status.json"), "utf8"),
  );
  return NextResponse.json({ ...snapshot, source: "snapshot" });
}

/**
 * Bakes a snapshot of the stygai-status API into public/status.json.
 *
 * Run from inside the dev container (it needs the docker network to reach
 * stygai-status:8082):
 *
 *   docker exec site-dev node scripts/fetch-status.mjs
 *
 * The committed snapshot is what the public site shows; the dev preview
 * shows live data via the /api/status middleware proxy.
 */

import fs from "node:fs";

const UPSTREAM = process.env.STATUS_API_URL ?? "http://stygai-status:8082";
const OUT = process.argv[2] ?? "public/status.json";

async function fetchOne(ep) {
  try {
    const res = await fetch(`${UPSTREAM}/api/v1/${ep}`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(`  /${ep}: ${err.message}`);
    return null;
  }
}

const [system, zfs, backups, docker] = await Promise.all([
  fetchOne("system"),
  fetchOne("zfs"),
  fetchOne("backups"),
  fetchOne("docker"),
]);

const snapshot = {
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

fs.writeFileSync(OUT, JSON.stringify(snapshot, null, 2));
console.log(`wrote ${OUT}`);
console.log(JSON.stringify(snapshot, null, 2).slice(0, 1200));

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { fmtPct, fmtUntil, fmtUptime } from "@/lib/format";

export type DockerSummary = {
  total: number | null;
  running: number | null;
  unhealthy: number | null;
};

export type StatusData = {
  generatedAt: string;
  source?: "live" | "snapshot";
  system: {
    hostname: string;
    uptime: number;
    cpu_pct: number;
    mem_used: number;
    mem_total: number;
  } | null;
  zfs: { name: string; health: string; next_scrub: string } | null;
  backups: { name: string; status: string; last_success: string } | null;
  docker: DockerSummary | null;
};

export type StatusState =
  | { kind: "loading" }
  | { kind: "live"; data: StatusData }
  | { kind: "snapshot"; data: StatusData }
  | { kind: "offline" };

/**
 * Live first, snapshot second. In the dev preview /api/status is proxied to
 * the real stygai-status API; in the static export it 404s and the strip
 * falls back to the committed snapshot. If both fail, the strip goes red —
 * red is reserved for alarm states.
 */
export function useSystemStatus(): StatusState {
  const [state, setState] = useState<StatusState>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;

    const live = fetch("/api/status", {
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    }).then((r) => {
      if (!r.ok) throw new Error(`status ${r.status}`);
      return r.json();
    });

    const snapshot = fetch("/status.json", { cache: "no-store" }).then((r) => {
      if (!r.ok) throw new Error(`snapshot ${r.status}`);
      return r.json();
    });

    live
      .then((data) => {
        if (cancelled) return;
        if (data?.source === "live") setState({ kind: "live", data });
        else setState({ kind: "snapshot", data });
      })
      .catch(() =>
        snapshot
          .then((data) => {
            if (!cancelled) setState({ kind: "snapshot", data });
          })
          .catch(() => {
            if (!cancelled) setState({ kind: "offline" });
          }),
      );

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

type CellSpec = {
  label: string;
  value: string;
  alarm?: boolean;
  liveDot?: boolean;
};

function cellsFor(data: StatusData | null): CellSpec[] {
  const system = data?.system;
  const zfs = data?.zfs;
  const backups = data?.backups;
  const docker = data?.docker;
  return [
    {
      label: "stygai",
      value: system ? `up ${fmtUptime(system.uptime)}` : "—",
      liveDot: true,
    },
    { label: "cpu", value: system ? fmtPct(system.cpu_pct) : "—" },
    {
      label: zfs?.name ?? "pool",
      value: zfs ? zfs.health.toLowerCase() : "—",
      alarm: !!zfs && zfs.health !== "ONLINE",
    },
    {
      label: "next scrub",
      value: zfs?.next_scrub ? fmtUntil(zfs.next_scrub) : "—",
    },
    {
      label: "backup",
      value: backups ? backups.last_success : "—",
      alarm: !!backups && backups.status !== "up",
    },
    {
      label: "containers",
      value:
        docker && docker.running !== null && docker.total !== null
          ? `${docker.running}/${docker.total} up`
          : "—",
      alarm: !!docker && (docker.unhealthy ?? 0) > 0,
    },
  ];
}

function SourceChip({ state }: { state: StatusState }) {
  if (state.kind === "live") {
    return <span className="mono-label text-cyan">live · tailnet</span>;
  }
  if (state.kind === "snapshot") {
    const day = new Date(state.data.generatedAt).toLocaleDateString("en-CA");
    return <span className="mono-label">snapshot · {day}</span>;
  }
  return <span className="mono-label">reading…</span>;
}

export function StatusStrip() {
  const state = useSystemStatus();
  const reduce = useReducedMotion();

  if (state.kind === "offline") {
    return (
      <div className="border-y border-line py-4">
        <p className="font-mono text-[0.9375rem] text-alarm">
          status unreachable — no live link, no snapshot
        </p>
      </div>
    );
  }

  const data = state.kind === "live" || state.kind === "snapshot" ? state.data : null;
  const cells = cellsFor(data);

  return (
    <div className="border-y border-line py-4">
      {/* key by kind so the power-on sequence replays when data lands */}
      <div key={state.kind} className="flex flex-wrap items-baseline gap-x-12 gap-y-4">
        {cells.map((cell, i) => (
          <motion.div
            key={cell.label}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06 * i, ease: "easeOut" }}
            className="min-w-[7rem]"
          >
            <div className="mono-label">{cell.label}</div>
            <div
              className={`mt-1.5 flex items-center gap-2 font-mono text-[0.9375rem] tabular-nums ${
                cell.alarm ? "text-alarm" : "text-text"
              } ${state.kind === "loading" ? "text-mute" : ""}`}
            >
              {cell.liveDot && state.kind === "live" && (
                <motion.span
                  aria-hidden
                  className="size-1.5 rounded-full bg-cyan"
                  animate={reduce ? undefined : { opacity: [1, 0.45, 1] }}
                  transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                />
              )}
              {cell.value}
            </div>
          </motion.div>
        ))}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
          className="ml-auto"
        >
          <SourceChip state={state} />
        </motion.div>
      </div>
    </div>
  );
}

/** One-line machine register for the footer, on every page but home. */
export function StatusLine() {
  const state = useSystemStatus();
  const pathname = usePathname() ?? "";

  if (pathname === "/") return null;

  if (state.kind === "offline") {
    return <span className="font-mono text-[0.8125rem] text-alarm">status offline</span>;
  }

  if (state.kind === "loading") {
    return <span className="font-mono text-[0.8125rem] text-mute">reading status…</span>;
  }

  const data = state.data;
  const parts: string[] = [];
  const alarm =
    (!!data.zfs && data.zfs.health !== "ONLINE") ||
    (!!data.backups && data.backups.status !== "up");

  if (data.system) parts.push(`stygai up ${fmtUptime(data.system.uptime)}`);
  if (data.zfs) parts.push(`${data.zfs.name} ${data.zfs.health.toLowerCase()}`);
  if (data.backups) parts.push(`backup ${data.backups.last_success}`);

  return (
    <span
      className={`font-mono text-[0.8125rem] tabular-nums ${alarm ? "text-alarm" : "text-mute"}`}
    >
      {parts.join(" · ")}{" "}
      <span className="text-cyan">{state.kind === "live" ? "live" : "snapshot"}</span>
    </span>
  );
}

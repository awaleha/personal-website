/** Formatting for instrument values. Mono-rendered data only. */

export function fmtUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${String(h).padStart(2, "0")}h`;
  if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
  return `${m}m`;
}

export function fmtPct(n: number): string {
  return `${Math.round(n)}%`;
}

export function fmtUntil(iso: string): string {
  const target = new Date(iso).getTime();
  if (Number.isNaN(target)) return "n/a";
  const ms = target - Date.now();
  if (ms <= 0) return "due";
  const days = Math.ceil(ms / 86400000);
  if (days <= 1) return "tomorrow";
  if (days < 30) return `in ${days}d`;
  const months = Math.round(days / 30);
  return `in ${months}mo`;
}

export function fmtBytes(bytes: number): string {
  const gb = bytes / 1024 ** 3;
  if (gb >= 1024) return `${(gb / 1024).toFixed(1)} tb`;
  return `${gb.toFixed(0)} gb`;
}

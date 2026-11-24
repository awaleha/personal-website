"use client";

import { useEffect, useState } from "react";

export function Clock({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState("");

  useEffect(() => {
    const tick = () =>
      setNow(
        new Intl.DateTimeFormat("en-GB", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <span suppressHydrationWarning className="font-mono text-[0.8125rem] tabular-nums text-mute">
      {now}
    </span>
  );
}

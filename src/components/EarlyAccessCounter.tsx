import { useEffect, useRef, useState } from "react";
import { getWaitlistStats } from "@/lib/waitlist.functions";

function useCountUp(target: number | null) {
  const [value, setValue] = useState(0);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (target === null) return;
    const start = performance.now();
    const duration = 1200;

    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target]);

  return value;
}

export function EarlyAccessCounter() {
  const [stats, setStats] = useState<{ signups: number; companies: number } | null>(null);
  const signups = useCountUp(stats ? stats.signups : null);
  const companies = useCountUp(stats ? stats.companies : null);

  useEffect(() => {
    let cancelled = false;
    getWaitlistStats({ data: undefined })
      .then((data: { signups: number; companies: number }) => {
        if (!cancelled) setStats(data);
      })
      .catch(() => {
        if (!cancelled) setStats({ signups: 0, companies: 0 });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mt-20 grid gap-10 border-t border-foreground/15 pt-12 sm:grid-cols-3">
      <div>
        <p className="font-serif text-4xl font-semibold tabular-nums text-foreground lg:text-5xl">
          {signups.toLocaleString()}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          People on the early access list
        </p>
      </div>
      <div>
        <p className="font-serif text-4xl font-semibold tabular-nums text-foreground lg:text-5xl">
          {companies.toLocaleString()}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">Organisations represented</p>
      </div>
      <div>
        <p className="font-serif text-4xl font-semibold text-accent lg:text-5xl">10</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Stages carried, from audience through to revenue
        </p>
      </div>
    </div>
  );
}

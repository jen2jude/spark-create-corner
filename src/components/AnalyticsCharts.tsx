/**
 * Restrained analytics charts.
 *
 * Rules applied throughout: one accent colour carries meaning, everything else
 * is neutral; no gridline clutter, no legends where labels suffice, no
 * gradients or glow. Hierarchy comes from weight and position, not colour.
 */
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const axis = {
  stroke: "var(--border)",
  tick: { fill: "var(--muted-foreground)", fontSize: 10 },
  tickLine: false,
} as const;

function ChartTooltip({
  active,
  payload,
  label,
  suffix,
}: {
  active?: boolean;
  payload?: Array<{ value?: number | string; name?: string }>;
  label?: string | number;
  suffix?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-card px-2.5 py-1.5 shadow-soft">
      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-xs font-medium text-foreground">
        {payload[0]?.value?.toLocaleString?.() ?? payload[0]?.value}
        {suffix ? ` ${suffix}` : ""}
      </p>
    </div>
  );
}

/** Registrations accumulating against the objective, send by send. */
export function ProgressChart() {
  const data = [
    { day: "Day 1", registrations: 96 },
    { day: "Day 3", registrations: 158 },
    { day: "Day 5", registrations: 204 },
    { day: "Day 7", registrations: 268 },
    { day: "Day 9", registrations: 310 },
    { day: "Day 11", registrations: 341 },
  ];

  return (
    <div className="h-[150px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 6, right: 6, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeOpacity={0.5} vertical={false} />
          <XAxis dataKey="day" {...axis} axisLine={false} />
          <YAxis {...axis} axisLine={false} width={30} domain={[0, 500]} ticks={[0, 250, 500]} />
          <Tooltip
            content={<ChartTooltip suffix="registrations" />}
            cursor={{ stroke: "var(--border)" }}
          />
          <Area
            type="monotone"
            dataKey="registrations"
            stroke="var(--accent)"
            strokeWidth={1.75}
            fill="var(--accent)"
            fillOpacity={0.08}
            dot={false}
            activeDot={{ r: 3, fill: "var(--accent)", stroke: "var(--card)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Conversions per segment — one segment emphasised, the rest neutral. */
export function SegmentChart() {
  const data = [
    { segment: "Past attendees", conversions: 164 },
    { segment: "Trial signups", conversions: 91 },
    { segment: "Newsletter", conversions: 71 },
    { segment: "Referrals", conversions: 15 },
  ];

  return (
    <div className="h-[150px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 14, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeOpacity={0.5} horizontal={false} />
          <XAxis type="number" {...axis} axisLine={false} />
          <YAxis
            type="category"
            dataKey="segment"
            {...axis}
            axisLine={false}
            width={104}
            interval={0}
          />
          <Tooltip
            content={<ChartTooltip suffix="conversions" />}
            cursor={{ fill: "var(--muted)", fillOpacity: 0.5 }}
          />
          <Bar dataKey="conversions" radius={[0, 3, 3, 0]} barSize={12}>
            {data.map((d, i) => (
              <Cell
                key={d.segment}
                fill={i === 0 ? "var(--accent)" : "var(--muted-foreground)"}
                fillOpacity={i === 0 ? 0.9 : 0.28}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Delivered → opened → clicked → converted, as a plain readable funnel. */
export function FunnelChart() {
  const steps = [
    { label: "Delivered", value: 7481, pct: 100 },
    { label: "Opened", value: 3214, pct: 43 },
    { label: "Clicked", value: 962, pct: 12.9 },
    { label: "Converted", value: 341, pct: 4.6 },
  ];

  return (
    <div className="space-y-2.5">
      {steps.map((s, i) => (
        <div key={s.label}>
          <div className="flex items-baseline justify-between gap-3 text-xs">
            <span className="text-muted-foreground">{s.label}</span>
            <span className="whitespace-nowrap text-foreground">
              {s.value.toLocaleString()}{" "}
              <span className="text-muted-foreground">({s.pct}%)</span>
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${s.pct}%`, opacity: i === steps.length - 1 ? 0.95 : 0.35 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** What happened / why / what next — the reading order for every chart set. */
export function ReadingPanel() {
  const rows = [
    {
      q: "What happened",
      a: "341 registrations from 7,481 delivered emails. Pace is 68% of the 500 target with two sends left.",
    },
    {
      q: "Why it happened",
      a: "Past attendees converted at 8.5% and carried nearly half the total. Cold imports pulled the open rate down.",
    },
    {
      q: "What to do next",
      a: "Send the reminder to 2,180 openers who did not click, and keep cold imports on the re-permission track.",
    },
  ];

  return (
    <div className="divide-y divide-border/70 rounded-lg border border-border/70 bg-background">
      {rows.map((r, i) => (
        <div key={r.q} className="p-3">
          <p
            className={
              i === 2
                ? "text-[10px] font-medium uppercase tracking-[0.16em] text-accent"
                : "text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground"
            }
          >
            {r.q}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-foreground">{r.a}</p>
        </div>
      ))}
    </div>
  );
}

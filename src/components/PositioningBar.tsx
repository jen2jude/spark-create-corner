import { Sparkles, Users, ShieldCheck, BarChart3, UserCheck, Repeat2 } from "lucide-react";

const capabilities = [
  { icon: Sparkles, label: "AI Campaign Strategy" },
  { icon: Users, label: "Audience Intelligence" },
  { icon: ShieldCheck, label: "Deliverability Optimization" },
  { icon: BarChart3, label: "Real Campaign Analytics" },
  { icon: UserCheck, label: "Lead Tracking" },
  { icon: Repeat2, label: "Automated Follow-up" },
];

export function PositioningBar() {
  return (
    <section
      aria-label="Product capabilities"
      className="border-y border-border bg-muted/30 px-6 py-5 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:justify-between">
          {capabilities.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} aria-hidden />
              <span className="text-[0.8125rem] font-medium leading-none text-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

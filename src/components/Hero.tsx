import { Shield, BarChart3, Users } from "lucide-react";
import { HeroSignup } from "@/components/HeroSignup";

const proofPoints = [
  { icon: Shield, label: "Deliverability-first" },
  { icon: BarChart3, label: "Real analytics" },
  { icon: Users, label: "Lead intelligence" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero px-6 pb-28 pt-20 lg:px-8 lg:pb-36 lg:pt-28">
      <div
        className="pointer-events-none absolute -right-40 top-10 h-[32rem] w-[32rem] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="animate-rise max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-hero-muted">
            Early access
          </p>
          <h1 className="mt-6 font-sans text-5xl font-extrabold leading-[1.03] tracking-[-0.03em] text-hero-foreground sm:text-6xl lg:text-7xl">
            Marketing campaigns,
            <br />
            guided by conversation
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-hero-muted">
            Tell Oventric Mail what you want to achieve. It takes you from strategy and verified
            audience to design, delivery, deliverability, and measurable results — in one calm
            workspace.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-hero-muted">
            {proofPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-accent" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-rise lg:pl-4">
          <HeroSignup />
        </div>
      </div>
    </section>
  );
}

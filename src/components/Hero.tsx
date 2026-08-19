import { Shield, BarChart3, Users } from "lucide-react";
import { HeroSignup } from "@/components/HeroSignup";

const proofPoints = [
  { icon: Shield, label: "Deliverability-first" },
  { icon: BarChart3, label: "Real analytics" },
  { icon: Users, label: "Lead intelligence" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero px-6 pb-20 pt-14 sm:pb-28 sm:pt-20 lg:px-8 lg:pb-36 lg:pt-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage: "radial-gradient(120% 90% at 80% 0%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(120% 90% at 80% 0%, black 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 sm:gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="animate-rise max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-hero-muted">
            Early access
          </p>
          <h1 className="mt-5 font-sans text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-hero-foreground sm:mt-6 sm:text-6xl lg:text-7xl">
            Tell Oventric what you
            <br />
            want to achieve
          </h1>
          <p className="mt-6 max-w-xl text-base sm:mt-7 sm:text-lg leading-relaxed text-hero-muted">
            We&rsquo;ll help you build the campaign. From audience to outcome, Oventric Mail brings
            strategy, creation, delivery, tracking and follow-up into one intelligent workspace.
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

import { SectionHeader } from "@/components/SectionHeader";
import { Shield, Globe, Users, MailCheck, RefreshCw, MousePointerClick, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: Shield,
    title: "Sender authentication",
    body: "SPF, DKIM and DMARC alignment help prove your emails genuinely come from you.",
  },
  {
    icon: Globe,
    title: "Domain configuration",
    body: "Guided setup for your sending domain so mailbox providers can verify your identity.",
  },
  {
    icon: Users,
    title: "Audience quality",
    body: "Invalid, risky, disposable and duplicate contacts are flagged before send.",
  },
  {
    icon: MailCheck,
    title: "Email verification",
    body: "Verify addresses in advance so your list stays clean and your reputation protected.",
  },
  {
    icon: RefreshCw,
    title: "Bounce management",
    body: "Hard and soft bounces are handled automatically to protect future delivery.",
  },
  {
    icon: MousePointerClick,
    title: "Unsubscribe handling",
    body: "Every opt-out is honoured immediately and applied across all campaigns.",
  },
  {
    icon: Activity,
    title: "Sending practices & engagement",
    body: "Volume pacing, send windows and engagement signals inform the next best move.",
  },
];

/**
 * Deliverability positioning.
 *
 * Honest framing only: "built with deliverability in mind" / "AI-powered
 * deliverability optimization". Never guarantees of inbox placement.
 */
export function Deliverability() {
  return (
    <section
      id="deliverability"
      className="border-t border-border bg-muted/30 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Deliverability"
          title="Built with deliverability in mind."
          lede="Reaching the inbox starts long before you press Send. Oventric uses AI-powered deliverability optimization to monitor the signals you can control — authentication, audience quality, sending behaviour and engagement."
        />

        <div className="mt-16 grid gap-px border-y border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-background p-6 transition-colors duration-300 hover:bg-muted/20 sm:p-8"
            >
              <pillar.icon className="h-5 w-5 text-accent" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-5 font-serif text-lg font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            No platform can control a mailbox provider's final decision, and Oventric will never
            guarantee inbox placement. What we do is set you up to earn trust, spot problems early,
            and respond with a clear next step.
          </p>
          <p
            className={cn(
              "text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
            )}
          >
            No guaranteed placement
          </p>
        </div>
      </div>
    </section>
  );
}

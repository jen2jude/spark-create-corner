import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Mail,
  MousePointerClick,
  BarChart3,
  Shield,
  Clock,
  Zap,
  Sparkles,
} from "lucide-react";

const signals = [
  { icon: Users, title: "Audience identified", detail: "4,200 engaged contacts" },
  { icon: Mail, title: "Recommended campaign", detail: "Event registration series" },
  { icon: MousePointerClick, title: "Call to action", detail: "Reserve my seat" },
  { icon: BarChart3, title: "Tracking", detail: "Opens, clicks, registrations" },
  { icon: Shield, title: "Deliverability", detail: "Healthy" },
  { icon: Clock, title: "Follow-up", detail: "Reminder for non-openers" },
];

export function ProductPreview() {
  return (
    <section id="preview" className="relative px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
            Inside the workspace
          </p>
          <h2 className="mt-5 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            One conversation, a complete campaign
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Describe the outcome you want. Oventric assembles the plan, the audience, the email, and
            the measurement — and shows you every decision before anything sends.
          </p>
        </div>

        <div className="relative mt-14">
          <div
            className="pointer-events-none absolute inset-x-10 -bottom-8 h-24 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(ellipse, var(--accent) 0%, transparent 70%)" }}
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
            <div className="flex items-center justify-between border-b border-border bg-muted/60 px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="ml-3 text-xs font-medium text-muted-foreground">
                  Campaign workspace
                </span>
              </div>
              <Badge variant="secondary" className="text-xs">
                <Zap className="mr-1 h-3 w-3" />
                AI-assisted
              </Badge>
            </div>

            <div className="grid gap-0 md:grid-cols-[240px_1fr]">
              <aside className="hidden border-r border-border bg-muted/30 p-5 md:block">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Workflow
                </p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {[
                    "Strategy",
                    "Audience",
                    "Verification",
                    "Email",
                    "Design",
                    "Tracking",
                    "Deliverability",
                    "Send",
                    "Analytics",
                  ].map((step, i) => (
                    <li
                      key={step}
                      className={
                        i < 3
                          ? "flex items-center gap-2 font-medium text-foreground"
                          : "flex items-center gap-2 text-muted-foreground"
                      }
                    >
                      <span
                        className={
                          i < 3
                            ? "h-1.5 w-1.5 rounded-full bg-accent"
                            : "h-1.5 w-1.5 rounded-full bg-border"
                        }
                      />
                      {step}
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="space-y-4 p-5 sm:p-7">
                <div className="ml-auto max-w-md rounded-2xl rounded-br-sm bg-muted p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    You
                  </p>
                  <p className="mt-2 text-sm text-foreground">
                    "I want 500 registrations for my upcoming event."
                  </p>
                </div>

                <div className="max-w-2xl rounded-2xl rounded-bl-sm border border-border bg-background p-4 sm:p-5">
                  <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                    <Sparkles className="h-3.5 w-3.5" />
                    Oventric
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Here's the campaign I recommend. Review or adjust anything.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {signals.map(({ icon: Icon, title, detail }) => (
                      <div
                        key={title}
                        className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/40 p-3 transition-transform hover:-translate-y-0.5"
                      >
                        <Icon className="mt-0.5 h-4 w-4 text-accent" />
                        <div>
                          <p className="text-xs font-medium text-foreground">{title}</p>
                          <p className="text-xs text-muted-foreground">{detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-accent/5 p-4">
                    <div>
                      <p className="text-xs font-medium text-foreground">Estimated audience</p>
                      <p className="text-xs text-muted-foreground">3,800 reachable contacts</p>
                    </div>
                    <Button size="sm" className="h-8 rounded-full text-xs">
                      Preview campaign
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

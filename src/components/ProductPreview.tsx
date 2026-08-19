import { Sparkles, Users, Megaphone, MousePointerClick, BarChart3, ShieldCheck, Repeat2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const statusItems = [
  { icon: Users, label: "Audience", value: "7,840 contacts" },
  { icon: Megaphone, label: "Campaign", value: "Event Registration" },
  { icon: MousePointerClick, label: "CTA", value: "Register Now" },
  { icon: BarChart3, label: "Tracking", value: "Enabled" },
  { icon: ShieldCheck, label: "Deliverability", value: "Healthy" },
  { icon: Repeat2, label: "Follow-up", value: "Recommended" },
];

export function ProductPreview() {
  return (
    <section id="preview" className="relative px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Product Preview
          </p>
          <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            One conversation, a complete campaign
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Describe the outcome you want. Oventric assembles the plan, the audience, the email, and
            the measurement — and shows you every decision before anything sends.
          </p>
        </div>

        <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-card shadow-lift">
          {/* Workspace chrome */}
          <div className="flex h-12 items-center gap-4 border-b border-border bg-muted/50 px-5">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-foreground/10" aria-hidden />
              <span className="h-3 w-3 rounded-full bg-foreground/10" aria-hidden />
              <span className="h-3 w-3 rounded-full bg-foreground/10" aria-hidden />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs font-medium text-muted-foreground">Oventric Workspace · Event Registration</span>
            </div>
            <div className="w-16" aria-hidden />
          </div>

          <div className="grid lg:grid-cols-[1fr_320px]">
            {/* Conversation area */}
            <div className="space-y-6 border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-primary-foreground">
                  You
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-muted px-5 py-3.5">
                  <p className="text-sm leading-relaxed text-foreground">
                    I want to get 500 registrations for my upcoming event.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl rounded-tl-sm border border-accent/20 bg-accent/5 px-5 py-3.5">
                    <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden />
                      Oventric
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground">
                      I'll help you build the campaign.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Recommended campaign
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      Registration campaign targeting your most engaged contacts.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      Four sends over eleven days, four segments from your 7,840 contacts, and
                      registrations tracked back to the goal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status/workspace sidebar */}
            <div className="bg-muted/30 p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Campaign status
              </p>
              <dl className="mt-5 grid gap-4">
                {statusItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center justify-between rounded-xl border border-border bg-card p-3.5">
                    <dt className="flex items-center gap-2.5 text-sm font-medium text-muted-foreground">
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                        <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden />
                      </span>
                      {label}
                    </dt>
                    <dd className="text-sm font-semibold text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>

              <Button className="mt-6 w-full rounded-full" size="lg">
                Review Campaign
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Sparkles } from "lucide-react";
import { StrategyScreen } from "@/components/AppScreens";

export function ProductPreview() {
  return (
    <section id="preview" className="relative px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Inside the workspace</p>
          <h2 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            One conversation, a complete campaign
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Describe the outcome you want. Oventric assembles the plan, the audience, the email, and
            the measurement — and shows you every decision before anything sends.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-8">
          <div className="space-y-4">
            <div className="rounded-2xl rounded-br-sm bg-muted p-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                You
              </p>
              <p className="mt-2 text-sm text-foreground">
                “I want 500 registrations for my upcoming event.”
              </p>
            </div>
            <div className="rounded-2xl rounded-bl-sm border border-border bg-card p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                Oventric
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Here is the campaign I recommend: four sends over eleven days, four segments from
                your 7,840 contacts, and registrations tracked back to the goal. Review or change
                anything before it moves.
              </p>
            </div>
            <div className="rounded-2xl rounded-br-sm bg-muted p-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                You
              </p>
              <p className="mt-2 text-sm text-foreground">
                “Keep it, but hold the cold imports out of the first send.”
              </p>
            </div>
          </div>

          <StrategyScreen />
        </div>
      </div>
    </section>
  );
}

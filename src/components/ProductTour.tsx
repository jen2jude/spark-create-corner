import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  StrategyScreen,
  AudienceScreen,
  DesignScreen,
  AnalyticsScreen,
  DeliveryScreen,
} from "@/components/AppScreens";

const tabs = [
  {
    id: "strategy",
    label: "Strategy",
    screen: StrategyScreen,
    heading: "Describe the outcome, review the plan",
    body: "State the result you want in plain language. Oventric Mail returns an objective, messaging angles, a send cadence, and the measures it will judge success by — all editable before anything moves.",
  },
  {
    id: "audience",
    label: "Audience",
    screen: AudienceScreen,
    heading: "Know who is worth reaching",
    body: "Import from CSV, CRM, or events. Contacts are verified, segmented, and scored on engagement, so risky addresses stay out of the send and your best segments get the attention.",
  },
  {
    id: "design",
    label: "Design",
    screen: DesignScreen,
    heading: "Emails written and built for you",
    body: "Brand-consistent layouts generated from your goal, editable down to the sentence. No HTML, no drag-and-drop archaeology — just a clean canvas with the controls that matter.",
  },
  {
    id: "delivery",
    label: "Delivery",
    screen: DeliveryScreen,
    heading: "Technical work, handled quietly",
    body: "Authentication, suppression, bounce handling and warm-up run in the background. Oventric asks for what it needs in plain language and folds the SPF, DKIM and DMARC detail away until you want to see it.",
  },
  {
    id: "analytics",
    label: "Analytics",
    screen: AnalyticsScreen,
    heading: "Results tied back to the goal",
    body: "Delivered, opened, clicked, converted — attributed to the objective you set at the start. Ask questions of your own campaign data and get answers grounded in stored results.",
  },
] as const;

export function ProductTour() {
  const [active, setActive] = useState(0);
  const tab = tabs[active] ?? tabs[0];
  const Screen = tab.screen;

  return (
    <section id="product" className="border-t border-border bg-secondary/50 px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">The workspace</p>
        <h2 className="mt-5 max-w-2xl font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-foreground lg:text-5xl">
          Build a campaign in minutes, not afternoons
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Five surfaces, one continuous flow. Every step is visible, editable, and reversible.
        </p>

        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-b border-border">
          {tabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i)}
              aria-current={i === active}
              className={cn(
                "relative -mb-px pb-3 text-sm font-medium tracking-wide transition-colors duration-300",
                i === active
                  ? "text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-accent"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-start lg:gap-14">
          <div key={tab.id} className="animate-fade-in">
            <h3 className="font-serif text-2xl font-semibold text-foreground">{tab.heading}</h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{tab.body}</p>
          </div>

          <div key={`${tab.id}-screen`} className="animate-fade-in">
            <Screen />
          </div>
        </div>
      </div>
    </section>
  );
}

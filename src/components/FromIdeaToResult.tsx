import { SectionHeader } from "@/components/SectionHeader";

const steps = [
  {
    title: "Tell Oventric your goal",
    body: '"I want 500 registrations for my event."',
  },
  {
    title: "Build the strategy",
    body: "Oventric recommends campaign strategy and audience.",
  },
  {
    title: "Prepare the audience",
    body: "Import, segment and verify contacts.",
  },
  {
    title: "Create the campaign",
    body: "AI creates the copy, subject line, CTA and responsive email design.",
  },
  {
    title: "Protect delivery",
    body: "Oventric checks sender authentication, audience quality and campaign health.",
  },
  {
    title: "Preview before sending",
    body: "See exactly how the email will appear on desktop and mobile.",
  },
  {
    title: "Send and monitor",
    body: "Send immediately or schedule the campaign.",
  },
  {
    title: "Track what matters",
    body: "Measure delivery, opens, clicks, registrations and conversions.",
  },
  {
    title: "Follow up",
    body: "Identify leads and automatically recommend the next action.",
  },
  {
    title: "Understand the result",
    body: "Ask Oventric questions about the campaign and view the underlying analytics.",
  },
];

export function FromIdeaToResult() {
  return (
    <section id="workflow" className="border-t border-border bg-card px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="The journey"
          title="From an idea to a measurable result."
          lede="Oventric carries your goal through every stage that stands between an audience and an outcome — with your judgement in the loop at each step."
          meta="Ten steps, one goal"
        />

        <div className="relative mt-16">
          <div
            className="absolute left-4 top-0 h-full w-px bg-border lg:left-1/2"
            aria-hidden
          />
          <ol className="relative space-y-10 sm:space-y-12">
            {steps.map((step, index) => {
              const number = String(index + 1).padStart(2, "0");
              const isEven = index % 2 === 1;
              return (
                <li
                  key={step.title}
                  className={`relative flex items-start gap-6 lg:items-center ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex-1 lg:w-1/2 ${
                      isEven ? "lg:pl-16" : "lg:pr-16"
                    } ${isEven ? "lg:text-left" : "lg:text-right"}`}
                  >
                    <div
                      className={`rounded-2xl border border-border bg-background p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift sm:p-8 ${
                        isEven ? "lg:ml-auto" : ""
                      }`}
                    >
                      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-accent">
                        Step {number}
                      </p>
                      <h3 className="mt-2 font-serif text-xl font-semibold text-foreground sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {step.body}
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-4 top-0 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-card text-[0.6875rem] font-bold text-foreground shadow-soft lg:left-1/2">
                    {index + 1}
                  </div>

                  <div className="hidden lg:block lg:w-1/2" aria-hidden />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

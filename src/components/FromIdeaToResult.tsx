import { SectionHeader } from "@/components/SectionHeader";
const phases = [
  {
    label: "Plan",
    stages: "Audience · Intelligence · Strategy",
    steps: [
      { title: "Tell Oventric your goal", body: "Describe the outcome in plain language — registrations, sales, renewals, attendance." },
      { title: "Strategy is drafted", body: "A campaign plan with messaging, timing, and success measures you can review and edit." },
      { title: "Audience verified", body: "Contacts are cleaned, segmented, and scored so you only send to people worth reaching." },
    ],
  },
  {
    label: "Execute",
    stages: "Campaign · Delivery · Engagement",
    steps: [
      { title: "Email designed", body: "Brand-consistent layouts written and built for you, editable down to the sentence." },
      { title: "Deliverability checked", body: "Authentication, list quality, and send health reviewed before anything leaves." },
      { title: "Campaign sent", body: "Controlled sending with previews, approvals, and a full record of every decision." },
    ],
  },
  {
    label: "Convert",
    stages: "Conversion · Lead · Nurture · Revenue",
    steps: [
      { title: "Engagement tracked", body: "Opens, clicks, and registrations attributed to the goal you set at the start." },
      { title: "Leads followed up", body: "Clear next actions for people who showed intent but did not convert." },
      { title: "Results analysed", body: "Ask questions of your own campaign data and get answers grounded in results." },
    ],
  },
];

const spine = [
  "Audience",
  "Intelligence",
  "Strategy",
  "Campaign",
  "Delivery",
  "Engagement",
  "Conversion",
  "Lead",
  "Nurture",
  "Revenue",
];

export function FromIdeaToResult() {
  return (
    <section id="workflow" className="border-t border-border bg-card px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="The journey"
          title="From idea to result"
          lede="Oventric Mail does not stop at sending. It carries a business goal through every stage that stands between an audience and revenue — with your judgement in the loop at each step."
          meta="Ten stages, one goal"
        />

        <ol className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-3 border-y border-border py-5 text-[0.6875rem] font-medium uppercase tracking-[0.2em]">
          {spine.map((stage, index) => (
            <li key={stage} className="flex items-center gap-3">
              <span className={index === spine.length - 1 ? "text-accent" : "text-muted-foreground"}>
                {stage}
              </span>
              {index < spine.length - 1 && (
                <span className="text-border" aria-hidden>
                  /
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-x-12 gap-y-14 lg:grid-cols-3">
          {phases.map((phase) => (
            <div key={phase.label}>
              <div className="border-b border-foreground/15 pb-4">
                <h3 className="font-serif text-xl font-semibold text-foreground">{phase.label}</h3>
                <p className="mt-2 text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {phase.stages}
                </p>
              </div>
              <ol className="mt-6 space-y-6">
                {phase.steps.map((step) => (
                  <li key={step.title}>
                    <p className="font-medium leading-snug text-foreground">{step.title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

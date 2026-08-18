const steps = [
  "Tell Oventric your goal",
  "AI builds the strategy",
  "Audience verified",
  "Email designed",
  "Deliverability checked",
  "Campaign sent",
  "Clicks & registrations tracked",
  "Leads followed up",
  "Results analyzed",
];

export function FromIdeaToResult() {
  return (
    <section id="workflow" className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From idea to result
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Oventric doesn't just send emails. It guides the entire journey from a business goal to measurable outcomes.
          </p>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover:shadow-sm"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                {index + 1}
              </span>
              <p className="font-medium leading-snug text-foreground">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

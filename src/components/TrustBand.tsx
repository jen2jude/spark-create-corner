const pillars = [
  {
    title: "Trust",
    body: "Verified audiences, authenticated sending, and an auditable record of every campaign decision.",
  },
  {
    title: "Intelligence",
    body: "Strategy, segmentation, and follow-up informed by your own campaign results, not guesswork.",
  },
  {
    title: "Simplicity",
    body: "One conversation replaces the builders, spreadsheets, and dashboards you currently stitch together.",
  },
  {
    title: "Control",
    body: "Nothing sends without your review. Every recommendation is visible, editable, and reversible.",
  },
];

export function TrustBand() {
  return (
    <section className="border-t border-border px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="border-t border-foreground/15 pt-5">
              <h3 className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-foreground">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { SectionHeader } from "@/components/SectionHeader";

const painPoints = [
  "Contact lists",
  "Email design",
  "Segmentation",
  "Verification",
  "Domain authentication",
  "Deliverability",
  "Sending",
  "Scheduling",
  "Analytics",
  "Conversion tracking",
  "Lead follow-up",
];

export function ProblemSection() {
  return (
    <section className="border-b border-border bg-muted/40 px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="The problem"
          title={<>Email marketing shouldn't feel like operating five different systems.</>}
          lede="The real work isn't sending an email. It's turning an audience into an outcome — and that journey is usually split across disconnected tools."
          meta="Eleven moving parts"
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((point) => (
            <div
              key={point}
              className="flex items-center gap-4 border-b border-border pb-4"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              <span className="text-base font-medium text-foreground">{point}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="max-w-3xl text-2xl font-serif font-semibold leading-snug tracking-tight text-foreground sm:text-3xl">
            Oventric brings the journey together.
          </p>
        </div>
      </div>
    </section>
  );
}

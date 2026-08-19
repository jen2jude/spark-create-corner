import { SectionHeader } from "@/components/SectionHeader";
import { ArrowDown } from "lucide-react";

const technicalLayer = [
  "SPF",
  "DKIM",
  "DMARC",
  "Verification",
  "Segmentation",
  "Bounce handling",
  "Tracking",
  "Attribution",
  "Automation",
];

/**
 * The complexity-abstraction differentiator: everything the platform actually
 * runs, collapsed to a single plain-language moment the user sees. Sits ahead
 * of Deliverability, which is the concrete, worked example of this same idea
 * applied to sender authentication specifically.
 */
export function ComplexityAbstraction() {
  return (
    <section
      id="simplicity"
      className="border-t border-border bg-muted/30 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Powerful underneath"
          title="Powerful underneath. Simple on the surface."
          lede="Oventric can handle complex marketing infrastructure without forcing users to understand every technical detail."
          meta="The abstraction principle"
        />

        <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-border bg-background p-8 shadow-soft sm:p-12">
          <p className="text-center text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Behind the scenes
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {technicalLayer.map((term) => (
              <span
                key={term}
                className="rounded-full border border-border bg-muted/40 px-3 py-1 font-mono text-[0.6875rem] text-muted-foreground"
              >
                {term}
              </span>
            ))}
          </div>

          <div className="my-8 flex justify-center" aria-hidden>
            <ArrowDown className="h-5 w-5 text-accent" strokeWidth={1.5} />
          </div>

          <p className="text-center text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What the user sees
          </p>
          <p className="mt-4 text-center font-serif text-2xl font-semibold leading-snug text-foreground sm:text-3xl">
            "Let's get your campaign ready."
          </p>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          This is a key differentiator. The platform hides complexity without removing
          professional control.
        </p>
      </div>
    </section>
  );
}

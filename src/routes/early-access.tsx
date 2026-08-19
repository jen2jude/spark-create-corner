import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell, PageIntro } from "@/components/MarketingShell";
import { WaitlistForm } from "@/components/WaitlistForm";
import { EarlyAccessCounter } from "@/components/EarlyAccessCounter";

const title = "Early access — Oventric Mail";
const description =
  "Join the Oventric Mail early access list. Tell us your audience, your use case and your biggest challenge so we build the workspace around real work.";

export const Route = createFileRoute("/early-access")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EarlyAccessPage,
});

const promises = [
  "You will hear from a person, not an automated sequence.",
  "Your answers shape which capabilities land first.",
  "No card, no commitment, no spam.",
];

function EarlyAccessPage() {
  return (
    <MarketingShell>
      <PageIntro
        eyebrow="Early access"
        title={<>Start with the outcome you want.</>}
        lede="Tell us what you are trying to achieve with your audience. We are opening Oventric Mail gradually so each early team gets real attention."
      >
        <EarlyAccessCounter />
      </PageIntro>

      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground">
              What happens next
            </h2>
            <ul className="mt-6 space-y-4">
              {promises.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <WaitlistForm />
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}

import { EarlyAccessCounter } from "@/components/EarlyAccessCounter";

const commitments = [
  {
    title: "Consent-first sending",
    body: "Oventric Mail is built for audiences that chose to hear from you. Unsubscribe handling and suppression are part of the send pipeline, not an afterthought.",
  },
  {
    title: "Your data stays yours",
    body: "Contacts, campaign content, and results belong to your account. Exports are available at any time, and nothing is sold or shared with advertisers.",
  },
  {
    title: "Every decision is on record",
    body: "Strategy edits, audience changes, approvals, and sends are logged, so you can always see what happened, when, and who signed it off.",
  },
];

export function DataResponsibility() {
  return (
    <section className="border-t border-border bg-secondary/50 px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow">Responsibility</p>
            <h2 className="mt-5 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-foreground lg:text-5xl">
              Handling an audience is a responsibility
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              People gave you their address for a reason. Oventric Mail is designed so that reason is respected at
              every step — and so nothing sends without your review.
            </p>
          </div>

          <dl className="space-y-8">
            {commitments.map((c) => (
              <div key={c.title} className="border-t border-foreground/15 pt-6">
                <dt className="font-serif text-lg font-semibold text-foreground">{c.title}</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <EarlyAccessCounter />
      </div>
    </section>
  );
}

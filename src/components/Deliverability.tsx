/**
 * Deliverability positioning.
 *
 * Honest framing only: "built for better deliverability" / "AI-powered
 * deliverability optimization". Never guarantees of inbox placement.
 * Plain-language outcomes lead; SPF/DKIM/DMARC and the rest of the
 * vocabulary stay folded behind an Advanced disclosure.
 */
const areas = [
  {
    title: "Prove the email really comes from you",
    plain:
      "We walk you through claiming your domain and setting up your sending address, one screen at a time.",
    technical: "Sender authentication, domain setup, SPF, DKIM, DMARC alignment",
  },
  {
    title: "Send to addresses that actually exist",
    plain:
      "Risky, invalid, and duplicate contacts are flagged before a campaign goes out, not after it damages your reputation.",
    technical: "Contact quality scoring, address verification, suppression lists",
  },
  {
    title: "Build a sending habit mailboxes trust",
    plain:
      "New domains start gently and grow with your volume, at a pace we set for you and you can override.",
    technical: "Warm-up curve, hourly rate limits, retry policy, send windows",
  },
  {
    title: "Handle failures and opt-outs cleanly",
    plain:
      "Failed addresses stop receiving mail automatically, and every unsubscribe is honoured immediately across all campaigns.",
    technical: "Hard and soft bounce management, one-click unsubscribe, complaint feedback loops",
  },
  {
    title: "Read the signals and act on them",
    plain:
      "Opens, clicks, quiet contacts, and complaints are watched over time, with a clear next move when something drifts.",
    technical: "Engagement signals, reputation trend, re-permission sequences",
  },
] as const;

export function Deliverability() {
  return (
    <section
      id="deliverability"
      className="border-t border-border bg-muted/30 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="eyebrow">Deliverability</p>
          <h2 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Built for better deliverability
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            AI-powered deliverability optimization works on the things that are genuinely in your
            control — who you send to, how you send, and how you respond to what comes back. No
            platform can promise a mailbox provider's decision, and we won't pretend otherwise.
          </p>
        </div>

        <ol className="mt-16 grid gap-px border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, index) => (
            <li key={area.title} className="border-b border-border bg-background p-6 sm:p-8">
              <p className="font-mono text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                {area.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.plain}</p>
              <details className="group mt-4">
                <summary className="cursor-pointer list-none text-xs font-medium text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  Advanced · what this is called
                </summary>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {area.technical}
                </p>
              </details>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          You will never see a guarantee of inbox placement here. You will see what has been set
          up, what still needs attention, and what effect each fix is expected to have.
        </p>
      </div>
    </section>
  );
}

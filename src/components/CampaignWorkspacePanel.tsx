import { useEffect, useState } from "react";
import { Check, Mail, ShieldCheck, Target, Users } from "lucide-react";
import type { CampaignWorkspace } from "@/lib/strategist.types";

type Props = { workspace: CampaignWorkspace | null; pending: boolean };

const skeletonRows = ["Audience", "Call to action", "Tracking", "Deliverability"];

export function CampaignWorkspacePanel({ workspace, pending }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [workspace?.campaignName, workspace?.emails.length]);

  if (!workspace) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Campaign workspace
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          {pending
            ? "Assembling the campaign — audience, sequence, copy, and delivery checks."
            : "Nothing built yet. Describe an objective in the conversation and the campaign will appear here as it is decided."}
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {skeletonRows.map((row) => (
            <div key={row} className="rounded-xl border border-border px-4 py-4 opacity-40">
              <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {row}
              </p>
              <p className="mt-2 font-serif text-lg text-muted-foreground">—</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const email = workspace.emails[active];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-foreground/15 pb-4">
        <div>
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Campaign workspace
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-foreground">
            {workspace.campaignName}
          </h2>
        </div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {workspace.sendWindow}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric icon={Users} label="Audience" value={workspace.audienceSize} note={workspace.audienceNote} />
        <Metric icon={Target} label="Call to action" value={workspace.cta} note="Primary action for every send" />
        <Metric icon={ShieldCheck} label="Tracking" value={workspace.tracking} note="Attributed to the objective" />
        <Metric
          icon={Mail}
          label="Deliverability"
          value={workspace.deliverability}
          note={workspace.deliverabilityNote}
        />
      </div>

      {workspace.changed.length > 0 ? (
        <div className="rounded-xl border border-accent/30 bg-accent/5 px-5 py-4">
          <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-accent">
            Just changed
          </p>
          <ul className="mt-3 space-y-1.5">
            {workspace.changed.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {workspace.emails.length > 0 ? (
        <div>
          <div className="flex flex-wrap gap-2">
            {workspace.emails.map((e, i) => (
              <button
                key={`${e.subject}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                  i === active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {e.step}
              </button>
            ))}
          </div>

          {email ? (
            <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <div className="space-y-1 border-b border-border bg-muted/40 px-6 py-4">
                <p className="text-xs text-muted-foreground">From {email.sender}</p>
                <p className="text-base font-semibold text-foreground">{email.subject}</p>
                <p className="text-xs text-muted-foreground">{email.preheader}</p>
              </div>
              <div className="space-y-4 px-6 py-8 sm:px-10">
                {email.body.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-foreground">
                    {p}
                  </p>
                ))}
                {email.ctaLabel ? (
                  <div className="pt-2">
                    <span className="inline-flex rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background">
                      {email.ctaLabel}
                    </span>
                  </div>
                ) : null}
                {email.signoff ? (
                  <p className="pt-2 text-sm leading-relaxed text-muted-foreground">{email.signoff}</p>
                ) : null}
              </div>
              <p className="border-t border-border px-6 py-3 text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
                Draft · nothing is sent until you approve it
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-4">
      <p className="flex items-center gap-2 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </p>
      <p className="mt-2 font-serif text-lg leading-snug text-foreground">{value}</p>
      {note ? <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{note}</p> : null}
    </div>
  );
}

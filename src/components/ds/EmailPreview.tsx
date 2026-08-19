import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./typography";

export type EmailDraft = {
  sender: string;
  subject: string;
  preheader?: string | undefined;
  body: ReadonlyArray<string>;
  ctaLabel?: string | undefined;
  signoff?: string | undefined;
};

/**
 * Renders a draft the way a recipient sees it: real inbox chrome, real type.
 * Never sends anything — the footer states that explicitly.
 */
export function EmailPreview({
  draft,
  device = "desktop",
  footer = "Draft · nothing is sent until you approve it",
  className,
}: {
  draft: EmailDraft;
  device?: "desktop" | "mobile" | undefined;
  footer?: ReactNode | undefined;
  className?: string | undefined;
}) {
  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-soft",
        device === "mobile" && "mx-auto max-w-sm",
        className,
      )}
      aria-label={`Email preview: ${draft.subject}`}
    >
      <header className="space-y-1 border-b border-border bg-muted/40 px-4 py-4 sm:px-6">
        <Text variant="caption">From {draft.sender}</Text>
        <p className="text-base font-semibold text-foreground">{draft.subject}</p>
        {draft.preheader ? <Text variant="caption">{draft.preheader}</Text> : null}
      </header>
      <div className="space-y-4 px-4 py-6 sm:px-10 sm:py-8">
        {draft.body.map((p, i) => (
          <Text key={i}>{p}</Text>
        ))}
        {draft.ctaLabel ? (
          <div className="pt-2">
            <span className="inline-flex rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background">
              {draft.ctaLabel}
            </span>
          </div>
        ) : null}
        {draft.signoff ? <Text variant="muted">{draft.signoff}</Text> : null}
      </div>
      {footer ? (
        <p className="border-t border-border px-4 py-3 text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground sm:px-6">
          {footer}
        </p>
      ) : null}
    </article>
  );
}

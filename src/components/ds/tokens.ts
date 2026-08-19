/**
 * Oventric Mail design tokens (source of truth for product surfaces).
 *
 * Colour values themselves live in src/styles.css as semantic CSS variables.
 * This file maps product concepts -> token class names so screens never
 * invent one-off colours or spacing.
 */

/** Vertical rhythm. Use `space.section` between page bands, `space.stack` inside panels. */
export const space = {
  hairline: "gap-1",
  tight: "gap-2",
  stack: "gap-4",
  block: "gap-6",
  section: "gap-10",
  page: "px-4 sm:px-6 lg:px-8",
  sectionY: "py-14 sm:py-20 lg:py-24",
  panel: "p-4 sm:p-6",
} as const;

/** Surfaces. Cards, panels and page bands. */
export const surface = {
  card: "rounded-2xl border border-border bg-card",
  panel: "rounded-xl border border-border bg-card",
  quiet: "rounded-xl border border-border bg-muted/40",
  band: "bg-background",
  bandAlt: "bg-muted/40",
  hero: "bg-hero text-hero-foreground",
} as const;

/** Campaign lifecycle states. One accent colour, hierarchy over colour. */
export type CampaignStatus =
  | "draft"
  | "scheduled"
  | "sending"
  | "sent"
  | "paused"
  | "needs-attention";

export const campaignStatus: Record<
  CampaignStatus,
  { label: string; tone: "neutral" | "accent" | "positive" | "warning" }
> = {
  draft: { label: "Draft", tone: "neutral" },
  scheduled: { label: "Scheduled", tone: "accent" },
  sending: { label: "Sending", tone: "accent" },
  sent: { label: "Sent", tone: "positive" },
  paused: { label: "Paused", tone: "neutral" },
  "needs-attention": { label: "Needs attention", tone: "warning" },
};

/** Chart palette — accent first, neutrals after. Never more than needed. */
export const chartTokens = {
  primary: "var(--chart-1)",
  secondary: "var(--chart-2)",
  tertiary: "var(--chart-3)",
  grid: "color-mix(in oklab, var(--foreground) 8%, transparent)",
  axis: "var(--muted-foreground)",
} as const;

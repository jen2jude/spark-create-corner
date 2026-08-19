import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { campaignStatus, type CampaignStatus } from "./tokens";

export const pillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6875rem] font-medium tracking-wide",
  {
    variants: {
      tone: {
        neutral: "border-border bg-muted/60 text-muted-foreground",
        accent: "border-accent/30 bg-accent/10 text-accent",
        positive: "border-chart-3/40 bg-chart-3/10 text-chart-3",
        warning: "border-chart-4/40 bg-chart-4/10 text-foreground",
        critical: "border-destructive/40 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface PillProps extends VariantProps<typeof pillVariants> {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}

/** Generic labelled badge. Use for tags, counts, small states. */
export function Pill({ tone, dot, className, children }: PillProps) {
  return (
    <span className={cn(pillVariants({ tone }), className)}>
      {dot ? <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden /> : null}
      {children}
    </span>
  );
}

/** Campaign lifecycle badge — always reads as text, never colour alone. */
export function StatusBadge({ status, className }: { status: CampaignStatus; className?: string }) {
  const { label, tone } = campaignStatus[status];
  return (
    <Pill tone={tone} dot className={className}>
      <span className="sr-only">Campaign status: </span>
      {label}
    </Pill>
  );
}

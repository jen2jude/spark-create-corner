import type { HTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Text } from "./typography";

export const panelVariants = cva("", {
  variants: {
    variant: {
      card: "rounded-2xl border border-border bg-card shadow-soft",
      plain: "rounded-2xl border border-border bg-card",
      quiet: "rounded-xl border border-border bg-muted/40",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-4 sm:p-6",
      lg: "p-6 sm:p-8",
    },
  },
  defaultVariants: { variant: "card", padding: "md" },
});

export interface PanelProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {
  interactive?: boolean | undefined;
}

/** The base container for every product surface. */
export function Panel({ variant, padding, interactive, className, ...props }: PanelProps) {
  return (
    <div
      className={cn(panelVariants({ variant, padding }), interactive && "hover-lift", className)}
      {...props}
    />
  );
}

/** Panel header with eyebrow, title, optional description and trailing action. */
export function PanelHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: {
  eyebrow?: string | undefined;
  title: ReactNode;
  description?: ReactNode | undefined;
  action?: ReactNode | undefined;
  className?: string | undefined;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? <Text variant="eyebrow">{eyebrow}</Text> : null}
        <Text variant="heading" className={eyebrow ? "mt-2" : undefined}>
          {title}
        </Text>
        {description ? (
          <Text variant="muted" className="mt-2 max-w-prose">
            {description}
          </Text>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/** Page band. Alternate `tone` to separate major sections. */
export function Section({
  tone = "default",
  className,
  children,
  ...props
}: HTMLAttributes<HTMLElement> & { tone?: "default" | "alt" | "hero" | undefined }) {
  return (
    <section
      className={cn(
        "py-14 sm:py-20 lg:py-24",
        tone === "alt" && "bg-muted/40",
        tone === "hero" && "bg-hero text-hero-foreground",
        className,
      )}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/** Metric tile: label, value, supporting note. */
export function MetricTile({
  label,
  value,
  note,
  icon,
  className,
}: {
  label: string;
  value: ReactNode;
  note?: ReactNode | undefined;
  icon?: ReactNode | undefined;
  className?: string | undefined;
}) {
  return (
    <Panel variant="plain" padding="sm" interactive className={cn("min-w-0", className)}>
      <p className="flex items-center gap-2 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {icon}
        {label}
      </p>
      <Text variant="numeric" className="mt-2 break-words">
        {value}
      </Text>
      {note ? (
        <Text variant="caption" className="mt-1.5">
          {note}
        </Text>
      ) : null}
    </Panel>
  );
}

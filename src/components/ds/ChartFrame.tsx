import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Text } from "./typography";

/**
 * Every chart in the product sits in this frame: a title, an accessible summary,
 * the plot, and a narrative reading (what happened, why, what next).
 */
export function ChartFrame({
  title,
  summary,
  reading,
  height = 220,
  children,
  className,
}: {
  title: string;
  /** Sentence a screen reader hears instead of the plot. Required. */
  summary: string;
  reading?: ReactNode | undefined;
  height?: number | undefined;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <figure className={cn("rounded-2xl border border-border bg-card p-4 sm:p-6", className)}>
      <figcaption className="space-y-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <Text variant="caption">{summary}</Text>
      </figcaption>
      <div role="img" aria-label={`${title}. ${summary}`} className="mt-4" style={{ height }}>
        {children}
      </div>
      {reading ? (
        <div className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
          {reading}
        </div>
      ) : null}
    </figure>
  );
}

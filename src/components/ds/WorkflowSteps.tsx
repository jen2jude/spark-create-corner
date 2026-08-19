import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Text } from "./typography";

export type WorkflowStepState = "done" | "current" | "upcoming" | "blocked";

export type WorkflowStep = {
  id: string;
  label: string;
  description?: string | undefined;
  state: WorkflowStepState;
};

const stateLabel: Record<WorkflowStepState, string> = {
  done: "Complete",
  current: "In progress",
  upcoming: "Not started",
  blocked: "Needs attention",
};

/**
 * The revenue chain rendered as guided steps.
 * Progress is stated in words as well as position, so state never relies on colour.
 */
export function WorkflowSteps({
  steps,
  orientation = "vertical",
  className,
}: {
  steps: ReadonlyArray<WorkflowStep>;
  orientation?: "vertical" | "horizontal" | undefined;
  className?: string | undefined;
}) {
  return (
    <ol
      className={cn(
        orientation === "horizontal"
          ? "-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
          : "space-y-3",
        className,
      )}
    >
      {steps.map((step, i) => (
        <li
          key={step.id}
          className={cn(
            "flex gap-3 rounded-xl border px-4 py-3",
            orientation === "horizontal" && "min-w-[13rem] shrink-0",
            step.state === "current"
              ? "border-accent/40 bg-accent/5"
              : "border-border bg-card",
            step.state === "upcoming" && "opacity-70",
          )}
          aria-current={step.state === "current" ? "step" : undefined}
        >
          <span
            aria-hidden
            className={cn(
              "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[0.625rem] font-medium",
              step.state === "done"
                ? "border-transparent bg-foreground text-background"
                : step.state === "current"
                  ? "border-accent text-accent"
                  : "border-border text-muted-foreground",
            )}
          >
            {step.state === "done" ? <Check className="h-3 w-3" /> : i + 1}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">{step.label}</p>
            <Text variant="caption" className="mt-0.5">
              {step.description ?? stateLabel[step.state]}
            </Text>
            <span className="sr-only">{stateLabel[step.state]}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Determinate progress toward a goal. Grows into place, so it reads as movement. */
export function ProgressMeter({
  label,
  value,
  max = 100,
  hint,
  className,
}: {
  label: string;
  value: number;
  max?: number | undefined;
  hint?: string | undefined;
  className?: string | undefined;
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{Math.round(pct)}%</p>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-1.5 overflow-hidden rounded-full bg-muted"
      >
        <div className="animate-progress h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
      {hint ? <Text variant="caption">{hint}</Text> : null}
    </div>
  );
}

import type { ReactNode } from "react";
import { AlertTriangle, CheckCircle2, Info, OctagonAlert } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export type NoticeTone = "info" | "success" | "warning" | "critical";

const toneMap: Record<NoticeTone, { icon: typeof Info; ring: string; text: string }> = {
  info: { icon: Info, ring: "border-border bg-muted/50", text: "text-foreground" },
  success: { icon: CheckCircle2, ring: "border-chart-3/35 bg-chart-3/8", text: "text-foreground" },
  warning: { icon: AlertTriangle, ring: "border-chart-4/40 bg-chart-4/8", text: "text-foreground" },
  critical: {
    icon: OctagonAlert,
    ring: "border-destructive/40 bg-destructive/8",
    text: "text-foreground",
  },
};

/**
 * Inline alert. `live` makes it announce itself when it appears after an action.
 */
export function Notice({
  tone = "info",
  title,
  children,
  action,
  live,
  className,
}: {
  tone?: NoticeTone | undefined;
  title: string;
  children?: ReactNode | undefined;
  action?: ReactNode | undefined;
  live?: boolean | undefined;
  className?: string | undefined;
}) {
  const { icon: Icon, ring, text } = toneMap[tone];
  return (
    <div
      role={live ? (tone === "critical" ? "alert" : "status") : undefined}
      aria-live={live ? (tone === "critical" ? "assertive" : "polite") : undefined}
      className={cn("flex gap-3 rounded-xl border px-4 py-3", ring, className)}
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", text)} aria-hidden />
      <div className="min-w-0 flex-1">
        <p className={cn("text-sm font-medium", text)}>{title}</p>
        {children ? (
          <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{children}</div>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

/**
 * Transient notifications. One helper so every screen announces the same way.
 * Requires <Toaster /> mounted once in the root route.
 */
export const notify = {
  info: (title: string, description?: string) => toast(title, description ? { description } : {}),
  success: (title: string, description?: string) =>
    toast.success(title, description ? { description } : {}),
  warning: (title: string, description?: string) =>
    toast.warning(title, description ? { description } : {}),
  error: (title: string, description?: string) =>
    toast.error(title, description ? { description } : {}),
};

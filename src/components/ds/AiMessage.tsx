import type { ReactNode } from "react";
import { Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Text } from "./typography";

export type MessageRole = "assistant" | "user" | "system";

/**
 * Conversation bubble for the strategist workspace.
 * The AI reads as a colleague, not a novelty: quiet surface, ochre mark.
 */
export function AiMessage({
  role,
  children,
  meta,
  pending,
  className,
}: {
  role: MessageRole;
  children: ReactNode;
  meta?: string | undefined;
  pending?: boolean | undefined;
  className?: string | undefined;
}) {
  if (role === "system") {
    return (
      <p className={cn("text-center text-xs text-muted-foreground", className)}>{children}</p>
    );
  }

  const isUser = role === "user";
  return (
    <div
      className={cn(
        "animate-rise flex gap-3",
        isUser ? "flex-row-reverse" : "flex-row",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border",
          isUser ? "border-border bg-muted text-muted-foreground" : "border-accent/30 bg-accent/10 text-accent",
        )}
      >
        {isUser ? <User className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
      </span>
      <div className={cn("min-w-0 max-w-[42rem]", isUser && "text-right")}>
        <span className="sr-only">{isUser ? "You said: " : "Strategist said: "}</span>
        <div
          className={cn(
            "rounded-2xl border px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "border-foreground/15 bg-foreground text-background"
              : "border-border bg-card text-foreground",
            pending && "opacity-70",
          )}
        >
          {children}
        </div>
        {meta ? (
          <Text variant="caption" className="mt-1.5">
            {meta}
          </Text>
        ) : null}
      </div>
    </div>
  );
}

/** Inline AI recommendation attached to a control or metric. */
export function AiNote({ children, className }: { children: ReactNode; className?: string | undefined }) {
  return (
    <div
      className={cn(
        "flex gap-2.5 rounded-xl border border-accent/25 bg-accent/5 px-4 py-3",
        className,
      )}
    >
      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
      <p className="text-xs leading-relaxed text-foreground">{children}</p>
    </div>
  );
}

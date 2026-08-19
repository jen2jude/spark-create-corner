import type { ReactNode } from "react";
import { useRef } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export type NavItem = {
  label: string;
  to: NonNullable<LinkProps["to"]>;
  icon?: ReactNode | undefined;
};

/** Product sidebar navigation. Semantic nav + current-page state. */
export function SideNav({
  label = "Sections",
  items,
  className,
}: {
  label?: string | undefined;
  items: ReadonlyArray<NavItem>;
  className?: string | undefined;
}) {
  return (
    <nav aria-label={label} className={cn("space-y-1", className)}>
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          activeProps={{
            className: "bg-muted text-foreground",
            "aria-current": "page",
          }}
          className="flex min-h-11 items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground"
        >
          {item.icon}
          <span className="truncate">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

/**
 * Segmented control for switching views (conversation / workspace / split).
 * Real radiogroup semantics: arrow keys move and select, only the active
 * option is in the tab order.
 */
export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: T;
  options: ReadonlyArray<{ value: T; label: string }>;
  onChange: (value: T) => void;
  className?: string | undefined;
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const move = (from: number, delta: number) => {
    const next = (from + delta + options.length) % options.length;
    const option = options[next];
    if (!option) return;
    onChange(option.value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("inline-flex rounded-full border border-border bg-card p-1", className)}
    >
      {options.map((o, i) => {
        const selected = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            ref={(el) => {
              refs.current[i] = el;
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                move(i, 1);
              } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                move(i, -1);
              }
            }}
            onClick={() => onChange(o.value)}
            className={cn(
              "min-h-11 rounded-full px-4 text-xs font-medium",
              selected
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

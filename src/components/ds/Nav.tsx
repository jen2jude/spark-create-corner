import type { ReactNode } from "react";
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
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground"
        >
          {item.icon}
          <span className="truncate">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

/** Segmented control for switching views (conversation / workspace / split). */
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
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("inline-flex rounded-full border border-border bg-card p-1", className)}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={o.value === value}
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-xs font-medium",
            o.value === value
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

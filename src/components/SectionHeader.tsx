import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Optional short label rendered at the far right of the rule, e.g. a stage count. */
  meta?: string;
  className?: string;
};

/**
 * Editorial section masthead: eyebrow + title on the left, supporting lede set as a
 * measured column on the right, both seated on a shared hairline rule. Keeps the
 * wide right-hand area intentional instead of leaving a void.
 */
export function SectionHeader({ eyebrow, title, lede, meta, className }: SectionHeaderProps) {
  return (
    <header className={cn("grid gap-x-16 gap-y-6 lg:grid-cols-[1.15fr_0.85fr]", className)}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-5 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl">
          {title}
        </h2>
      </div>
      {(lede || meta) && (
        <div className="flex flex-col justify-end lg:pb-1">
          <span className="hidden h-px w-full bg-border lg:block" aria-hidden />
          {lede && (
            <p className="text-base leading-relaxed text-muted-foreground lg:mt-6 lg:text-[1.0625rem]">
              {lede}
            </p>
          )}
          {meta && (
            <p className="mt-5 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted-foreground/80">
              {meta}
            </p>
          )}
        </div>
      )}
    </header>
  );
}

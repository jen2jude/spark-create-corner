import type { ElementType, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Typography scale for Oventric Mail.
 * Serif (Crimson Pro) for editorial headings, Inter for UI + body.
 * Never hardcode font sizes in product screens — use these.
 */
export const textVariants = cva("", {
  variants: {
    variant: {
      display: "font-serif text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl",
      title: "font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl",
      heading: "font-serif text-xl font-bold tracking-tight text-foreground",
      subheading: "text-sm font-semibold text-foreground",
      body: "text-sm leading-relaxed text-foreground",
      bodyLg: "text-base leading-relaxed text-foreground sm:text-lg",
      muted: "text-sm leading-relaxed text-muted-foreground",
      caption: "text-xs leading-relaxed text-muted-foreground",
      eyebrow:
        "text-[0.6875rem] font-medium uppercase leading-none tracking-[0.22em] text-muted-foreground",
      numeric: "font-serif text-2xl leading-snug text-foreground",
    },
  },
  defaultVariants: { variant: "body" },
});

const defaultTag: Record<string, ElementType> = {
  display: "h1",
  title: "h2",
  heading: "h3",
  subheading: "h4",
  body: "p",
  bodyLg: "p",
  muted: "p",
  caption: "p",
  eyebrow: "p",
  numeric: "p",
};

export interface TextProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof textVariants> {
  as?: ElementType;
}

export function Text({ as, variant = "body", className, ...props }: TextProps) {
  const Tag = as ?? defaultTag[variant ?? "body"] ?? "p";
  return <Tag className={cn(textVariants({ variant }), className)} {...props} />;
}

import { cn } from "@/lib/utils";

interface AnimatedMarkProps {
  className?: string;
  /** Unique id suffix so multiple marks can coexist without gradient id clashes. */
  idSuffix?: string | undefined;
}

/**
 * The Oventric "O" that quietly resolves into an envelope and back.
 *
 * O -> motion -> Mail -> O. Deliberately restrained: a thin RGB brand
 * signature line, no glow, no bounce. Honors prefers-reduced-motion by
 * settling on the static circle.
 */
export function AnimatedMark({ className, idSuffix = "mark" }: AnimatedMarkProps) {
  const gradientId = `oventric-rgb-${idSuffix}`;

  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="Oventric Mail"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="48" x2="48" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="38%" stopColor="#F472B6" />
          <stop offset="70%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>

      <g fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" strokeLinecap="round">
        {/* The O — draws from the left, travels the circumference */}
        <circle
          cx="24"
          cy="24"
          r="19"
          className="mark-ring"
          transform="rotate(180 24 24)"
        />

        {/* The envelope revealed within the O */}
        <g className="mark-envelope" strokeLinejoin="round">
          <rect x="13" y="17" width="22" height="14" rx="2.5" />
          <path d="M13.8 18.4 24 26.2l10.2-7.8" />
        </g>
      </g>
    </svg>
  );
}

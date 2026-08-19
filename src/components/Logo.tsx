import mark from "@/assets/oventric-mark.png.asset.json";
import { AnimatedMark } from "@/components/AnimatedMark";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "lg";
  /** Animate the RGB O into an envelope. Use selectively. */
  animated?: boolean;
  /** Whether to play the animation. When false, the mark sits in its final envelope state. */
  animate?: boolean;
  /** Unique suffix when more than one animated mark is on the page. */
  idSuffix?: string;
}

export function Logo({ className, size = "sm", animated = false, animate = true, idSuffix }: LogoProps) {
  const isLarge = size === "lg";
  const markClass = cn("shrink-0 object-contain", isLarge ? "h-14 w-14" : "h-9 w-9");

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      {animated ? (
        <AnimatedMark className={markClass} idSuffix={idSuffix} animate={animate} />
      ) : (
        <img src={mark.url} alt="Oventric Mail logo" className={markClass} />
      )}

      <span
        className={cn(
          "font-sans font-medium uppercase leading-none",
          isLarge ? "text-2xl tracking-[0.26em]" : "text-base tracking-[0.24em]",
        )}
      >
        <span className="text-foreground">Oventric</span>
        <span className={isLarge ? "inline-block w-4" : "inline-block w-3"} />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #F59E0B 0%, #F472B6 38%, #A855F7 70%, #22D3EE 100%)",
          }}
        >
          Mail
        </span>
      </span>
    </span>
  );
}

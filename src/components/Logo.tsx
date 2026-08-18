import mark from "@/assets/oventric-mark.png.asset.json";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "lg";
}

export function Logo({ className, size = "sm" }: LogoProps) {
  const isLarge = size === "lg";

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <img
        src={mark.url}
        alt="Oventric Mail logo"
        className={cn("shrink-0 object-contain", isLarge ? "h-14 w-14" : "h-9 w-9")}
      />
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

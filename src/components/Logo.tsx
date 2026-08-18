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
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif font-bold tracking-tight text-foreground",
            isLarge ? "text-3xl" : "text-xl",
          )}
        >
          Oventric
        </span>
        <span
          className={cn(
            "font-sans font-medium uppercase text-muted-foreground",
            isLarge ? "mt-1 text-[0.7rem] tracking-[0.62em]" : "mt-0.5 text-[0.55rem] tracking-[0.5em]",
          )}
        >
          Mail
        </span>
      </span>
    </span>
  );
}

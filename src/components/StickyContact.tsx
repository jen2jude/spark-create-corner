import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function StickyContact() {
  return (
    <Link
      to="/early-access"
      className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lift hover:-translate-y-0.5 sm:inline-flex"
    >
      Talk to us
      <ArrowUpRight className="h-4 w-4" />
    </Link>
  );
}

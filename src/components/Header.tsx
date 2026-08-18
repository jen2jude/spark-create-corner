import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const navLinks = [
  { href: "#workflow", label: "How it works" },
  { href: "#preview", label: "Product" },
  { href: "#features", label: "Features" },
  { href: "#audience", label: "For you" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 text-xs text-muted-foreground lg:px-8">
          <span className="font-medium uppercase tracking-[0.28em]">Oventric</span>
          <div className="flex items-center gap-6">
            <a href="#waitlist" className="hover:text-foreground">Early access</a>
            <a href="#waitlist" className="font-medium text-accent hover:opacity-80">Sign in</a>
          </div>
        </div>
      </div>

      <div className="border-b border-border/70 bg-hero/95 backdrop-blur supports-[backdrop-filter]:bg-hero/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-hero-muted md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-hero-foreground">
                {link.label}
              </a>
            ))}
          </nav>
          <Button className="hidden rounded-full px-5 sm:inline-flex" asChild>
            <a href="#waitlist">Request early access</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

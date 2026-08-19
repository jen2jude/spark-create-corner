import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "#product", label: "Product" },
  { href: "#workflow", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#audience", label: "For you" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="hidden border-b border-border bg-background sm:block">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 text-xs text-muted-foreground lg:px-8">
          <span className="font-medium uppercase tracking-[0.28em]">
            Oventric <span className="hidden sm:inline text-muted-foreground/70">· ecosystem</span>
          </span>

          <div className="flex items-center gap-6">
            <a href="#waitlist" className="hover:text-foreground">Early access</a>
            <a href="#waitlist" className="font-medium text-accent hover:opacity-80">Sign in</a>
          </div>
        </div>
      </div>

      <div className="border-b border-border/70 bg-hero/95 backdrop-blur supports-[backdrop-filter]:bg-hero/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" aria-label="Oventric Mail home" className="flex min-w-0 items-center gap-2">
            <Logo
              key={isHome ? "home" : "away"}
              animated
              animate={isHome}
              idSuffix="header"
            />
          </Link>

          <nav aria-label="Main" className="hidden min-w-0 items-center gap-5 text-sm font-medium text-hero-muted md:flex lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={isHome ? link.href : `/${link.href}`}
                className="hover:text-hero-foreground"
              >
                {link.label}
              </a>
            ))}
            <Link to="/strategist" className="hover:text-hero-foreground">
              Workspace
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button className="hidden rounded-full px-5 lg:inline-flex" asChild>
              <a href="#waitlist">Request early access</a>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  aria-expanded={open}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hero-muted/30 text-hero-foreground md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-sm px-6 py-8">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1 text-base font-medium text-foreground">
                  <Link
                    to="/strategist"
                    onClick={() => setOpen(false)}
                    className="border-b border-border py-3"
                  >
                    Workspace
                  </Link>
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={isHome ? link.href : `/${link.href}`}
                      onClick={() => setOpen(false)}
                      className="border-b border-border py-3 text-muted-foreground"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
                <Button className="mt-8 w-full rounded-full" asChild>
                  <a href="#waitlist" onClick={() => setOpen(false)}>
                    Request early access
                  </a>
                </Button>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

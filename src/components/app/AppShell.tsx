import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SideNav, Text } from "@/components/ds";
import { appNav } from "./app-nav";

function Sections({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  return (
    <div className="space-y-6" onClick={onNavigate}>
      {appNav.map((group) => (
        <div key={group.label} className="space-y-1.5">
          <Text variant="eyebrow" className="px-3">
            {group.label}
          </Text>
          <SideNav label={group.label} items={group.items} />
        </div>
      ))}
    </div>
  );
}

/**
 * Application chrome shared by every /app/* route.
 * One <main> landmark, one skip link, one navigation source of truth.
 */
export function AppShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string | undefined;
  actions?: ReactNode | undefined;
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background">
      <a
        href="#app-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
        <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open sections menu"
                className="min-h-11 min-w-11 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 overflow-y-auto p-6">
              <SheetTitle className="sr-only">Sections</SheetTitle>
              <Sections />
            </SheetContent>
          </Sheet>

          <Link to="/" aria-label="Oventric Mail home" className="shrink-0">
            <Logo />
          </Link>

          <div className="ml-auto flex items-center gap-2">{actions}</div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[100rem] gap-8 px-4 py-6 sm:px-6 lg:py-10">
        <aside className="hidden w-60 shrink-0 lg:block">
          <Sections />
        </aside>

        <main id="app-main" className="min-w-0 flex-1 space-y-8">
          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            {description ? <Text variant="muted">{description}</Text> : null}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Notice, Panel, Text } from "@/components/ds";

/**
 * Shared frame for /login and /signup.
 * Auth is not wired yet, so the forms are inert and say so plainly.
 */
export function AuthShell({
  title,
  intro,
  children,
  footer,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-muted/30">
      <header className="px-4 py-6 sm:px-8">
        <Link to="/" aria-label="Oventric Mail home" className="inline-flex">
          <Logo />
        </Link>
      </header>

      <main id="main" className="flex flex-1 items-start justify-center px-4 pb-16 sm:px-8">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">{title}</h1>
            <Text variant="muted">{intro}</Text>
          </div>

          <Notice tone="info" title="Early access">
            Accounts open when early access begins. Join the waitlist and we will invite you.
          </Notice>

          <Panel className="space-y-5">{children}</Panel>

          <div className="text-center text-sm text-muted-foreground">{footer}</div>
        </div>
      </main>
    </div>
  );
}

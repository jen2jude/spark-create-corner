import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Oventric. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

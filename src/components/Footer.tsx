export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold tracking-tight text-foreground">Oventric Mail</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Oventric. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyContact } from "@/components/StickyContact";

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main">{children}</main>
      <StickyContact />
      <Footer />
    </div>
  );
}

type PageIntroProps = {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  children?: ReactNode;
};

/** Editorial page masthead used by every marketing route below the home page. */
export function PageIntro({ eyebrow, title, lede, children }: PageIntroProps) {
  return (
    <section className="border-b border-border bg-hero px-6 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-hero-muted">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-hero-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
        </div>
        <div className="flex flex-col justify-end lg:pb-1">
          <span className="hidden h-px w-full bg-border lg:block" aria-hidden />
          <p className="max-w-md text-base leading-relaxed text-hero-muted lg:mt-6">{lede}</p>
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";

const steps = [
  {
    title: "Tell Oventric your goal",
    body: '"I want 500 registrations for my event."',
  },
  {
    title: "Build the strategy",
    body: "Oventric recommends campaign strategy and audience.",
  },
  {
    title: "Prepare the audience",
    body: "Import, segment and verify contacts.",
  },
  {
    title: "Create the campaign",
    body: "AI creates the copy, subject line, CTA and responsive email design.",
  },
  {
    title: "Protect delivery",
    body: "Oventric checks sender authentication, audience quality and campaign health.",
  },
  {
    title: "Preview before sending",
    body: "See exactly how the email will appear on desktop and mobile.",
  },
  {
    title: "Send and monitor",
    body: "Send immediately or schedule the campaign.",
  },
  {
    title: "Track what matters",
    body: "Measure delivery, opens, clicks, registrations and conversions.",
  },
  {
    title: "Follow up",
    body: "Identify leads and automatically recommend the next action.",
  },
  {
    title: "Understand the result",
    body: "Ask Oventric questions about the campaign and view the underlying analytics.",
  },
];

/** Tracks how far the list has scrolled through the viewport, 0 → 1, for the progress spine. */
function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // Start filling once the top enters the lower half of the viewport,
      // finish once the bottom passes the upper third — keeps the fill
      // roughly in sync with the steps actually being read.
      const start = viewportH * 0.85;
      const end = viewportH * 0.25;
      const total = rect.height + (start - end);
      const traveled = start - rect.top;
      const pct = Math.min(1, Math.max(0, traveled / total));
      setProgress(pct);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return progress;
}

/** Fades + lifts a step in once it enters the viewport. */
function useRevealed<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, revealed] as const;
}

function Step({ step, index }: { step: (typeof steps)[number]; index: number }) {
  const number = String(index + 1).padStart(2, "0");
  const [ref, revealed] = useRevealed<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className={`group relative flex gap-4 pl-14 transition-all duration-500 ease-out sm:gap-5 ${
        revealed ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
      style={{ transitionDelay: revealed ? `${Math.min(index, 5) * 60}ms` : "0ms" }}
    >
      <div className="absolute left-0 top-0.5 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card text-[0.625rem] font-bold text-foreground shadow-soft transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
        {index + 1}
      </div>

      <div className="w-full rounded-xl border border-border bg-background px-4 py-3.5 shadow-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-accent/30 group-hover:shadow-lift">
        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-accent">
          Step {number}
        </p>
        <h3 className="mt-1 font-serif text-base font-semibold leading-snug text-foreground sm:text-lg">
          {step.title}
        </h3>
        <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground sm:text-sm">
          {step.body}
        </p>
      </div>
    </li>
  );
}

export function FromIdeaToResult() {
  const listRef = useRef<HTMLOListElement>(null);
  const progress = useScrollProgress(listRef);

  return (
    <section id="workflow" className="border-t border-border bg-card px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="The journey"
          title="From an idea to a measurable result."
          lede="Oventric carries your goal through every stage that stands between an audience and an outcome — with your judgement in the loop at each step."
          meta="Ten steps, one goal"
        />

        <div className="relative mt-14">
          {/* Base spine */}
          <div className="absolute left-3.5 top-0 h-full w-px bg-border" aria-hidden />
          {/* Progress spine — fills as the list scrolls through view */}
          <div
            className="absolute left-3.5 top-0 w-px bg-accent transition-[height] duration-150 ease-out"
            style={{ height: `${progress * 100}%` }}
            aria-hidden
          />

          <ol ref={listRef} className="relative space-y-3">
            {steps.map((step, index) => (
              <Step key={step.title} step={step} index={index} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

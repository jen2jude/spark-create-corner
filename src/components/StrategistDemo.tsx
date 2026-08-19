import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Dimension = { label: string; value: string; detail: string };

type Scenario = {
  id: string;
  prompt: string;
  chip: string;
  reading: string;
  dimensions: Dimension[];
};

const scenarios: Scenario[] = [
  {
    id: "event",
    chip: "Event registrations",
    prompt: "I want to get 500 registrations for my upcoming event.",
    reading:
      "This is a registration target with a deadline, not a newsletter. I will work backwards from 500 confirmed seats, allow for drop-off, and plan a sequence rather than a single send.",
    dimensions: [
      {
        label: "Campaign objective",
        value: "500 confirmed registrations before the event date",
        detail:
          "Treated as a conversion goal with a deadline. At a 9% registration rate you need roughly 5,600 reachable contacts, so the plan covers reach and reminders — not one send.",
      },
      {
        label: "Audience",
        value: "5,600 reachable contacts across three sources",
        detail:
          "Past attendees, engaged subscribers from the last 180 days, and event-page visitors who never registered. Unengaged and unverified addresses are held back to protect deliverability.",
      },
      {
        label: "Segmentation",
        value: "Four segments, each with a different argument",
        detail:
          "Past attendees (return invitation), warm subscribers (first invitation), page visitors (finish what you started), and colder contacts (a lighter, one-touch invitation only).",
      },
      {
        label: "Email strategy",
        value: "Three-touch invitation sequence, not a blast",
        detail:
          "Invitation, agenda and speaker proof, then a closing seats-remaining reminder. Non-openers get a resend with a new subject line instead of a duplicate email.",
      },
      {
        label: "Call to action",
        value: "Reserve my seat — one action per email",
        detail:
          "A single primary CTA above the fold and repeated once at the end. Registration friction is reduced by pre-filling known contact details on the form link.",
      },
      {
        label: "Content",
        value: "Reason to attend, then proof, then urgency",
        detail:
          "Outcome-led subject lines, a short agenda block, one speaker or testimonial as proof, and date, time, and location written for a preview pane on a phone.",
      },
      {
        label: "Timing",
        value: "T-14, T-6, T-2 days, sent 09:40 local",
        detail:
          "Spaced so each email has a different job. Send windows are chosen per segment from their own past open behaviour, and the final reminder avoids the weekend.",
      },
      {
        label: "Tracking",
        value: "Registrations attributed, not just opens",
        detail:
          "Unique clicks, registration completions, and drop-off between click and confirmation, all tied back to the 500-seat goal with per-segment breakdowns.",
      },
      {
        label: "Follow-up",
        value: "Two branches: clicked but did not register, and registered",
        detail:
          "Clicked-not-registered contacts receive a short recovery email. Registrants move to a confirmation and attendance-reminder track so seats convert into turnout.",
      },
      {
        label: "Analytics",
        value: "Progress to target, updated per send",
        detail:
          "A running count against 500, cost per registration if paid reach is used, and which segment and message produced the seats — carried into your next event.",
      },
    ],
  },
  {
    id: "sales",
    chip: "Product launch sales",
    prompt: "We are launching a new product and need it to actually sell in the first two weeks.",
    reading:
      "The objective is revenue in a fixed window. I will separate buyers who need information from buyers who need a reason to act now, and protect the list from launch fatigue.",
    dimensions: [
      {
        label: "Campaign objective",
        value: "Revenue within a 14-day launch window",
        detail:
          "Measured in orders and revenue, with a secondary goal of qualified interest for slower buyers who will not purchase in week one.",
      },
      {
        label: "Audience",
        value: "Existing customers first, then engaged subscribers",
        detail:
          "Prior purchasers convert first, so they receive early access. Never-engaged contacts are excluded from launch week to keep sender reputation intact.",
      },
      {
        label: "Segmentation",
        value: "Buyers, browsers, lapsed customers",
        detail:
          "Segments are built from purchase history and recent engagement, each with a different offer emphasis: loyalty, discovery, or a reason to return.",
      },
      {
        label: "Email strategy",
        value: "Announce, demonstrate, answer objections, close",
        detail:
          "Four planned sends with a mid-launch branch: buyers exit the sequence immediately so they are never sold something they already own.",
      },
      {
        label: "Call to action",
        value: "Buy now for warm segments, learn more for cold",
        detail:
          "The CTA changes by intent instead of pushing the same button at everyone. Each link carries campaign and segment parameters for attribution.",
      },
      {
        label: "Content",
        value: "Problem, product, proof, price clarity",
        detail:
          "One benefit per email, product imagery placed where it survives image blocking, and pricing stated plainly to reduce click-then-abandon behaviour.",
      },
      {
        label: "Timing",
        value: "Day 1, 3, 7, 13 — early access 24 hours ahead",
        detail:
          "Front-loaded while attention is high, with the closing email timed against the deadline rather than a fixed weekly slot.",
      },
      {
        label: "Tracking",
        value: "Orders and revenue per email, not just clicks",
        detail:
          "Click-to-order rate, revenue per recipient, and unsubscribes monitored per send so the sequence can be stopped early if fatigue appears.",
      },
      {
        label: "Follow-up",
        value: "Abandoned checkout and high-intent non-buyers",
        detail:
          "Contacts who clicked pricing twice but did not buy receive a single, specific follow-up; everyone else returns to the normal nurture cadence.",
      },
      {
        label: "Analytics",
        value: "Which segment and message produced revenue",
        detail:
          "Launch performance broken down by segment, message, and send time, kept as a benchmark you can ask questions about before the next launch.",
      },
    ],
  },
  {
    id: "retention",
    chip: "Renewals and retention",
    prompt: "Our members are drifting away. I want more of them to renew this quarter.",
    reading:
      "This is a retention problem before it is an email problem. I will find where members disengage, then send to the people whose behaviour says they are at risk.",
    dimensions: [
      {
        label: "Campaign objective",
        value: "Lift quarterly renewal rate among at-risk members",
        detail:
          "Success is renewals from members who were predicted not to renew, measured against your current baseline rather than open rates.",
      },
      {
        label: "Audience",
        value: "Members with declining engagement and near renewal",
        detail:
          "Built from time since last interaction, usage or attendance signals, and renewal date, so the campaign reaches people while the decision is still open.",
      },
      {
        label: "Segmentation",
        value: "Quietly at risk, actively disengaged, and advocates",
        detail:
          "Each group gets a different conversation: reminder of value, a direct ask about what changed, or a referral request for the members already happy.",
      },
      {
        label: "Email strategy",
        value: "Value recap, then a human check-in",
        detail:
          "A short summary of what the member gained, followed by a plainly written check-in from a person, with renewal made a two-click action.",
      },
      {
        label: "Call to action",
        value: "Renew my membership, or tell us what changed",
        detail:
          "A reply-based CTA for disengaged members surfaces the real objection instead of forcing a decision they are not ready to make.",
      },
      {
        label: "Content",
        value: "Personal, specific, and short",
        detail:
          "Member-specific details where available, no promotional styling for the check-in email, and benefits framed as what they would lose access to.",
      },
      {
        label: "Timing",
        value: "45 and 14 days before each renewal date",
        detail:
          "Triggered per member rather than sent as one broadcast, so timing follows each renewal date instead of the calendar.",
      },
      {
        label: "Tracking",
        value: "Renewals, replies, and cancellations",
        detail:
          "Renewal completions, reply sentiment captured as a lead signal, and cancellation reasons collected where members choose to give them.",
      },
      {
        label: "Follow-up",
        value: "Replies become leads with an owner and next action",
        detail:
          "Anyone who replies or clicks but does not renew becomes a follow-up task with context attached, rather than a lost thread in an inbox.",
      },
      {
        label: "Analytics",
        value: "Retention lift and revenue saved",
        detail:
          "Renewal rate versus baseline, revenue retained, and the earliest signals that predicted churn — reused to trigger the next cycle sooner.",
      },
    ],
  },
];

type Phase = "idle" | "reading" | "planning" | "done";

export function StrategistDemo() {
  const [active, setActive] = useState(0);
  const [input, setInput] = useState(scenarios[0]!.prompt);
  const [submitted, setSubmitted] = useState<string>(scenarios[0]!.prompt);
  const [phase, setPhase] = useState<Phase>("idle");
  const [revealed, setRevealed] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const scenario = scenarios[active] ?? scenarios[0]!;
  const total = scenario.dimensions.length;

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const sectionRef = useRef<HTMLElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !started.current) {
          started.current = true;
          run(0, scenarios[0]!.prompt);
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const run = (index: number, prompt: string) => {
    clearTimers();
    setActive(index);
    setSubmitted(prompt);
    setInput(prompt);
    setRevealed(0);
    setOpen(0);
    setPhase("reading");

    const push = (fn: () => void, ms: number) => {
      timers.current.push(setTimeout(fn, ms));
    };

    push(() => setPhase("planning"), 900);
    const count = scenarios[index]!.dimensions.length;
    for (let i = 1; i <= count; i += 1) {
      push(() => setRevealed(i), 900 + i * 260);
    }
    push(() => setPhase("done"), 900 + count * 260 + 200);
  };

  const statusLabel = useMemo(() => {
    if (phase === "idle") return "Waiting for an objective";
    if (phase === "reading") return "Reading the objective";
    if (phase === "planning") return `Building the plan · ${revealed} of ${total}`;
    return `Plan ready · ${total} decisions`;
  }, [phase, revealed, total]);

  return (
    <section ref={sectionRef} id="strategist" className="border-t border-border bg-secondary px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
            The conversation
          </p>
          <h2 className="mt-5 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Say the outcome. Get a strategist&apos;s plan.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Oventric Mail reads a business objective rather than a request for an email. It works out
            the audience, the segmentation, the sequence, the timing, the measurement, and the
            follow-up — and shows you the reasoning behind each one.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Your objective
              </p>
              <form
                className="mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const value = input.trim();
                  if (!value) return;
                  run(active, value);
                }}
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  aria-label="Describe what you want to achieve"
                  placeholder="I want to get 500 registrations for my upcoming event."
                  className="h-11 text-sm"
                />
                <Button type="submit" className="mt-3 w-full">
                  Plan this campaign
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <p className="mt-6 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Or try an objective
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {scenarios.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => run(i, s.prompt)}
                    className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                      i === active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                    }`}
                  >
                    {s.chip}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-[0.625rem] font-semibold uppercase tracking-wide text-muted-foreground">
                  You
                </span>
                <p className="text-sm leading-relaxed text-foreground">&ldquo;{submitted}&rdquo;</p>
              </div>

              <div className="mt-5 border-t border-border pt-5">
                <div className="flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-accent">
                  {phase === "reading" || phase === "planning" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Check className="h-3.5 w-3.5" />
                  )}
                  <span>Oventric Mail</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {phase === "idle"
                    ? "Describe an outcome — registrations, sales, renewals, attendance — and I will work out how to get there before anything is written."
                    : scenario.reading}
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between border-b border-foreground/15 pb-3">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-foreground">
                The plan
              </p>
              <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
                {statusLabel}
              </p>
            </div>

            <ul>
              {scenario.dimensions.map((dimension, i) => {
                const shown = i < revealed;
                const isOpen = open === i && shown;
                return (
                  <li key={dimension.label} className="border-b border-border">
                    <button
                      type="button"
                      disabled={!shown}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className={`flex w-full items-baseline gap-4 py-4 text-left transition-opacity duration-500 ${
                        shown ? "opacity-100" : "opacity-25"
                      }`}
                      aria-expanded={isOpen}
                    >
                      <span className="w-6 shrink-0 font-serif text-sm text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="w-[9.5rem] shrink-0 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {dimension.label}
                      </span>
                      <span className="flex-1 text-sm leading-relaxed text-foreground">
                        {shown ? dimension.value : "Pending"}
                      </span>
                    </button>
                    {isOpen ? (
                      <p className="animate-fade-in pb-5 pl-[2rem] text-sm leading-relaxed text-muted-foreground sm:pl-[12.5rem]">
                        {dimension.detail}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Every line is a decision you can question, edit, or reject. Nothing is written or sent
              until the plan reads the way a strategist you trust would have written it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

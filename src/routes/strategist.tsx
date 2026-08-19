import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Check, Loader2, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { planCampaign } from "@/lib/strategist.functions";

type PlanDimension = { key: string; summary: string; detail: string };
type CampaignPlan = { reading: string; reply: string; dimensions: PlanDimension[] };
type Turn = { role: "user" | "assistant"; content: string };

const DIMENSION_LABELS: Record<string, string> = {
  objective: "Campaign objective",
  audience: "Audience",
  segmentation: "Segmentation",
  strategy: "Email strategy",
  cta: "Call to action",
  content: "Content",
  timing: "Timing",
  tracking: "Tracking",
  followup: "Follow-up",
  analytics: "Analytics",
};

const starters = [
  "I want to get 500 registrations for my upcoming event.",
  "We are launching a new product and need sales in the first two weeks.",
  "Our members are drifting away. I want more of them to renew this quarter.",
];

export const Route = createFileRoute("/strategist")({
  head: () => ({
    meta: [
      { title: "Campaign Strategist — Oventric Mail" },
      {
        name: "description",
        content:
          "Describe a business objective and Oventric Mail decides the audience, segmentation, sequence, timing, tracking, follow-up, and analytics for the campaign.",
      },
      { property: "og:title", content: "Campaign Strategist — Oventric Mail" },
      {
        property: "og:description",
        content:
          "State the outcome you want. Oventric Mail builds the campaign plan and shows the reasoning behind every decision.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StrategistPage,
});

function StrategistPage() {
  const submitPlan = useServerFn(planCampaign);
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [plan, setPlan] = useState<CampaignPlan | null>(null);
  const [open, setOpen] = useState<string | null>("objective");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const threadRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, pending]);

  const send = async (objective: string) => {
    const trimmed = objective.trim();
    if (!trimmed || pending) return;
    setError(null);
    setInput("");
    const history = turns;
    setTurns([...history, { role: "user", content: trimmed }]);
    setPending(true);
    try {
      const result = await submitPlan({
        data: { objective: trimmed, history, currentPlan: plan },
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setPlan(result.plan as CampaignPlan);
      setTurns((prev) => [...prev, { role: "assistant", content: result.plan.reply }]);
      setOpen("objective");
    } catch {
      setError("The strategist could not be reached. Please try again in a moment.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-6 py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
              Campaign strategist
            </p>
            <h1 className="mt-5 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Describe the outcome you want
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              State a business objective, not an email request. Oventric Mail decides the audience,
              segmentation, sequence, timing, measurement, and follow-up — and shows the reasoning
              behind each decision, so you can change it before anything is written.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-border bg-card shadow-soft">
                <div
                  ref={threadRef}
                  className="max-h-[22rem] space-y-5 overflow-y-auto px-6 py-6"
                >
                  {turns.length === 0 ? (
                    <div className="text-sm leading-relaxed text-muted-foreground">
                      <p className="flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-accent">
                        <Sparkles className="h-3.5 w-3.5" />
                        Oventric Mail
                      </p>
                      <p className="mt-3">
                        Tell me what you are trying to achieve — registrations, sales, renewals,
                        attendance, reactivation — and I will work out how to get there before
                        anything is written.
                      </p>
                    </div>
                  ) : null}

                  {turns.map((turn, i) => (
                    <div key={`${turn.role}-${i}`} className="text-sm leading-relaxed">
                      <p
                        className={`text-[0.6875rem] font-medium uppercase tracking-[0.22em] ${
                          turn.role === "user" ? "text-muted-foreground" : "text-accent"
                        }`}
                      >
                        {turn.role === "user" ? "You" : "Oventric Mail"}
                      </p>
                      <p
                        className={`mt-2 ${
                          turn.role === "user" ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {turn.content}
                      </p>
                    </div>
                  ))}

                  {pending ? (
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin text-accent" />
                      Working out the strategy…
                    </p>
                  ) : null}
                </div>

                <form
                  className="border-t border-border p-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void send(input);
                  }}
                >
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void send(input);
                      }
                    }}
                    rows={3}
                    aria-label="Describe your objective"
                    placeholder={
                      plan
                        ? "Refine it — change the audience, the timing, the offer…"
                        : "I want to get 500 registrations for my upcoming event."
                    }
                    className="resize-none text-sm"
                  />
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="text-xs text-muted-foreground">Enter to send</p>
                    <Button type="submit" disabled={pending || !input.trim()}>
                      {plan ? "Update plan" : "Build the plan"}
                      <ArrowUp className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>

              {error ? (
                <p role="alert" className="mt-4 text-sm text-destructive">
                  {error}
                </p>
              ) : null}

              {turns.length === 0 ? (
                <div className="mt-6">
                  <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                    Try an objective
                  </p>
                  <div className="mt-3 space-y-2">
                    {starters.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => void send(s)}
                        className="block w-full rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-foreground/15 pb-3">
                <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-foreground">
                  The plan
                </p>
                <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {pending
                    ? "Deciding"
                    : plan
                      ? "10 decisions · editable"
                      : "Waiting for an objective"}
                </p>
              </div>

              {plan?.reading ? (
                <p className="animate-fade-in border-b border-border py-5 text-sm leading-relaxed text-muted-foreground">
                  {plan.reading}
                </p>
              ) : null}

              <ul>
                {Object.keys(DIMENSION_LABELS).map((key, i) => {
                  const dimension = plan?.dimensions.find((d) => d.key === key);
                  const isOpen = open === key && Boolean(dimension);
                  return (
                    <li key={key} className="border-b border-border">
                      <button
                        type="button"
                        disabled={!dimension}
                        onClick={() => setOpen(isOpen ? null : key)}
                        aria-expanded={isOpen}
                        className={`flex w-full items-baseline gap-4 py-4 text-left transition-opacity duration-500 ${
                          dimension ? "opacity-100" : "opacity-30"
                        }`}
                      >
                        <span className="w-6 shrink-0 font-serif text-sm text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="w-[9.5rem] shrink-0 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                          {DIMENSION_LABELS[key]}
                        </span>
                        <span className="flex-1 text-sm leading-relaxed text-foreground">
                          {dimension ? dimension.summary : "Pending"}
                        </span>
                        {dimension ? (
                          <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />
                        ) : null}
                      </button>
                      {isOpen && dimension?.detail ? (
                        <p className="animate-fade-in pb-5 pl-[2rem] text-sm leading-relaxed text-muted-foreground sm:pl-[12.5rem]">
                          {dimension.detail}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Every line is a decision you can question or change. Reply in the conversation to
                revise the plan — nothing is written or sent until it reads the way you want.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

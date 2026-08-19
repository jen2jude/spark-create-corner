import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, Check, Columns2, LayoutPanelTop, Loader2, MessageSquare, Sparkles } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CampaignWorkspacePanel } from "@/components/CampaignWorkspacePanel";
import { planCampaign } from "@/lib/strategist.functions";
import type { CampaignPlan, StrategistTurn } from "@/lib/strategist.types";
import { useIsMobile } from "@/hooks/use-mobile";

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

type View = "split" | "conversation" | "workspace";
type VisualTab = "campaign" | "decisions";

const views: { id: View; label: string; icon: typeof Columns2 }[] = [
  { id: "conversation", label: "Conversation", icon: MessageSquare },
  { id: "split", label: "Split", icon: Columns2 },
  { id: "workspace", label: "Workspace", icon: LayoutPanelTop },
];

export const Route = createFileRoute("/strategist")({
  head: () => ({
    meta: [
      { title: "Campaign Workspace — Oventric Mail" },
      {
        name: "description",
        content:
          "Talk to Oventric Mail on one side and watch the campaign build on the other: audience, sequence, email drafts, tracking, and deliverability.",
      },
      { property: "og:title", content: "Campaign Workspace — Oventric Mail" },
      {
        property: "og:description",
        content:
          "A split workspace: conversation on one side, the campaign Oventric Mail is building on the other. Toggle between them at any time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StrategistPage,
});

function StrategistPage() {
  const submitPlan = useServerFn(planCampaign);
  const isMobile = useIsMobile();
  const [input, setInput] = useState("");
  const [turns, setTurns] = useState<StrategistTurn[]>([]);
  const [plan, setPlan] = useState<CampaignPlan | null>(null);
  const [open, setOpen] = useState<string | null>("objective");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<View>("split");
  const [tab, setTab] = useState<VisualTab>("campaign");
  const threadRef = useRef<HTMLDivElement | null>(null);

  // Mobile is conversation-first: the split surface is a desktop/tablet affordance.
  useEffect(() => {
    if (isMobile && view === "split") setView("conversation");
  }, [isMobile, view]);

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
      setTab("campaign");
    } catch {
      setError("The strategist could not be reached. Please try again in a moment.");
    } finally {
      setPending(false);
    }
  };

  const showConversation = view !== "workspace";
  const showVisual = view !== "conversation";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
                Campaign workspace
              </p>
              <h1 className="mt-4 font-serif text-[1.75rem] font-bold leading-tight tracking-tight text-foreground sm:mt-5 sm:text-4xl">
                Describe the outcome you want
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Talk on one side, watch the campaign build on the other. Oventric Mail decides the
                audience, segmentation, sequence, timing, and follow-up — then writes the emails, so
                you can read exactly what it made and change it in words.
              </p>
            </div>

            <div
              role="group"
              aria-label="Workspace view"
              className="flex w-full rounded-full border border-border bg-card p-1 sm:w-auto"
            >
              {views
                .filter((v) => !(isMobile && v.id === "split"))
                .map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setView(v.id)}
                    aria-pressed={view === v.id}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-colors sm:flex-none sm:px-4 ${
                      view === v.id
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <v.icon className="h-3.5 w-3.5 shrink-0" />
                    {v.label}
                  </button>
                ))}
            </div>
          </div>

          <div
            className={`mt-8 grid gap-8 sm:mt-12 lg:gap-14 ${
              view === "split" ? "lg:grid-cols-[0.85fr_1.15fr]" : "grid-cols-1"
            }`}
          >
            {showConversation ? (
              <div className={view === "split" ? "lg:sticky lg:top-28 lg:self-start" : "mx-auto w-full max-w-2xl"}>
                <div className="rounded-2xl border border-border bg-card shadow-soft">
                  <div
                    ref={threadRef}
                    className={`space-y-5 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 ${
                      view === "conversation" ? "max-h-[60vh] sm:max-h-[32rem]" : "max-h-[22rem]"
                    }`}
                  >
                    {turns.length === 0 ? (
                      <div className="text-sm leading-relaxed text-muted-foreground">
                        <p className="flex items-center gap-2 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-accent">
                          <Sparkles className="h-3.5 w-3.5" />
                          Oventric Mail
                        </p>
                        <p className="mt-3">
                          Tell me what you are trying to achieve — registrations, sales, renewals,
                          attendance, reactivation — and I will work out how to get there, then write
                          it. You can ask me to change anything, including the tone.
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
                          ? "Make the email more professional. Shorten the introduction…"
                          : "I want to get 500 registrations for my upcoming event."
                      }
                      className="resize-none text-sm"
                    />
                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="hidden text-xs text-muted-foreground sm:block">Enter to send</p>
                      <Button type="submit" disabled={pending || !input.trim()} className="w-full sm:w-auto">
                        {plan ? "Update campaign" : "Build the campaign"}
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

                {plan && view === "conversation" ? (
                  <button
                    type="button"
                    onClick={() => setView("workspace")}
                    className="mt-4 w-full rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-foreground/40 sm:w-auto sm:border-0 sm:bg-transparent sm:p-0"
                  >
                    <span className="block text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-foreground sm:hidden">
                      Campaign status
                    </span>
                    <span className="mt-1.5 block truncate text-sm font-medium text-foreground sm:hidden">
                      {plan.workspace?.campaignName ?? "Campaign ready"}
                    </span>
                    <span className="mt-1.5 block text-sm font-medium text-accent">
                      See what Oventric built →
                    </span>
                  </button>
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
            ) : null}

            {showVisual ? (
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6">
                  <div className="flex gap-6 border-b border-border">
                    {(
                      [
                        { id: "campaign" as VisualTab, label: "Campaign" },
                        { id: "decisions" as VisualTab, label: "Decisions" },
                      ]
                    ).map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTab(t.id)}
                        aria-pressed={tab === t.id}
                        className={`-mb-px border-b-2 pb-3 text-[0.6875rem] font-medium uppercase tracking-[0.22em] transition-colors ${
                          tab === t.id
                            ? "border-foreground text-foreground"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {pending
                      ? "Building"
                      : plan
                        ? "10 decisions · editable in words"
                        : "Waiting for an objective"}
                  </p>
                </div>

                {tab === "campaign" ? (
                  <CampaignWorkspacePanel workspace={plan?.workspace ?? null} pending={pending} />
                ) : (
                  <div>
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
                      Every line is a decision you can question or change. Reply in the conversation
                      to revise it — nothing is sent until it reads the way you want.
                    </p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

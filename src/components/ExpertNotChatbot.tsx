import { SectionHeader } from "@/components/SectionHeader";
import { AiMessage } from "@/components/ds/AiMessage";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

/**
 * Conversational philosophy section: the AI behaves like a strategist who
 * arrives with a recommendation, not a chatbot waiting to be prompted.
 */
export function ExpertNotChatbot() {
  return (
    <section id="philosophy" className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Expert, not chatbot"
          title="You don't need to know what to build. Just explain what you want."
          lede="Oventric listens like a strategist, then proposes a campaign you can review, adjust and send."
          meta="Conversational campaign planning"
        />

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-10">
            <div className="space-y-5">
              <AiMessage role="user">
                I haven't emailed my customers in three months. What should I send them?
              </AiMessage>

              <AiMessage role="assistant">
                <p>I recommend a re-engagement campaign before promoting a product.</p>
                <p className="mt-2">
                  You have 4,218 contacts who haven't engaged recently. I can create a
                  three-step re-engagement sequence and exclude contacts who have
                  unsubscribed or recently purchased.
                </p>
              </AiMessage>
            </div>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button className="gap-2">
                <Sparkles className="h-4 w-4" aria-hidden />
                Build this campaign
              </Button>
              <p className="text-xs text-muted-foreground">
                Preview only — no campaign will be sent.
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm leading-relaxed text-muted-foreground">
            This is intelligent recommendation: Oventric brings context, audience insight and
            a proposed next step — then lets you decide.
          </p>
        </div>
      </div>
    </section>
  );
}

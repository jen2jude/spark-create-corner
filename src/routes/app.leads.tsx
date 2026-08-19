import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SectionPlaceholder } from "@/components/app/SectionPlaceholder";

export const Route = createFileRoute("/app/leads")({
  head: () => ({
    meta: [
      { title: "Leads — Oventric Mail" },
      {
        name: "description",
        content: "The people worth following up, ranked by the intent signals they have shown.",
      },
      { property: "og:title", content: "Leads — Oventric Mail" },
      {
        property: "og:description",
        content: "Turn engagement into a short list of people to contact next.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LeadsPage,
});

function LeadsPage() {
  return (
    <AppShell
      title="Leads"
      description="Engagement turned into a short list: who to contact, and why them."
    >
      <SectionPlaceholder
        purpose="Leads converts campaign behaviour into intent. Each lead states the signals behind its ranking, so follow-up is a decision rather than a guess."
        planned={[
          { label: "Intent scoring", description: "Ranking based on real behaviour, with reasons shown." },
          { label: "Lead detail", description: "Full engagement history for one person." },
          { label: "Handover", description: "Send qualified leads to your sales process." },
        ]}
      />
    </AppShell>
  );
}

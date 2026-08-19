import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SectionPlaceholder } from "@/components/app/SectionPlaceholder";

export const Route = createFileRoute("/app/automations")({
  head: () => ({
    meta: [
      { title: "Automations — Oventric Mail" },
      {
        name: "description",
        content: "Follow-up and nurture sequences that continue without manual sending.",
      },
      { property: "og:title", content: "Automations — Oventric Mail" },
      {
        property: "og:description",
        content: "Describe the follow-up you want; the sequence is built and stays editable.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AutomationsPage,
});

function AutomationsPage() {
  return (
    <AppShell
      title="Automations"
      description="Nurture that keeps working after the campaign is sent."
    >
      <SectionPlaceholder
        purpose="Automations run the follow-up half of the chain: triggers, waiting periods, and branches described in plain language before any diagram."
        planned={[
          { label: "Triggers", description: "Behaviour and dates that start a sequence." },
          { label: "Sequence steps", description: "Emails, waits, and conditions in one readable path." },
          { label: "Live monitoring", description: "Who is in the sequence, and where." },
        ]}
      />
    </AppShell>
  );
}

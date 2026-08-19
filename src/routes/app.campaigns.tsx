import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SectionPlaceholder } from "@/components/app/SectionPlaceholder";

export const Route = createFileRoute("/app/campaigns")({
  head: () => ({
    meta: [
      { title: "Campaigns — Oventric Mail" },
      {
        name: "description",
        content: "Every campaign, the stage it has reached, and what it is waiting on.",
      },
      { property: "og:title", content: "Campaigns — Oventric Mail" },
      {
        property: "og:description",
        content: "Track campaigns from draft to revenue in one list.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CampaignsPage,
});

function CampaignsPage() {
  return (
    <AppShell
      title="Campaigns"
      description="Everything you have planned, sent, or paused — with the next action stated in plain language."
    >
      <SectionPlaceholder
        purpose="Campaigns is the operational list: status, audience, schedule, and results for each campaign, with the blocking step named for you."
        planned={[
          { label: "Campaign list", description: "Status, audience, schedule, and owner at a glance." },
          { label: "Campaign detail", description: "Sequence, drafts, and per-step performance." },
          { label: "Duplicate and reuse", description: "Start from a campaign that already worked." },
        ]}
      />
    </AppShell>
  );
}

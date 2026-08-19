import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SectionPlaceholder } from "@/components/app/SectionPlaceholder";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Oventric Mail" },
      {
        name: "description",
        content: "What happened in your campaigns, why it happened, and the next sensible move.",
      },
      { property: "og:title", content: "Analytics — Oventric Mail" },
      {
        property: "og:description",
        content: "Restrained charts with a written reading beside them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <AppShell
      title="Analytics"
      description="Performance with a narrative: what happened, why, and what to do next."
    >
      <SectionPlaceholder
        purpose="Analytics reports the full chain — delivery, engagement, conversion, and revenue — with a written reading next to every chart."
        planned={[
          { label: "Campaign performance", description: "Delivery, opens, clicks, and conversions over time." },
          { label: "Revenue attribution", description: "Which campaigns produced outcomes worth repeating." },
          { label: "Comparisons", description: "Campaign against campaign, period against period." },
        ]}
      />
    </AppShell>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SectionPlaceholder } from "@/components/app/SectionPlaceholder";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Oventric Mail" },
      {
        name: "description",
        content: "Senders, authentication, audience rules, and the advanced controls behind them.",
      },
      { property: "og:title", content: "Settings — Oventric Mail" },
      {
        property: "og:description",
        content: "Simple by default, powerful when needed: every control stays reachable.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      description="Sensible defaults you can override — nothing is hidden permanently."
    >
      <SectionPlaceholder
        purpose="Settings is where professional users take manual control: senders, authentication, sending windows, audience rules, tracking, and team access."
        planned={[
          { label: "Workspace and team", description: "Members, roles, and access." },
          { label: "Sending configuration", description: "Senders, domains, windows, and rate limits." },
          { label: "Advanced overrides", description: "Manual control of anything the AI decides by default." },
        ]}
      />
    </AppShell>
  );
}

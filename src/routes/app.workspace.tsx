import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SectionPlaceholder } from "@/components/app/SectionPlaceholder";
import { Button, Panel, PanelHeader, Text } from "@/components/ds";

export const Route = createFileRoute("/app/workspace")({
  head: () => ({
    meta: [
      { title: "AI Workspace — Oventric Mail" },
      {
        name: "description",
        content:
          "Describe the outcome you want and watch the campaign take shape beside the conversation.",
      },
      { property: "og:title", content: "AI Workspace — Oventric Mail" },
      {
        property: "og:description",
        content: "Conversation on one side, the campaign being built on the other.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkspacePage,
});

function WorkspacePage() {
  return (
    <AppShell
      title="Workspace"
      description="Say what outcome you want. The campaign is assembled next to the conversation, and nothing sends without your approval."
    >
      <SectionPlaceholder
        purpose="The workspace is where strategy becomes a campaign: objective, audience, sequence, drafts, tracking, and delivery in one adaptive surface."
        planned={[
          { label: "Saved workspaces", description: "Return to any campaign conversation in progress." },
          { label: "Inline editing", description: "Edit drafts, audience rules, and timing without leaving the thread." },
          { label: "Approval and send", description: "Review the whole plan, then approve delivery." },
        ]}
      >
        <Panel>
          <PanelHeader
            title="Available now"
            description="The early-access strategist prototype runs the conversation-plus-workspace model."
          />
          <Text className="mb-4">
            Open the prototype to plan a campaign end to end and see the split surface in action.
          </Text>
          <Button asChild className="rounded-full">
            <Link to="/strategist">Open the strategist prototype</Link>
          </Button>
        </Panel>
      </SectionPlaceholder>
    </AppShell>
  );
}

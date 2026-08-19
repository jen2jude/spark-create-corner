import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SectionPlaceholder } from "@/components/app/SectionPlaceholder";

export const Route = createFileRoute("/app/audience")({
  head: () => ({
    meta: [
      { title: "Audience — Oventric Mail" },
      {
        name: "description",
        content: "Contacts, segments, and the rules that decide who receives which campaign.",
      },
      { property: "og:title", content: "Audience — Oventric Mail" },
      {
        property: "og:description",
        content: "Build segments in plain language and keep contact data clean.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AudiencePage,
});

function AudiencePage() {
  return (
    <AppShell
      title="Audience"
      description="Who you can reach, how they are grouped, and why each group exists."
    >
      <SectionPlaceholder
        purpose="Audience holds contacts and segments. Segments are described in plain language first; the underlying rules stay editable for advanced users."
        planned={[
          { label: "Contact import", description: "Bring in a list and map fields with guidance." },
          { label: "Plain-language segments", description: "Describe a group; the rules are written for you." },
          { label: "Suppression and consent", description: "Unsubscribes and bounces honoured everywhere." },
        ]}
      />
    </AppShell>
  );
}

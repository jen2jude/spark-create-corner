import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SectionPlaceholder } from "@/components/app/SectionPlaceholder";

export const Route = createFileRoute("/app/verification")({
  head: () => ({
    meta: [
      { title: "Verification — Oventric Mail" },
      {
        name: "description",
        content: "Address quality and sender authentication, explained in plain language.",
      },
      { property: "og:title", content: "Verification — Oventric Mail" },
      {
        property: "og:description",
        content: "Guided checks that get your email delivered, with technical detail on demand.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VerificationPage,
});

function VerificationPage() {
  return (
    <AppShell
      title="Verification"
      description="Checks that decide whether your email arrives — guided first, technical detail folded away."
    >
      <SectionPlaceholder
        purpose="Verification covers address quality and sender authentication. Each item reads as a task with an outcome; DNS records live behind an Advanced disclosure."
        planned={[
          { label: "Address quality", description: "Risky and invalid addresses flagged before you send." },
          { label: "Sender setup", description: "Guided domain and sender verification." },
          { label: "Authentication", description: "SPF, DKIM, and DMARC handled step by step." },
        ]}
      />
    </AppShell>
  );
}

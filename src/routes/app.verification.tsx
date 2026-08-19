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
        purpose="Verification covers everything that decides whether your email arrives: proving the domain is yours, sending to real addresses, sending at a trusted pace, and responding to what comes back. Each item reads as a task with an outcome, and the technical names (SPF, DKIM, DMARC) sit behind an Advanced disclosure. Nothing here promises inbox placement — it improves the factors you control."
        planned={[
          {
            label: "Prove the email comes from you",
            description: "Guided domain and sender setup, with authentication records prepared for you.",
          },
          {
            label: "Send to addresses that exist",
            description: "Contact quality checks and verification before a campaign leaves.",
          },
          {
            label: "Build a trusted sending habit",
            description: "Warm-up pacing and rate limits chosen for your domain, overridable at any time.",
          },
          {
            label: "Handle bounces and opt-outs",
            description: "Failed addresses suppressed automatically and every unsubscribe honoured at once.",
          },
          {
            label: "Watch engagement signals",
            description: "Reputation trend over time, with a clear next move when something drifts.",
          },
        ]}
      />

    </AppShell>
  );
}

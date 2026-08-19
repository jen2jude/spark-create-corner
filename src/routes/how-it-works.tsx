import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell, PageIntro } from "@/components/MarketingShell";
import { FromIdeaToResult } from "@/components/FromIdeaToResult";
import { AudienceSegments } from "@/components/AudienceSegments";
import { Button } from "@/components/ui/button";

const title = "How it works — From goal to measured result | Oventric Mail";
const description =
  "Goal, strategy, audience, verification, email, design, CTA, tracking, deliverability, send, monitoring, leads, follow-up, analytics — the full Oventric Mail path.";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorksPage,
});

function HowItWorksPage() {
  return (
    <MarketingShell>
      <PageIntro
        eyebrow="How it works"
        title={<>You describe the result. The work follows.</>}
        lede="Every stage between a business goal and a measured outcome is part of the same workspace, so nothing gets handed off, copied between tools, or lost."
      >
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link to="/product">See the workspace</Link>
        </Button>
      </PageIntro>
      <FromIdeaToResult />
      <AudienceSegments />
    </MarketingShell>
  );
}

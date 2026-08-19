import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell, PageIntro } from "@/components/MarketingShell";
import { Deliverability } from "@/components/Deliverability";
import { DataResponsibility } from "@/components/DataResponsibility";
import { TrustBand } from "@/components/TrustBand";
import { Button } from "@/components/ui/button";

const title = "Deliverability — Built for better deliverability | Oventric Mail";
const description =
  "AI-powered deliverability optimization: sender authentication, contact quality, sending habits, bounces and engagement signals, explained in plain language.";

export const Route = createFileRoute("/deliverability")({
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
  component: DeliverabilityPage,
});

function DeliverabilityPage() {
  return (
    <MarketingShell>
      <PageIntro
        eyebrow="Deliverability"
        title={<>Built for better deliverability.</>}
        lede="Oventric Mail watches sender authentication, audience quality, sending behaviour, bounces and engagement, then tells you what to fix in plain language. Inbox placement is ultimately decided by the receiving provider, so you will never see a guarantee here."
      >
        <Button asChild className="rounded-full px-6">
          <Link to="/early-access">Request early access</Link>
        </Button>
      </PageIntro>
      <Deliverability />
      <TrustBand />
      <DataResponsibility />
    </MarketingShell>
  );
}

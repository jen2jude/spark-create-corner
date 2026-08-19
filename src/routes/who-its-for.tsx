import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell, PageIntro } from "@/components/MarketingShell";
import { AudienceSegments } from "@/components/AudienceSegments";
import { Button } from "@/components/ui/button";

const title = "Who it's for — Oventric Mail";
const description =
  "Oventric Mail is built for small businesses, entrepreneurs, marketers, creators, sales teams and any organization that owns an audience and wants a measurable result.";

export const Route = createFileRoute("/who-its-for")({
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
  component: WhoItsForPage,
});

function WhoItsForPage() {
  return (
    <MarketingShell>
      <PageIntro
        eyebrow="Who it's for"
        title={<>Every audience owner. One clear path to results.</>}
        lede="Oventric Mail is designed for people and teams who already have an audience — or are building one — and want to turn communication into measurable outcomes."
      >
        <Button asChild className="rounded-full px-6">
          <Link to="/early-access">Join early access</Link>
        </Button>
      </PageIntro>
      <AudienceSegments />
    </MarketingShell>
  );
}

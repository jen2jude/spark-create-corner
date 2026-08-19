import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell, PageIntro } from "@/components/MarketingShell";
import { Faq } from "@/components/Faq";
import { Button } from "@/components/ui/button";

const title = "Questions about Oventric Mail — FAQ";
const description =
  "Answers about Oventric Mail: what it is, how the guided campaign workspace works, deliverability, your data, and when early access opens.";

export const Route = createFileRoute("/faq")({
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
  component: FaqPage,
});

function FaqPage() {
  return (
    <MarketingShell>
      <PageIntro
        eyebrow="Questions"
        title={<>Straight answers, no marketing fog.</>}
        lede="If something you need to know is missing, ask us directly — the answer usually ends up on this page."
      >
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link to="/early-access">Request early access</Link>
        </Button>
      </PageIntro>
      <Faq />
    </MarketingShell>
  );
}

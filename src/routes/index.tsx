import { createFileRoute } from "@tanstack/react-router";
import { MarketingShell } from "@/components/MarketingShell";
import { Hero } from "@/components/Hero";
import { PositioningBar } from "@/components/PositioningBar";
import { ProblemSection } from "@/components/ProblemSection";
import { ProductPreview } from "@/components/ProductPreview";
import { FromIdeaToResult } from "@/components/FromIdeaToResult";
import { ExpertNotChatbot } from "@/components/ExpertNotChatbot";
import { Features } from "@/components/Features";
import { ComplexityAbstraction } from "@/components/ComplexityAbstraction";
import { Deliverability } from "@/components/Deliverability";
import { AudienceSegments } from "@/components/AudienceSegments";
import { TrustBand } from "@/components/TrustBand";
import { WaitlistSection } from "@/components/WaitlistSection";

const title = "Oventric Mail — Turn your audience into results";
const description =
  "Tell Oventric Mail the result you want. It guides you from strategy and verified audience through design, delivery and deliverability to measured outcomes.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  return (
    <MarketingShell>
      <Hero />
      <PositioningBar />
      <ProblemSection />
      <ProductPreview />
      <TrustBand />
      <FromIdeaToResult />
      <Features />
      <AudienceSegments />
      <ComplexityAbstraction />
      <Deliverability />
      <WaitlistSection />
    </MarketingShell>
  );
}

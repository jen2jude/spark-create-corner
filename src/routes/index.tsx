import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductPreview } from "@/components/ProductPreview";
import { FromIdeaToResult } from "@/components/FromIdeaToResult";
import { Features } from "@/components/Features";
import { AudienceSegments } from "@/components/AudienceSegments";
import { WaitlistSection } from "@/components/WaitlistSection";
import { StickyContact } from "@/components/StickyContact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oventric Mail — Turn Your Audience Into Outcomes" },
      { name: "description", content: "Oventric Mail is a complete marketing campaign workspace powered by conversation. From strategy to audience, design, delivery, and analytics." },
      { property: "og:title", content: "Oventric Mail — Turn Your Audience Into Outcomes" },
      { property: "og:description", content: "Oventric Mail is a complete marketing campaign workspace powered by conversation. From strategy to audience, design, delivery, and analytics." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <FromIdeaToResult />
        <Features />
        <AudienceSegments />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  );
}

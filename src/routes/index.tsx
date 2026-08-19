import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductPreview } from "@/components/ProductPreview";
import { StrategistDemo } from "@/components/StrategistDemo";
import { ProductTour } from "@/components/ProductTour";
import { TemplateGallery } from "@/components/TemplateGallery";
import { DataResponsibility } from "@/components/DataResponsibility";
import { Faq } from "@/components/Faq";
import { FromIdeaToResult } from "@/components/FromIdeaToResult";
import { Features } from "@/components/Features";
import { AudienceSegments } from "@/components/AudienceSegments";
import { TrustBand } from "@/components/TrustBand";
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
        <ProductPreview />
        <StrategistDemo />
        <TrustBand />
        <ProductTour />
        <FromIdeaToResult />
        <TemplateGallery />
        <Features />
        <AudienceSegments />
        <DataResponsibility />
        <Faq />
        <WaitlistSection />
      </main>
      <StickyContact />
      <Footer />
    </div>
  );
}

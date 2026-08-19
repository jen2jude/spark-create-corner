import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingShell, PageIntro } from "@/components/MarketingShell";
import { ProductPreview } from "@/components/ProductPreview";
import { ProductTour } from "@/components/ProductTour";
import { TemplateGallery } from "@/components/TemplateGallery";
import { Features } from "@/components/Features";
import { Button } from "@/components/ui/button";

const title = "Product — An intelligent campaign workspace | Oventric Mail";
const description =
  "See the Oventric Mail workspace: goal-led strategy, verified audience, designed email, tracked results — every screen a real planned capability.";

export const Route = createFileRoute("/product")({
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
  component: ProductPage,
});

function ProductPage() {
  return (
    <MarketingShell>
      <PageIntro
        eyebrow="The product"
        title={<>Not an email editor. A campaign workspace.</>}
        lede="Oventric Mail is being built as one place where a business goal becomes a strategy, an audience, an email, a send and a measurable result — with every decision visible before anything leaves."
      >
        <Button asChild className="rounded-full px-6">
          <Link to="/early-access">Request early access</Link>
        </Button>
      </PageIntro>
      <ProductPreview />
      <ProductTour />
      <Features />
      <TemplateGallery />
    </MarketingShell>
  );
}

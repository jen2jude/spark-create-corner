import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SectionPlaceholder } from "@/components/app/SectionPlaceholder";

export const Route = createFileRoute("/app/billing")({
  head: () => ({
    meta: [
      { title: "Billing — Oventric Mail" },
      {
        name: "description",
        content: "Plan, sending volume, and invoices in one clear place.",
      },
      { property: "og:title", content: "Billing — Oventric Mail" },
      {
        property: "og:description",
        content: "See what you use and what you pay, without surprises.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BillingPage,
});

function BillingPage() {
  return (
    <AppShell title="Billing" description="What you use, what it costs, and nothing hidden in between.">
      <SectionPlaceholder
        purpose="Billing shows plan, sending volume against allowance, and invoices, so cost is always tied to what the account actually sent."
        planned={[
          { label: "Plan and usage", description: "Volume used against your allowance this period." },
          { label: "Payment method", description: "Manage cards and billing details." },
          { label: "Invoices", description: "Download receipts for every period." },
        ]}
      />
    </AppShell>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/thanks")({
  head: () => ({
    meta: [
      { title: "You're on the list — Oventric Mail" },
      { name: "description", content: "Thank you for joining the Oventric Mail early access waitlist." },
      { property: "og:title", content: "You're on the list — Oventric Mail" },
      { property: "og:description", content: "Thank you for joining the Oventric Mail early access waitlist." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ThanksPage,
});

function ThanksPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
        <CheckCircle2 className="h-8 w-8 text-accent" />
      </div>
      <h1 className="mt-6 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        You're on the list
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Thank you for your interest in Oventric Mail. We'll review your submission and be in touch when early access opens.
      </p>
      <div className="mt-8">
        <Button asChild variant="outline" className="rounded-full px-6">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}

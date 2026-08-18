import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitWaitlistEntry } from "@/lib/waitlist.functions";
import { Loader2 } from "lucide-react";

const intents = [
  { value: "business", label: "For my business" },
  { value: "creator", label: "For my audience" },
];

export function HeroSignup() {
  const submit = useServerFn(submitWaitlistEntry);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [intent, setIntent] = useState("business");
  const [form, setForm] = useState({ name: "", email: "", company: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await submit({
        data: {
          ...form,
          primary_use_case: intent === "creator" ? "newsletters" : "promotions",
        },
      });
      await navigate({ to: "/thanks" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-8">
      <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
        Get started with guided campaigns.
      </h2>

      <div className="mt-5 flex flex-wrap gap-5">
        {intents.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setIntent(option.value)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <span
              className={
                intent === option.value
                  ? "flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent"
                  : "flex h-4 w-4 items-center justify-center rounded-full border border-border"
              }
            >
              {intent === option.value && <span className="h-2 w-2 rounded-full bg-accent" />}
            </span>
            <span className={intent === option.value ? "text-foreground" : undefined}>
              {option.label}
            </span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {error && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        <div className="space-y-1.5">
          <Label htmlFor="hero-name" className="text-xs text-muted-foreground">Name</Label>
          <Input
            id="hero-name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="h-12"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="hero-email" className="text-xs text-muted-foreground">Work email</Label>
          <Input
            id="hero-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            className="h-12"
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="hero-company" className="text-xs text-muted-foreground">
            Company <span className="font-normal">(optional)</span>
          </Label>
          <Input
            id="hero-company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Company or brand"
            className="h-12"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-12 w-full rounded-full text-sm font-semibold uppercase tracking-[0.12em] hover:-translate-y-0.5"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting
            </>
          ) : (
            "Request early access"
          )}
        </Button>

        <p className="text-xs leading-relaxed text-muted-foreground">
          No spam, no card required. Want to shape the product?{" "}
          <a href="#waitlist" className="text-accent underline-offset-4 hover:underline">
            Answer a few questions
          </a>
          .
        </p>
      </form>
    </div>
  );
}

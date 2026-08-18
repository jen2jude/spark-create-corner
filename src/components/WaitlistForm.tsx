import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitWaitlistEntry } from "@/lib/waitlist.functions";
import { Loader2 } from "lucide-react";

const audienceSizes = [
  { value: "", label: "Select audience size" },
  { value: "under-1k", label: "Under 1,000" },
  { value: "1k-5k", label: "1,000 – 5,000" },
  { value: "5k-20k", label: "5,000 – 20,000" },
  { value: "20k-100k", label: "20,000 – 100,000" },
  { value: "100k-plus", label: "100,000+" },
];

const useCases = [
  { value: "", label: "Select primary use case" },
  { value: "promotions", label: "Promotions & sales" },
  { value: "events", label: "Events & webinars" },
  { value: "newsletters", label: "Newsletters & content" },
  { value: "lead-nurturing", label: "Lead nurturing" },
  { value: "follow-ups", label: "Customer follow-ups" },
  { value: "announcements", label: "Product announcements" },
  { value: "other", label: "Other" },
];

const emailTools = [
  { value: "", label: "Select current tool" },
  { value: "gmail-outlook", label: "Gmail / Outlook" },
  { value: "mailchimp", label: "Mailchimp" },
  { value: "brevo", label: "Brevo" },
  { value: "zoho", label: "Zoho" },
  { value: "sendgrid", label: "SendGrid" },
  { value: "other", label: "Other" },
  { value: "none", label: "I don't currently use email marketing" },
];

const challenges = [
  { value: "", label: "Select biggest challenge" },
  { value: "creating-campaigns", label: "Creating campaigns" },
  { value: "deliverability", label: "Deliverability" },
  { value: "getting-opened", label: "Getting emails opened" },
  { value: "getting-clicks", label: "Getting clicks" },
  { value: "conversions", label: "Getting registrations/sales" },
  { value: "managing-contacts", label: "Managing contacts" },
  { value: "automation", label: "Automation/follow-up" },
  { value: "analytics", label: "Understanding analytics" },
  { value: "complexity", label: "Everything is too complicated" },
];

export function WaitlistForm() {
  const submit = useServerFn(submitWaitlistEntry);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    audience_size: "",
    primary_use_case: "",
    current_email_tool: "",
    biggest_challenge: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await submit({ data: form });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
          <CheckCircle2 className="h-6 w-6 text-accent" />
        </div>
        <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">You're on the list</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for your interest in Oventric Mail. We'll be in touch when early access opens.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@company.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder="Company or organization"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="audience_size">Audience size</Label>
          <Select
            value={form.audience_size}
            onValueChange={(value) => setForm({ ...form, audience_size: value })}
          >
            <SelectTrigger id="audience_size">
              <SelectValue placeholder="Select audience size" />
            </SelectTrigger>
            <SelectContent>
              {audienceSizes.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="primary_use_case">Primary use case</Label>
          <Select
            value={form.primary_use_case}
            onValueChange={(value) => setForm({ ...form, primary_use_case: value })}
          >
            <SelectTrigger id="primary_use_case">
              <SelectValue placeholder="Select use case" />
            </SelectTrigger>
            <SelectContent>
              {useCases.map((useCase) => (
                <SelectItem key={useCase.value} value={useCase.value}>
                  {useCase.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="current_email_tool">How do you currently send email?</Label>
          <Select
            value={form.current_email_tool}
            onValueChange={(value) => setForm({ ...form, current_email_tool: value })}
          >
            <SelectTrigger id="current_email_tool">
              <SelectValue placeholder="Select current tool" />
            </SelectTrigger>
            <SelectContent>
              {emailTools.map((tool) => (
                <SelectItem key={tool.value} value={tool.value}>
                  {tool.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="biggest_challenge">What is your biggest email marketing challenge?</Label>
          <Select
            value={form.biggest_challenge}
            onValueChange={(value) => setForm({ ...form, biggest_challenge: value })}
          >
            <SelectTrigger id="biggest_challenge">
              <SelectValue placeholder="Select challenge" />
            </SelectTrigger>
            <SelectContent>
              {challenges.map((challenge) => (
                <SelectItem key={challenge.value} value={challenge.value}>
                  {challenge.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full rounded-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Request early access"
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        No spam. We will only use your details to contact you about early access and product updates.
      </p>
    </form>
  );
}

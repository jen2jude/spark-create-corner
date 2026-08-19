import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/app/AuthShell";
import { Button, TextField } from "@/components/ds";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — Oventric Mail" },
      {
        name: "description",
        content: "Create an Oventric Mail account and turn your audience into measurable outcomes.",
      },
      { property: "og:title", content: "Create your account — Oventric Mail" },
      {
        property: "og:description",
        content: "Start planning guided campaigns with Oventric Mail.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      intro="One workspace for strategy, audience, delivery, and results."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-accent underline-offset-4 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <TextField label="Name" placeholder="Your name" autoComplete="name" required />
        <TextField label="Work email" type="email" placeholder="you@company.com" autoComplete="email" required />
        <TextField
          label="Password"
          type="password"
          autoComplete="new-password"
          hint="At least 12 characters."
          required
        />
        <Button type="submit" className="min-h-11 w-full rounded-full" disabled>
          Create account
        </Button>
      </form>
      <p className="text-center text-xs text-muted-foreground">
        Waiting for early access?{" "}
        <Link to="/" hash="waitlist" className="text-accent underline-offset-4 hover:underline">
          Join the waitlist
        </Link>
      </p>
    </AuthShell>
  );
}

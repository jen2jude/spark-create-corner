import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/components/app/AuthShell";
import { Button, Text, TextField } from "@/components/ds";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — Oventric Mail" },
      { name: "description", content: "Create an Oventric Mail account and turn your audience into measurable outcomes." },
      { property: "og:title", content: "Create your account — Oventric Mail" },
      { property: "og:description", content: "Start planning guided campaigns with Oventric Mail." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.session) {
      await navigate({ to: "/app/workspace" });
      return;
    }

    setConfirmation(true);
    setLoading(false);
  }

  return (
    <AuthShell
      title="Create your account"
      intro="One workspace for strategy, audience, delivery, and results."
      footer={<>Already have an account? <Link to="/login" className="text-accent underline-offset-4 hover:underline">Sign in</Link></>}
    >
      {confirmation ? (
        <div className="space-y-3 rounded-2xl border border-border bg-card p-5">
          <h2 className="font-semibold text-foreground">Check your email</h2>
          <Text variant="muted">We sent a confirmation link to {email}. Confirm your address, then sign in to continue.</Text>
          <Button asChild className="min-h-11 w-full rounded-full"><Link to="/login">Go to sign in</Link></Button>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit}>
          <TextField label="Name" placeholder="Your name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Work email" type="email" placeholder="you@company.com" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" autoComplete="new-password" hint="At least 12 characters." minLength={12} required value={password} onChange={(e) => setPassword(e.target.value)} />
          {error ? <Text className="text-destructive" role="alert">{error}</Text> : null}
          <Button type="submit" className="min-h-11 w-full rounded-full" disabled={loading}>{loading ? "Creating account…" : "Create account"}</Button>
        </form>
      )}
      {!confirmation ? <p className="text-center text-xs text-muted-foreground">Waiting for early access? <Link to="/" hash="waitlist" className="text-accent underline-offset-4 hover:underline">Join the waitlist</Link></p> : null}
    </AuthShell>
  );
}

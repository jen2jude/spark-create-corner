import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AuthShell } from "@/components/app/AuthShell";
import { Button, Text, TextField } from "@/components/ds";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Oventric Mail" },
      { name: "description", content: "Sign in to your Oventric Mail workspace to plan, send, and measure campaigns." },
      { property: "og:title", content: "Sign in — Oventric Mail" },
      { property: "og:description", content: "Access your Oventric Mail workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    await navigate({ to: "/app/workspace" });
  }

  return (
    <AuthShell
      title="Sign in"
      intro="Pick up where your campaigns left off."
      footer={<>No account yet? <Link to="/signup" className="text-accent underline-offset-4 hover:underline">Create one</Link></>}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <TextField label="Work email" type="email" placeholder="you@company.com" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        {error ? <Text className="text-destructive" role="alert">{error}</Text> : null}
        <Button type="submit" className="min-h-11 w-full rounded-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}

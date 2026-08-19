import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/app/AuthShell";
import { Button, TextField } from "@/components/ds";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Oventric Mail" },
      {
        name: "description",
        content: "Sign in to your Oventric Mail workspace to plan, send, and measure campaigns.",
      },
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
  return (
    <AuthShell
      title="Sign in"
      intro="Pick up where your campaigns left off."
      footer={
        <>
          No account yet?{" "}
          <Link to="/signup" className="text-accent underline-offset-4 hover:underline">
            Create one
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
        <TextField label="Work email" type="email" placeholder="you@company.com" autoComplete="email" required />
        <TextField label="Password" type="password" autoComplete="current-password" required />
        <Button type="submit" className="min-h-11 w-full rounded-full" disabled>
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}

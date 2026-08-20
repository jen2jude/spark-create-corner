import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Text } from "@/components/ds";

export function AuthGate({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) navigate({ to: "/login" });
      setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate({ to: "/login" });
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  if (checking) {
    return (
      <div className="grid min-h-dvh place-items-center bg-background px-6">
        <Text variant="muted">Loading your workspace…</Text>
      </div>
    );
  }

  return <>{children}</>;
}

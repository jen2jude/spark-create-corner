import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AuthGate } from "@/components/app/AuthGate";

/**
 * Application layout. Every product section lives under /app/*.
 * Authentication is enforced at the application boundary.
 */
export const Route = createFileRoute("/app")({
  component: () => (
    <AuthGate>
      <Outlet />
    </AuthGate>
  ),
});

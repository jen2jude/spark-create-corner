import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Application layout. Every product section lives under /app/*.
 * When authentication ships, this subtree moves behind the auth gate.
 */
export const Route = createFileRoute("/app")({
  component: () => <Outlet />,
});

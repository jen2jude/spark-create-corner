import type { LinkProps } from "@tanstack/react-router";

export type AppNavItem = {
  label: string;
  to: NonNullable<LinkProps["to"]>;
  /** One line explaining the stage's job in the audience-to-outcome chain. */
  purpose: string;
};

export type AppNavGroup = {
  label: string;
  items: ReadonlyArray<AppNavItem>;
};

/**
 * The product's permanent information architecture.
 * Sections are grouped by where they sit in the revenue chain, so later
 * stages can add screens without renegotiating navigation.
 */
export const appNav: ReadonlyArray<AppNavGroup> = [
  {
    label: "Create",
    items: [
      {
        label: "Workspace",
        to: "/app/workspace",
        purpose: "Describe the outcome you want and build the campaign alongside the conversation.",
      },
      {
        label: "Campaigns",
        to: "/app/campaigns",
        purpose: "Every campaign, its stage in the chain, and what it is waiting on.",
      },
    ],
  },
  {
    label: "Audience",
    items: [
      {
        label: "Audience",
        to: "/app/audience",
        purpose: "Contacts, segments, and the rules that decide who receives what.",
      },
      {
        label: "Verification",
        to: "/app/verification",
        purpose: "Address quality and sender authentication, guided rather than technical.",
      },
    ],
  },
  {
    label: "Results",
    items: [
      {
        label: "Analytics",
        to: "/app/analytics",
        purpose: "What happened, why it happened, and the next sensible move.",
      },
      {
        label: "Leads",
        to: "/app/leads",
        purpose: "The people worth following up, ranked by intent signals.",
      },
      {
        label: "Automations",
        to: "/app/automations",
        purpose: "Follow-up and nurture that continues without manual sending.",
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "Settings",
        to: "/app/settings",
        purpose: "Senders, authentication, audience rules, and advanced controls.",
      },
      {
        label: "Billing",
        to: "/app/billing",
        purpose: "Plan, sending volume, and invoices.",
      },
    ],
  },
];

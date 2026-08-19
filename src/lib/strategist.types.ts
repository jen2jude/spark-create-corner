export const PLAN_KEYS = [
  "objective",
  "audience",
  "segmentation",
  "strategy",
  "cta",
  "content",
  "timing",
  "tracking",
  "followup",
  "analytics",
] as const;

export type PlanKey = (typeof PLAN_KEYS)[number];

export type PlanDimension = { key: string; summary: string; detail: string };

export type CampaignEmail = {
  step: string;
  sender: string;
  subject: string;
  preheader: string;
  body: string[];
  ctaLabel: string;
  signoff: string;
};

export type CampaignWorkspace = {
  campaignName: string;
  audienceSize: string;
  audienceNote: string;
  cta: string;
  tracking: string;
  deliverability: string;
  deliverabilityNote: string;
  sendWindow: string;
  emails: CampaignEmail[];
  changed: string[];
};

export type CampaignPlan = {
  reading: string;
  reply: string;
  dimensions: PlanDimension[];
  workspace: CampaignWorkspace;
};

export type StrategistTurn = { role: "user" | "assistant"; content: string };

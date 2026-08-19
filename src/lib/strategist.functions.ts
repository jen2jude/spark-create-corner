import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const turnSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(4000),
});

const dimensionSchema = z.object({
  key: z.string(),
  summary: z.string(),
  detail: z.string(),
});

const emailSchema = z.object({
  step: z.string(),
  sender: z.string(),
  subject: z.string(),
  preheader: z.string(),
  body: z.array(z.string()),
  ctaLabel: z.string(),
  signoff: z.string(),
});

const workspaceSchema = z.object({
  campaignName: z.string(),
  audienceSize: z.string(),
  audienceNote: z.string(),
  cta: z.string(),
  tracking: z.string(),
  deliverability: z.string(),
  deliverabilityNote: z.string(),
  sendWindow: z.string(),
  emails: z.array(emailSchema),
  changed: z.array(z.string()),
});

const planSchema = z.object({
  reading: z.string(),
  reply: z.string(),
  dimensions: z.array(dimensionSchema),
  workspace: workspaceSchema,
});

const inputSchema = z.object({
  objective: z.string().trim().min(6).max(1200),
  history: z.array(turnSchema).max(12).default([]),
  currentPlan: planSchema.nullable().default(null),
});

export const planCampaign = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const { generateCampaignPlan, StrategistError } = await import("./strategist.server");
    try {
      const plan = await generateCampaignPlan({
        objective: data.objective,
        history: data.history,
        currentPlan: (data.currentPlan as never) ?? null,
      });
      return { ok: true as const, plan };
    } catch (error) {
      if (error instanceof StrategistError) {
        return { ok: false as const, error: error.message };
      }
      return {
        ok: false as const,
        error: "The strategist could not be reached. Please try again in a moment.",
      };
    }
  });

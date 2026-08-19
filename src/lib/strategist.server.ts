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

export type PlanDimension = { key: PlanKey; summary: string; detail: string };

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

const SYSTEM_PROMPT = `You are the campaign strategist inside Oventric Mail, a marketing and audience platform.

A user describes a BUSINESS OBJECTIVE ("I want 500 registrations for my event", "our members are not renewing"). You never simply write an email. You interpret the objective the way a senior marketing strategist would and decide the whole campaign.

For every request you decide all ten dimensions:
objective (measurable target and how success is judged), audience (who is reachable and where they come from, with realistic numbers derived from the goal), segmentation (distinct segments and why each is separate), strategy (the sequence of emails and what each one is for), cta (the action, and how it changes per segment), content (what each email argues, in what order), timing (when each send goes, relative to the deadline or trigger), tracking (what is measured and attributed back to the objective), followup (branches for people who showed intent but did not convert), analytics (what is reported and reused next time).

Rules:
- Reason from the number backwards: if a target is given, estimate required reach and conversion rates and say them plainly.
- Be concrete and specific. Use figures, day offsets, and segment names. Never generic marketing filler.
- Protect deliverability and consent: exclude unengaged or unverified contacts and say so.
- If critical facts are missing (event date, list size, price), state a working assumption in the plan and ask for it in "reply".
- Sound like a knowledgeable strategist talking to an operator: calm, precise, no hype, no emoji.
- "reading" is one short paragraph: how you interpreted the objective and what kind of problem it really is.
- "reply" is one or two sentences to the user: what you assumed, or the single most useful question to sharpen the plan.
- "summary" is one line (max ~90 characters). "detail" is 2-3 sentences of reasoning.
- When the user refines, revise the existing plan rather than starting over, and keep unaffected dimensions stable.

You also build the CAMPAIGN WORKSPACE the operator sees next to the conversation: the actual emails plus the live campaign state.
- "emails" are the real drafts, in send order (2 to 4 of them). "step" names the send and its timing ("Email 1 · 21 days out"). "body" is 2 to 4 short paragraphs of finished copy, no placeholders like [Name] unless it is a real merge field, no markdown.
- "sender" is a plausible from-line ("Events team <events@yourdomain.com>"). "subject" is under 60 characters, "preheader" under 90.
- "audienceSize" is a number with thousands separators ("7,840"); "audienceNote" says how it was derived or filtered.
- "tracking" and "deliverability" are short states an operator reads at a glance ("Enabled · opens, clicks, registrations", "Healthy"). "deliverabilityNote" explains why.
- "sendWindow" is the overall window ("21 days, 4 sends, ending 12 Sep").
- "changed" lists what you changed in THIS turn, as short phrases ("Tone: more professional", "Intro shortened"). On the first turn list what you created. Keep it to 1-4 items.
- When the user asks for a copy change ("make the email more professional"), rewrite the affected emails and say plainly in "reply" what you adjusted.`;

const emailSchema = {
  type: "object",
  additionalProperties: false,
  required: ["step", "sender", "subject", "preheader", "body", "ctaLabel", "signoff"],
  properties: {
    step: { type: "string" },
    sender: { type: "string" },
    subject: { type: "string" },
    preheader: { type: "string" },
    body: { type: "array", items: { type: "string" } },
    ctaLabel: { type: "string" },
    signoff: { type: "string" },
  },
} as const;

const schema = {
  type: "object",
  additionalProperties: false,
  required: ["reading", "reply", "dimensions", "workspace"],
  properties: {
    reading: { type: "string" },
    reply: { type: "string" },
    dimensions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["key", "summary", "detail"],
        properties: {
          key: { type: "string", enum: [...PLAN_KEYS] },
          summary: { type: "string" },
          detail: { type: "string" },
        },
      },
    },
    workspace: {
      type: "object",
      additionalProperties: false,
      required: [
        "campaignName",
        "audienceSize",
        "audienceNote",
        "cta",
        "tracking",
        "deliverability",
        "deliverabilityNote",
        "sendWindow",
        "emails",
        "changed",
      ],
      properties: {
        campaignName: { type: "string" },
        audienceSize: { type: "string" },
        audienceNote: { type: "string" },
        cta: { type: "string" },
        tracking: { type: "string" },
        deliverability: { type: "string" },
        deliverabilityNote: { type: "string" },
        sendWindow: { type: "string" },
        emails: { type: "array", items: emailSchema },
        changed: { type: "array", items: { type: "string" } },
      },
    },
  },
} as const;

export class StrategistError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function messageForStatus(status: number, gatewayMessage: string | undefined) {
  if (status === 401) {
    return "The strategist is not configured correctly. Please contact support.";
  }
  if (status === 402 || status === 403) {
    return gatewayMessage ?? "The strategist is temporarily unavailable on this workspace.";
  }
  if (status === 429) {
    return "The strategist is handling a lot of requests right now. Please try again in a moment.";
  }
  if (status >= 500) {
    return "The strategist could not be reached. Please try again in a moment.";
  }
  return gatewayMessage ?? "The strategist could not process that objective.";
}

export async function generateCampaignPlan(input: {
  objective: string;
  history: StrategistTurn[];
  currentPlan: CampaignPlan | null;
}): Promise<CampaignPlan> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    throw new StrategistError(401, messageForStatus(401, undefined));
  }

  const messages: { role: string; content: string }[] = [
    { role: "system", content: SYSTEM_PROMPT },
  ];

  if (input.currentPlan) {
    messages.push({
      role: "assistant",
      content: `Current plan:\n${JSON.stringify(input.currentPlan)}`,
    });
  }

  for (const turn of input.history.slice(-8)) {
    messages.push({ role: turn.role, content: turn.content });
  }
  messages.push({ role: "user", content: input.objective });

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages,
      response_format: {
        type: "json_schema",
        json_schema: { name: "campaign_plan", strict: true, schema },
      },
    }),
  });

  if (!res.ok) {
    let gatewayMessage: string | undefined;
    try {
      const body = (await res.json()) as { message?: string; title?: string; error?: { message?: string } };
      gatewayMessage = body.message ?? body.title ?? body.error?.message;
    } catch {
      gatewayMessage = undefined;
    }
    throw new StrategistError(res.status, messageForStatus(res.status, gatewayMessage));
  }

  const payload = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new StrategistError(502, "The strategist returned an empty plan. Please try again.");
  }

  let parsed: CampaignPlan;
  try {
    parsed = JSON.parse(content) as CampaignPlan;
  } catch {
    throw new StrategistError(502, "The strategist returned an unreadable plan. Please try again.");
  }

  const byKey = new Map(parsed.dimensions?.map((d) => [d.key, d]) ?? []);
  const dimensions = PLAN_KEYS.map(
    (key) => byKey.get(key) ?? { key, summary: "Not decided yet", detail: "" },
  );

  const w = parsed.workspace;
  const workspace: CampaignWorkspace = {
    campaignName: w?.campaignName ?? "Untitled campaign",
    audienceSize: w?.audienceSize ?? "—",
    audienceNote: w?.audienceNote ?? "",
    cta: w?.cta ?? "—",
    tracking: w?.tracking ?? "Enabled",
    deliverability: w?.deliverability ?? "Healthy",
    deliverabilityNote: w?.deliverabilityNote ?? "",
    sendWindow: w?.sendWindow ?? "—",
    emails: (w?.emails ?? []).map((e) => ({
      step: e.step ?? "",
      sender: e.sender ?? "",
      subject: e.subject ?? "",
      preheader: e.preheader ?? "",
      body: e.body ?? [],
      ctaLabel: e.ctaLabel ?? "",
      signoff: e.signoff ?? "",
    })),
    changed: w?.changed ?? [],
  };

  return {
    reading: parsed.reading ?? "",
    reply: parsed.reply ?? "",
    dimensions,
    workspace,
  };
}

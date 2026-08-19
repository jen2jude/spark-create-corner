import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart3, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  AiMessage,
  AiNote,
  Button,
  ChartFrame,
  DataTable,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  EmailPreview,
  MetricTile,
  Notice,
  Panel,
  PanelHeader,
  Pill,
  ProgressMeter,
  SegmentedControl,
  SelectField,
  Section,
  StatusBadge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  TextField,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  WorkflowSteps,
  chartTokens,
  notify,
  type CampaignStatus,
} from "@/components/ds";

export const Route = createFileRoute("/design-system")({
  head: () => ({
    meta: [
      { title: "Design system — Oventric Mail" },
      {
        name: "description",
        content:
          "The reusable tokens and components behind Oventric Mail: typography, colour, spacing, controls, campaign status, charts, email preview and workflow steps.",
      },
      { property: "og:title", content: "Design system — Oventric Mail" },
      {
        property: "og:description",
        content:
          "Reusable design tokens and product components for the Oventric Mail application.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DesignSystemPage,
});

const colorTokens = [
  { name: "background", cls: "bg-background" },
  { name: "foreground", cls: "bg-foreground" },
  { name: "card", cls: "bg-card" },
  { name: "muted", cls: "bg-muted" },
  { name: "accent", cls: "bg-accent" },
  { name: "border", cls: "bg-border" },
  { name: "hero", cls: "bg-hero" },
  { name: "destructive", cls: "bg-destructive" },
];

const spacingTokens = [
  { name: "tight — 8px", cls: "w-2" },
  { name: "stack — 16px", cls: "w-4" },
  { name: "block — 24px", cls: "w-6" },
  { name: "section — 40px", cls: "w-10" },
  { name: "band — 96px", cls: "w-24" },
];

const statuses: CampaignStatus[] = [
  "draft",
  "scheduled",
  "sending",
  "sent",
  "paused",
  "needs-attention",
];

type CampaignRow = {
  id: string;
  name: string;
  status: CampaignStatus;
  audience: string;
  opens: string;
};

const rows: CampaignRow[] = [
  { id: "1", name: "Spring re-engagement", status: "sent", audience: "4,182", opens: "38.4%" },
  { id: "2", name: "Trial day 3 nudge", status: "sending", audience: "916", opens: "44.1%" },
  { id: "3", name: "Webinar invite", status: "scheduled", audience: "2,340", opens: "—" },
  { id: "4", name: "Win-back sequence", status: "needs-attention", audience: "780", opens: "12.0%" },
];

const chartData = [
  { day: "Mon", opens: 28 },
  { day: "Tue", opens: 34 },
  { day: "Wed", opens: 41 },
  { day: "Thu", opens: 38 },
  { day: "Fri", opens: 47 },
];

function DesignSystemPage() {
  const [view, setView] = useState<"conversation" | "workspace">("conversation");

  return (
    <div className="min-h-dvh bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
      >
        Skip to main content
      </a>
      <Header />

      <main id="main">
        <Section>
          <Text variant="eyebrow">Design system</Text>
          <Text variant="display" className="mt-4 max-w-3xl">
            The reusable parts of Oventric Mail
          </Text>
          <Text variant="bodyLg" className="mt-5 max-w-2xl text-muted-foreground">
            Every product screen is assembled from these tokens and components, so the application
            stays consistent, accessible and calm as it grows.
          </Text>
        </Section>

        <Section tone="alt" className="pt-0 sm:pt-0 lg:pt-0">
          <PanelHeader
            eyebrow="Foundations"
            title="Typography, colour and spacing"
            description="One serif for editorial headings, Inter for the interface. One accent. A five-step spacing rhythm."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <Panel>
              <Text variant="eyebrow">Type scale</Text>
              <div className="mt-4 space-y-3">
                <Text variant="title" as="p">Display / Title</Text>
                <Text variant="heading" as="p">Heading</Text>
                <Text variant="subheading">Subheading</Text>
                <Text>Body — the default reading size for product copy.</Text>
                <Text variant="muted">Muted supporting text</Text>
                <Text variant="caption">Caption</Text>
                <Text variant="eyebrow">Eyebrow</Text>
              </div>
            </Panel>
            <Panel>
              <Text variant="eyebrow">Colour tokens</Text>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {colorTokens.map((t) => (
                  <li key={t.name} className="flex items-center gap-2.5">
                    <span
                      className={`h-7 w-7 shrink-0 rounded-md border border-border ${t.cls}`}
                      aria-hidden
                    />
                    <span className="truncate text-xs text-muted-foreground">{t.name}</span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel>
              <Text variant="eyebrow">Spacing rhythm</Text>
              <ul className="mt-4 space-y-3">
                {spacingTokens.map((s) => (
                  <li key={s.name} className="flex items-center gap-3">
                    <span className={`h-2 rounded-full bg-accent ${s.cls}`} aria-hidden />
                    <span className="text-xs text-muted-foreground">{s.name}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </Section>

        <Section>
          <PanelHeader
            eyebrow="Controls"
            title="Buttons, inputs, dropdowns and tooltips"
            description="Every control is keyboard reachable, labelled, and shows a visible focus ring."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <Panel>
              <Text variant="eyebrow">Buttons</Text>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button size="sm" variant="outline">Small</Button>
              </div>

              <Text variant="eyebrow" className="mt-8">Dropdown & tooltip</Text>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Campaign actions</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Manage</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Pause sending</DropdownMenuItem>
                    <DropdownMenuItem>Export results</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost">What is a warm-up?</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Sending volume increases gradually so mailbox providers trust your domain.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Text variant="eyebrow" className="mt-8">Modal</Text>
              <div className="mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Schedule send</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Schedule this campaign</DialogTitle>
                      <DialogDescription>
                        Nothing is sent until you confirm. You can change the time afterwards.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Confirm schedule</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </Panel>

            <Panel>
              <Text variant="eyebrow">Inputs</Text>
              <div className="mt-4 space-y-5">
                <TextField label="Campaign name" placeholder="Spring re-engagement" required />
                <SelectField
                  label="Sending domain"
                  hint="Verified domains only."
                  options={[
                    { value: "a", label: "mail.oventric.com" },
                    { value: "b", label: "news.oventric.com" },
                  ]}
                />
                <TextField
                  label="Preheader"
                  multiline
                  placeholder="One line that appears next to the subject"
                />
                <TextField
                  label="Reply-to address"
                  error="Enter a valid email address."
                  defaultValue="hello@"
                />
              </div>
            </Panel>
          </div>
        </Section>

        <Section tone="alt">
          <PanelHeader
            eyebrow="Product patterns"
            title="Status, tabs, cards and tables"
            description="Campaign state always reads as words, not colour alone."
          />
          <div className="mt-8 space-y-4">
            <Panel>
              <Text variant="eyebrow">Campaign status & badges</Text>
              <div className="mt-4 flex flex-wrap gap-2">
                {statuses.map((s) => (
                  <StatusBadge key={s} status={s} />
                ))}
                <Pill tone="accent">Verified audience</Pill>
                <Pill tone="critical" dot>Bounce risk</Pill>
              </div>
            </Panel>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <MetricTile
                label="Audience"
                value="4,182"
                note="Verified in the last 30 days"
                icon={<Users className="h-3.5 w-3.5" />}
              />
              <MetricTile label="Open rate" value="38.4%" note="Up 4.1 pts vs last send" icon={<BarChart3 className="h-3.5 w-3.5" />} />
              <MetricTile label="Replies" value="126" note="Routed to your inbox" />
              <MetricTile label="Revenue" value="$18,340" note="Attributed to this campaign" />
            </div>

            <Panel padding="none" variant="plain">
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="m-4">
                  <TabsTrigger value="all">All campaigns</TabsTrigger>
                  <TabsTrigger value="live">Live</TabsTrigger>
                  <TabsTrigger value="drafts">Drafts</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="px-4 pb-4">
                  <DataTable
                    caption="Campaigns with status, audience size and open rate"
                    rows={rows}
                    getRowId={(r) => r.id}
                    columns={[
                      { key: "name", header: "Campaign", cell: (r) => r.name },
                      { key: "status", header: "Status", cell: (r) => <StatusBadge status={r.status} /> },
                      { key: "audience", header: "Audience", align: "right", cell: (r) => r.audience },
                      { key: "opens", header: "Opens", align: "right", cell: (r) => r.opens },
                    ]}
                  />
                </TabsContent>
                <TabsContent value="live" className="px-4 pb-4">
                  <DataTable
                    caption="Live campaigns"
                    rows={rows.filter((r) => r.status === "sending")}
                    getRowId={(r) => r.id}
                    columns={[
                      { key: "name", header: "Campaign", cell: (r) => r.name },
                      { key: "audience", header: "Audience", align: "right", cell: (r) => r.audience },
                    ]}
                  />
                </TabsContent>
                <TabsContent value="drafts" className="px-4 pb-4">
                  <DataTable
                    caption="Draft campaigns"
                    rows={[]}
                    getRowId={(_r: CampaignRow) => "none"}
                    columns={[{ key: "name", header: "Campaign", cell: (r: CampaignRow) => r.name }]}
                    empty="No drafts. Describe an objective to start one."
                  />
                </TabsContent>
              </Tabs>
            </Panel>
          </div>
        </Section>

        <Section>
          <PanelHeader
            eyebrow="Guidance"
            title="AI messages, alerts and notifications"
            description="The strategist is a quiet layer inside the product, never the product's identity."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <Panel>
              <Text variant="eyebrow">Conversation</Text>
              <div className="mt-5 space-y-4">
                <AiMessage role="user">Re-engage trial users who never sent a campaign.</AiMessage>
                <AiMessage role="assistant" meta="Strategy · 2 emails proposed">
                  I'd send a two-step sequence to 916 verified trial contacts, three days apart, with
                  one call to action: publish a first campaign.
                </AiMessage>
                <AiMessage role="system">Draft saved</AiMessage>
              </div>
              <AiNote className="mt-6">
                Your open rate is strongest on Friday mornings — I've scheduled the first send there.
              </AiNote>
            </Panel>

            <Panel>
              <Text variant="eyebrow">Alerts & notifications</Text>
              <div className="mt-4 space-y-3">
                <Notice tone="info" title="Warm-up in progress">
                  Volume increases gradually for the next six days.
                </Notice>
                <Notice tone="success" title="Domain authenticated" live>
                  SPF, DKIM and DMARC all pass.
                </Notice>
                <Notice tone="warning" title="One record needs updating">
                  Your DMARC policy is set to none.
                </Notice>
                <Notice
                  tone="critical"
                  title="Sending paused"
                  action={<Button size="sm" variant="outline">Review</Button>}
                >
                  Bounce rate exceeded your safety threshold.
                </Notice>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => notify.success("Draft saved", "You can keep editing.")}>
                  Toast: success
                </Button>
                <Button size="sm" variant="outline" onClick={() => notify.error("Send failed", "Check the sending domain.")}>
                  Toast: error
                </Button>
              </div>
            </Panel>
          </div>
        </Section>

        <Section tone="alt">
          <PanelHeader
            eyebrow="Journey & results"
            title="Workflow steps, progress, charts and email preview"
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <Panel>
              <Text variant="eyebrow">Workflow steps</Text>
              <WorkflowSteps
                className="mt-5"
                steps={[
                  { id: "strategy", label: "Strategy", state: "done", description: "Objective agreed" },
                  { id: "audience", label: "Audience", state: "done", description: "916 verified" },
                  { id: "campaign", label: "Campaign", state: "current", description: "Two emails drafted" },
                  { id: "delivery", label: "Delivery", state: "upcoming" },
                  { id: "revenue", label: "Revenue", state: "upcoming" },
                ]}
              />
              <div className="mt-6 space-y-5">
                <ProgressMeter label="Deliverability readiness" value={82} hint="One DNS record left" />
                <ProgressMeter label="Audience verified" value={916} max={1050} />
              </div>
            </Panel>

            <div className="space-y-4">
              <ChartFrame
                title="Opens this week"
                summary="Opens rose from 28% on Monday to 47% on Friday."
                reading="Friday mornings perform best. Next send is scheduled there."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke={chartTokens.grid} vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 11, fill: chartTokens.axis }} stroke={chartTokens.grid} />
                    <YAxis tick={{ fontSize: 11, fill: chartTokens.axis }} stroke={chartTokens.grid} />
                    <ChartTooltip />
                    <Area
                      dataKey="opens"
                      stroke={chartTokens.primary}
                      fill={chartTokens.primary}
                      fillOpacity={0.12}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartFrame>

              <Panel>
                <Text variant="eyebrow">View switcher</Text>
                <SegmentedControl
                  className="mt-4"
                  label="Workspace view"
                  value={view}
                  onChange={setView}
                  options={[
                    { value: "conversation", label: "Conversation" },
                    { value: "workspace", label: "Workspace" },
                  ]}
                />
                <Text variant="caption" className="mt-3">
                  Currently showing: {view}
                </Text>
              </Panel>
            </div>
          </div>

          <div className="mt-4">
            <Text variant="eyebrow">Email preview</Text>
            <EmailPreview
              className="mt-4"
              draft={{
                sender: "Ada at Oventric <ada@mail.oventric.com>",
                subject: "Your first campaign is three minutes away",
                preheader: "We've drafted it for you — just review and send.",
                body: [
                  "Hi Jordan,",
                  "You signed up to reach your audience, but haven't sent anything yet. We drafted a first campaign using the contacts you already verified.",
                  "Review it, change anything you like, and send when you're ready.",
                ],
                ctaLabel: "Review my campaign",
                signoff: "— Ada, Oventric Mail",
              }}
            />
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

/**
 * Rendered product screens for the marketing site.
 *
 * These are real interface compositions, not decorative dashboards: every
 * metric, column, and control below maps to a planned Oventric Mail capability
 * (contacts, campaign status, delivery rate, opens, clicks, conversions, leads,
 * audience segments, demographics, AI recommendations).
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  ProgressChart,
  SegmentChart,
  FunnelChart,
  ReadingPanel,
} from "@/components/AnalyticsCharts";

const nav = [
  "Strategy",
  "Contacts",
  "Segments",
  "Campaigns",
  "Delivery",
  "Analytics",
  "Leads",
] as const;

export function AppChrome({
  active,
  title,
  subtitle,
  children,
  className,
}: {
  active: (typeof nav)[number];
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card text-left shadow-lift",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2.5">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="ml-3 truncate text-[11px] font-medium text-muted-foreground">
          app.oventric.com / {active.toLowerCase()}
        </span>
      </div>

      <div className="grid md:grid-cols-[152px_1fr]">
        <aside className="hidden border-r border-border bg-muted/25 p-3 md:block">
          <ul className="space-y-0.5">
            {nav.map((item) => (
              <li
                key={item}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs",
                  item === active
                    ? "bg-accent/10 font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0">
          <div className="border-b border-border px-4 py-3 sm:px-5">
            <p className="text-sm font-medium text-foreground">{title}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <div className="p-4 sm:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  meta,
}: {
  label: string;
  value: string;
  meta?: string;
}) {
  return (
    <div className="rounded-lg border border-border/70 bg-background p-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1.5 font-serif text-xl leading-none text-foreground">{value}</p>
      {meta ? <p className="mt-1 text-[11px] text-muted-foreground">{meta}</p> : null}
    </div>
  );
}

function Recommendation({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-accent/25 bg-accent/5 p-3">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-accent">
        AI recommendation
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-foreground">{text}</p>
    </div>
  );
}

function Bar({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium text-foreground">{value}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-accent/70" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ---------------------------------- Strategy --------------------------------- */

export function StrategyScreen() {
  return (
    <AppChrome
      active="Strategy"
      title="Event registration campaign"
      subtitle="Objective: 500 registrations by 14 September"
    >
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Campaign status" value="Draft" meta="3 of 4 steps approved" />
        <Stat label="Target" value="500" meta="registrations" />
        <Stat label="Projected" value="418" meta="based on segment history" />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border/70 bg-background p-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Plan
          </p>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            <li>Announcement — Tue 09:30</li>
            <li>Agenda reveal — Fri 09:30</li>
            <li>Reminder, non-openers — Mon 16:00</li>
            <li>Final call — Wed 08:00</li>
          </ul>
        </div>
        <Recommendation text="Split the announcement by seniority. Founders convert 2.1× better on a 'Reserve my seat' CTA than on 'Learn more'." />
      </div>
    </AppChrome>
  );
}

/* ---------------------------------- Audience --------------------------------- */

export function AudienceScreen() {
  return (
    <AppChrome
      active="Contacts"
      title="Contacts"
      subtitle="7,840 contacts · 7,612 deliverable · 228 held for review"
    >
      <div className="grid gap-3 sm:grid-cols-4">
        <Stat label="Contacts" value="7,840" />
        <Stat label="Verified" value="97%" meta="7,612 deliverable" />
        <Stat label="Segments" value="9" meta="4 in this campaign" />
        <Stat label="Leads" value="612" meta="engaged in 30 days" />
      </div>

      <div className="mt-3 overflow-hidden rounded-lg border border-border/70">
        <table className="w-full text-left text-xs">
          <thead className="bg-muted/50 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Segment</th>
              <th className="px-3 py-2 font-medium">Contacts</th>
              <th className="px-3 py-2 font-medium">Engagement</th>
              <th className="hidden px-3 py-2 font-medium sm:table-cell">Top region</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {[
              ["Past attendees", "1,940", "High", "Lagos"],
              ["Newsletter, 90-day active", "2,480", "Medium", "London"],
              ["Trial signups", "1,120", "High", "Toronto"],
              ["Cold imports", "2,072", "Low", "Nairobi"],
            ].map(([seg, contacts, eng, region]) => (
              <tr key={seg} className="border-t border-border/70">
                <td className="px-3 py-2 text-foreground">{seg}</td>
                <td className="px-3 py-2">{contacts}</td>
                <td className="px-3 py-2">{eng}</td>
                <td className="hidden px-3 py-2 sm:table-cell">{region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-border/70 bg-background p-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Demographics
          </p>
          <div className="mt-2.5 space-y-2.5">
            <Bar label="Founder / owner" value="31%" pct={31} />
            <Bar label="Marketing" value="27%" pct={27} />
            <Bar label="Sales" value="22%" pct={22} />
            <Bar label="Other" value="20%" pct={20} />
          </div>
        </div>
        <Recommendation text="Exclude 2,072 cold imports from send one. Warm them with a two-email re-permission sequence to protect delivery rate." />
      </div>
    </AppChrome>
  );
}

/* ----------------------------------- Design ---------------------------------- */

export function DesignScreen() {
  return (
    <AppChrome
      active="Campaigns"
      title="Announcement email"
      subtitle="Send 1 of 4 · status: ready for review"
    >
      <div className="grid gap-3 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-lg border border-border/70 bg-background">
          <div className="space-y-1 border-b border-border/70 px-3 py-2.5 text-xs">
            <p className="text-muted-foreground">
              From <span className="text-foreground">Ada at Oventric</span>
            </p>
            <p className="text-muted-foreground">
              Subject <span className="text-foreground">Your seat at the Growth Clinic</span>
            </p>
            <p className="text-muted-foreground">
              Preheader{" "}
              <span className="text-foreground">Two hours, four operators, one playbook.</span>
            </p>
          </div>
          <div className="space-y-2 px-3 py-3 text-xs leading-relaxed text-muted-foreground">
            <p className="font-serif text-base text-foreground">The Growth Clinic</p>
            <p>
              Hi Tunde — we are running a working session on turning a stalled list into booked
              revenue. Four operators, real numbers, no slideware.
            </p>
            <p>Thursday 14 September · 15:00 WAT · 90 minutes</p>
            <span className="inline-block rounded-md bg-accent px-3 py-1.5 text-[11px] font-medium text-accent-foreground">
              Reserve my seat
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-lg border border-border/70 bg-background p-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Checks
            </p>
            <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
              <li>Spam signals — none found</li>
              <li>Link tracking — enabled (6 links)</li>
              <li>Unsubscribe — present</li>
              <li>Plain-text version — generated</li>
            </ul>
          </div>
          <Recommendation text="Subject line is 34 characters and reads clearly on mobile. Shorten the opening paragraph by one sentence to raise the click rate." />
        </div>
      </div>
    </AppChrome>
  );
}

/* ---------------------------------- Analytics -------------------------------- */

export function AnalyticsScreen() {
  return (
    <AppChrome
      active="Analytics"
      title="Event registration campaign"
      subtitle="Status: sending · send 2 of 4 · measured against 500 registrations"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Delivered" value="7,481" meta="98.3% delivery rate" />
        <Stat label="Opens" value="3,214" meta="43.0% open rate" />
        <Stat label="Clicks" value="962" meta="12.9% click rate" />
        <Stat label="Conversions" value="341" meta="registrations" />
        <Stat label="Leads" value="118" meta="sales-ready" />
        <Stat label="Unsubscribes" value="24" meta="0.3%" />
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3">
          <div className="rounded-lg border border-border/70 bg-background p-3">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Registrations against objective
              </p>
              <p className="text-[11px] text-muted-foreground">341 of 500 · 68%</p>
            </div>
            <div className="mt-2">
              <ProgressChart />
            </div>
          </div>
          <div className="rounded-lg border border-border/70 bg-background p-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Conversions by segment
            </p>
            <div className="mt-2">
              <SegmentChart />
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-lg border border-border/70 bg-background p-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Delivered to converted
            </p>
            <div className="mt-2.5">
              <FunnelChart />
            </div>
          </div>
          <ReadingPanel />
        </div>
      </div>

    </AppChrome>
  );
}

/**
 * Delivery / sender readiness.
 *
 * Demonstrates the "complexity behind simplicity" principle: the primary surface
 * is a plain-language guided checklist. SPF, DKIM, DMARC and the DNS record
 * values exist, but stay folded away until the user asks for them.
 */
function ReadyStep({
  state,
  title,
  detail,
}: {
  state: "done" | "active" | "waiting";
  title: string;
  detail: string;
}) {
  return (
    <div className="flex gap-3 py-2.5">
      <span
        className={cn(
          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[9px] leading-none",
          state === "done" && "border-accent/40 bg-accent/15 text-accent",
          state === "active" && "border-accent bg-accent text-accent-foreground",
          state === "waiting" && "border-border text-muted-foreground",
        )}
      >
        {state === "done" ? "✓" : ""}
      </span>
      <div className="min-w-0">
        <p
          className={cn(
            "text-xs",
            state === "waiting" ? "text-muted-foreground" : "font-medium text-foreground",
          )}
        >
          {title}
        </p>
        <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}

export function DeliveryScreen() {
  return (
    <AppChrome
      active="Delivery"
      title="Let's get your sender ready"
      subtitle="Three short steps so your emails can be sent from your own domain"
    >
      <div className="grid gap-3 lg:grid-cols-[1.25fr_1fr]">
        <div className="rounded-lg border border-border/70 bg-background p-3.5">
          <p className="text-xs leading-relaxed text-foreground">
            I'll guide you through a few authentication steps so your emails arrive from
            <span className="font-medium"> hello@yourbrand.com</span> and land in the inbox.
            You won't need to know the technical names.
          </p>

          <div className="mt-2 divide-y divide-border/60">
            <ReadyStep
              state="done"
              title="Confirm the domain you send from"
              detail="yourbrand.com verified · owner confirmed"
            />
            <ReadyStep
              state="active"
              title="Prove the domain is yours"
              detail="Two lines to add at your domain provider. I've prepared them — copy, paste, and I'll keep checking until they're live."
            />
            <ReadyStep
              state="waiting"
              title="Protect your name from spoofing"
              detail="Enabled automatically once step two is live. Nothing for you to configure."
            />
          </div>

          <details className="mt-2 rounded-md border border-border/70 bg-muted/25 px-3 py-2">
            <summary className="cursor-pointer list-none text-[11px] font-medium text-muted-foreground">
              Advanced · show DNS records (SPF, DKIM, DMARC)
            </summary>
            <div className="mt-2 space-y-1.5 font-mono text-[10px] leading-relaxed text-muted-foreground">
              <p>TXT @ · v=spf1 include:send.oventric.com ~all</p>
              <p>TXT ovm._domainkey · p=MIGfMA0GCSqGSIb3…</p>
              <p>TXT _dmarc · v=DMARC1; p=quarantine; rua=…</p>
            </div>
          </details>
        </div>

        <div className="space-y-3">
          <div className="rounded-lg border border-border/70 bg-background p-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Sender readiness
            </p>
            <p className="mt-1.5 font-serif text-xl leading-none text-foreground">2 of 3</p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Sending unlocks the moment step two is live
            </p>
          </div>
          <Recommendation text="Your records point to a Cloudflare-managed domain. I can walk you through it screen by screen, or send the two lines to whoever manages it." />
        </div>
      </div>
    </AppChrome>
  );
}

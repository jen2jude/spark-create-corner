import { SectionHeader } from "@/components/SectionHeader";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Users,
  MailCheck,
  Palette,
  Shield,
  MonitorSmartphone,
  Target,
  RefreshCw,
  BarChart3,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Column span out of 6 on large screens. */
  span: 2 | 3;
  /** Larger type + padding for the two lead cards. */
  lead?: boolean;
};

const features: Feature[] = [
  {
    icon: MessageSquare,
    title: "Conversational Campaign Creation",
    description: "Tell Oventric what you want to achieve and let it help build the campaign.",
    span: 3,
    lead: true,
  },
  {
    icon: Users,
    title: "Audience Intelligence",
    description: "Import, organize, segment and understand your contacts before sending.",
    span: 3,
    lead: true,
  },
  {
    icon: MailCheck,
    title: "Email Verification",
    description: "Identify invalid, risky, disposable and duplicate contacts before they affect your campaign.",
    span: 2,
  },
  {
    icon: Palette,
    title: "AI Email Design",
    description: "Generate professional email content, layouts, subject lines, CTAs and campaign messaging.",
    span: 2,
  },
  {
    icon: Shield,
    title: "Deliverability Optimization",
    description: "Get guided through authentication and campaign health checks designed to improve delivery.",
    span: 2,
  },
  {
    icon: MonitorSmartphone,
    title: "Inbox Preview",
    description: "Preview how your campaign will appear across desktop and mobile before sending.",
    span: 3,
  },
  {
    icon: Target,
    title: "Conversion Tracking",
    description: "Go beyond opens and clicks. Track registrations, leads and other meaningful actions.",
    span: 3,
  },
  {
    icon: RefreshCw,
    title: "Lead Nurturing",
    description: "Automatically identify opportunities and recommend the next follow-up.",
    span: 3,
  },
  {
    icon: BarChart3,
    title: "Campaign Intelligence",
    description: "Ask questions about your actual campaign data and discover what worked.",
    span: 3,
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Core features"
          title="Everything your campaign needs. One intelligent workspace."
          lede="A complete marketing workspace, with intelligence working quietly across the entire journey."
          meta="Nine core capabilities"
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={cn(
                "group rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lift",
                feature.lead ? "p-8 shadow-soft lg:p-10" : "p-6 shadow-soft",
                feature.span === 3 ? "sm:col-span-2 lg:col-span-3" : "sm:col-span-1 lg:col-span-2",
              )}
            >
              <feature.icon
                className={cn("text-accent", feature.lead ? "h-6 w-6" : "h-5 w-5")}
                strokeWidth={1.5}
              />
              <h3
                className={cn(
                  "font-serif font-semibold text-foreground",
                  feature.lead ? "mt-6 text-2xl sm:text-[1.75rem]" : "mt-5 text-lg",
                )}
              >
                {feature.title}
              </h3>
              <p
                className={cn(
                  "text-muted-foreground",
                  feature.lead
                    ? "mt-3 max-w-md text-base leading-relaxed"
                    : "mt-2 max-w-sm text-sm leading-relaxed",
                )}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

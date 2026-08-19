import { MessageSquare, Users, Palette, Shield, BarChart3, RefreshCw } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Conversation-driven campaigns",
    description: "Describe your goal in plain language. Oventric translates it into strategy, audience, messaging, and a send plan you can review.",
  },
  {
    icon: Users,
    title: "Audience intelligence",
    description: "Import contacts from CSV, CRM, or events. Verify, segment, and understand who is most likely to engage.",
  },
  {
    icon: Palette,
    title: "Professional email design",
    description: "Brand-consistent emails generated and fully editable. No HTML or design expertise required.",
  },
  {
    icon: Shield,
    title: "Deliverability optimization",
    description: "Sender authentication, audience quality, engagement, bounces, and campaign health monitored continuously.",
  },
  {
    icon: BarChart3,
    title: "Real analytics",
    description: "Track opens, clicks, registrations, conversions, and revenue. Ask questions about your data and get answers from stored results.",
  },
  {
    icon: RefreshCw,
    title: "Lead nurturing & follow-up",
    description: "Journeys built on real behaviour, with a recommended next action for every segment.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="eyebrow">Capabilities</p>
          <h2 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Everything you need to turn contacts into customers
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            A complete marketing workspace, with intelligence working quietly across the entire journey.
          </p>
        </div>

        <div className="mt-16 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group border-b border-border px-0 py-8 transition-colors duration-300 sm:px-8 sm:[&:nth-child(2n+1)]:pl-0 lg:[&:nth-child(3n+1)]:pl-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <feature.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
              <h3 className="mt-5 font-serif text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

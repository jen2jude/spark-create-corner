import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Users, Palette, Shield, BarChart3, RefreshCw } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Conversation-driven campaigns",
    description: "Describe your goal in plain language. Oventric translates it into strategy, audience, messaging, and send plan.",
  },
  {
    icon: Users,
    title: "Audience intelligence",
    description: "Import contacts from CSV, CRM, or events. Verify, segment, and understand who is most likely to engage.",
  },
  {
    icon: Palette,
    title: "Professional email design",
    description: "Beautiful, brand-consistent emails generated and editable. No HTML or design expertise required.",
  },
  {
    icon: Shield,
    title: "Deliverability optimization",
    description: "AI monitors sender authentication, audience quality, engagement, bounces, and campaign health to optimize delivery.",
  },
  {
    icon: BarChart3,
    title: "Real analytics",
    description: "Track opens, clicks, registrations, conversions, and revenue. Ask questions about your data and get answers based on real stored results.",
  },
  {
    icon: RefreshCw,
    title: "Lead nurturing & follow-up",
    description: "Automated journeys based on opens, clicks, and registrations. Oventric recommends the next best follow-up.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to turn contacts into customers
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete marketing campaign workspace with AI operating across the entire journey.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border bg-card transition-all hover:border-accent/30 hover:shadow-sm"
            >
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <feature.icon className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="font-serif text-lg font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

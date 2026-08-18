import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, User, Briefcase, Building2, GraduationCap, Users } from "lucide-react";

const audiences = [
  {
    icon: Store,
    title: "Small businesses",
    description: "Restaurants, schools, real estate, travel, events, financial services, and local businesses that need professional email without a dedicated team.",
  },
  {
    icon: User,
    title: "Entrepreneurs & founders",
    description: "Run your business alone and skip the complexity of HTML design, segmentation, DNS, automation builders, and analytics setup.",
  },
  {
    icon: Briefcase,
    title: "Marketers",
    description: "Make great marketers faster. Delegate the operational work of building, sending, and tracking campaigns to Oventric.",
  },
  {
    icon: Building2,
    title: "Organizations with contact lists",
    description: "Turn CSVs, CRMs, event attendees, students, and members into nurtured audiences that convert.",
  },
  {
    icon: GraduationCap,
    title: "Creators, coaches & educators",
    description: "Sell courses, events, memberships, and consulting. Get people to take action: register, buy, attend, download, book.",
  },
  {
    icon: Users,
    title: "Sales & lead-generation teams",
    description: "Identify leads who clicked but didn't convert, then launch precise follow-up campaigns to close the gap.",
  },
];

export function AudienceSegments() {
  return (
    <section id="audience" className="px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for every audience owner
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you have 500 contacts or 500,000, Oventric helps you turn them into results.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => (
            <Card
              key={audience.title}
              className="border-border bg-card transition-all hover:border-accent/30 hover:shadow-sm"
            >
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <audience.icon className="h-5 w-5 text-foreground" />
                </div>
                <CardTitle className="font-serif text-lg font-semibold">{audience.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{audience.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Store, User, Briefcase, Building2, GraduationCap, Users } from "lucide-react";

const audiences = [
  {
    icon: Store,
    title: "Small businesses",
    description: "Restaurants, schools, real estate, travel, events, and financial services that need professional email without a dedicated team.",
  },
  {
    icon: User,
    title: "Entrepreneurs & founders",
    description: "Run the business alone and skip HTML design, segmentation, DNS, automation builders, and analytics setup.",
  },
  {
    icon: Briefcase,
    title: "Marketers",
    description: "Delegate the operational work of building, sending, and tracking campaigns, and keep the strategy.",
  },
  {
    icon: Building2,
    title: "Organizations with contact lists",
    description: "Turn CSVs, CRMs, event attendees, students, and members into nurtured audiences that convert.",
  },
  {
    icon: GraduationCap,
    title: "Creators, coaches & educators",
    description: "Sell courses, events, memberships, and consulting — register, buy, attend, download, book.",
  },
  {
    icon: Users,
    title: "Sales & lead-generation teams",
    description: "Identify leads who clicked but did not convert, then launch precise follow-up to close the gap.",
  },
];

export function AudienceSegments() {
  return (
    <section id="audience" className="border-t border-border bg-card px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="eyebrow">Who it is for</p>
          <h2 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Built for every audience owner
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Whether you hold 500 contacts or 500,000, the work is the same — and Oventric Mail carries it.
          </p>
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => (
            <div key={audience.title} className="border-t border-border pt-6">
              <div className="flex items-center gap-3">
                <audience.icon className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
                <h3 className="font-serif text-lg font-semibold text-foreground">{audience.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{audience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

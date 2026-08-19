import { SectionHeader } from "@/components/SectionHeader";
import foodTemplate from "@/assets/template-food.jpg";
import servicesTemplate from "@/assets/template-services.jpg";
import eventTemplate from "@/assets/template-event.jpg";
import courseTemplate from "@/assets/template-course.jpg";

const templates = [
  { src: foodTemplate, label: "Hospitality", caption: "Weekly menu announcement" },
  { src: servicesTemplate, label: "Professional services", caption: "Quarterly client briefing" },
  { src: eventTemplate, label: "Events", caption: "Invitation with RSVP tracking" },
  { src: courseTemplate, label: "Education", caption: "Course enrolment launch" },
];

export function TemplateGallery() {
  return (
    <section className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Email design"
          title="Emails that look like they were commissioned"
          lede="Oventric Mail writes and builds the layout around your goal and your brand. These are the kinds of campaigns it produces."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((t) => (
            <figure key={t.label} className="group">
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <img
                  src={t.src}
                  alt={`${t.label} email template — ${t.caption}`}
                  loading="lazy"
                  width={688}
                  height={960}
                  className="block h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <figcaption className="mt-4">
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">{t.label}</p>
                <p className="mt-1 text-sm text-foreground">{t.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

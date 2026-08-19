import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What exactly is Oventric Mail?",
    a: "A marketing and audience platform. You describe the outcome you want — registrations, sales, renewals, attendance — and Oventric Mail carries it through strategy, audience verification, email design, delivery, tracking, follow-up, and reporting. Sending email is one step inside that, not the whole product.",
  },
  {
    q: "How is it different from a normal email marketing tool?",
    a: "Conventional tools hand you a template editor and a contact list and leave the thinking to you. Oventric Mail starts from the business goal, drafts the plan, tells you which contacts are worth reaching, and reports results against the objective you set — with your judgement required at every step.",
  },
  {
    q: "Is it a chatbot?",
    a: "No. Conversation is how you brief the platform; the work still happens in a proper workspace with an audience table, a design canvas, deliverability checks, and analytics. The intelligence sits underneath the product rather than replacing its interface.",
  },
  {
    q: "Do I need a large contact list to get value?",
    a: "No. The workflow is the same at 500 contacts as it is at 500,000 — the difference is how much segmentation is useful. Small, well-understood lists often outperform large neglected ones.",
  },
  {
    q: "How does Oventric Mail handle deliverability?",
    a: "It reviews sender authentication, list quality, engagement history, bounce patterns, and send health before a campaign leaves, and flags what to fix. No platform can guarantee inbox placement, so it optimises the factors that are actually in your control.",
  },
  {
    q: "Where does Oventric Mail sit in the Oventric ecosystem?",
    a: "Mail is the audience and campaign product within Oventric. It shares the Oventric identity and is designed to work alongside other Oventric products rather than as a separate company.",
  },
  {
    q: "Can I import contacts I already have?",
    a: "Yes. CSV files, CRM exports, event attendee lists, and form submissions can all be brought in, then cleaned, deduplicated, segmented, and scored before your first send.",
  },
  {
    q: "When can I use it, and what does early access include?",
    a: "Oventric Mail is in development and we are onboarding in waves. Joining the waitlist puts you in line for early access, and the questions on the form directly shape which capabilities we build first.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-foreground lg:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Straight answers about what Oventric Mail is, what it does, and where it is in its life.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="py-6 text-left font-serif text-lg font-semibold text-foreground hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

import { WaitlistForm } from "./WaitlistForm";

export function WaitlistSection() {
  return (
    <section id="waitlist" className="border-t border-border px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Get early access
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join the waitlist to be among the first to use Oventric Mail. Help shape the product by sharing your current workflow and challenges.
          </p>
        </div>
        <div className="mt-12">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}

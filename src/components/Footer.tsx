import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Product", to: "/product" },
      { label: "How it works", to: "/how-it-works" },
      { label: "Deliverability", to: "/deliverability" },
      { label: "Questions", to: "/faq" },
    ],
  },
  {
    heading: "Access",
    links: [
      { label: "Request early access", to: "/early-access" },
      { label: "Sign in", to: "/login" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A marketing and audience platform that turns contacts into measurable outcomes.
            </p>
            <p className="mt-5 text-[0.6875rem] uppercase tracking-[0.24em] text-muted-foreground">
              An Oventric product
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-foreground">
                {column.heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Oventric. All rights reserved.
          </p>
          <p className="text-[0.6875rem] uppercase tracking-[0.22em] text-muted-foreground">
            Built for trust, intelligence, simplicity, control
          </p>
        </div>
      </div>
    </footer>
  );
}

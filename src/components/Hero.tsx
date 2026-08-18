import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, MousePointerClick, Shield, BarChart3, Mail, Zap, Clock } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-6 rounded-full px-3 py-1 text-xs font-medium">
              Early access
            </Badge>
            <h1 className="font-serif text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Turn your audience into outcomes
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Oventric Mail is a complete marketing campaign workspace powered by conversation. Tell us what you want to achieve — we guide you from strategy to audience, design, delivery, and measurable results.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" className="rounded-full px-6" asChild>
                <a href="#waitlist">
                  Request early access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-6" asChild>
                <a href="#workflow">See how it works</a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Deliverability-first</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Real analytics</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Lead intelligence</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/5 to-transparent blur-2xl" />
            <div className="relative rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">Product Preview</span>
                <Badge variant="secondary" className="text-xs">
                  <Zap className="mr-1 h-3 w-3" />
                  AI-assisted
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl bg-muted p-4">
                  <p className="text-sm font-medium text-foreground">You</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    "I want to get 500 registrations for my upcoming event."
                  </p>
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-sm font-medium text-foreground">Oventric</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    I'll help you build the campaign. Here is the recommended approach:
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                      <Users className="mt-0.5 h-4 w-4 text-accent" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Audience identified</p>
                        <p className="text-xs text-muted-foreground">4,200 engaged contacts</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                      <Mail className="mt-0.5 h-4 w-4 text-accent" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Recommended campaign</p>
                        <p className="text-xs text-muted-foreground">Event registration series</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                      <MousePointerClick className="mt-0.5 h-4 w-4 text-accent" />
                      <div>
                        <p className="text-xs font-medium text-foreground">CTA</p>
                        <p className="text-xs text-muted-foreground">Register now</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                      <BarChart3 className="mt-0.5 h-4 w-4 text-accent" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Tracking</p>
                        <p className="text-xs text-muted-foreground">Opens, clicks, registrations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                      <Shield className="mt-0.5 h-4 w-4 text-accent" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Deliverability</p>
                        <p className="text-xs text-muted-foreground">Healthy</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
                      <Clock className="mt-0.5 h-4 w-4 text-accent" />
                      <div>
                        <p className="text-xs font-medium text-foreground">Follow-up</p>
                        <p className="text-xs text-muted-foreground">Reminder for non-openers</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-lg bg-accent/5 p-3">
                    <div>
                      <p className="text-xs font-medium text-foreground">Estimated audience</p>
                      <p className="text-xs text-muted-foreground">3,800 reachable contacts</p>
                    </div>
                    <Button size="sm" className="h-7 text-xs">
                      Preview campaign
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

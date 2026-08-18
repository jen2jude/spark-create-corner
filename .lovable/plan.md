# Oventric Mail — Project Plan

## Scope for this first build
A premium, light/neutral marketing landing page for Oventric Mail, plus a waitlist/early-access signup flow backed by Lovable Cloud. The page must communicate the product's core promise: turn an audience into results through a single, natural-language conversation with an AI marketing expert. The AI does not dominate the UI; it is integrated and understated.

## Design commitments
- Light/neutral interface, off-white background (#FAFAF8), charcoal/black typography (#1A1A1A), subtle grey borders (#E7E5E4), restrained shadows.
- One sophisticated accent color: deep warm ochre/terracotta (#B45309) used sparingly for CTAs, highlights, and key states.
- Editorial typography with strong hierarchy, generous spacing, and precise alignment.
- No neon gradients, purple/blue AI aesthetics, glassmorphism, robots, sparkles, or excessive rounded cards.
- Minimal purposeful animation only: subtle fades on scroll, gentle hover transitions.

## Pages to build
1. **Landing page (`/`)**
   - Hero with natural-language prompt example ("I want to get 500 registrations for my upcoming event") and a minimal AI response card.
   - Trust bar: numbers/stats, deliverability promise, compliance note.
   - Feature grid covering AI campaign creation, audience intelligence, design, deliverability, analytics, lead nurturing.
   - "How it works" section: Strategy → Audience → Verification → Email → Design → CTA → Tracking → Deliverability → Preview → Send → Monitor → Lead → Follow-up → Analytics.
   - Audience segments: small business, entrepreneur, marketer, organizations with lists, creators/coaches, sales teams.
   - Early-access form (name, email, company, audience size, primary use case).
   - Footer with brand, links, and legal.
2. **Early-access thanks page (`/thanks`)**
   - Confirmation message and next steps.

## Backend/data
- Enable Lovable Cloud (auth + database + storage).
- Single table: `public.waitlist` (id, name, email, company, audience_size, use_case, created_at, status).
  - `GRANT SELECT, INSERT` to `anon` and `authenticated` (public waitlist form).
  - `GRANT ALL` to `service_role`.
  - `ENABLE ROW LEVEL SECURITY`.
  - Policy: anon can insert their own row; no row updates/delete.
- Server function: `submitWaitlistEntry` validates with Zod, inserts via supabaseAdmin (no auth required), and returns success.
- Email domain status check for transactional "welcome" email (only if domain exists; otherwise skip).

## Components
- `Hero` with natural-language input and AI reply preview.
- `FeatureCard` (icon, title, description, optional stat).
- `WorkflowStep` (numbered or connector-based steps).
- `AudienceSegment` (icon, title, pain points, Oventric outcome).
- `WaitlistForm` (validated, accessible, success state).
- `Footer`.

## Files
- `src/routes/index.tsx` (landing page with head metadata).
- `src/routes/thanks.tsx` (confirmation page with head metadata).
- `src/styles.css` (design system tokens: custom accent, typography, spacing).
- `src/lib/waitlist.functions.ts` (server function for form submission).
- `src/components/...` for sections.
- Migration for `public.waitlist` table.

## SEO
- Unique title, description, og:title, og:description, og:type, twitter:card on both routes.
- No relative/placeholder og:image.

## Success criteria
- Landing page renders as a polished, premium marketing site with no placeholder content.
- Waitlist form validates inputs and writes to the database via server function.
- Thanks page confirms submission.
- Build passes with no errors.

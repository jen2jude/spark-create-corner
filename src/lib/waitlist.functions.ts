import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const waitlistSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email").max(255),
  company: z.string().max(100).optional().or(z.literal("")),
  audience_size: z.string().max(50).optional().or(z.literal("")),
  primary_use_case: z.string().max(100).optional().or(z.literal("")),
  current_email_tool: z.string().max(50).optional().or(z.literal("")),
  biggest_challenge: z.string().max(100).optional().or(z.literal("")),
});

export const submitWaitlistEntry = createServerFn({ method: "POST" })
  .validator((data) => waitlistSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("waitlist").insert({
      name: data.name,
      email: data.email.toLowerCase().trim(),
      company: data.company || null,
      audience_size: data.audience_size || null,
      primary_use_case: data.primary_use_case || null,
      current_email_tool: data.current_email_tool || null,
      biggest_challenge: data.biggest_challenge || null,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  });

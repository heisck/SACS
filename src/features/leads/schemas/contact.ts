import { z } from "zod";

export const degreeLevels = ["masters", "phd", "undecided"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.email("Enter a valid email address"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  degree: z.enum(degreeLevels),
  message: z.string().trim().min(10, "Tell us a little more").max(2000)
});

export type ContactInput = z.infer<typeof contactSchema>;

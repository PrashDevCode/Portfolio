import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60),
  email: z.string().email("Please provide a valid email address"),
  message: z.string().min(2, "Message must be at least 2 characters").max(5000),
});

export type ContactFormData = z.infer<typeof contactSchema>;


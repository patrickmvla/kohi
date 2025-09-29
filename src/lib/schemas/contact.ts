import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(80, 'Keep it under 80 chars'),
  email: z.string().trim().email('Enter a valid email'),
  message: z.string().trim().min(10, 'Tell me a bit more').max(5000, 'That’s a bit long'),
  hp: z.string().max(0).optional(),           // honeypot
  started: z.coerce.number().optional(),      // coerces from string -> number
})

// Types for react-hook-form
export type ContactFormInput = z.input<typeof contactSchema>   // before coercion
export type ContactFormOutput = z.output<typeof contactSchema> // after coercion (started: number | undefined)
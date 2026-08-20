import { z } from 'zod';

export const WRITING_MODES = [
  'professional',
  'casual',
  'email',
  'whatsapp',
  'shorten',
] as const;

export const writingModeSchema = z.enum(WRITING_MODES);

export const rewriteBodySchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'Text is required.')
    .max(4000, 'Text must be at most 4000 characters.'),
  mode: writingModeSchema,
});

export const explainBodySchema = z.object({
  original: z
    .string()
    .trim()
    .min(1, 'Original text is required.')
    .max(4000, 'Original text must be at most 4000 characters.'),
  rewritten: z
    .string()
    .trim()
    .min(1, 'Rewritten text is required.')
    .max(8000, 'Rewritten text must be at most 8000 characters.'),
  mode: writingModeSchema,
});

export type WritingMode = z.infer<typeof writingModeSchema>;
export type RewriteBody = z.infer<typeof rewriteBodySchema>;
export type ExplainBody = z.infer<typeof explainBodySchema>;

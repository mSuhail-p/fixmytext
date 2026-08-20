export const WRITING_MODES = [
  'professional',
  'casual',
  'email',
  'whatsapp',
  'shorten',
] as const

export type WritingMode = (typeof WRITING_MODES)[number]

export const WRITING_MODE_LABELS: Record<WritingMode, string> = {
  professional: 'Professional',
  casual: 'Casual',
  email: 'Email',
  whatsapp: 'WhatsApp',
  shorten: 'Shorten',
}

export const MAX_DRAFT_LENGTH = 4000

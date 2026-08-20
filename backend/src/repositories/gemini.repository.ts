import { GoogleGenAI } from '@google/genai';
import type { Env } from '../env.js';
import {
  AppError,
  upstreamInvalidResponse,
  upstreamTimeout,
  upstreamUnavailable,
} from '../errors.js';
import type {
  GenerateStructuredInput,
  IAiRepository,
} from './ai.repository.js';

const TIMEOUT_MS = 15_000;

export class GeminiAiRepository implements IAiRepository {
  readonly model: string;
  private readonly apiKey: string;

  constructor(config: Env) {
    this.model = config.geminiModel;
    this.apiKey = config.geminiApiKey;
  }

  isConfigured(): boolean {
    return this.apiKey.length > 0;
  }

  async generateStructured<T>(input: GenerateStructuredInput<T>): Promise<T> {
    if (!this.isConfigured()) {
      throw upstreamUnavailable('The writing service is not configured.');
    }

    const client = new GoogleGenAI({ apiKey: this.apiKey });

    let rawText: string;
    try {
      const response = await client.models.generateContent({
        model: this.model,
        contents: input.userContent,
        config: {
          systemInstruction: input.systemInstruction,
          temperature: 0.3,
          responseMimeType: 'application/json',
          responseJsonSchema: input.jsonSchema,
          httpOptions: { timeout: TIMEOUT_MS },
        },
      });
      rawText = response.text ?? '';
    } catch (error: unknown) {
      throw mapGeminiError(error);
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawText) as unknown;
    } catch {
      throw upstreamInvalidResponse();
    }

    const result = input.schema.safeParse(parsed);
    if (!result.success) {
      throw upstreamInvalidResponse();
    }

    return result.data;
  }
}

function parseCleanErrorMessage(rawMessage: string): string {
  if (!rawMessage) return 'The writing service is temporarily unavailable.'

  try {
    const parsed = JSON.parse(rawMessage) as { error?: { message?: string } }
    if (parsed?.error?.message) {
      return parsed.error.message
    }
  } catch {
    // Not plain JSON
  }

  const jsonMatch = rawMessage.match(/\{[\s\S]*\}/)
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]) as { error?: { message?: string } }
      if (parsed?.error?.message) {
        return parsed.error.message
      }
    } catch {
      // Ignore parsing errors
    }
  }

  return rawMessage
}

function mapGeminiError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error
  }

  const rawMessage = error instanceof Error ? error.message : ''
  const lower = rawMessage.toLowerCase()

  if (
    lower.includes('timeout') ||
    lower.includes('timed out') ||
    lower.includes('abort')
  ) {
    return upstreamTimeout()
  }

  if (
    lower.includes('429') ||
    lower.includes('quota') ||
    lower.includes('resource exhausted')
  ) {
    return upstreamUnavailable(
      'The writing service is rate limited. Try again later.',
    )
  }

  if (
    lower.includes('503') ||
    lower.includes('unavailable') ||
    lower.includes('high demand')
  ) {
    return upstreamUnavailable(
      'The AI service is currently experiencing high demand. Spikes in demand are usually temporary. Please try again in a few moments.',
    )
  }

  const cleanMessage = parseCleanErrorMessage(rawMessage)
  return upstreamUnavailable(cleanMessage)
}



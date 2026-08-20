import { z } from 'zod';
import { explainPrompt, rewritePrompt } from '../prompts.js';
import type { IAiRepository } from '../repositories/ai.repository.js';
import type { WritingMode } from '../validation.js';

const rewriteResultSchema = z.object({
  result: z.string().min(1),
});

const explainResultSchema = z.object({
  explanation: z.string().min(1),
});

export type RewriteResult = {
  result: string;
  mode: WritingMode;
  model: string;
};

export type ExplainResult = {
  explanation: string;
};

export class WritingService {
  private readonly aiRepository: IAiRepository;

  constructor(aiRepository: IAiRepository) {
    this.aiRepository = aiRepository;
  }

  async rewrite(text: string, mode: WritingMode): Promise<RewriteResult> {
    const prompt = rewritePrompt(mode, text);
    const data = await this.aiRepository.generateStructured({
      systemInstruction: prompt.systemInstruction,
      userContent: prompt.userContent,
      schema: rewriteResultSchema,
      jsonSchema: {
        type: 'object',
        properties: { result: { type: 'string' } },
        required: ['result'],
      },
    });

    return {
      result: data.result.trim(),
      mode,
      model: this.aiRepository.model,
    };
  }

  async explain(
    original: string,
    rewritten: string,
    mode: WritingMode,
  ): Promise<ExplainResult> {
    const prompt = explainPrompt(mode, original, rewritten);
    const data = await this.aiRepository.generateStructured({
      systemInstruction: prompt.systemInstruction,
      userContent: prompt.userContent,
      schema: explainResultSchema,
      jsonSchema: {
        type: 'object',
        properties: { explanation: { type: 'string' } },
        required: ['explanation'],
      },
    });

    return { explanation: data.explanation.trim() };
  }
}

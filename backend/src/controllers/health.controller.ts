import type { Request, Response } from 'express';
import type { Env } from '../env.js';
import type { IAiRepository } from '../repositories/ai.repository.js';

export type HealthResponse = {
  ok: true;
  geminiConfigured: boolean;
  model: string;
};

export class HealthController {
  private readonly aiRepository: IAiRepository;
  private readonly config: Env;

  constructor(aiRepository: IAiRepository, config: Env) {
    this.aiRepository = aiRepository;
    this.config = config;
  }

  get = (_req: Request, res: Response<HealthResponse>): void => {
    res.json({
      ok: true,
      geminiConfigured: this.aiRepository.isConfigured(),
      model: this.config.geminiModel,
    });
  };
}

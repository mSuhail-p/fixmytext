import { HealthController } from './controllers/health.controller.js';
import { WritingController } from './controllers/writing.controller.js';
import type { Env } from './env.js';
import { env } from './env.js';
import type { IAiRepository } from './repositories/ai.repository.js';
import { GeminiAiRepository } from './repositories/gemini.repository.js';
import { WritingService } from './services/writing.service.js';

export type AppContainer = {
  readonly config: Env;
  readonly aiRepository: IAiRepository;
  readonly writingService: WritingService;
  readonly writingController: WritingController;
  readonly healthController: HealthController;
};

export function createContainer(config: Env = env): AppContainer {
  const aiRepository: IAiRepository = new GeminiAiRepository(config);
  const writingService = new WritingService(aiRepository);
  const writingController = new WritingController(writingService);
  const healthController = new HealthController(aiRepository, config);

  return {
    config,
    aiRepository,
    writingService,
    writingController,
    healthController,
  };
}

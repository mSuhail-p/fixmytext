import { Router } from 'express';
import type { HealthController } from '../controllers/health.controller.js';
import type { WritingController } from '../controllers/writing.controller.js';
import { validateBody } from '../middleware.js';
import { explainBodySchema, rewriteBodySchema } from '../validation.js';

export function createApiRouter(
  writingController: WritingController,
  healthController: HealthController,
): Router {
  const router = Router();

  router.get('/health', healthController.get);
  router.post(
    '/rewrite',
    validateBody(rewriteBodySchema),
    writingController.rewrite,
  );
  router.post(
    '/explain',
    validateBody(explainBodySchema),
    writingController.explain,
  );

  return router;
}

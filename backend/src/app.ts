import cors from 'cors';
import express, { type Express } from 'express';
import type { AppContainer } from './composition.js';
import { attachRequestId, errorHandler } from './middleware.js';
import { createApiRouter } from './routes/api.js';

export function createApp(container: AppContainer): Express {
  const app = express();

  app.use(attachRequestId);
  app.use(cors({ origin: container.config.corsOrigin }));
  app.use(express.json({ limit: '16kb' }));
  app.use(
    '/api/v1',
    createApiRouter(container.writingController, container.healthController),
  );
  app.use(errorHandler);

  return app;
}

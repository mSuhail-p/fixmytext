import type { NextFunction, Request, Response } from 'express';
import { readBody } from '../middleware.js';
import type { WritingService } from '../services/writing.service.js';
import { explainBodySchema, rewriteBodySchema } from '../validation.js';

export class WritingController {
  private readonly writingService: WritingService;

  constructor(writingService: WritingService) {
    this.writingService = writingService;
  }

  rewrite = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { text, mode } = readBody(req, rewriteBodySchema);
      const payload = await this.writingService.rewrite(text, mode);
      res.json(payload);
    } catch (error: unknown) {
      next(error);
    }
  };

  explain = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { original, rewritten, mode } = readBody(req, explainBodySchema);
      const payload = await this.writingService.explain(
        original,
        rewritten,
        mode,
      );
      res.json(payload);
    } catch (error: unknown) {
      next(error);
    }
  };
}

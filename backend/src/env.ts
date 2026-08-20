import 'dotenv/config';

export type Env = {
  readonly port: number;
  readonly corsOrigin: string;
  readonly geminiApiKey: string;
  readonly geminiModel: string;
};

export const env: Env = {
  port: Number(process.env.PORT) || 3001,
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  geminiApiKey: process.env.GEMINI_API_KEY ?? '',
  geminiModel: process.env.GEMINI_MODEL ?? 'gemini-2.5-flash',
};

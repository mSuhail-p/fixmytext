import type { ZodType } from 'zod';

export type StringObjectSchema = {
  readonly type: 'object';
  readonly properties: Readonly<Record<string, { readonly type: 'string' }>>;
  readonly required: readonly string[];
};

export type GenerateStructuredInput<T> = {
  readonly systemInstruction: string;
  readonly userContent: string;
  readonly schema: ZodType<T>;
  readonly jsonSchema: StringObjectSchema;
};

export interface IAiRepository {
  readonly model: string;
  isConfigured(): boolean;
  generateStructured<T>(input: GenerateStructuredInput<T>): Promise<T>;
}

import { type ZodType, prettifyError } from "zod";

/**
 * Raised when a content source does not match its expected shape.
 */
export class InvalidContentError extends Error {
  constructor(source: string, details: string) {
    super(`Invalid content in "${source}":\n${details}`);
    this.name = "InvalidContentError";
  }
}

export function parseSource<T>(schema: ZodType<T>, raw: unknown, source: string): T {
  const result = schema.safeParse(raw);
  if (!result.success) {
    throw new InvalidContentError(source, prettifyError(result.error));
  }
  return result.data;
}

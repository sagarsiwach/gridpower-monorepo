import { z } from "zod";

const runtimeVarsSchema = z.object({
  ALLOWED_ORIGINS: z
    .string()
    .default("http://localhost:5173,http://localhost:5174,http://localhost:5175"),
  ENVIRONMENT: z.enum(["development", "staging", "production"]).default("development"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

export type RuntimeVars = z.infer<typeof runtimeVarsSchema>;

export function parseRuntimeVars(input: unknown): RuntimeVars {
  return runtimeVarsSchema.parse(input);
}

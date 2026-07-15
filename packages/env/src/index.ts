import { z } from "zod";
const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(14780),
  DATABASE_URL: z.string().default("postgres://grid:grid@localhost:55432/grid_platform"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});
export type PlatformEnv = z.infer<typeof schema>;
export const readEnv = (input: Record<string, string | undefined> = process.env): PlatformEnv =>
  schema.parse(input);

export const log = (
  level: "info" | "warn" | "error",
  event: string,
  fields: Record<string, unknown> = {},
) => console[level](JSON.stringify({ level, event, at: new Date().toISOString(), ...fields }));

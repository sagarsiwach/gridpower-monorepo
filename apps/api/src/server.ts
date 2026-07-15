import { readEnv } from "@grid-platform/env";
import { log } from "@grid-platform/observability";
import { app } from "./app";
const env = readEnv();
log("info", "api.start", { port: env.PORT });
export default { port: env.PORT, fetch: app.fetch };

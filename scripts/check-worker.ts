const workspace = Bun.argv[2];
const appPath = Bun.argv[3];

if (!workspace || !appPath) {
  throw new Error("Usage: bun run check:worker <workspace-name> <app-path>");
}

async function run(command: string[]) {
  const process = Bun.spawn(command, { stderr: "inherit", stdout: "inherit" });
  const exitCode = await process.exited;
  if (exitCode !== 0) throw new Error(`${command.join(" ")} failed`);
}

await run([
  "bunx",
  "turbo",
  "run",
  "lint",
  "typecheck",
  "test",
  "build",
  `--filter=${workspace}...`,
]);
await run(["bun", "run", "scripts/cloudflare-dry-run.ts", "--app", appPath]);

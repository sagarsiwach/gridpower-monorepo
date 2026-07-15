type WorkerApp = {
  path: string;
  workspace: string;
};

const workers: WorkerApp[] = [
  { path: "apps/api", workspace: "@grid-platform/api" },
  { path: "apps/ocpp", workspace: "@grid-platform/ocpp" },
  { path: "apps/www", workspace: "@gridpower/www" },
  { path: "apps/web", workspace: "@gridpower/web" },
  { path: "apps/console-energy", workspace: "@gridpower/console-energy" },
  { path: "apps/console-charge", workspace: "@gridpower/console-charge" },
  { path: "apps/portal-gridos", workspace: "@grid-platform/portal-gridos" },
];

const requestedPath = Bun.argv.includes("--app")
  ? Bun.argv[Bun.argv.indexOf("--app") + 1]
  : undefined;
const selected = requestedPath
  ? workers.filter((worker) => worker.path === requestedPath)
  : workers;

if (requestedPath && selected.length === 0) {
  throw new Error(`Unknown Worker application: ${requestedPath}`);
}

async function run(command: string[], cwd: string) {
  const process = Bun.spawn(command, { cwd, stderr: "inherit", stdout: "inherit" });
  const exitCode = await process.exited;
  if (exitCode !== 0) {
    throw new Error(`${command.join(" ")} failed in ${cwd}`);
  }
}

for (const worker of selected) {
  console.log(JSON.stringify({ phase: "build", ...worker }));
  await run(["bun", "run", "build"], worker.path);

  if (worker.path !== "apps/api" && worker.path !== "apps/ocpp") {
    console.log(JSON.stringify({ phase: "wrangler-dry-run", ...worker }));
    await run(
      ["bunx", "wrangler", "deploy", "--dry-run", "--env=", "--outdir", ".wrangler/dry-run"],
      worker.path,
    );
  }
}

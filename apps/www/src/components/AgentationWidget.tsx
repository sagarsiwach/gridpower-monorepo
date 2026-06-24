import { useEffect, useState, type ComponentType } from "react";

const ENDPOINT =
  import.meta.env.VITE_AGENTATION_URL ?? "https://feedback.gridenergy.co.in";

const ALLOWED_HOSTS = new Set([
  "staging.gridenergy.co.in",
  "localhost",
  "127.0.0.1",
  "100.112.239.117",
]);

export function AgentationWidget() {
  const [Tool, setTool] = useState<ComponentType<{ endpoint: string }> | null>(
    null,
  );

  useEffect(() => {
    if (!ALLOWED_HOSTS.has(window.location.hostname)) return;

    let alive = true;
    import("agentation").then((m) => {
      if (alive) {
        setTool(() => m.Agentation as ComponentType<{ endpoint: string }>);
      }
    });

    return () => {
      alive = false;
    };
  }, []);

  return Tool ? <Tool endpoint={ENDPOINT} /> : null;
}

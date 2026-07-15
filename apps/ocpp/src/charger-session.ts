import { log } from "@grid-platform/observability";

type OcppFrame = [2, string, string, Record<string, unknown>];

export class ChargerSession {
  constructor(private readonly state: DurableObjectState) {}

  async fetch(request: Request): Promise<Response> {
    if (request.headers.get("Upgrade")?.toLowerCase() !== "websocket") {
      return new Response("WebSocket upgrade required", { status: 426 });
    }

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];
    this.state.acceptWebSocket(server);

    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(socket: WebSocket, message: string | ArrayBuffer) {
    if (typeof message !== "string") {
      socket.send(JSON.stringify([4, "binary-not-supported", "FormationViolation", "", {}]));
      return;
    }

    try {
      const frame = JSON.parse(message) as OcppFrame;
      const [messageType, messageId, action] = frame;
      if (messageType !== 2 || typeof messageId !== "string" || typeof action !== "string") {
        throw new Error("unsupported_frame");
      }

      const payload =
        action === "BootNotification"
          ? { currentTime: new Date().toISOString(), interval: 300, status: "Accepted" }
          : action === "Heartbeat"
            ? { currentTime: new Date().toISOString() }
            : { accepted: true, simulated: true };

      socket.send(JSON.stringify([3, messageId, payload]));
    } catch (error) {
      log("warn", "ocpp.frame.rejected", {
        error: error instanceof Error ? error.message : String(error),
      });
      socket.send(JSON.stringify([4, "invalid", "FormationViolation", "Invalid OCPP frame", {}]));
    }
  }

  webSocketClose(socket: WebSocket, code: number, reason: string) {
    log("info", "ocpp.connection.closed", { code, reason });
    socket.close(code, reason);
  }
}

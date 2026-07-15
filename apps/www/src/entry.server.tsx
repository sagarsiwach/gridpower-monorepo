import type { EntryContext } from "react-router";
import { ServerRouter } from "react-router";
import { renderToReadableStream } from "react-dom/server";

// Cloudflare Workers server entry. The default React Router entry uses the
// Node-only `renderToPipeableStream`, which does not exist in the Workers
// runtime — here we use the Web Streams `renderToReadableStream` instead.
export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  let didError = false;

  const stream = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      onError(error: unknown) {
        didError = true;
        console.error(error);
      },
    },
  );

  // Marketing site: wait for the full document so crawlers and link previews
  // receive complete HTML. Cloudflare caches the response at the edge.
  await stream.allReady;

  responseHeaders.set("Content-Type", "text/html");
  return new Response(stream, {
    headers: responseHeaders,
    status: didError ? 500 : responseStatusCode,
  });
}

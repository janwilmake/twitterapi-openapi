import { withMcp } from "with-mcp";
//@ts-ignore
import openapi from "./openapi.json";

export default {
  fetch: withMcp(
    (request) => {
      const url = new URL(request.url);
      const apiKey =
        request.headers.get("x-api-key") || url.searchParams.get("apiKey");
      if (!apiKey) {
        return new Response("No API key provided", { status: 400 });
      }
      return fetch("https://api.twitterapi.io" + url.pathname + url.search, {
        method: request.method,
        body: request.body,
        headers: {
          "x-api-key": apiKey,
        },
      });
    },
    openapi,
    {
      toolOperationIds: ["searchTweetsAdvanced"],
    }
  ),
};

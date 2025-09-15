import { withMcp } from "with-mcp";
//@ts-ignore
import openapi from "./openapi.json";

export default {
  fetch: withMcp(
    (request) => {
      const url = new URL(request.url);
      const headerApiKey = request.headers.get("x-api-key");
      const queryApiKey = url.searchParams.get("apiKey");
      const apiKey = headerApiKey || queryApiKey;
      if (!apiKey) {
        return new Response("No API key provided", { status: 400 });
      }
      console.log({ headerApiKey, queryApiKey, apiKey });

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

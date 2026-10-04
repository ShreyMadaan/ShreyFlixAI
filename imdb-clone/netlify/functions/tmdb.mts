import type { Config } from "@netlify/functions";

export default async (request: Request) => {
  if (request.method !== "GET") {
    return Response.json({ error: "Method not allowed" }, {
      status: 405,
      headers: { Allow: "GET" },
    });
  }

  const requestUrl = new URL(request.url);
  const path = requestUrl.searchParams.get("path") || "";
  if (!/^(movie\/popular|movie\/trending\/week|search\/movie|movie\/\d+)$/.test(path)) {
    return Response.json({ error: "Unknown movie endpoint" }, { status: 404 });
  }

  const apiKey = Netlify.env.get("TMDB_API_KEY") || Netlify.env.get("VITE_TMDB_API_KEY");
  if (!apiKey) {
    return Response.json({ error: "Movie service is not configured" }, { status: 503 });
  }

  const upstreamUrl = new URL(`/3/${path}`, "https://api.themoviedb.org");
  upstreamUrl.searchParams.set("api_key", apiKey);
  for (const name of ["page", "query"]) {
    const value = requestUrl.searchParams.get(name);
    if (value !== null) upstreamUrl.searchParams.set(name, value);
  }

  try {
    const response = await fetch(upstreamUrl, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) {
      const status = response.status === 404 || response.status === 429 ? response.status : 502;
      return Response.json({ error: "Unable to load movies" }, { status });
    }
    return Response.json(await response.json());
  } catch {
    return Response.json({ error: "Movie service is unavailable" }, { status: 502 });
  }
};

export const config: Config = {
  rateLimit: { windowLimit: 120, windowSize: 60, aggregateBy: ["ip", "domain"] },
};

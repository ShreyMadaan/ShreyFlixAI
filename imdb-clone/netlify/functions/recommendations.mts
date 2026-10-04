import type { Config } from "@netlify/functions";

export default async (request: Request) => {
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, {
      status: 405,
      headers: { Allow: "POST" },
    });
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  let titles: unknown;
  try {
    const body = await request.text();
    if (body.length > 16000) {
      return Response.json({ error: "Watchlist is too large" }, { status: 413 });
    }
    titles = JSON.parse(body).titles;
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!Array.isArray(titles) || titles.length === 0 || titles.length > 50 ||
    titles.some((title) => typeof title !== "string" || !title.trim() || title.length > 200)) {
    return Response.json({ error: "Provide between 1 and 50 movie titles" }, { status: 400 });
  }

  const apiKey = Netlify.env.get("GROQ_API_KEY") || Netlify.env.get("VITE_GROQ_API_KEY");
  if (!apiKey) {
    return Response.json({ error: "Recommendations are not configured" }, { status: 503 });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [
          { role: "system", content: "You are a movie recommendation assistant. Be concise and helpful." },
          {
            role: "user",
            content: `I have these movies in my watchlist: ${titles.join(", ")}. Based on my taste, suggest 3 movies I would enjoy that are NOT in my list. For each suggestion, give the movie name and one sentence explaining why I would like it. Keep it short.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) {
      return Response.json({ error: "Unable to get recommendations" }, {
        status: response.status === 429 ? 429 : 502,
      });
    }

    const data = await response.json();
    const recommendation = data.choices?.[0]?.message?.content;
    if (typeof recommendation !== "string" || !recommendation.trim()) {
      return Response.json({ error: "No recommendation was returned" }, { status: 502 });
    }
    return Response.json({ recommendation }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "Recommendation service is unavailable" }, { status: 502 });
  }
};

export const config: Config = {
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ["ip", "domain"] },
};

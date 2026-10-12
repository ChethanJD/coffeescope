import "server-only";

/**
 * Live news provider abstraction. Uses NewsAPI.org
 * (https://newsapi.org/) when NEWS_API_KEY is set (see .env.example).
 * Swappable — nothing outside this file knows which provider is behind
 * getLiveCoffeeNews(). No key configured means an explicit
 * `status: "not_configured"`, never fabricated articles.
 */

export interface LiveNewsArticle {
  title: string;
  summary: string | null;
  source: string;
  url: string;
  imageUrl: string | null;
  publishedAt: string;
}

export type LiveNewsResult =
  | { status: "live"; articles: LiveNewsArticle[] }
  | { status: "not_configured" }
  | { status: "error"; message: string };

export async function getLiveCoffeeNews(limit = 12): Promise<LiveNewsResult> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return { status: "not_configured" };
  }

  try {
    const url = new URL("https://newsapi.org/v2/everything");
    url.searchParams.set("q", "coffee AND (market OR price OR harvest OR export)");
    url.searchParams.set("language", "en");
    url.searchParams.set("sortBy", "publishedAt");
    url.searchParams.set("pageSize", String(limit));

    const response = await fetch(url.toString(), {
      headers: { "X-Api-Key": apiKey },
      // News goes stale in minutes, but there's no need to hit the
      // provider on every single page render either.
      next: { revalidate: 900 },
    });

    if (!response.ok) {
      return { status: "error", message: `News provider returned ${response.status}` };
    }

    const data = await response.json();
    if (!Array.isArray(data?.articles)) {
      return { status: "error", message: "Unexpected response from news provider" };
    }

    const articles: LiveNewsArticle[] = data.articles
      .filter((a: { title?: string; url?: string }) => a.title && a.url)
      .slice(0, limit)
      .map(
        (a: {
          title: string;
          description: string | null;
          source?: { name?: string };
          url: string;
          urlToImage: string | null;
          publishedAt: string;
        }) => ({
          title: a.title,
          summary: a.description,
          source: a.source?.name ?? "Unknown source",
          url: a.url,
          imageUrl: a.urlToImage,
          publishedAt: a.publishedAt,
        })
      );

    return { status: "live", articles };
  } catch {
    return { status: "error", message: "Could not reach the news provider" };
  }
}

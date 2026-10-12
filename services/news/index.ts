import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { NewsArticle } from "@/types/models";

/**
 * News service. Reads the `news` table, populated by a future
 * ingestion job (ICO bulletins, trade press, origin-country sources —
 * see the project brief). The existing News section continues to render
 * lib/data/mockNews.ts (a richer UI-only shape with images/categories)
 * until that ingestion job exists; this service exists so the frontend
 * has a typed, real path to switch to once articles are actually stored.
 */

export interface NewsResult {
  articles: NewsArticle[];
  source: "database" | "unavailable";
}

/** Most recent news articles, newest first. */
export async function getLatestNews(limit = 20): Promise<NewsResult> {
  if (!isSupabaseConfigured()) {
    return { articles: [], source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error || !data) {
      return { articles: [], source: "unavailable" };
    }

    const articles: NewsArticle[] = data.map((row) => ({
      id: row.id,
      title: row.title,
      summary: row.summary,
      source: row.source,
      url: row.url,
      publishedAt: row.published_at,
    }));

    return { articles, source: "database" };
  } catch {
    return { articles: [], source: "unavailable" };
  }
}

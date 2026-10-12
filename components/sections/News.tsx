"use client";

import { useEffect, useState } from "react";
import { NewsCard } from "@/components/news/NewsCard";
import { LiveNewsCard } from "@/components/news/LiveNewsCard";
import { NEWS_ARTICLES } from "@/lib/data/mockNews";
import { getLiveNewsAction } from "@/app/news/actions";
import type { LiveNewsArticle } from "@/services/news/liveProvider";

export function News() {
  const [liveArticles, setLiveArticles] = useState<LiveNewsArticle[] | null>(null);
  const [status, setStatus] = useState<"loading" | "live" | "demo" | "error">("loading");

  useEffect(() => {
    getLiveNewsAction().then((result) => {
      if (result.status === "live" && result.articles.length > 0) {
        setLiveArticles(result.articles);
        setStatus("live");
      } else if (result.status === "not_configured") {
        setStatus("demo");
      } else {
        setStatus("error");
      }
    });
  }, []);

  const isLive = status === "live" && liveArticles;

  return (
    <section id="news" className="relative bg-surface-void px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-coffee-gold">
            Coffee News
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            What's moving the market today
          </h2>
          <p className="mt-4 text-white/50">
            Curated coverage from trade press, origin-country reports, and
            policy desks — all in one feed.
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          {status === "loading" && (
            <p className="text-xs text-white/30">Loading news...</p>
          )}
          {isLive && (
            <p className="rounded-full border border-coffee-leaf/20 bg-coffee-leaf/10 px-3 py-1 text-xs text-coffee-leaf">
              Live from NewsAPI · updated just now
            </p>
          )}
          {status === "demo" && (
            <p className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40">
              Showing sample articles — set NEWS_API_KEY for live coverage
            </p>
          )}
          {status === "error" && (
            <p className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40">
              Live news is temporarily unavailable — showing sample articles instead
            </p>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {isLive
            ? liveArticles!.map((article, index) => (
                <LiveNewsCard key={article.url} article={article} index={index} />
              ))
            : NEWS_ARTICLES.map((article, index) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))}
        </div>
      </div>
    </section>
  );
}

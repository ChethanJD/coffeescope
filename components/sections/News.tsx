import { NewsCard } from "@/components/news/NewsCard";
import { NEWS_ARTICLES } from "@/lib/data/mockNews";

export function News() {
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

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {NEWS_ARTICLES.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

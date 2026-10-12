"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Newspaper } from "lucide-react";
import type { LiveNewsArticle } from "@/services/news/liveProvider";

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const hours = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60)));
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function LiveNewsCard({ article, index }: { article: LiveNewsArticle; index: number }) {
  return (
    <motion.a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="glass group flex flex-col overflow-hidden rounded-xl3 shadow-card"
    >
      <div className="relative h-44 w-full overflow-hidden bg-white/[0.03]">
        {article.imageUrl ? (
          // External publisher image hosts aren't in next/image's allowlist.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Newspaper className="h-8 w-8 text-white/15" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm">
          Live
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-base font-semibold leading-snug text-white">
          {article.title}
        </h3>
        {article.summary && (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">{article.summary}</p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs text-white/40">
            {article.source} · {timeAgo(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold text-coffee-gold">
            Read more
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

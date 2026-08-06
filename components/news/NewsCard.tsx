"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { NewsArticle } from "@/lib/data/mockNews";

export function NewsCard({ article, index }: { article: NewsArticle; index: number }) {
  return (
    <motion.a
      href={article.url}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="glass group flex flex-col overflow-hidden rounded-xl3 shadow-card"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={article.imageUrl}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm">
          {article.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-base font-semibold leading-snug text-white">
          {article.headline}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">
          {article.summary}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs text-white/40">
            {article.source} · {article.publishedLabel}
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

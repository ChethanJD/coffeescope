export interface NewsArticle {
  id: string;
  headline: string;
  summary: string;
  source: string;
  publishedLabel: string;
  imageUrl: string;
  url: string;
  category: string;
}

/**
 * Mock news feed. In production this is replaced by GET /api/news
 * (aggregated from ICO, trade press, and origin-country sources), but
 * every consumer only depends on the NewsArticle shape below.
 */
export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "1",
    headline: "Brazilian frost risk pushes Arabica futures to 6-month high",
    summary:
      "Overnight temperature drops in Minas Gerais have traders pricing in potential crop damage ahead of the July harvest window.",
    source: "Commodity Wire",
    publishedLabel: "2h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    url: "#",
    category: "Market",
  },
  {
    id: "2",
    headline: "Vietnam Robusta exports slow as monsoon rains delay harvest",
    summary:
      "Shipping data shows a 12% drop in outbound volume from Dak Lak province, tightening near-term Robusta supply.",
    source: "Origin Report",
    publishedLabel: "5h ago",
    imageUrl:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
    url: "#",
    category: "Supply Chain",
  },
  {
    id: "3",
    headline: "EU deforestation regulation compliance deadline approaches",
    summary:
      "Exporters across Colombia and Ethiopia are racing to complete geolocation traceability documentation ahead of enforcement.",
    source: "Trade Policy Desk",
    publishedLabel: "1d ago",
    imageUrl:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80",
    url: "#",
    category: "Regulation",
  },
  {
    id: "4",
    headline: "Specialty roasters report rising demand for Ethiopian heirloom lots",
    summary:
      "Cupping scores from the Sidama region are drawing premium bids at auction, up 8% from last season's average.",
    source: "Specialty Coffee Journal",
    publishedLabel: "1d ago",
    imageUrl:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    url: "#",
    category: "Specialty",
  },
  {
    id: "5",
    headline: "India's Chikmagalur growers brace for early monsoon storms",
    summary:
      "Meteorological models suggest a storm system may arrive a week ahead of schedule, raising concerns for shade-grown crops.",
    source: "AgriWeather Network",
    publishedLabel: "2d ago",
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    url: "#",
    category: "Weather",
  },
  {
    id: "6",
    headline: "Global coffee consumption forecast to hit record high in 2026",
    summary:
      "The International Coffee Organization projects demand growth outpacing supply for the third consecutive year.",
    source: "ICO Bulletin",
    publishedLabel: "3d ago",
    imageUrl:
      "https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=800&q=80",
    url: "#",
    category: "Market",
  },
];

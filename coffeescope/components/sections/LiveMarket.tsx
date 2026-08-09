import { MarketCard } from "@/components/market/MarketCard";
import { MOCK_QUOTES } from "@/lib/data/mockMarket";

export function LiveMarket() {
  return (
    <section id="market" className="relative bg-surface-void px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-coffee-gold">
            Live Market
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Prices that move as fast as the market does
          </h2>
          <p className="mt-4 text-white/50">
            Streaming Arabica and Robusta benchmarks, refreshed in real time
            from global exchanges.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {MOCK_QUOTES.map((quote, index) => (
            <MarketCard key={quote.variety} quote={quote} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

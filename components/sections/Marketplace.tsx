"use client";

import { useMemo, useState } from "react";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { ListingFilters, type SortOption } from "@/components/marketplace/ListingFilters";
import { SellerCTABanner } from "@/components/marketplace/SellerCTABanner";
import { MARKETPLACE_LISTINGS } from "@/lib/data/mockMarketplace";

export function Marketplace() {
  const [activeVariety, setActiveVariety] = useState("All");
  const [sort, setSort] = useState<SortOption>("newest");

  const listings = useMemo(() => {
    let result = MARKETPLACE_LISTINGS;
    if (activeVariety !== "All") {
      result = result.filter((l) => l.variety === activeVariety);
    }
    result = [...result];
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.pricePerKg - b.pricePerKg);
        break;
      case "price-desc":
        result.sort((a, b) => b.pricePerKg - a.pricePerKg);
        break;
      case "quantity-desc":
        result.sort((a, b) => b.quantityKg - a.quantityKg);
        break;
      default:
        break; // "newest" keeps mock data's natural order
    }
    return result;
  }, [activeVariety, sort]);

  return (
    <section id="marketplace" className="relative bg-surface-void px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-coffee-gold">
            Marketplace
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Buy and sell coffee lots directly
          </h2>
          <p className="mt-4 text-white/50">
            Verified listings straight from growers — no intermediaries
            between the farm and the buyer.
          </p>
        </div>

        <div className="mt-12">
          <SellerCTABanner />
        </div>

        <div className="mt-10">
          <ListingFilters
            activeVariety={activeVariety}
            onVarietyChange={setActiveVariety}
            sort={sort}
            onSortChange={setSort}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing, index) => (
            <ListingCard key={listing.id} listing={listing} index={index} />
          ))}
        </div>

        {listings.length === 0 && (
          <p className="mt-10 text-center text-sm text-white/40">
            No listings match this filter yet.
          </p>
        )}
      </div>
    </section>
  );
}

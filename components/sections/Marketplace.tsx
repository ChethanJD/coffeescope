"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { RealListingCard } from "@/components/marketplace/RealListingCard";
import { ListingFilters, type SortOption } from "@/components/marketplace/ListingFilters";
import { SellerCTABanner } from "@/components/marketplace/SellerCTABanner";
import { MARKETPLACE_LISTINGS } from "@/lib/data/mockMarketplace";
import { getActiveListingsAction, getMyFavoriteListingIdsAction } from "@/app/marketplace/actions";
import type { MarketplaceProduct } from "@/types/models";

const PAGE_SIZE = 9;

export function Marketplace() {
  const [activeVariety, setActiveVariety] = useState("All");
  const [sort, setSort] = useState<SortOption>("newest");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [realListings, setRealListings] = useState<MarketplaceProduct[] | null>(null);
  const [source, setSource] = useState<"database" | "unavailable">("unavailable");
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Debounce search input so we don't hit the database on every keystroke.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput.trim()), 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fresh fetch (from the top) whenever the search term changes.
  useEffect(() => {
    setRealListings(null);
    getActiveListingsAction({ search: debouncedSearch, limit: PAGE_SIZE, offset: 0 }).then(
      (result) => {
        setRealListings(result.products);
        setSource(result.source);
        setTotal(result.total);
        setHasMore(result.hasMore);
      }
    );
  }, [debouncedSearch]);

  useEffect(() => {
    getMyFavoriteListingIdsAction().then(setFavoriteIds);
  }, []);

  async function handleLoadMore() {
    if (!realListings || isLoadingMore) return;
    setIsLoadingMore(true);
    const result = await getActiveListingsAction({
      search: debouncedSearch,
      limit: PAGE_SIZE,
      offset: realListings.length,
    });
    setRealListings((prev) => [...(prev ?? []), ...result.products]);
    setHasMore(result.hasMore);
    setIsLoadingMore(false);
  }

  const isReal = source === "database";
  const loading = realListings === null;

  const sortedRealListings = useMemo(() => {
    if (!realListings) return [];
    const result = [...realListings];
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.priceInr - b.priceInr);
        break;
      case "price-desc":
        result.sort((a, b) => b.priceInr - a.priceInr);
        break;
      case "quantity-desc":
        result.sort((a, b) => b.quantity - a.quantity);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
    return result;
  }, [realListings, sort]);

  const demoListings = useMemo(() => {
    let result = MARKETPLACE_LISTINGS;
    if (activeVariety !== "All") {
      result = result.filter((l) => l.variety === activeVariety);
    }
    if (searchInput.trim()) {
      const q = searchInput.trim().toLowerCase();
      result = result.filter(
        (l) => l.farmName.toLowerCase().includes(q) || l.variety.toLowerCase().includes(q)
      );
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
  }, [activeVariety, sort, searchInput]);

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

        <div className="mt-10 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-white/30" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={isReal ? "Search listings by name..." : "Search sample listings..."}
            className="w-full bg-transparent text-sm text-white placeholder:text-white/25 focus:outline-none"
          />
        </div>

        {loading && (
          <p className="mt-10 text-center text-sm text-white/40">Loading listings...</p>
        )}

        {!loading && isReal && (
          <>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs text-white/40">
                {total} listing{total === 1 ? "" : "s"}
                {debouncedSearch ? ` matching "${debouncedSearch}"` : ""}
              </p>
              <ListingFilters
                activeVariety="All"
                onVarietyChange={() => {}}
                sort={sort}
                onSortChange={setSort}
                hideVarietyFilter
              />
            </div>

            {sortedRealListings.length === 0 ? (
              <p className="mt-10 text-center text-sm text-white/40">
                {debouncedSearch
                  ? "No listings match your search."
                  : "No listings yet — be the first to list your coffee above."}
              </p>
            ) : (
              <>
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sortedRealListings.map((listing, index) => (
                    <RealListingCard
                      key={listing.id}
                      listing={listing}
                      index={index}
                      initiallyFavorited={favoriteIds.includes(listing.id)}
                    />
                  ))}
                </div>
                {hasMore && (
                  <div className="mt-8 flex justify-center">
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white/70 transition-colors hover:bg-white/[0.08] disabled:opacity-60"
                    >
                      {isLoadingMore && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                      {isLoadingMore ? "Loading..." : "Load more"}
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {!loading && !isReal && (
          <>
            <p className="mt-6 w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40">
              Showing sample listings — connect Supabase to see real ones
            </p>
            <div className="mt-6">
              <ListingFilters
                activeVariety={activeVariety}
                onVarietyChange={setActiveVariety}
                sort={sort}
                onSortChange={setSort}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {demoListings.map((listing, index) => (
                <ListingCard key={listing.id} listing={listing} index={index} />
              ))}
            </div>

            {demoListings.length === 0 && (
              <p className="mt-10 text-center text-sm text-white/40">
                No listings match this filter yet.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

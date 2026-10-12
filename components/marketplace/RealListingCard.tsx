"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Coffee, Heart } from "lucide-react";
import { RealContactSellerModal } from "@/components/marketplace/RealContactSellerModal";
import { toggleFavoriteListingAction } from "@/app/marketplace/actions";
import { cn } from "@/lib/utils";
import type { MarketplaceProduct } from "@/types/models";

export function RealListingCard({
  listing,
  index,
  initiallyFavorited = false,
}: {
  listing: MarketplaceProduct;
  index: number;
  initiallyFavorited?: boolean;
}) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(initiallyFavorited);
  const [isToggling, setIsToggling] = useState(false);

  async function handleToggleFavorite() {
    if (isToggling) return;
    setIsToggling(true);
    setIsFavorited((prev) => !prev); // optimistic
    const result = await toggleFavoriteListingAction(listing.id);
    setIsToggling(false);
    if (result === null) {
      setIsFavorited((prev) => !prev); // revert — not signed in / not configured
    } else {
      setIsFavorited(result);
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        className="glass group flex flex-col overflow-hidden rounded-xl3 shadow-card transition-transform duration-300 hover:-translate-y-1"
      >
        <div className="relative flex h-40 w-full items-center justify-center overflow-hidden bg-white/[0.03]">
          <Coffee className="h-10 w-10 text-white/15" />
          <span className="absolute bottom-3 left-3 font-heading text-lg font-semibold text-white">
            ₹{listing.priceInr.toFixed(0)}
            <span className="text-xs font-normal text-white/60">/{listing.unit}</span>
          </span>
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-pressed={isFavorited}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            <Heart
              className={cn(
                "h-4 w-4 transition-colors",
                isFavorited ? "fill-coffee-gold text-coffee-gold" : "text-white/70"
              )}
            />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-heading text-base font-semibold text-white">{listing.name}</h3>
          {listing.description && (
            <p className="mt-1 line-clamp-2 text-xs text-white/40">{listing.description}</p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.04] px-2.5 py-1 text-white/60">
              <Package className="h-3 w-3" />
              {listing.quantity.toLocaleString()} {listing.unit}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
            <span className="text-xs text-white/40">
              Listed {new Date(listing.createdAt).toLocaleDateString()}
            </span>
            <button
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="rounded-full border border-coffee-gold/20 bg-coffee-gradient px-4 py-2 text-xs font-semibold text-white shadow-glow-gold transition-all hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-coffee-gold/30"
            >
              Contact Seller
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isContactOpen && (
          <RealContactSellerModal listing={listing} onClose={() => setIsContactOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

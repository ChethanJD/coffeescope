"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Package, BadgeCheck } from "lucide-react";
import { ContactSellerModal } from "@/components/marketplace/ContactSellerModal";
import type { MarketplaceListing } from "@/lib/data/mockMarketplace";

export function ListingCard({ listing, index }: { listing: MarketplaceListing; index: number }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="glass group flex flex-col overflow-hidden rounded-xl3 shadow-card"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={listing.imageUrl}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm">
          {listing.variety}
        </span>
        <span className="absolute bottom-3 left-3 font-heading text-lg font-semibold text-white">
          ₹{listing.pricePerKg.toFixed(0)}
          <span className="text-xs font-normal text-white/60">/kg</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-base font-semibold text-white">{listing.farmName}</h3>
        <span className="mt-1 flex items-center gap-1 text-xs text-white/40">
          <MapPin className="h-3 w-3" />
          {listing.location}
        </span>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1 rounded-full bg-white/[0.05] px-2.5 py-1 text-white/60">
            <Package className="h-3 w-3" />
            {listing.quantityKg.toLocaleString()} kg
          </span>
          <span className="rounded-full bg-white/[0.05] px-2.5 py-1 text-white/60">
            Grade {listing.grade}
          </span>
          {listing.certifications.map((cert) => (
            <span
              key={cert}
              className="flex items-center gap-1 rounded-full bg-coffee-leaf/15 px-2.5 py-1 text-coffee-leaf"
            >
              <BadgeCheck className="h-3 w-3" />
              {cert}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-xs text-white/40">Harvest {listing.harvestDate}</span>
          <button
            type="button"
            onClick={() => setIsContactOpen(true)}
            className="rounded-full bg-coffee-gradient px-4 py-2 text-xs font-semibold text-white shadow-glow-gold transition-transform hover:scale-[1.03]"
          >
            Contact Seller
          </button>
        </div>
      </div>
    </motion.div>

      <AnimatePresence>
        {isContactOpen && (
          <ContactSellerModal listing={listing} onClose={() => setIsContactOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

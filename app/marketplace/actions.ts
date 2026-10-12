"use server";

import {
  createListing,
  getActiveListings,
  sendMarketplaceMessage,
  getMyFavoriteListingIds,
  toggleFavoriteListing,
  type GetActiveListingsParams,
} from "@/services/marketplace";
import type { CreateListingInput } from "@/lib/validation/marketplaceSchemas";

export async function createListingAction(input: CreateListingInput) {
  return createListing(input);
}

export async function getActiveListingsAction(params: GetActiveListingsParams = {}) {
  return getActiveListings(params);
}

export async function sendMarketplaceMessageAction(listingId: string, body: string) {
  return sendMarketplaceMessage({ listingId, body });
}

export async function getMyFavoriteListingIdsAction() {
  return Array.from(await getMyFavoriteListingIds());
}

export async function toggleFavoriteListingAction(listingId: string) {
  return toggleFavoriteListing(listingId);
}

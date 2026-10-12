import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { MARKETPLACE_LISTINGS } from "@/lib/data/mockMarketplace";
import type { MarketplaceProduct, MarketplaceMessage } from "@/types/models";
import {
  createListingSchema,
  updateListingStatusSchema,
  type CreateListingInput,
  type UpdateListingStatusInput,
} from "@/lib/validation/marketplaceSchemas";
import {
  marketplaceMessageSchema,
  type MarketplaceMessageInput,
} from "@/lib/validation/contactSchemas";

export interface ListingsResult {
  products: MarketplaceProduct[];
  source: "database" | "unavailable";
}

function mapRow(row: {
  id: string;
  seller_id: string;
  name: string;
  description: string | null;
  price_inr: number;
  quantity: number;
  unit: string;
  image_url: string | null;
  status: MarketplaceProduct["status"];
  created_at: string;
  updated_at: string;
}): MarketplaceProduct {
  return {
    id: row.id,
    sellerId: row.seller_id,
    name: row.name,
    description: row.description,
    priceInr: Number(row.price_inr),
    quantity: Number(row.quantity),
    unit: row.unit,
    imageUrl: row.image_url,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/**
 * Active listings, publicly readable. Returns `source: "unavailable"`
 * (not the UI-only lib/data/mockMarketplace.ts shape, which has different
 * fields like farmName/harvestDate) when the database isn't configured —
 * the existing marketplace page keeps rendering its own mock data until
 * it's switched over to consume this service.
 */
export interface GetActiveListingsParams {
  /** Case-insensitive match against listing name. */
  search?: string;
  limit?: number;
  offset?: number;
}

export interface PaginatedListingsResult extends ListingsResult {
  total: number;
  hasMore: boolean;
}

export async function getActiveListings(
  params: GetActiveListingsParams = {}
): Promise<PaginatedListingsResult> {
  const limit = params.limit ?? 12;
  const offset = params.offset ?? 0;

  if (!isSupabaseConfigured()) {
    return { products: [], source: "unavailable", total: 0, hasMore: false };
  }

  try {
    const supabase = await createClient();
    let query = supabase
      .from("marketplace_products")
      .select("*", { count: "exact" })
      .eq("status", "active")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (params.search?.trim()) {
      query = query.ilike("name", `%${params.search.trim()}%`);
    }

    const { data, error, count } = await query;

    if (error || !data) {
      return { products: [], source: "unavailable", total: 0, hasMore: false };
    }

    const total = count ?? data.length;
    return {
      products: data.map(mapRow),
      source: "database",
      total,
      hasMore: offset + data.length < total,
    };
  } catch {
    return { products: [], source: "unavailable", total: 0, hasMore: false };
  }
}

/** The signed-in seller's own listings (any status). Requires auth. */
export async function getMyListings(): Promise<ListingsResult> {
  if (!isSupabaseConfigured()) {
    return { products: [], source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { products: [], source: "unavailable" };
    }

    const { data, error } = await supabase
      .from("marketplace_products")
      .select("*")
      .eq("seller_id", user.id)
      .order("created_at", { ascending: false });

    if (error || !data) {
      return { products: [], source: "unavailable" };
    }

    return { products: data.map(mapRow), source: "database" };
  } catch {
    return { products: [], source: "unavailable" };
  }
}

export type CreateListingResult =
  | { ok: true; product: MarketplaceProduct }
  | { ok: false; error: string };

/**
 * Creates a listing for the currently signed-in user. seller_id always
 * comes from the session — never from `input` — so a client can never
 * create a listing as another seller.
 */
export async function createListing(input: CreateListingInput): Promise<CreateListingResult> {
  const parsed = createListingSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid listing data" };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Marketplace is not configured yet." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { ok: false, error: "You must be signed in to list a product." };
    }

    const { data, error } = await supabase
      .from("marketplace_products")
      .insert({
        seller_id: user.id,
        name: parsed.data.name,
        description: parsed.data.description ?? null,
        price_inr: parsed.data.priceInr,
        quantity: parsed.data.quantity,
        unit: parsed.data.unit,
        image_url: parsed.data.imageUrl ?? null,
      })
      .select("*")
      .single();

    if (error || !data) {
      return { ok: false, error: "Could not create listing. Please try again." };
    }

    return { ok: true, product: mapRow(data) };
  } catch {
    return { ok: false, error: "Could not create listing. Please try again." };
  }
}

/** Updates a listing's status. RLS restricts this to the listing's own seller (or an admin). */
export async function updateListingStatus(
  input: UpdateListingStatusInput
): Promise<CreateListingResult> {
  const parsed = updateListingStatusSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid request" };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Marketplace is not configured yet." };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("marketplace_products")
      .update({ status: parsed.data.status })
      .eq("id", parsed.data.id)
      .select("*")
      .single();

    if (error || !data) {
      return { ok: false, error: "Could not update listing." };
    }

    return { ok: true, product: mapRow(data) };
  } catch {
    return { ok: false, error: "Could not update listing." };
  }
}

/** Demo listings for local/UI development when Supabase isn't configured. */
export function getDemoListings() {
  return MARKETPLACE_LISTINGS;
}

function mapMessageRow(row: {
  id: string;
  listing_id: string;
  sender_id: string;
  recipient_id: string;
  body: string;
  is_read: boolean;
  created_at: string;
}): MarketplaceMessage {
  return {
    id: row.id,
    listingId: row.listing_id,
    senderId: row.sender_id,
    recipientId: row.recipient_id,
    body: row.body,
    isRead: row.is_read,
    createdAt: row.created_at,
  };
}

export type SendMessageResult =
  | { ok: true; message: MarketplaceMessage }
  | { ok: false; error: string };

/**
 * Sends a message to a listing's seller. Powers the marketplace
 * "Contact Seller" flow. The recipient is ALWAYS derived server-side from
 * the listing's own seller_id — a client can only supply which listing and
 * what to say, never who receives it. This also implicitly verifies the
 * listing exists and rejects messaging a nonexistent one.
 */
export async function sendMarketplaceMessage(
  input: MarketplaceMessageInput
): Promise<SendMessageResult> {
  const parsed = marketplaceMessageSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid message" };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Messaging is not available yet." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { ok: false, error: "You must be signed in to contact a seller." };
    }

    const { data: listing, error: listingError } = await supabase
      .from("marketplace_products")
      .select("id, seller_id")
      .eq("id", parsed.data.listingId)
      .maybeSingle();

    if (listingError || !listing) {
      return { ok: false, error: "This listing no longer exists." };
    }

    if (listing.seller_id === user.id) {
      return { ok: false, error: "You can't message yourself about your own listing." };
    }

    const { data, error } = await supabase
      .from("marketplace_messages")
      .insert({
        listing_id: listing.id,
        sender_id: user.id,
        recipient_id: listing.seller_id,
        body: parsed.data.body,
      })
      .select("*")
      .single();

    if (error || !data) {
      return { ok: false, error: "Could not send message. Please try again." };
    }

    return { ok: true, message: mapMessageRow(data) };
  } catch {
    return { ok: false, error: "Could not send message. Please try again." };
  }
}

/** Messages the signed-in user has sent or received, newest first. */
export async function getMyMessages(): Promise<{
  messages: MarketplaceMessage[];
  source: "database" | "unavailable";
}> {
  if (!isSupabaseConfigured()) {
    return { messages: [], source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { messages: [], source: "unavailable" };

    const { data, error } = await supabase
      .from("marketplace_messages")
      .select("*")
      .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
      .order("created_at", { ascending: false });

    if (error || !data) return { messages: [], source: "unavailable" };

    return { messages: data.map(mapMessageRow), source: "database" };
  } catch {
    return { messages: [], source: "unavailable" };
  }
}

/**
 * The signed-in user's favorited listing IDs, as a Set for O(1) lookup
 * when rendering the marketplace grid. Empty (not "unavailable") when
 * signed out or unconfigured — favoriting is simply unavailable, not an
 * error state worth its own UI.
 */
export async function getMyFavoriteListingIds(): Promise<Set<string>> {
  if (!isSupabaseConfigured()) return new Set();

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return new Set();

    const { data, error } = await supabase
      .from("marketplace_favorites")
      .select("listing_id")
      .eq("user_id", user.id);

    if (error || !data) return new Set();
    return new Set(data.map((row) => row.listing_id));
  } catch {
    return new Set();
  }
}

/**
 * Toggles a listing favorite for the signed-in user. Returns the new
 * favorited state, or null if the user isn't signed in / Supabase isn't
 * configured (caller should treat null as "no-op").
 */
export async function toggleFavoriteListing(listingId: string): Promise<boolean | null> {
  if (!isSupabaseConfigured()) return null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: existing } = await supabase
      .from("marketplace_favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("listing_id", listingId)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from("marketplace_favorites")
        .delete()
        .eq("id", existing.id);
      return error ? null : false;
    }

    const { error } = await supabase
      .from("marketplace_favorites")
      .insert({ user_id: user.id, listing_id: listingId });
    return error ? null : true;
  } catch {
    return null;
  }
}

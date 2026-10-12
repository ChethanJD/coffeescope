import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { DiseaseAnalysisRecord } from "@/types/models";

function mapRow(row: {
  id: string;
  user_id: string;
  farm_id: string | null;
  image_url: string | null;
  disease_name: string | null;
  confidence: number | null;
  model_version: string | null;
  created_at: string;
}): DiseaseAnalysisRecord {
  return {
    id: row.id,
    userId: row.user_id,
    farmId: row.farm_id,
    imageUrl: row.image_url,
    diseaseName: row.disease_name,
    confidence: row.confidence === null ? null : Number(row.confidence),
    modelVersion: row.model_version,
    createdAt: row.created_at,
  };
}

export interface DiseaseHistoryResult {
  records: DiseaseAnalysisRecord[];
  source: "database" | "unavailable";
}

/** The signed-in user's past disease-detection submissions, newest first. */
export async function getMyDiseaseHistory(limit = 20): Promise<DiseaseHistoryResult> {
  if (!isSupabaseConfigured()) {
    return { records: [], source: "unavailable" };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { records: [], source: "unavailable" };

    const { data, error } = await supabase
      .from("disease_analysis_history")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error || !data) return { records: [], source: "unavailable" };

    return { records: data.map(mapRow), source: "database" };
  } catch {
    return { records: [], source: "unavailable" };
  }
}

export interface SaveDiseaseResultInput {
  farmId?: string;
  imageUrl?: string;
  diseaseName: string;
  confidence: number;
  modelVersion: string;
}

/**
 * Records a disease-detection result for the signed-in user. Called after
 * an analysis completes (mock or real) — this only persists the result,
 * it never performs the analysis itself (see lib/diseaseDetection/).
 */
export async function saveDiseaseResult(
  input: SaveDiseaseResultInput
): Promise<{ ok: boolean }> {
  if (!isSupabaseConfigured()) return { ok: false };

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { ok: false };

    const { error } = await supabase.from("disease_analysis_history").insert({
      user_id: user.id,
      farm_id: input.farmId ?? null,
      image_url: input.imageUrl ?? null,
      disease_name: input.diseaseName,
      confidence: input.confidence,
      model_version: input.modelVersion,
    });

    return { ok: !error };
  } catch {
    return { ok: false };
  }
}

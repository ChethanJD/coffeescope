"use client";

import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const BUCKET = "disease-images";

export type UploadResult =
  | { ok: true; path: string; signedUrl: string }
  | { ok: false; error: string };

/**
 * Uploads a disease-detection photo to the private `disease-images`
 * bucket, scoped under the signed-in user's own folder (enforced by RLS
 * — see supabase/migrations/0008_disease_images_storage.sql). Returns a
 * signed URL (valid 1 hour) for immediate display; the stored `path` is
 * what should be persisted (disease_analysis_history.image_url), not the
 * signed URL itself, since signed URLs expire.
 */
export async function uploadDiseaseImage(file: File): Promise<UploadResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: "Image storage is not configured yet." };
  }

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return { ok: false, error: "Sign in to save your detection history with photos." };
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${user.id}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

    if (uploadError) {
      return { ok: false, error: "Could not upload the image. Please try again." };
    }

    const { data: signedData, error: signedError } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, 3600);

    if (signedError || !signedData) {
      // Upload succeeded but we couldn't sign a URL to show it — still
      // return the path since that's what gets persisted either way.
      return { ok: true, path, signedUrl: "" };
    }

    return { ok: true, path, signedUrl: signedData.signedUrl };
  } catch {
    return { ok: false, error: "Could not upload the image. Please try again." };
  }
}

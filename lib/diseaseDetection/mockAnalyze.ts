import { DISEASE_DATABASE, type DiseaseInfo } from "@/lib/data/mockDiseases";

export type DiagnosisResult =
  | { status: "identified"; disease: DiseaseInfo; confidence: number }
  | { status: "inconclusive"; confidence: number };

const LOW_CONFIDENCE_THRESHOLD = 60;

/**
 * Placeholder AI vision analysis — NOT real image analysis. It derives a
 * deterministic result from the uploaded file's size/name so a demo is
 * repeatable, not from the pixels themselves. Swap this for a real call to
 * a FastAPI endpoint (e.g. POST /api/disease/analyze with the image as
 * multipart form data, backed by a CNN classifier) when a model is ready —
 * the UI layer (loading state, result rendering, low-confidence and
 * inconclusive states) is already built to handle that response shape.
 */
export async function mockAnalyzeImage(file: File): Promise<DiagnosisResult> {
  await new Promise((resolve) => setTimeout(resolve, 1800));

  let seed = file.size;
  for (let i = 0; i < file.name.length; i++) {
    seed += file.name.charCodeAt(i);
  }

  // Roughly 1 in 8 samples comes back inconclusive, so the low-confidence
  // path is actually reachable in the demo rather than purely theoretical.
  if (seed % 8 === 0) {
    return { status: "inconclusive", confidence: 30 + (seed % 25) };
  }

  const index = seed % DISEASE_DATABASE.length;
  const disease = DISEASE_DATABASE[index]!;
  const confidence = disease.id === "healthy" ? 92 + (seed % 6) : 78 + (seed % 18);

  if (confidence < LOW_CONFIDENCE_THRESHOLD) {
    return { status: "inconclusive", confidence };
  }

  return { status: "identified", disease, confidence };
}

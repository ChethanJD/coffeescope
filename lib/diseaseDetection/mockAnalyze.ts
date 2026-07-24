import { DISEASE_DATABASE, type DiseaseInfo } from "@/lib/data/mockDiseases";

export interface DiagnosisResult {
  disease: DiseaseInfo;
  confidence: number;
}

/**
 * Mock AI vision analysis. Picks a result deterministically from the
 * uploaded file's size/name so the same image always returns the same
 * diagnosis in a demo — swap this for a real call to a FastAPI endpoint
 * (e.g. POST /api/disease/analyze with the image as multipart form data,
 * backed by a CNN classifier) when the model is ready. The UI layer
 * (loading state, result rendering) doesn't need to change.
 */
export async function mockAnalyzeImage(file: File): Promise<DiagnosisResult> {
  await new Promise((resolve) => setTimeout(resolve, 1800));

  let seed = file.size;
  for (let i = 0; i < file.name.length; i++) {
    seed += file.name.charCodeAt(i);
  }

  const index = seed % DISEASE_DATABASE.length;
  const disease = DISEASE_DATABASE[index]!;
  const confidence = disease.id === "healthy" ? 92 + (seed % 6) : 78 + (seed % 18);

  return { disease, confidence };
}

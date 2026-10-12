"use server";

import { saveDiseaseResult } from "@/services/diseaseHistory";

export async function saveDiseaseResultAction(input: {
  diseaseName: string;
  confidence: number;
  imagePath?: string;
}) {
  return saveDiseaseResult({
    diseaseName: input.diseaseName,
    confidence: input.confidence,
    imageUrl: input.imagePath,
    modelVersion: "mock-v0-demo",
  });
}

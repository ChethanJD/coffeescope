"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ScanSearch } from "lucide-react";
import { ImageUploadZone } from "@/components/disease/ImageUploadZone";
import { DiagnosisResult } from "@/components/disease/DiagnosisResult";
import { mockAnalyzeImage, type DiagnosisResult as DiagnosisResultType } from "@/lib/diseaseDetection/mockAnalyze";

export function DiseaseDetection() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiagnosisResultType | null>(null);

  function handleImageSelected(selected: File) {
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
    setResult(null);
  }

  function handleClear() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
  }

  async function handleAnalyze() {
    if (!file) return;
    setIsAnalyzing(true);
    const diagnosis = await mockAnalyzeImage(file);
    setResult(diagnosis);
    setIsAnalyzing(false);
  }

  return (
    <section id="disease-detection" className="relative bg-surface-void px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-coffee-gold">
            Disease Detection
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Catch disease before it spreads
          </h2>
          <p className="mt-4 text-white/50">
            Upload a photo of a leaf or cherry and get an instant AI
            diagnosis with treatment guidance — built for the field, not
            the lab.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <ImageUploadZone
              onImageSelected={handleImageSelected}
              previewUrl={previewUrl}
              onClear={handleClear}
            />
            {file && !result && (
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex items-center justify-center gap-2 rounded-full bg-coffee-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-glow-gold transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing sample...
                  </>
                ) : (
                  <>
                    <ScanSearch className="h-4 w-4" />
                    Analyze with AI
                  </>
                )}
              </button>
            )}
          </div>

          <div className="min-h-[288px]">
            <AnimatePresence mode="wait">
              {result ? (
                <DiagnosisResult key="result" result={result} />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass flex h-full min-h-[288px] flex-col items-center justify-center rounded-xl3 p-8 text-center"
                >
                  <p className="font-heading text-lg font-semibold text-white/80">
                    {file ? "Ready to analyze" : "No sample yet"}
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-white/40">
                    {file
                      ? "Click \u201cAnalyze with AI\u201d to run the diagnosis."
                      : "Upload or photograph a leaf or cherry to get started."}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, Camera, X } from "lucide-react";

export function ImageUploadZone({
  onImageSelected,
  previewUrl,
  onClear,
}: {
  onImageSelected: (file: File) => void;
  previewUrl: string | null;
  onClear: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (file && file.type.startsWith("image/")) {
      onImageSelected(file);
    }
  }

  if (previewUrl) {
    return (
      <div className="relative overflow-hidden rounded-xl3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={previewUrl} alt="Uploaded leaf/cherry sample" className="h-72 w-full object-cover" />
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
          aria-label="Remove image"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <motion.div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      animate={{
        borderColor: isDragging ? "#D6A55C" : "rgba(255,255,255,0.12)",
        backgroundColor: isDragging ? "rgba(214,165,92,0.06)" : "rgba(255,255,255,0.02)",
      }}
      className="flex h-72 flex-col items-center justify-center gap-4 rounded-xl3 border-2 border-dashed p-8 text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-coffee-gold/15">
        <UploadCloud className="h-6 w-6 text-coffee-gold" />
      </span>
      <div>
        <p className="text-sm font-medium text-white">
          Drag a leaf or cherry photo here, or choose an option below
        </p>
        <p className="mt-1 text-xs text-white/40">Supports JPG, PNG — up to 10MB</p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 rounded-full bg-coffee-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow-gold"
        >
          <UploadCloud className="h-4 w-4" />
          Upload Photo
        </button>
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="flex items-center gap-2 rounded-full bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/[0.1]"
        >
          <Camera className="h-4 w-4" />
          Use Camera
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {/* capture="environment" opens the rear camera directly on mobile devices */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </motion.div>
  );
}

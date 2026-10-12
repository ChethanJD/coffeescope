"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, MapPin } from "lucide-react";
import { FormField } from "@/components/auth/FormField";
import { completeOnboarding } from "@/app/onboarding/actions";

const VARIETIES = ["Arabica", "Robusta"] as const;

export function OnboardingForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [areaHectares, setAreaHectares] = useState("");
  const [variety, setVariety] = useState<(typeof VARIETIES)[number] | "">("");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [priceAlertEnabled, setPriceAlertEnabled] = useState(true);
  const [weatherAlertEnabled, setWeatherAlertEnabled] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function useMyLocation() {
    if (!("geolocation" in navigator)) {
      setFormError("Location isn't available in this browser.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
        setLocating(false);
      },
      () => {
        setFormError("Couldn't get your location. You can skip this step.");
        setLocating(false);
      },
      { timeout: 8000 }
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    const fieldErrors: Record<string, string> = {};
    if (name.trim().length < 2) fieldErrors.name = "Farm name is required";
    if (country.trim().length < 2) fieldErrors.country = "Country is required";
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await completeOnboarding({
        farm: {
          name: name.trim(),
          country: country.trim(),
          region: region.trim() || undefined,
          areaHectares: areaHectares ? Number(areaHectares) : undefined,
          latitude: coords?.lat,
          longitude: coords?.lon,
          // Variety is collected for the user's own reference; the farm
          // record only stores a variety when it matches a real
          // coffee_varieties row, so an unresolved free-text pick is
          // simply left unset rather than guessed.
        },
        priceAlertEnabled,
        weatherAlertEnabled,
      });

      if (!result.ok) {
        setFormError(result.error);
        setIsSubmitting(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-xl flex-col gap-4"
      noValidate
    >
      <FormField
        label="Farm name"
        name="name"
        placeholder="Hillcrest Estate"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Country"
          name="country"
          placeholder="India"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          error={errors.country}
        />
        <FormField
          label="Region (optional)"
          name="region"
          placeholder="Chikmagalur, Karnataka"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Farm size (hectares, optional)"
          name="areaHectares"
          type="number"
          min="0"
          step="0.1"
          placeholder="e.g. 12"
          value={areaHectares}
          onChange={(e) => setAreaHectares(e.target.value)}
        />
        <div className="space-y-1.5">
          <label className="block text-xs font-medium tracking-wide text-white/65">
            Primary variety (optional)
          </label>
          <select
            value={variety}
            onChange={(e) => setVariety(e.target.value as (typeof VARIETIES)[number] | "")}
            className="w-full rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3 text-sm text-white shadow-inner transition-all duration-200 hover:border-white/15 focus:border-coffee-gold/70 focus:outline-none focus:ring-2 focus:ring-coffee-gold/10"
          >
            <option value="" className="bg-surface-void">
              Select variety
            </option>
            {VARIETIES.map((v) => (
              <option key={v} value={v} className="bg-surface-void">
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <button
          type="button"
          onClick={useMyLocation}
          disabled={locating}
          className="flex items-center gap-2 text-sm font-medium text-coffee-gold hover:underline disabled:opacity-60"
        >
          {locating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
          {coords
            ? `Location set (${coords.lat.toFixed(2)}, ${coords.lon.toFixed(2)})`
            : locating
              ? "Getting your location..."
              : "Use my current location"}
        </button>
        <p className="mt-2 text-xs text-white/40">
          Used to show weather for your farm. You can skip this and add it later.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <label className="flex items-center justify-between text-sm text-white/70">
          Notify me about price changes
          <input
            type="checkbox"
            checked={priceAlertEnabled}
            onChange={(e) => setPriceAlertEnabled(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-white/5 accent-coffee-gold"
          />
        </label>
        <label className="flex items-center justify-between text-sm text-white/70">
          Notify me about weather risks
          <input
            type="checkbox"
            checked={weatherAlertEnabled}
            onChange={(e) => setWeatherAlertEnabled(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-white/5 accent-coffee-gold"
          />
        </label>
      </div>

      {formError && <p className="text-sm text-red-400">{formError}</p>}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="text-sm text-white/40 hover:text-white/60"
        >
          Skip for now
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 rounded-full bg-coffee-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow-gold transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Saving..." : "Save and continue"}
        </button>
      </div>
    </motion.form>
  );
}

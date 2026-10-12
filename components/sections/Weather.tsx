"use client";

import { useEffect, useState } from "react";
import { LocationSearch } from "@/components/weather/LocationSearch";
import { CurrentWeatherCard } from "@/components/weather/CurrentWeatherCard";
import { ForecastStrip } from "@/components/weather/ForecastStrip";
import { AIRecommendationCard } from "@/components/weather/AIRecommendationCard";
import { WEATHER_LOCATIONS, type LocationWeather } from "@/lib/data/mockWeather";
import { getLiveWeatherForLocation } from "@/app/weather/actions";

export function Weather() {
  const [location, setLocation] = useState(WEATHER_LOCATIONS[0]!);
  const [liveStatus, setLiveStatus] = useState<"loading" | "live" | "demo">("loading");
  const [displayLocation, setDisplayLocation] = useState<LocationWeather>(location);
  const [observedAt, setObservedAt] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLiveStatus("loading");
    setDisplayLocation(location);

    getLiveWeatherForLocation(location.id).then((result) => {
      if (cancelled) return;

      if (result.status === "live") {
        setDisplayLocation({
          ...location,
          current: {
            tempC: result.reading.tempC,
            feelsLikeC: result.reading.feelsLikeC,
            condition: result.reading.condition,
            humidity: result.reading.humidity,
            windKmh: result.reading.windKmh,
            rainMm: result.reading.rainMm,
          },
        });
        setObservedAt(result.reading.observedAt);
        setLiveStatus("live");
      } else {
        // "not_configured" (no API key set) or "error" (provider unreachable)
        // both fall back to the location's demo reading — never invented
        // live-looking numbers.
        setDisplayLocation(location);
        setLiveStatus("demo");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [location]);

  return (
    <section id="weather" className="relative bg-surface-void px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-coffee-gold">
            Weather Intelligence
          </span>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Conditions on the ground, wherever it's grown
          </h2>
          <p className="mt-4 text-white/50">
            Search any growing region for live conditions and an AI take on
            what today's weather means for the crop.
          </p>
        </div>

        <div className="mt-8">
          <LocationSearch onSelect={setLocation} />
        </div>

        <div className="mt-4 flex justify-center">
          {liveStatus === "live" && (
            <p className="rounded-full border border-coffee-leaf/20 bg-coffee-leaf/10 px-3 py-1 text-xs text-coffee-leaf">
              Live conditions{observedAt ? ` · updated ${new Date(observedAt).toLocaleTimeString()}` : ""}
            </p>
          )}
          {liveStatus === "demo" && (
            <p className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/40">
              Showing demo conditions — set OPENWEATHER_API_KEY for live data. Forecast and AI
              take below are always illustrative for now.
            </p>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
          <CurrentWeatherCard location={displayLocation} />
          <div className="flex flex-col gap-6">
            <ForecastStrip location={location} />
            <AIRecommendationCard location={location} />
          </div>
        </div>
      </div>
    </section>
  );
}

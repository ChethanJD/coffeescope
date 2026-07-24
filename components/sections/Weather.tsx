"use client";

import { useState } from "react";
import { LocationSearch } from "@/components/weather/LocationSearch";
import { CurrentWeatherCard } from "@/components/weather/CurrentWeatherCard";
import { ForecastStrip } from "@/components/weather/ForecastStrip";
import { AIRecommendationCard } from "@/components/weather/AIRecommendationCard";
import { WEATHER_LOCATIONS } from "@/lib/data/mockWeather";

export function Weather() {
  const [location, setLocation] = useState(WEATHER_LOCATIONS[0]!);

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

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
          <CurrentWeatherCard location={location} />
          <div className="flex flex-col gap-6">
            <ForecastStrip location={location} />
            <AIRecommendationCard location={location} />
          </div>
        </div>
      </div>
    </section>
  );
}

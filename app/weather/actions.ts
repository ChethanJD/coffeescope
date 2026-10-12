"use server";

import { getLiveWeatherByCoords } from "@/services/weather/liveProvider";
import { LOCATION_COORDINATES } from "@/lib/data/locationCoordinates";

export async function getLiveWeatherForLocation(locationId: string) {
  const coords = LOCATION_COORDINATES[locationId];
  if (!coords) {
    return { status: "not_configured" as const };
  }
  return getLiveWeatherByCoords(coords.lat, coords.lon);
}

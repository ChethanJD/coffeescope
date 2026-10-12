import "server-only";

/**
 * Live weather provider abstraction.
 *
 * Uses OpenWeatherMap's Current Weather API when OPENWEATHER_API_KEY is
 * set (see .env.example). The provider is swappable — nothing outside this
 * file knows or cares which API is behind getLiveWeatherByCoords(). If no
 * key is configured, callers get an explicit `status: "not_configured"` —
 * never a fabricated reading presented as live.
 */

export type LiveConditionType = "sunny" | "partly-cloudy" | "cloudy" | "rain" | "storm" | "mist";

export interface LiveWeatherReading {
  tempC: number;
  feelsLikeC: number;
  condition: LiveConditionType;
  humidity: number;
  windKmh: number;
  rainMm: number;
  observedAt: string;
}

export type LiveWeatherResult =
  | { status: "live"; reading: LiveWeatherReading; source: "OpenWeatherMap" }
  | { status: "not_configured" }
  | { status: "error"; message: string };

// OpenWeatherMap "id" codes grouped into this app's simpler condition set.
// https://openweathermap.org/weather-conditions
function mapConditionCode(owmId: number, owmMain: string): LiveConditionType {
  if (owmId >= 200 && owmId < 300) return "storm";
  if (owmId >= 300 && owmId < 600) return "rain";
  if (owmId >= 600 && owmId < 700) return "storm"; // snow — no snow bucket in this app's set
  if (owmId >= 700 && owmId < 800) return "mist";
  if (owmId === 800) return "sunny";
  if (owmId === 801 || owmId === 802) return "partly-cloudy";
  if (owmMain === "Clouds") return "cloudy";
  return "partly-cloudy";
}

export async function getLiveWeatherByCoords(
  latitude: number,
  longitude: number
): Promise<LiveWeatherResult> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return { status: "not_configured" };
  }

  try {
    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.searchParams.set("lat", String(latitude));
    url.searchParams.set("lon", String(longitude));
    url.searchParams.set("units", "metric");
    url.searchParams.set("appid", apiKey);

    const response = await fetch(url.toString(), {
      // Short revalidation window — current conditions go stale fast, but
      // there's no need to hit the provider on every single request.
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      return { status: "error", message: `Weather provider returned ${response.status}` };
    }

    const data = await response.json();
    const weatherEntry = data?.weather?.[0];

    if (!weatherEntry || typeof data?.main?.temp !== "number") {
      return { status: "error", message: "Unexpected response from weather provider" };
    }

    const reading: LiveWeatherReading = {
      tempC: Math.round(data.main.temp),
      feelsLikeC: Math.round(data.main.feels_like ?? data.main.temp),
      condition: mapConditionCode(weatherEntry.id, weatherEntry.main),
      humidity: data.main.humidity ?? 0,
      windKmh: Math.round((data.wind?.speed ?? 0) * 3.6), // m/s -> km/h
      rainMm: data.rain?.["1h"] ?? 0,
      observedAt: new Date((data.dt ?? Date.now() / 1000) * 1000).toISOString(),
    };

    return { status: "live", reading, source: "OpenWeatherMap" };
  } catch {
    return { status: "error", message: "Could not reach the weather provider" };
  }
}

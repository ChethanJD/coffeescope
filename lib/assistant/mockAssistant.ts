import { PREDICTION_HORIZONS } from "@/lib/data/mockPrediction";
import { WEATHER_LOCATIONS } from "@/lib/data/mockWeather";

/**
 * Mock assistant. Matches keywords to canned responses built from the same
 * mock datasets used elsewhere in the app, so answers stay internally
 * consistent. Swap this for a real call to an LLM-backed FastAPI endpoint
 * (e.g. POST /api/assistant/chat, likely RAG'd over live price/weather/
 * disease data) — the chat UI's loading state and message list don't need
 * to change.
 */
export async function mockAssistantReply(userMessage: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 900 + Math.random() * 600));

  const msg = userMessage.toLowerCase();

  if (msg.includes("sell") || msg.includes("buy") || msg.includes("hold")) {
    const tomorrow = PREDICTION_HORIZONS.find((h) => h.id === "tomorrow")!;
    return `Right now the model's short-term call is **${tomorrow.recommendation}** for Arabica, at ${tomorrow.confidence}% confidence. ${tomorrow.reasoning} Check the AI Prediction section for the 7-day and 30-day view too.`;
  }

  if (msg.includes("weather") || msg.includes("rain") || msg.includes("forecast")) {
    const loc = WEATHER_LOCATIONS[0]!;
    const tomorrowForecast = loc.forecast[0]!;
    return `In ${loc.name}, ${loc.region}, it's currently ${loc.current.tempC}°C with ${loc.current.humidity}% humidity. Tomorrow's outlook: ${tomorrowForecast.condition.replace("-", " ")}, ${tomorrowForecast.rainChance}% rain chance. Search any region in the Weather section for a specific forecast.`;
  }

  if (msg.includes("predict") || msg.includes("price") || msg.includes("forecast")) {
    const week = PREDICTION_HORIZONS.find((h) => h.id === "week")!;
    return `Our 7-day forecast puts Arabica around ₹${week.predictedPrice.toFixed(2)}/kg (${week.changePct >= 0 ? "+" : ""}${week.changePct.toFixed(2)}%), with ${week.confidence}% confidence. Head to AI Price Prediction for Tomorrow / Next Week / Next Month views.`;
  }

  if (msg.includes("disease") || msg.includes("leaf") || msg.includes("sick") || msg.includes("rust")) {
    return `I can help with that — upload a photo of the affected leaf or cherry in the Disease Detection section and I'll identify the issue, estimate confidence, and suggest treatment. Common culprits this season: Coffee Leaf Rust and Brown Eye Spot.`;
  }

  if (msg.includes("profit") || msg.includes("roi") || msg.includes("cost")) {
    return `Try the Profit Calculator — adjust your farm area, yield, cost, and selling price and it'll show expected revenue, profit, break-even price, and ROI instantly.`;
  }

  return `I'm a demo assistant for now, so my answers are limited to market, weather, disease, and profit questions covered elsewhere on this page. Try asking "Should I sell today?" or "What's the weather tomorrow?"`;
}

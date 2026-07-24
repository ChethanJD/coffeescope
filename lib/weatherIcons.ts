import { Sun, CloudSun, Cloud, CloudRain, CloudLightning, CloudFog } from "lucide-react";
import type { ConditionType } from "@/lib/data/mockWeather";

export const CONDITION_META: Record<
  ConditionType,
  { icon: typeof Sun; label: string; color: string }
> = {
  sunny: { icon: Sun, label: "Sunny", color: "#D6A55C" },
  "partly-cloudy": { icon: CloudSun, label: "Partly cloudy", color: "#D6A55C" },
  cloudy: { icon: Cloud, label: "Cloudy", color: "#8A8A8A" },
  rain: { icon: CloudRain, label: "Rain", color: "#3A7D44" },
  storm: { icon: CloudLightning, label: "Storm", color: "#C24444" },
  mist: { icon: CloudFog, label: "Misty", color: "#8A8A8A" },
};

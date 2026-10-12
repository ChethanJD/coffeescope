"use server";

import { getLiveCoffeeNews } from "@/services/news/liveProvider";

export async function getLiveNewsAction() {
  return getLiveCoffeeNews();
}

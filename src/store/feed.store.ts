import { type FeedItem, type FeedProcessor } from "@/config/feed.config";
import LZ from "lz-string";

export const getCachedFeed: FeedProcessor = async (url) => {
  const cacheKey = `feed_cache_${url}`;
  const cached = localStorage.getItem(cacheKey) || "";

  if (!cached) return undefined;

  try {
    const { timestamp, data } = JSON.parse(LZ.decompress(cached));
    const FIVE_MINUTES = 5 * 60 * 1000;

    if (Date.now() - timestamp < FIVE_MINUTES) {
      console.log("Obtuve chache");
      return data;
    } else {
      localStorage.removeItem(cacheKey);
      return undefined;
    }
  } catch {
    localStorage.removeItem(cacheKey);
    return undefined;
  }
};

export function setCachedFeed(url: string, data: FeedItem[]): void {
  const cacheKey = `feed_cache_${url}`;
  const payload = {
    timestamp: Date.now(),
    data,
  };
  localStorage.setItem(cacheKey, LZ.compress(JSON.stringify(payload)));
  console.log("Escribi cache");
}

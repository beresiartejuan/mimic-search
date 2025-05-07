// Feeds section configuration
import DOMPurify from "isomorphic-dompurify";

export type FeedItem = {
  title: string;
  description: string;
  icon: string;
  link: string;
};

export type FeedProcessor = (url: string) => Promise<FeedItem[] | undefined>;

export const feeds = ["https://dev.to/feed"];

/**
 * Limipiar html
 */
function sanitize(html) {
  const div = document.createElement("div");
  div.innerHTML = DOMPurify.sanitize(html);
  return div.textContent || div.innerText || "";
}

/**
 *  Analisa las noticias de dev.to
 */

export const parseDevToFeed: FeedProcessor = async (url) => {
  if (url !== feeds[0]) return undefined;

  const fav_categories = [
    "javascript",
    "productivity",
    "webdev",
    "typescript",
    "programming",
  ];
  const icon = "https://dev.to/favicon.ico"; // ícono fijo o configurable

  try {
    const res = await fetch(url);
    const text = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");

    const all_items = Array.from(xml.querySelectorAll("item"));
    const items = all_items
      .map((a) => {
        const categories = Array.from(a.querySelectorAll("category")).map(
          (cat) => cat.textContent?.trim().toLowerCase()
        );

        if (categories.length === 0) return null;
        if (!categories.some((cat) => fav_categories.includes(cat)))
          return null;

        return a;
      })
      .filter(Boolean);

    console.log("LOS ITEMS SON: ", items.length);

    const articles = items.map((item) => {
      const title = item.querySelector("title")?.textContent?.trim() || "";
      const descriptionRaw =
        item.querySelector("description")?.textContent || "";
      let description = sanitize(descriptionRaw).slice(0, 280); // preview corto
      if (descriptionRaw.length > 280) description += "...";
      const link = item.querySelector("link").textContent || "";

      return {
        title,
        description,
        icon,
        link,
      };
    });

    return articles.length ? articles.slice(0, 4) : undefined;
  } catch (error) {
    console.error("Error procesando el feed:", error);
    return undefined;
  }
};

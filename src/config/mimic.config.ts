
// Mimic Search Configuration

export type FeedItem = {
  title: string;
  description: string;
  icon: string;
};

export type FeedProcessor = (url: string) => Promise<FeedItem[] | undefined>;

export type SearchEngine = {
  name: string;
  icon: string;
  url: string;
  shortcut?: string;
};

export type MimicConfig = {
  // Title that appears in the browser tab
  title: string;
  
  // Primary search engine (default when no shortcut is specified)
  defaultSearchEngine: string;
  
  // Available search engines
  searchEngines: SearchEngine[];
  
  // Social links that appear below the search bar
  socialLinks: {
    name: string;
    url: string;
    icon: string;
  }[];
  
  // Repository information
  repository: {
    text: string;
    url: string;
  } | null;
  
  // UI Configuration
  ui: {
    logoUrl: string | null;
    logoText: string | null;
    // Add any additional UI configuration options here
  };

  // RSS Feeds URLs
  feeds: string[];
  
  // Feed Processor functions
  feedProcessors: FeedProcessor[];
};

async function parseDevToFeed(url: string): Promise<FeedItem[] | undefined> {
  try {
    if(!url.includes("https://dev.to")) return undefined;

    const fav_categories = [];
    
    const res = await fetch(url);
    const text = await res.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "application/xml");

    const all_items = Array.from(xml.querySelectorAll("item"));
    const items = all_items.map(a => {
      const categories = Array.from(a.querySelectorAll("category")).map(cat =>
        cat.textContent?.trim().toLowerCase()
      );

      if(categories.length === 0) return null;
      if(!categories.some(cat => fav_categories.includes(cat))) return null;

      return a;
    }).filter(Boolean);
    
    const icon = "https://dev.to/favicon.ico"; // ícono fijo o configurable

    const articles = items.map((item) => {
      const title = item.querySelector("title")?.textContent?.trim() || "";
      const descriptionRaw = item.querySelector("description")?.textContent || "";
      const description = stripHtml(descriptionRaw).slice(0, 280); // preview corto

      return {
        title,
        description,
        icon
      };
    });

    return articles.length ? articles.slice(0, 4) : undefined;

  } catch (err) {
    console.error("Error procesando el feed:", err);
    return undefined;
  }
}

// Utilidad opcional para limpiar HTML
function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

const config: MimicConfig = {
  title: "MIMIC Search",
  defaultSearchEngine: "google",
  searchEngines: [
    {
      name: "Google",
      icon: "chrome",
      url: "https://www.google.com/search?q=[Q]",
      shortcut: "g",
    },
    {
      name: "DuckDuckGo",
      icon: "duck",
      url: "https://duckduckgo.com/?q=[Q]",
      shortcut: "d",
    },
    {
      name: "YouTube",
      icon: "youtube",
      url: "https://www.youtube.com/results?search_query=[Q]",
      shortcut: "y",
    },
  ],
  socialLinks: [
    {
      name: "Chrome",
      url: "https://www.google.com",
      icon: "chrome",
    },
    {
      name: "DuckDuckGo",
      url: "https://duckduckgo.com",
      icon: "duck",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com",
      icon: "youtube",
    },
  ],
  repository: {
    text: "Visita el repo del proyecto en",
    url: "https://github.com",
  },
  ui: {
    logoUrl: "/lovable-uploads/8eb3df7e-01fd-4e45-bc5d-2269261ad1b2.png",
    logoText: "MIMIC.",
  },
  feeds: ["https://www.infobae.com/feeds/rss", "https://dev.to/feed/"],
  feedProcessors: [parseDevToFeed],
};

export default config;


// Mimic Search Configuration

export type FeedItem = {
  title: string;
  description: string;
  icon: string;
};

export type FeedProcessor = (url: string) => FeedItem[] | undefined;

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
  feeds: ["https://www.infobae.com/feeds/rss"],
  feedProcessors: [],
};

export default config;

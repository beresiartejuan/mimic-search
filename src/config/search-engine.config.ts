// Mimic Search Configuration
export type SearchEngine = {
  name: string;
  icon: string;
  url: string;
  shortcut?: string;
};

export const searchEngines: SearchEngine[] = [
  {
    name: "Google",
    icon: "chrome",
    url: "https://www.google.com/search?q=[Q]",
  },
  {
    name: "DuckDuckGo",
    icon: "duck",
    url: "https://duckduckgo.com/?q=[Q]",
  },
  {
    name: "YouTube",
    icon: "youtube",
    url: "https://www.youtube.com/results?search_query=[Q]",
  },
];

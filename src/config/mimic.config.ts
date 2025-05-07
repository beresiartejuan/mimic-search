import {
  type FeedProcessor,
  parseDevToFeed,
  feeds,
} from "@/config/feed.config";
import {
  type SearchEngine,
  searchEngines,
} from "@/config/search-engine.config";
import { type SocialLink, socialLinks } from "@/config/social.config";

export type MimicConfig = {
  // Title that appears in the browser tab
  title: string;

  // Primary search engine (default when no shortcut is specified)
  defaultSearchEngine: string;

  // Available search engines
  searchEngines: SearchEngine[];

  // Social links that appear below the search bar
  socialLinks: SocialLink[];

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
  searchEngines,
  socialLinks,
  ui: {
    logoUrl: "/logo.png",
    logoText: "MIMIC.",
  },
  feeds,
  feedProcessors: [parseDevToFeed],
};

export default config;

# MIMIC

A customizable search landing page that displays relevant news from RSS feeds. MIMIC allows you to quickly search the web while keeping up with your favorite content sources.

![MIMIC Search Screenshot](/captura.png)

## Features

- **Customizable Search Engine** - Choose your preferred search engine or add your own
- **RSS Feed Integration** - Display the latest articles from your favorite websites
- **Local Caching** - Saves feed data to localStorage to improve performance
- **Responsive Design** - Works on all devices
- **Easy Configuration** - Simple configuration files to personalize your experience

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/beresiartejuan/mimic-search.git
   cd mimic
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

## Configuration

MIMIC is designed to be easily customizable. All configuration files are located in the `config` directory.

### Search Engines

Edit `search-engine.config.ts` to customize your search engines:

```typescript
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
  // Add your own search engines here
];
```

The `[Q]` placeholder in the URL will be replaced with your search query.

### RSS Feeds

Configure your RSS feeds in `feed.config.ts`:

```typescript
export const feeds = [
  "https://dev.to/feed",
  // Add your own RSS feed URLs here
];
```

### Feed Processors

MIMIC uses feed processors to parse different types of RSS feeds. The default processor (`parseDevToFeed`) is configured to parse feeds from dev.to and filter articles by category.

To customize the categories you're interested in, edit the `fav_categories` array in `feed.config.ts`:

```typescript
const fav_categories = [
  "javascript",
  "productivity",
  "webdev",
  "typescript",
  "programming",
  // Add your preferred categories here
];
```

### Social Links

Edit `social.config.ts` to customize the quick links displayed below the search bar:

```typescript
export const socialLinks: SocialLink[] = [
  {
    name: "Chrome",
    url: "https://www.google.com",
    icon: "chrome",
  },
  // Add your frequently visited sites here
];
```

### App Configuration

The main configuration file `mimic.config.ts` combines all the other configurations:

```typescript
const config: MimicConfig = {
  title: "MIMIC Search", // Browser tab title
  defaultSearchEngine: "google", // Default search engine
  searchEngines, // From search-engine.config.ts
  socialLinks, // From social.config.ts
  ui: {
    logoUrl: "/logo.png", // Path to your logo
    logoText: "MIMIC.", // Text displayed next to the logo
  },
  feeds, // From feed.config.ts
  feedProcessors: [parseDevToFeed], // Feed processors
};
```

## Creating Custom Feed Processors

To add support for different RSS feed formats, you can create custom feed processors in `feed.config.ts`. A feed processor is a function that takes a feed URL and returns an array of feed items.

Example:

```typescript
export const parseCustomFeed: FeedProcessor = async (url) => {
  if (url !== "https://example.com/feed") return undefined;

  try {
    // Fetch and parse the feed
    const res = await fetch(url);
    const text = await res.text();
    // Process the feed data
    // ...

    return feedItems;
  } catch (error) {
    console.error("Error processing the feed:", error);
    return undefined;
  }
};

// Add your processor to the processors array in mimic.config.ts
feedProcessors: [parseDevToFeed, parseCustomFeed],
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern search interfaces
- Built with React and Tailwind CSS
- Uses shadcn/ui components
- Develop with Lovable

---

Feel free to customize MIMIC to your liking! If you encounter any issues or have suggestions, please open an issue on GitHub.

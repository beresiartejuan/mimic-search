
import React, { useState, KeyboardEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import config from "@/config/mimic.config";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Check if query starts with a search engine shortcut
    const parts = query.trim().split(" ");
    let searchEngine = config.searchEngines.find(
      (engine) => engine.name.toLowerCase() === config.defaultSearchEngine
    );

    // Check if first part is a shortcut
    if (parts.length > 1) {
      const potentialShortcut = parts[0].toLowerCase();
      const matchedEngine = config.searchEngines.find(
        (engine) => engine.shortcut === potentialShortcut
      );

      if (matchedEngine) {
        searchEngine = matchedEngine;
        parts.shift(); // Remove the shortcut from the query
      }
    }

    if (!searchEngine) {
      console.error("Default search engine not found in config");
      return;
    }

    // Sanitize and encode the query
    const sanitizedQuery = encodeURIComponent(parts.join(" "));
    
    // Replace [Q] in the URL with the sanitized query
    const searchUrl = searchEngine.url.replace("[Q]", sanitizedQuery);
    
    // Navigate to the search URL
    window.location.href = searchUrl;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-lg">
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pr-10 bg-white/10 backdrop-blur-sm border-white/20 focus-visible:ring-accent text-white placeholder:text-white/60 h-12"
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 h-full text-white hover:text-accent"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;

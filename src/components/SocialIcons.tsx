
import React from "react";
import { Button } from "@/components/ui/button";
import { Chrome, Youtube } from "lucide-react";
import config from "@/config/mimic.config";

// Custom DuckDuckGo icon since it's not in Lucide
const DuckIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    className="h-5 w-5"
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    <circle cx="12" cy="12" r="5" />
  </svg>
);

const getIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "chrome":
      return <Chrome className="h-5 w-5" />;
    case "youtube":
      return <Youtube className="h-5 w-5" />;
    case "duck":
      return <DuckIcon />;
    default:
      return null;
  }
};

const SocialIcons: React.FC = () => {
  // Filtrar para excluir el botón de DuckDuckGo
  const filteredLinks = config.socialLinks.filter(link => 
    !link.name.toLowerCase().includes("duck") && 
    !link.url.includes("duckduckgo.com")
  );

  return (
    <div className="flex space-x-4 mt-8">
      {filteredLinks.map((link, index) => (
        <Button
          key={index}
          variant="ghost"
          size="icon"
          className="bg-white/10 text-white hover:text-accent hover:bg-white/20"
          asChild
        >
          <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
            {getIcon(link.icon)}
          </a>
        </Button>
      ))}
    </div>
  );
};

export default SocialIcons;

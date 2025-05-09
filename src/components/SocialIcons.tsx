
import React from "react";
import { Button } from "@/components/ui/button";
import { Chrome, Youtube, Github, Mail } from "lucide-react";
import config from "@/config/mimic.config";

const getIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case "chrome":
      return <Chrome className="h-5 w-5" />;
    case "youtube":
      return <Youtube className="h-5 w-5" />;
    case "gmail":
      return <Mail />;
    case "github":
      return <Github/>;
    default:
      return null;
  }
};

const SocialIcons: React.FC = () => {
  // Filtrar para excluir el botón de DuckDuckGo
  const filteredLinks = config.socialLinks.filter(Boolean);

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


import React from "react";
import { cn } from "@/lib/utils";
import config from "@/config/mimic.config";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {config.ui.logoUrl && (
        <img 
          src={config.ui.logoUrl} 
          alt="Logo" 
          className="h-10 w-10"
        />
      )}
      {config.ui.logoText && (
        <span className="text-3xl font-bold text-white">
          {config.ui.logoText}
        </span>
      )}
    </div>
  );
};

export default Logo;

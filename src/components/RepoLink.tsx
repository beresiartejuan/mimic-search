
import React from "react";
import config from "@/config/mimic.config";

const RepoLink: React.FC = () => {
  if (!config.repository) return null;
  
  return (
    <div className="mt-16 border border-dashed border-white/30 p-4 rounded-lg inline-block">
      <p className="text-white/70">
        {config.repository.text}{" "}
        <a
          href={config.repository.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-accent underline"
        >
          Github
        </a>
        .
      </p>
    </div>
  );
};

export default RepoLink;


import React, { useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import SocialIcons from "@/components/SocialIcons";
import Logo from "@/components/Logo";
import RepoLink from "@/components/RepoLink";
import FeedList from "@/components/FeedList";
import config from "@/config/mimic.config";

const Index: React.FC = () => {
  useEffect(() => {
    // Update page title from config
    document.title = config.title;
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg flex flex-col items-center mt-[15vh]">
        <Logo className="mb-8" />
        <SearchBar />
        <SocialIcons />
        <FeedList />
        <RepoLink />
      </div>
    </div>
  );
};

export default Index;

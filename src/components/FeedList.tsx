
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rss } from "lucide-react";
import config from "@/config/mimic.config";
import type { FeedItem } from "@/config/mimic.config";

const FeedList: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    // Procesar todos los feeds a través de los processors
    const processFeeds = () => {
      const processedItems: FeedItem[] = [];
      
      // Para cada URL de feed
      config.feeds.forEach(feedUrl => {
        // Intentar procesar con cada procesador disponible
        for (const processor of config.feedProcessors) {
          const result = processor(feedUrl);
          
          // Si este procesador pudo manejar el feed, agregar los items al resultado
          if (result && Array.isArray(result) && result.length > 0) {
            processedItems.push(...result);
            break; // Continuar con el siguiente feed una vez que uno ha tenido éxito
          }
        }
      });
      
      setFeedItems(processedItems);
    };
    
    processFeeds();
  }, []); // Solo se ejecuta una vez al montar el componente

  // Si no hay items de feed o no hay procesadores configurados, no renderizar nada
  if (feedItems.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 w-full max-w-lg">
      <h2 className="text-white text-xl mb-4 font-semibold">Feeds</h2>
      <div className="grid gap-4">
        {feedItems.map((item, index) => (
          <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                {item.icon ? (
                  <img src={item.icon} alt="icon" className="h-5 w-5" />
                ) : (
                  <Rss className="h-5 w-5 text-white" />
                )}
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/70">{item.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeedList;

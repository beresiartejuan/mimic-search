
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rss, ExternalLink } from "lucide-react";
import config from "@/config/mimic.config";
import type { FeedItem } from "@/config/feed.config";
import { getCachedFeed, setCachedFeed } from "@/store/feed.store";

const FeedList: React.FC = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Procesar todos los feeds a través de los processors de forma asíncrona
    const processFeeds = async () => {
      setIsLoading(true);
      const processedItems: FeedItem[] = [];
      
      // Para cada URL de feed
      for (const feedUrl of config.feeds) {
        // Intentar procesar con cada procesador disponible
        for (const processor of config.feedProcessors) {
          try {
            let result: FeedItem[] | undefined;
            const cached_result = await getCachedFeed(feedUrl);

            if(!cached_result){
              result = await processor(feedUrl);
              setCachedFeed(feedUrl, result);
            }else{
              result = cached_result;
            }
            
            // Si este procesador pudo manejar el feed, agregar los items al resultado
            if (result && Array.isArray(result) && result.length > 0) {
              processedItems.push(...result);
              break; // Continuar con el siguiente feed una vez que uno ha tenido éxito
            }
          } catch (error) {
            console.error(`Error al procesar feed ${feedUrl}:`, error);
            // Continuar con el siguiente procesador incluso si este falló
          }
        }
      }
      
      setFeedItems(processedItems);
      setIsLoading(false);
    };
    
    processFeeds();
  }, []); // Solo se ejecuta una vez al montar el componente

  // Si está cargando, mostrar un indicador de carga
  if (isLoading && config.feedProcessors.length > 0) {
    return (
      <div className="mt-8 w-full max-w-lg">
        <h2 className="text-white text-xl mb-4 font-semibold">Cargando feeds...</h2>
      </div>
    );
  }

  // Si no hay items de feed o no hay procesadores configurados, no renderizar nada
  if (feedItems.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 w-full max-w-lg">
      <h2 className="text-white text-xl mb-4 font-semibold">Feeds</h2>
      <div className="grid gap-4">
        {feedItems.map((item, index) => (
          <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {item.icon ? (
                    <img src={item.icon} alt="icon" className="h-5 w-5" />
                  ) : (
                    <Rss className="h-5 w-5 text-white" />
                  )}
                  {item.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-white/70">{item.description}</CardDescription>
              <a 
                href={item.link}
                target="_blank" 
                className="text-accent flex items-center gap-1 mt-2 hover:text-accent/80 transition-colors"
              >
                <span>Leer más</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeedList;

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ProcessedImageResult {
  processedUrl: string | null;
  isProcessing: boolean;
  error: string | null;
}

// In-memory cache to avoid re-fetching
const imageCache = new Map<string, string>();

export function useProcessedImage(originalUrl: string, enabled = true): ProcessedImageResult {
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !originalUrl) {
      return;
    }

    // Check memory cache first
    if (imageCache.has(originalUrl)) {
      setProcessedUrl(imageCache.get(originalUrl)!);
      return;
    }

    const processImage = async () => {
      setIsProcessing(true);
      setError(null);

      try {
        // First check database cache
        const { data: cached } = await supabase
          .from("processed_image_cache")
          .select("processed_url, status")
          .eq("original_url", originalUrl)
          .single();

        if (cached?.status === "completed" && cached.processed_url) {
          imageCache.set(originalUrl, cached.processed_url);
          setProcessedUrl(cached.processed_url);
          setIsProcessing(false);
          return;
        }

        // Request processing
        const { data, error: fnError } = await supabase.functions.invoke("remove-background", {
          body: { imageUrl: originalUrl }
        });

        if (fnError) {
          throw fnError;
        }

        if (data?.processedUrl) {
          imageCache.set(originalUrl, data.processedUrl);
          setProcessedUrl(data.processedUrl);
        } else if (data?.status === "processing") {
          // Image is being processed, poll for result
          const pollInterval = setInterval(async () => {
            const { data: pollData } = await supabase
              .from("processed_image_cache")
              .select("processed_url, status")
              .eq("original_url", originalUrl)
              .single();

            if (pollData?.status === "completed" && pollData.processed_url) {
              clearInterval(pollInterval);
              imageCache.set(originalUrl, pollData.processed_url);
              setProcessedUrl(pollData.processed_url);
              setIsProcessing(false);
            } else if (pollData?.status === "failed") {
              clearInterval(pollInterval);
              setError("Failed to process image");
              setIsProcessing(false);
            }
          }, 2000);

          // Stop polling after 60 seconds
          setTimeout(() => clearInterval(pollInterval), 60000);
          return;
        }
      } catch (err) {
        console.error("Error processing image:", err);
        setError(err instanceof Error ? err.message : "Failed to process image");
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();
  }, [originalUrl, enabled]);

  return { processedUrl, isProcessing, error };
}
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useNewsletterSubscribe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const subscribe = async (email: string): Promise<boolean> => {
    if (!email || !email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('mailchimp-subscribe', {
        body: { email: email.trim() },
      });

      if (error) {
        console.error('Newsletter subscription error:', error);
        toast({
          title: "Error",
          description: "Failed to subscribe. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Welcome to the crew! 🌅",
        description: data.message || "You've been subscribed successfully!",
      });
      return true;

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { subscribe, isLoading };
};

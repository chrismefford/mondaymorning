import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SEO from "@/components/SEO";
import logoGold from "@/assets/logo-primary-gold.svg";

const LOCATION_LABELS: Record<string, string> = {
  "ob": "Ocean Beach",
  "north-park": "North Park",
  "pacific-beach": "Pacific Beach",
  "hillcrest": "Hillcrest",
  "encinitas": "Encinitas",
  "kava-haven-ob": "Kava Haven OB",
  "kava-haven-np": "Kava Haven North Park",
};

const Join = () => {
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location") || "";
  const locationLabel = LOCATION_LABELS[location] || location;

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !firstName.trim()) {
      toast({
        title: "Missing info",
        description: "Please enter your name and email.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const tags: string[] = ["QR Signup"];
      if (location) tags.push(location);

      const { data, error } = await supabase.functions.invoke("mailchimp-subscribe", {
        body: {
          email: email.trim(),
          firstName: firstName.trim(),
          tags,
        },
      });

      if (error) {
        toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
        return;
      }

      setIsSuccess(true);
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
        <SEO title="Welcome! | Monday Morning" description="Thanks for joining the Monday Morning community." />
        <div className="max-w-md w-full text-center space-y-6">
          <img src={logoGold} alt="Monday Morning" className="h-16 mx-auto" />
          <h1 className="font-serif text-3xl md:text-4xl text-secondary-foreground">
            Welcome to the crew! 🌅
          </h1>
          <p className="text-secondary-foreground/80 text-lg">
            Thanks for joining, {firstName}! We'll keep you in the loop on new drops, events, and good vibes.
          </p>
          {locationLabel && (
            <p className="text-gold text-sm font-medium">
              Signed up at {locationLabel}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <SEO
        title="Join the Community | Monday Morning"
        description="Sign up for Monday Morning updates — new products, events, and exclusive offers."
      />
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-4">
          <img src={logoGold} alt="Monday Morning" className="h-16 mx-auto" />
          <h1 className="font-serif text-3xl md:text-4xl text-secondary-foreground">
            Join the Community
          </h1>
          <p className="text-secondary-foreground/70 text-base">
            Get first access to new products, events, and exclusive offers.
          </p>
          {locationLabel && (
            <p className="text-gold text-sm font-medium">
              📍 {locationLabel}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-secondary-foreground">
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/40"
              maxLength={100}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-secondary-foreground">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/40"
              maxLength={255}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-6"
          >
            {isLoading ? "Signing up..." : "Join the Crew"}
          </Button>

          <p className="text-secondary-foreground/50 text-xs text-center">
            By signing up, you agree to receive emails from Monday Morning. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Join;

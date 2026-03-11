import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import zaneFounder from "@/assets/zane-founder.png";
import foundersLogo from "@/assets/founders-club-logo.png";
import stampGold from "@/assets/stamp-gold.svg";

const FoundersWelcome = () => {
  const location = useLocation();
  const firstName = location.state?.firstName || "Friend";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Welcome to the Founder's Club"
        description="Your Founder's Club application has been submitted. Welcome to Monday Morning."
        path="/founders-welcome"
      />
      <Header />

      {/* Success Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-forest-deep overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(42_80%_45%_/_0.08)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 grain pointer-events-none opacity-20" />
        <div className="absolute top-20 right-10 w-64 lg:w-96 opacity-[0.03] pointer-events-none">
          <img src={stampGold} alt="" className="w-full animate-float" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-gold-rich to-transparent" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center py-32">
          <div className="flex justify-center mb-8 animate-fade-up">
            <div className="w-20 h-20 rounded-full bg-gold-rich/10 border border-gold-rich/30 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-gold-rich" />
            </div>
          </div>

          <img src={foundersLogo} alt="Monday Morning Founders Club" className="w-24 md:w-32 mx-auto mb-8 animate-fade-up opacity-80" />

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream mb-6 animate-fade-up delay-100 leading-[1.15]">
            Your Application<br />
            <span className="italic shimmer-gold inline-block pb-4">Has Been Submitted!</span>
          </h1>

          <div className="w-16 h-px bg-gold-rich/40 mx-auto mb-8 animate-fade-up delay-150" />

          <p className="font-sans text-base md:text-lg text-champagne/60 max-w-lg mx-auto animate-fade-up delay-200 leading-relaxed tracking-wide">
            Thank you, {firstName}. Our team will review your application and reach out soon. Welcome to the beginning of something special.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Founder Note */}
      <section className="py-24 lg:py-32 bg-background relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-12 items-start">
            <div className="shrink-0">
              <div className="relative">
                <img
                  src={zaneFounder}
                  alt="Zane Curtis, Founder of Monday Morning"
                  className="w-32 h-32 md:w-40 md:h-40 object-cover grayscale"
                />
                <div className="absolute inset-0 border border-primary/20" />
              </div>
            </div>
            <div>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-primary/60 mb-6">A Note from the Founder</p>
              <div className="space-y-5 font-sans text-sm text-muted-foreground leading-relaxed tracking-wide">
                <p>
                  When I stopped drinking, I noticed something right away. People still want great drinks, great places, and great company. What they do not want is the baggage that comes with alcohol.
                </p>
                <p>
                  Monday Morning was built to give people exactly that: a place where you can go out, have an incredible time, and feel great the next day. No compromise on the drinks, the atmosphere, or the experience.
                </p>
                <p>
                  The Founders Club is not just a membership. It is your way of saying "I believe in this" and helping us take it further. More events, more products, more of the experience that San Diego has been missing.
                </p>
                <p>Thank you for being part of this with us.</p>
                <p>Welcome to the club.</p>
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Cheers,</p>
                <p className="font-serif text-2xl text-foreground italic mt-2">Zane Curtis</p>
                <p className="font-sans text-[10px] text-muted-foreground/60 uppercase tracking-[0.3em] mt-1">Founder, Monday Morning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-16 bg-muted/30 text-center">
        <Link to="/">
          <Button className="shimmer-gold-bg text-forest-deep font-sans text-[10px] font-semibold uppercase tracking-[0.25em] px-12 py-6 hover:opacity-90 transition-opacity">
            Back to Monday Morning
          </Button>
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default FoundersWelcome;

import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Clock, Users, Wine, Gift, Film, Camera, UtensilsCrossed, MapPin, ArrowRight } from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import dinnerCheers from "@/assets/lifestyle/dinner-cheers-intimate.jpg";
import sparkling from "@/assets/lifestyle/sparkling-celebration.jpg";
import wineToast from "@/assets/lifestyle/wine-dinner-toast.jpg";

const Valentines = () => {
  const pageTitle = "Sips & Sweethearts | Valentine's Date Night";
  const pageDescription = "Join us February 12th for an unforgettable Valentine's date night featuring handcrafted NA cocktails, chocolate pairings, charcuterie, and a cozy movie screening.";
  const ticketUrl = "https://www.eventbrite.com/e/sips-sweethearts-a-couples-cocktail-movie-experience-tickets-1243161234327";

  const includes = [
    { icon: Wine, title: "NA Cocktail Experience", description: "Create two of our most loved cocktails with bartender DY" },
    { icon: Gift, title: "Chocolate Truffle Pairing", description: "Artisan chocolates by Maya Moon paired with your drinks" },
    { icon: Camera, title: "Couples Love Portraits", description: "Take home a custom couples caricature keepsake" },
    { icon: UtensilsCrossed, title: "Charcuterie for Two", description: "A beautifully curated board to share" },
    { icon: Film, title: "Cozy Movie Screening", description: "End the night with a romantic film together" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle} | {SITE_NAME}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${SITE_URL}/valentines`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={dinnerCheers}
              alt="Couples enjoying intimate dinner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 via-rose-900/70 to-rose-900/40" />
          </div>

          {/* Grain texture */}
          <div className="grain absolute inset-0 z-10 pointer-events-none" />

          {/* Content */}
          <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-32">
            <div className="max-w-2xl">
              {/* Event Badge */}
              <div className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm border border-cream/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
                <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
                <span className="font-sans text-xs uppercase tracking-[0.2em] text-cream/90">Valentine's Event</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream mb-4 animate-fade-in">
                Sips & <span className="italic text-rose-300">Sweethearts</span>
              </h1>
              
              <p className="font-sans text-lg md:text-xl text-cream/80 mb-8 max-w-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
                A curated couples cocktail & movie experience. Connect, sip, and create memories together.
              </p>

              {/* Event Details */}
              <div className="flex flex-wrap gap-6 mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-2 text-cream/90">
                  <Calendar className="w-5 h-5 text-rose-300" />
                  <span className="font-sans text-sm">February 12, 2025</span>
                </div>
                <div className="flex items-center gap-2 text-cream/90">
                  <Clock className="w-5 h-5 text-rose-300" />
                  <span className="font-sans text-sm">6:00 PM - 7:30 PM</span>
                </div>
                <div className="flex items-center gap-2 text-cream/90">
                  <MapPin className="w-5 h-5 text-rose-300" />
                  <span className="font-sans text-sm">Ocean Beach Location</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="lg" 
                    className="bg-rose-500 hover:bg-rose-600 text-cream font-sans text-sm font-semibold uppercase tracking-wider px-8 py-6"
                  >
                    Get Tickets — $60/Couple
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Floating accent */}
          <div className="absolute bottom-12 right-12 hidden lg:block animate-float">
            <Heart className="w-24 h-24 text-rose-400/20 fill-rose-400/20" />
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-24 px-6 bg-cream">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-rose-600 mb-4">
                <span className="w-8 h-px bg-rose-400" />
                What's Included
                <span className="w-8 h-px bg-rose-400" />
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-forest mb-4">
                An Evening to <span className="italic text-rose-600">Remember</span>
              </h2>
              <p className="font-sans text-muted-foreground max-w-xl mx-auto">
                Everything you need for the perfect date night, all in one unforgettable experience.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {includes.map((item, index) => (
                <div 
                  key={index} 
                  className="group bg-background border-2 border-forest/10 p-8 hover:border-rose-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-rose-500 transition-colors">
                    <item.icon className="w-6 h-6 text-rose-600 group-hover:text-cream transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl text-forest mb-2">{item.title}</h3>
                  <p className="font-sans text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
              
              {/* Price Card */}
              <div className="bg-rose-600 text-cream p-8 flex flex-col justify-center">
                <Users className="w-10 h-10 mb-4 text-rose-200" />
                <span className="font-sans text-sm uppercase tracking-wider text-rose-200 mb-2">Per Couple</span>
                <span className="font-serif text-5xl font-bold mb-4">$60</span>
                <p className="font-sans text-sm text-rose-100">
                  Limited spots available. Reserve yours today.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-24 px-6 bg-background">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Images */}
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden border-2 border-forest">
                  <img 
                    src={sparkling} 
                    alt="Sparkling celebration" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square overflow-hidden border-2 border-forest bg-background p-2 shadow-brutal hidden md:block">
                  <img 
                    src={wineToast} 
                    alt="Couples toasting" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="lg:pl-8">
                <span className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-rose-600 mb-4">
                  <Heart className="w-4 h-4 fill-rose-600" />
                  The Experience
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
                  Craft Your Own <span className="italic text-rose-600">Love Story</span>
                </h2>
                <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                  Put your bartending skills to the test as you create two of Monday Morning's most loved NA cocktails. Learn about ingredients, functionality, and flavor profiles with our resident bartender DY guiding you every step of the way.
                </p>
                <p className="font-sans text-muted-foreground mb-8 leading-relaxed">
                  Between sips, enjoy artisan chocolate truffles from Maya Moon, share a beautifully curated charcuterie board, and capture the moment with a custom couples portrait. End the evening with a cozy movie screening—the perfect finale to your date night.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
                    <Button 
                      size="lg" 
                      className="bg-forest hover:bg-forest-light text-cream font-sans text-sm font-semibold uppercase tracking-wider px-8 py-6"
                    >
                      Reserve Your Spot
                      <Heart className="w-4 h-4 ml-2 fill-current" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Section */}
        <section className="py-16 px-6 bg-rose-50 border-y-2 border-rose-200">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-sans text-sm text-rose-700 mb-2">Make it a full evening</p>
            <p className="font-serif text-2xl md:text-3xl text-forest mb-4">
              Dine at Cafe Athena & Save
            </p>
            <p className="font-sans text-muted-foreground">
              Book your dinner before or after the event at Cafe Athena and receive{" "}
              <span className="font-bold text-rose-600">$10 off your $40+ purchase</span>
            </p>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 px-6 bg-forest text-cream text-center relative overflow-hidden">
          {/* Background hearts */}
          <div className="absolute inset-0 opacity-5">
            <Heart className="absolute top-10 left-10 w-32 h-32 fill-current" />
            <Heart className="absolute bottom-10 right-10 w-48 h-48 fill-current" />
            <Heart className="absolute top-1/2 left-1/3 w-24 h-24 fill-current" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <Heart className="w-12 h-12 text-rose-400 fill-rose-400 mx-auto mb-6" />
            <h2 className="font-serif text-4xl md:text-5xl mb-4">
              Don't Miss This <span className="italic text-gold">Date Night</span>
            </h2>
            <p className="font-sans text-cream/70 mb-8 max-w-lg mx-auto">
              Limited spots available for this exclusive Valentine's experience. Treat yourself and your partner to an evening you'll never forget.
            </p>
            <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="bg-rose-500 hover:bg-rose-600 text-cream font-sans text-sm font-semibold uppercase tracking-wider px-10 py-7"
              >
                Get Tickets — $60/Couple
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Valentines;

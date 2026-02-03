import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Clock, Users, Wine, Gift, Film, Camera, UtensilsCrossed } from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import stampGold from "@/assets/stamp-gold.svg";

const Valentines = () => {
  const pageTitle = "Sips & Sweethearts | Valentine's Date Night";
  const pageDescription = "Join us February 12th for an unforgettable Valentine's date night featuring handcrafted NA cocktails, chocolate pairings, charcuterie, and a cozy movie screening.";
  const ticketUrl = "https://www.eventbrite.com/e/sips-sweethearts-a-couples-cocktail-movie-experience-tickets-1243161234327";

  const includes = [
    { icon: Wine, text: "Hand-crafted NA cocktail experience" },
    { icon: Gift, text: "Chocolate truffle pairing by Maya Moon" },
    { icon: Camera, text: 'Couples "Love Portraits"' },
    { icon: UtensilsCrossed, text: "Charcuterie board for two" },
    { icon: Film, text: "Cozy movie screening" },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Helmet>
        <title>{pageTitle} | {SITE_NAME}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${SITE_URL}/valentines`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main className="relative overflow-hidden">
        {/* Decorative hearts border */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-rose-500 via-red-500 to-rose-500" />
          <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-rose-500 via-red-500 to-rose-500" />
          <div className="absolute top-0 left-0 w-4 h-full bg-gradient-to-b from-rose-500 via-red-500 to-rose-500" />
          <div className="absolute top-0 right-0 w-4 h-full bg-gradient-to-b from-rose-500 via-red-500 to-rose-500" />
          
          {/* Floating hearts */}
          <Heart className="absolute top-8 left-8 w-6 h-6 text-red-500 fill-red-500 animate-pulse" />
          <Heart className="absolute top-12 right-12 w-8 h-8 text-red-500 fill-red-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <Heart className="absolute top-1/4 left-6 w-5 h-5 text-red-500 fill-red-500 animate-pulse" style={{ animationDelay: '1s' }} />
          <Heart className="absolute top-1/3 right-8 w-6 h-6 text-red-500 fill-red-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <Heart className="absolute bottom-1/4 left-10 w-7 h-7 text-red-500 fill-red-500 animate-pulse" style={{ animationDelay: '0.7s' }} />
          <Heart className="absolute bottom-1/3 right-6 w-5 h-5 text-red-500 fill-red-500 animate-pulse" style={{ animationDelay: '1.2s' }} />
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Script title */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-red-600 mb-4 italic">
              Sips & Sweethearts
            </h1>
            
            <h2 className="font-sans text-lg md:text-xl uppercase tracking-[0.3em] text-red-700 font-bold mb-6">
              A Couples Cocktail & Movie Experience
            </h2>
            
            <p className="font-sans text-sm md:text-base text-red-600/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Connect, sip, and unwind with a curated Valentine's date night featuring handcrafted NA cocktails, chocolate pairings, and cozy vibes
            </p>

            {/* Date/Time Card */}
            <div className="inline-block border-4 border-dashed border-red-400 px-8 md:px-16 py-6 mb-8 relative">
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-4 h-4 border-l-4 border-t-4 border-red-600" />
              <div className="absolute -top-2 -right-2 w-4 h-4 border-r-4 border-t-4 border-red-600" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-4 border-b-4 border-red-600" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-4 border-b-4 border-red-600" />
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-600" />
                  <span className="font-sans text-lg md:text-xl font-bold text-red-700 uppercase tracking-wider">February</span>
                  <span className="font-serif text-4xl md:text-5xl font-bold text-red-600">12</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  <span className="font-sans text-lg md:text-xl font-bold text-red-700">6PM - 7:30PM</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-red-600" />
                <span className="font-sans text-xl md:text-2xl font-bold text-red-700">$60 PER COUPLE</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mb-12">
              <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="bg-red-600 hover:bg-red-700 text-cream font-sans text-base md:text-lg font-bold uppercase tracking-wider px-10 py-7 shadow-lg hover:shadow-xl transition-all"
                >
                  <Heart className="w-5 h-5 mr-2 fill-current" />
                  Get Tickets Now
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-cream to-rose-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left Column - Description */}
              <div>
                {/* Ticket-style header */}
                <div className="inline-block border-4 border-red-600 px-6 py-3 mb-8 relative">
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-cream rounded-full border-4 border-red-600" />
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-cream rounded-full border-4 border-red-600" />
                  <Heart className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 text-red-600 fill-red-600" />
                  <Heart className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 text-red-600 fill-red-600" />
                  <h3 className="font-sans text-xl font-bold uppercase tracking-[0.2em] text-red-700">Tickets Include</h3>
                </div>

                <p className="font-sans text-base text-red-800/80 leading-relaxed mb-8">
                  Sip, snack, connect, and unwind. Enjoy sparkling Bollé, make-your-own NA cocktails with chocolate pairings, charcuterie for two, a couples caricature, connection cards, a cozy movie screening, and exclusive post-event discounts.
                </p>

                {/* Includes List */}
                <div className="space-y-4">
                  {includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <Heart className="w-5 h-5 text-red-500 fill-red-500 flex-shrink-0" />
                      <span className="font-sans text-base text-red-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Cocktail Experience */}
              <div className="bg-red-600 p-8 md:p-10 text-cream relative">
                {/* Decorative stamp */}
                <div className="absolute -top-6 -right-6 w-24 h-24 opacity-20">
                  <img src={stampGold} alt="" className="w-full h-full" />
                </div>
                
                <h3 className="font-sans text-lg md:text-xl font-bold uppercase tracking-wider text-center mb-6">
                  Put Your Bartending Skills to the Test
                </h3>
                <p className="font-sans text-base text-cream/90 text-center leading-relaxed mb-6">
                  Create two of Monday Morning's most loved NA cocktails. Learn about ingredients, functionality, and flavor with our resident bartender DY.
                </p>
                
                <div className="flex justify-center">
                  <Wine className="w-16 h-16 text-cream/40" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 px-6 bg-cream text-center">
          <div className="max-w-3xl mx-auto">
            {/* Brand heart logo */}
            <div className="relative inline-block mb-8">
              <Heart className="w-20 h-20 text-red-600 fill-red-600" />
              <span className="absolute inset-0 flex items-center justify-center font-sans text-[8px] font-bold text-cream uppercase tracking-wider leading-tight text-center px-3 pt-1">
                Monday<br/>Morning<br/>Bottle Shop
              </span>
            </div>

            <h2 className="font-sans text-2xl md:text-3xl font-bold uppercase tracking-wider text-red-600 mb-2">
              Limited Spots Available
            </h2>
            <p className="font-sans text-xl md:text-2xl font-bold uppercase tracking-wider text-red-700 mb-8">
              Grab Tickets and Reserve Today!
            </p>

            <a href={ticketUrl} target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-cream font-sans text-base md:text-lg font-bold uppercase tracking-wider px-12 py-7 shadow-lg hover:shadow-xl transition-all mb-10"
              >
                <Heart className="w-5 h-5 mr-2 fill-current" />
                Reserve Your Spot
              </Button>
            </a>

            {/* Cafe Athena Partnership */}
            <div className="border-t-2 border-red-200 pt-8">
              <p className="font-sans text-sm text-red-600/80 italic">
                Book your dinner before or after the event at Cafe Athena and receive{" "}
                <span className="font-bold text-red-700">$10 off $40+ purchase!</span>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Valentines;

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Home, ShoppingBag, BookOpen, MapPin } from "lucide-react";
import SEO from "@/components/SEO";
import textureCream from "@/assets/texture-cream.svg";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Browse our non-alcoholic drinks, recipes, and find our San Diego locations."
        path="/404"
        noIndex={true}
      />
      
      <Header />
      
      <main className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
        />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Display */}
            <div className="mb-8">
              <span className="font-serif text-[120px] lg:text-[180px] leading-none text-gold/30 font-bold">
                404
              </span>
            </div>
            
            <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 lg:mb-6 block">
              Page Not Found
            </span>
            
            <h1 className="font-serif text-3xl lg:text-5xl leading-[1.1] mb-6 text-forest">
              Oops! This page has <span className="italic text-gold">gone dry</span>
            </h1>
            
            <p className="font-sans text-lg text-muted-foreground mb-10 max-w-md mx-auto">
              The page you're looking for might have been moved, renamed, or is temporarily unavailable. 
              Let's get you back on track.
            </p>
            
            {/* Quick Navigation */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              <Link to="/">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2 border-gold/20 hover:border-gold hover:bg-gold/5">
                  <Home className="h-5 w-5 text-gold" />
                  <span className="font-sans text-sm text-forest">Home</span>
                </Button>
              </Link>
              
              <Link to="/shop">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2 border-gold/20 hover:border-gold hover:bg-gold/5">
                  <ShoppingBag className="h-5 w-5 text-gold" />
                  <span className="font-sans text-sm text-forest">Shop</span>
                </Button>
              </Link>
              
              <Link to="/recipes">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2 border-gold/20 hover:border-gold hover:bg-gold/5">
                  <BookOpen className="h-5 w-5 text-gold" />
                  <span className="font-sans text-sm text-forest">Recipes</span>
                </Button>
              </Link>
              
              <Link to="/locations">
                <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2 border-gold/20 hover:border-gold hover:bg-gold/5">
                  <MapPin className="h-5 w-5 text-gold" />
                  <span className="font-sans text-sm text-forest">Locations</span>
                </Button>
              </Link>
            </div>
            
            {/* Browse Categories */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-gold/10">
              <h2 className="font-serif text-xl lg:text-2xl text-forest mb-4">
                Popular Categories
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                <Link to="/collections/na-beer">
                  <Button variant="ghost" size="sm" className="text-forest hover:text-gold hover:bg-gold/5">
                    NA Beer
                  </Button>
                </Link>
                <Link to="/collections/na-wine">
                  <Button variant="ghost" size="sm" className="text-forest hover:text-gold hover:bg-gold/5">
                    NA Wine
                  </Button>
                </Link>
                <Link to="/collections/na-spirits">
                  <Button variant="ghost" size="sm" className="text-forest hover:text-gold hover:bg-gold/5">
                    NA Spirits
                  </Button>
                </Link>
                <Link to="/collections/rtd-cocktails">
                  <Button variant="ghost" size="sm" className="text-forest hover:text-gold hover:bg-gold/5">
                    RTD Cocktails
                  </Button>
                </Link>
                <Link to="/collections/functional">
                  <Button variant="ghost" size="sm" className="text-forest hover:text-gold hover:bg-gold/5">
                    Functional
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button variant="ghost" size="sm" className="text-forest hover:text-gold hover:bg-gold/5">
                    Blog
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Help Text */}
            <p className="font-sans text-sm text-muted-foreground mt-8">
              If you believe this is an error, please{" "}
              <Link to="/locations" className="text-gold hover:underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;

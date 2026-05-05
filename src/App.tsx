import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "@/lib/helmet-compat";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import CartDrawer from "@/components/cart/CartDrawer";
import NAExpertChat from "@/components/chat/NAExpertChat";

import LoadingScreen from "@/components/LoadingScreen";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import RecipesPage from "./pages/Recipes";
import ProductPage from "./pages/Product";
import CollectionPage from "./pages/Collection";
import ShopPage from "./pages/Shop";
import Locations from "./pages/Locations";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import CuriousAFDictionary from "./pages/CuriousAFDictionary";
import UltimateNABeerGuide2026 from "./pages/UltimateNABeerGuide2026";
import BlogImport from "./pages/BlogImport";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import Wholesale from "./pages/Wholesale";
import WholesaleAuth from "./pages/WholesaleAuth";
import WholesaleCatalog from "./pages/WholesaleCatalog";
import Valentines from "./pages/Valentines";
import Events from "./pages/Events";
import NonAlcoholicDrinksSanDiego from "./pages/NonAlcoholicDrinksSanDiego";
import NonAlcoholicBeerGuide from "./pages/NonAlcoholicBeerGuide";
import BestNonAlcoholicDrinks from "./pages/BestNonAlcoholicDrinks";
import NewToNonAlcoholic from "./pages/NewToNonAlcoholic";
import AlcoholFreeLifestyle from "./pages/AlcoholFreeLifestyle";
import ZeroProofMeaning from "./pages/ZeroProofMeaning";
import CutwaterAlcoholContent from "./pages/CutwaterAlcoholContent";
import NonAlcDrinks from "./pages/NonAlcDrinks";
import ZeroProofNearby from "./pages/ZeroProofNearby";
import AlcoholAlternatives from "./pages/AlcoholAlternatives";
import SocialClub from "./pages/SocialClub";
import FoundersWelcome from "./pages/FoundersWelcome";
import Press from "./pages/Press";
import Consulting from "./pages/Consulting";
import KavaHavenNeighborhood from "./pages/KavaHavenNeighborhood";
import Join from "./pages/Join";
import NonAlcoholicDrinks from "./pages/seo/NonAlcoholicDrinks";
import NonAlcoholicSpirits from "./pages/seo/NonAlcoholicSpirits";
import NonAlcoholicWine from "./pages/seo/NonAlcoholicWine";
import SoberCuriousGuide from "./pages/seo/SoberCuriousGuide";
import BestNonAlcoholicIPAs from "./pages/seo/BestNonAlcoholicIPAs";
import ZeroProofHomeBar from "./pages/seo/ZeroProofHomeBar";
import DryJanuaryGuide from "./pages/seo/DryJanuaryGuide";
import WhiteClawAlcoholContent from "./pages/seo/WhiteClawAlcoholContent";
import BestNABarsSanDiego from "./pages/seo/BestNABarsSanDiego";
import NonAlcoholicBeerPregnancy from "./pages/seo/NonAlcoholicBeerPregnancy";
import BestNonAlcoholicTequila from "./pages/seo/BestNonAlcoholicTequila";
import BestNonAlcoholicWhiskey from "./pages/seo/BestNonAlcoholicWhiskey";
import BestNonAlcoholicGin from "./pages/seo/BestNonAlcoholicGin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <ScrollToTop />
      <CartDrawer />
      <NAExpertChat />
      
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/product/:handle" element={<ProductPage />} />
        <Route path="/collections/:slug" element={<CollectionPage />} />
        <Route path="/collections/brand/:brand" element={<CollectionPage />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/curious-af-dictionary" element={<CuriousAFDictionary />} />
        <Route path="/blog/ultimate-non-alcoholic-beer-guide-2026" element={<UltimateNABeerGuide2026 />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/blog-import" element={<BlogImport />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/services" element={<Wholesale />} />
        <Route path="/wholesale" element={<Navigate to="/services" replace />} />
        <Route path="/wholesale-login" element={<WholesaleAuth />} />
        <Route path="/wholesale-catalog" element={<WholesaleCatalog />} />
        <Route path="/valentines" element={<Valentines />} />
        {/* <Route path="/events" element={<Events />} /> */}
        <Route path="/non-alcoholic-drinks-san-diego" element={<NonAlcoholicDrinksSanDiego />} />
        <Route path="/non-alcoholic-beer-guide" element={<NonAlcoholicBeerGuide />} />
        <Route path="/best-non-alcoholic-drinks" element={<BestNonAlcoholicDrinks />} />
        <Route path="/new-to-non-alcoholic-drinks" element={<NewToNonAlcoholic />} />
        <Route path="/alcohol-free-lifestyle-benefits" element={<AlcoholFreeLifestyle />} />
        <Route path="/zero-proof-meaning" element={<ZeroProofMeaning />} />
        <Route path="/cutwater-alcohol-content" element={<CutwaterAlcoholContent />} />
        <Route path="/non-alc-drinks" element={<NonAlcDrinks />} />
        <Route path="/zero-proof-alcohol-nearby" element={<ZeroProofNearby />} />
        <Route path="/alcohol-alternatives" element={<AlcoholAlternatives />} />
        <Route path="/social-club" element={<SocialClub />} />
        <Route path="/founders-welcome" element={<FoundersWelcome />} />
        <Route path="/press" element={<Press />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/kava-haven/:neighborhood" element={<KavaHavenNeighborhood />} />
        <Route path="/join" element={<Join />} />
        {/* SEO cluster pages */}
        <Route path="/non-alcoholic-drinks" element={<NonAlcoholicDrinks />} />
        <Route path="/non-alcoholic-spirits" element={<NonAlcoholicSpirits />} />
        <Route path="/non-alcoholic-wine" element={<NonAlcoholicWine />} />
        <Route path="/sober-curious-guide" element={<SoberCuriousGuide />} />
        <Route path="/best-non-alcoholic-ipas" element={<BestNonAlcoholicIPAs />} />
        <Route path="/zero-proof-home-bar" element={<ZeroProofHomeBar />} />
        <Route path="/dry-january-guide" element={<DryJanuaryGuide />} />
        <Route path="/white-claw-alcohol-content" element={<WhiteClawAlcoholContent />} />
        <Route path="/best-non-alcoholic-bars-san-diego" element={<BestNABarsSanDiego />} />
        <Route path="/non-alcoholic-beer-pregnancy" element={<NonAlcoholicBeerPregnancy />} />
        <Route path="/best-non-alcoholic-tequila" element={<BestNonAlcoholicTequila />} />
        <Route path="/best-non-alcoholic-whiskey" element={<BestNonAlcoholicWhiskey />} />
        <Route path="/best-non-alcoholic-gin" element={<BestNonAlcoholicGin />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "@/lib/helmet-compat";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import CartDrawer from "@/components/cart/CartDrawer";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";

// Lazy-load non-critical chat widget
const NAExpertChat = lazy(() => import("@/components/chat/NAExpertChat"));

// Lazy-load all secondary routes so the homepage bundle stays small
const About = lazy(() => import("./pages/About"));
const RecipesPage = lazy(() => import("./pages/Recipes"));
const ProductPage = lazy(() => import("./pages/Product"));
const CollectionPage = lazy(() => import("./pages/Collection"));
const ShopPage = lazy(() => import("./pages/Shop"));
const Locations = lazy(() => import("./pages/Locations"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./pages/BlogPost"));
const CuriousAFDictionary = lazy(() => import("./pages/CuriousAFDictionary"));
const UltimateNABeerGuide2026 = lazy(() => import("./pages/UltimateNABeerGuide2026"));
const BlogImport = lazy(() => import("./pages/BlogImport"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Accessibility = lazy(() => import("./pages/Accessibility"));
const Terms = lazy(() => import("./pages/Terms"));
const Shipping = lazy(() => import("./pages/Shipping"));
const Returns = lazy(() => import("./pages/Returns"));
const CCPA = lazy(() => import("./pages/CCPA"));
const Wholesale = lazy(() => import("./pages/Wholesale"));
const Valentines = lazy(() => import("./pages/Valentines"));
const NonAlcoholicDrinksSanDiego = lazy(() => import("./pages/NonAlcoholicDrinksSanDiego"));
const NonAlcoholicBeerGuide = lazy(() => import("./pages/NonAlcoholicBeerGuide"));
const BestNonAlcoholicDrinks = lazy(() => import("./pages/BestNonAlcoholicDrinks"));
const NewToNonAlcoholic = lazy(() => import("./pages/NewToNonAlcoholic"));
const AlcoholFreeLifestyle = lazy(() => import("./pages/AlcoholFreeLifestyle"));
const ZeroProofMeaning = lazy(() => import("./pages/ZeroProofMeaning"));
const CutwaterAlcoholContent = lazy(() => import("./pages/CutwaterAlcoholContent"));
const NonAlcDrinks = lazy(() => import("./pages/NonAlcDrinks"));
const ZeroProofNearby = lazy(() => import("./pages/ZeroProofNearby"));
const AlcoholAlternatives = lazy(() => import("./pages/AlcoholAlternatives"));
const SocialClub = lazy(() => import("./pages/SocialClub"));
const FoundersWelcome = lazy(() => import("./pages/FoundersWelcome"));
const Press = lazy(() => import("./pages/Press"));
const Consulting = lazy(() => import("./pages/Consulting"));
const KavaHavenNeighborhood = lazy(() => import("./pages/KavaHavenNeighborhood"));
const Join = lazy(() => import("./pages/Join"));
const NonAlcoholicDrinks = lazy(() => import("./pages/seo/NonAlcoholicDrinks"));
const NonAlcoholicSpirits = lazy(() => import("./pages/seo/NonAlcoholicSpirits"));
const NonAlcoholicWine = lazy(() => import("./pages/seo/NonAlcoholicWine"));
const SoberCuriousGuide = lazy(() => import("./pages/seo/SoberCuriousGuide"));
const BestNonAlcoholicIPAs = lazy(() => import("./pages/seo/BestNonAlcoholicIPAs"));
const ZeroProofHomeBar = lazy(() => import("./pages/seo/ZeroProofHomeBar"));
const DryJanuaryGuide = lazy(() => import("./pages/seo/DryJanuaryGuide"));
const WhiteClawAlcoholContent = lazy(() => import("./pages/seo/WhiteClawAlcoholContent"));
const BestNABarsSanDiego = lazy(() => import("./pages/seo/BestNABarsSanDiego"));
const NonAlcoholicBeerPregnancy = lazy(() => import("./pages/seo/NonAlcoholicBeerPregnancy"));
const BestNonAlcoholicTequila = lazy(() => import("./pages/seo/BestNonAlcoholicTequila"));
const BestNonAlcoholicWhiskey = lazy(() => import("./pages/seo/BestNonAlcoholicWhiskey"));
const BestNonAlcoholicGin = lazy(() => import("./pages/seo/BestNonAlcoholicGin"));
const BestNonAlcoholicStouts = lazy(() => import("./pages/seo/BestNonAlcoholicStouts"));
const BestNonAlcoholicLagers = lazy(() => import("./pages/seo/BestNonAlcoholicLagers"));
const BestNonAlcoholicSparklingWine = lazy(() => import("./pages/seo/BestNonAlcoholicSparklingWine"));
const NADrinksForRelaxation = lazy(() => import("./pages/seo/NADrinksForRelaxation"));
const BeginnersGuideNA = lazy(() => import("./pages/seo/BeginnersGuideNA"));
const FunctionalMocktailsAdaptogens = lazy(() => import("./pages/seo/FunctionalMocktailsAdaptogens"));
const NonAlcoholicBarHillcrest = lazy(() => import("./pages/seo/NonAlcoholicBarHillcrest"));
const GoodNewsBarAlternatives = lazy(() => import("./pages/seo/GoodNewsBarAlternatives"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <>
      <ScrollToTop />
      <CartDrawer />
      <Suspense fallback={null}>
        <NAExpertChat />
      </Suspense>

      <Suspense fallback={<LoadingScreen />}>
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
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/ccpa" element={<CCPA />} />
          <Route path="/california-privacy" element={<Navigate to="/ccpa" replace />} />
          <Route path="/services" element={<Wholesale />} />
          <Route path="/wholesale" element={<Navigate to="/services" replace />} />
          {/* B2B portal retired (duplicated the CRM/Shopify B2B flow) — redirect to Work With Us */}
          <Route path="/wholesale-login" element={<Navigate to="/services" replace />} />
          <Route path="/wholesale-catalog" element={<Navigate to="/services" replace />} />
          <Route path="/valentines" element={<Valentines />} />
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
          <Route path="/best-non-alcoholic-stouts" element={<BestNonAlcoholicStouts />} />
          <Route path="/best-non-alcoholic-lagers" element={<BestNonAlcoholicLagers />} />
          <Route path="/best-non-alcoholic-sparkling-wine" element={<BestNonAlcoholicSparklingWine />} />
          <Route path="/na-drinks-for-relaxation" element={<NADrinksForRelaxation />} />
          <Route path="/beginners-guide-non-alcoholic-drinks" element={<BeginnersGuideNA />} />
          <Route path="/functional-mocktails-adaptogens" element={<FunctionalMocktailsAdaptogens />} />
          <Route path="/non-alcoholic-bar-hillcrest" element={<NonAlcoholicBarHillcrest />} />
          <Route path="/good-news-bar-alternatives-san-diego" element={<GoodNewsBarAlternatives />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
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

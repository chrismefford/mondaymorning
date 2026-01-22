import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import CartDrawer from "@/components/cart/CartDrawer";
import LoadingScreen from "@/components/LoadingScreen";
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
import BlogImport from "./pages/BlogImport";
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
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/product/:handle" element={<ProductPage />} />
        <Route path="/collections/:slug" element={<CollectionPage />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/blog-import" element={<BlogImport />} />
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

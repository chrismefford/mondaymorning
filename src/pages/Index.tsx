import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Collections from "@/components/home/Collections";
import Story from "@/components/home/Story";
import WhyWeDontDrink from "@/components/home/WhyWeDontDrink";
import Recipes from "@/components/home/Recipes";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import Instagram from "@/components/home/Instagram";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="space-y-16 lg:space-y-24">
        <Hero />
        <FeaturedProducts />
        <Collections />
        <Story />
        <WhyWeDontDrink />
        <Recipes />
        <Testimonials />
        <Newsletter />
        <Instagram />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

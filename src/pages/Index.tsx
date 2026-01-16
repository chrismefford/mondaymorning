import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import PolaroidGallery from "@/components/home/PolaroidGallery";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Collections from "@/components/home/Collections";
import Story from "@/components/home/Story";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import Instagram from "@/components/home/Instagram";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PolaroidGallery />
        <FeaturedProducts />
        <Collections />
        <Story />
        <Testimonials />
        <Newsletter />
        <Instagram />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

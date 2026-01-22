import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import textureCream from "@/assets/texture-cream.svg";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main>
        <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 lg:mb-6 block">
                Information
              </span>
              <h1 className="font-serif text-4xl lg:text-6xl leading-[1.05] mb-8">
                Shipping <span className="italic text-gold">Policy</span>
              </h1>
              
              <div className="prose prose-lg max-w-none font-sans text-muted-foreground space-y-8">
                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Shipping Locations</h2>
                  <p>
                    We currently ship to all 50 U.S. states. Unfortunately, we do not ship internationally at this time. For local customers in San Diego, in-store pickup is available at both our Ocean Beach and Pacific Beach locations.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Shipping Methods & Timing</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-forest">Standard Shipping:</strong> 5-7 business days - $8.99</li>
                    <li><strong className="text-forest">Expedited Shipping:</strong> 2-3 business days - $14.99</li>
                    <li><strong className="text-forest">Overnight Shipping:</strong> 1 business day - $24.99</li>
                    <li><strong className="text-forest">Free Shipping:</strong> Orders over $75 qualify for free standard shipping</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Processing Time</h2>
                  <p>
                    Orders are typically processed within 1-2 business days. During peak seasons or promotional periods, processing may take an additional 1-2 days. You will receive a confirmation email with tracking information once your order ships.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">In-Store Pickup</h2>
                  <p>
                    Prefer to pick up your order? Select "In-Store Pickup" at checkout and choose your preferred location. Orders are typically ready within 2 hours during business hours. You'll receive an email when your order is ready.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-forest">Pacific Beach:</strong> 1854 Garnet Ave, San Diego, CA 92109</li>
                    <li><strong className="text-forest">Ocean Beach:</strong> 4967 Newport Ave, San Diego, CA 92107</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Packaging</h2>
                  <p>
                    All orders are carefully packaged to ensure your beverages arrive safely. Fragile items are wrapped in protective materials, and temperature-sensitive products may include insulated packaging during warmer months.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Damaged or Lost Packages</h2>
                  <p>
                    If your order arrives damaged or is lost in transit, please contact us within 48 hours of delivery (or expected delivery). We'll work with you to resolve the issue promptly—whether that means a replacement or refund.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Contact Us</h2>
                  <p>
                    Questions about shipping? Reach out to us at:<br />
                    <strong className="text-forest">Monday Morning</strong><br />
                    Email: hello@mondaymorning.com<br />
                    San Diego, California
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;

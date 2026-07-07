import Header from "@/components/layout/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/layout/Footer";
import textureCream from "@/assets/texture-cream.webp";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-cream brand-type">
      <SEO title="Shipping Policy" description="Shipping options, timelines, and rates for Monday Morning non-alcoholic beverage orders, local San Diego delivery and nationwide." path="/shipping" />
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
                    We ship across the United States. Some non-alcoholic products carry state-level shipping restrictions; if your state or an item is affected, you'll see that at checkout before you pay. We do not ship internationally at this time. In San Diego, you can also choose local delivery or free in-store pickup, both covered below.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Shipping Rates & Timing</h2>
                  <p>
                    Shipping is calculated at checkout by the carrier (UPS), based on your delivery address and order size, so you always see the exact cost before you pay.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-forest">Standard (UPS Ground):</strong> typically 3 to 7 business days, depending on distance</li>
                    <li><strong className="text-forest">Faster options:</strong> UPS 2-Day and Next Day are available at checkout</li>
                  </ul>
                  <p className="text-sm italic text-muted-foreground mt-3">
                    Rates are set by the carrier and shown at checkout, so they vary by destination and order size.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Local Delivery (San Diego)</h2>
                  <p>
                    For eligible San Diego addresses, choose <strong className="text-forest">Local Delivery</strong> at checkout.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-forest">Free</strong> on orders over $100</li>
                    <li><strong className="text-forest">$12 flat</strong> on orders under $100</li>
                  </ul>
                  <p>
                    Availability depends on your delivery address. If you qualify, the local delivery option appears at checkout. Local delivery is separate from nationwide shipping, so the free-over-$100 perk applies to delivery, not to UPS shipping.
                  </p>
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
                    If your order arrives damaged or is lost in transit, please contact us within 48 hours of delivery (or expected delivery). We'll work with you to resolve the issue promptly, whether that means a replacement or refund.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Contact Us</h2>
                  <p>
                    Questions about shipping? Reach out to us at:<br />
                    <strong className="text-forest">Monday Morning</strong><br />
                    Email: info@mondaymorning-af.com<br />
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

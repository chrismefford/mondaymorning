import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import textureCream from "@/assets/texture-cream.svg";

const Terms = () => {
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
                Legal
              </span>
              <h1 className="font-serif text-4xl lg:text-6xl leading-[1.05] mb-8">
                Terms of <span className="italic text-gold">Service</span>
              </h1>
              
              <div className="prose prose-lg max-w-none font-sans text-muted-foreground space-y-8">
                <p className="text-lg leading-relaxed">
                  Last updated: January 2026
                </p>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Acceptance of Terms</h2>
                  <p>
                    By accessing and using the Monday Morning website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Age Requirement</h2>
                  <p>
                    While our products are non-alcoholic, you must be at least 18 years old to make purchases from our website. By placing an order, you confirm that you meet this age requirement.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Products & Pricing</h2>
                  <p>
                    All products are subject to availability. We reserve the right to modify or discontinue products at any time. Prices are subject to change without notice. We make every effort to display accurate pricing and product information.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Orders & Payment</h2>
                  <p>
                    By placing an order, you agree to provide accurate and complete information. We reserve the right to refuse or cancel any order for any reason, including suspected fraud or unauthorized transactions. Payment is required at the time of purchase.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Intellectual Property</h2>
                  <p>
                    All content on this website, including text, images, logos, and designs, is the property of Monday Morning and is protected by copyright and trademark laws. You may not reproduce, distribute, or use our content without written permission.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Limitation of Liability</h2>
                  <p>
                    Monday Morning shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our liability is limited to the amount paid for the specific product in question.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Governing Law</h2>
                  <p>
                    These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to conflict of law provisions.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Contact Us</h2>
                  <p>
                    For questions about these Terms of Service, please contact us at:<br />
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

export default Terms;

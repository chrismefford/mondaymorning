import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import textureCream from "@/assets/texture-cream.svg";

const Privacy = () => {
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
                Privacy <span className="italic text-gold">Policy</span>
              </h1>
              
              <div className="prose prose-lg max-w-none font-sans text-muted-foreground space-y-8">
                <p className="text-lg leading-relaxed">
                  Last updated: January 2026
                </p>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Information We Collect</h2>
                  <p>
                    We collect information you provide directly to us, such as when you create an account, make a purchase, sign up for our newsletter, or contact us for support. This may include your name, email address, shipping address, phone number, and payment information.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">How We Use Your Information</h2>
                  <p>
                    We use the information we collect to process your orders, communicate with you about products and services, send promotional communications (with your consent), and improve our website and customer experience.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Information Sharing</h2>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to fulfill your orders (e.g., shipping carriers, payment processors) or as required by law.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Cookies & Tracking</h2>
                  <p>
                    Our website uses cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie settings through your browser preferences.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Data Security</h2>
                  <p>
                    We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. All payment transactions are processed through secure, encrypted channels.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Your Rights</h2>
                  <p>
                    You have the right to access, correct, or delete your personal information. You may also opt out of promotional communications at any time. To exercise these rights, please contact us at hello@mondaymorning.com.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:<br />
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

export default Privacy;

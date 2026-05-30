import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import textureCream from "@/assets/texture-cream.webp";

const CCPA = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main>
        <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: "cover" }}
          />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 lg:mb-6 block">
                Legal
              </span>
              <h1 className="font-serif text-4xl lg:text-6xl leading-[1.05] mb-8">
                California Privacy <span className="italic text-gold">Rights</span>
              </h1>

              <div className="prose prose-lg max-w-none font-sans text-muted-foreground space-y-8">
                <p className="text-lg leading-relaxed">Last updated: May 2026</p>

                <p>
                  This notice supplements our Privacy Policy and applies solely to California residents under the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA).
                </p>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Information We Collect</h2>
                  <p>
                    In the last 12 months we may have collected the following categories of personal information: identifiers (name, email, shipping address, phone), commercial information (order history), internet activity (browsing and interaction with our site), geolocation (approximate, from IP), and payment information processed by our payment provider.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">How We Use It</h2>
                  <p>
                    To fulfill orders, provide customer support, send marketing communications you opt into, prevent fraud, comply with legal obligations, and improve our products and site.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Sale or Sharing of Personal Information</h2>
                  <p>
                    Monday Morning does not sell your personal information for money. We may share limited information (such as cookie identifiers) with advertising and analytics partners for cross-context behavioral advertising, which the CCPA may treat as "sharing." You have the right to opt out.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Your California Rights</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Right to know what personal information we collect, use, and disclose</li>
                    <li>Right to delete personal information we have collected</li>
                    <li>Right to correct inaccurate personal information</li>
                    <li>Right to opt out of the sale or sharing of personal information</li>
                    <li>Right to limit use of sensitive personal information</li>
                    <li>Right to non-discrimination for exercising your rights</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">How to Exercise Your Rights</h2>
                  <p>
                    Email us at hello@mondaymorning-af.com with the subject line "California Privacy Request" and tell us which right you want to exercise. We will verify your request using information already associated with your account or order history. You may also designate an authorized agent to act on your behalf.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">"Do Not Sell or Share My Personal Information"</h2>
                  <p>
                    To opt out of sharing for cross-context behavioral advertising, email hello@mondaymorning-af.com with the subject "Do Not Sell or Share." We also honor Global Privacy Control (GPC) signals sent by your browser.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Shine the Light</h2>
                  <p>
                    California Civil Code Section 1798.83 permits California residents to request information about disclosures of personal information to third parties for direct marketing purposes. We do not share personal information with third parties for their own direct marketing.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Contact Us</h2>
                  <p>
                    <strong className="text-forest">Monday Morning</strong>
                    <br />
                    Email: hello@mondaymorning-af.com
                    <br />
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

export default CCPA;

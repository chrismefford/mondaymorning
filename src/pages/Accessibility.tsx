import Header from "@/components/layout/Header";
import SEO from "@/components/SEO";
import Footer from "@/components/layout/Footer";
import textureCream from "@/assets/texture-cream.webp";

const Accessibility = () => {
  return (
    <div className="min-h-screen bg-cream brand-type">
      <SEO title="Accessibility Statement" description="Monday Morning commitment to digital accessibility, aiming to meet WCAG 2.1 AA across the site." path="/accessibility" />
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
                Accessibility <span className="italic text-gold">Statement</span>
              </h1>

              <div className="prose prose-lg max-w-none font-sans text-muted-foreground space-y-8">
                <p className="text-lg leading-relaxed">
                  Last updated: June 2026
                </p>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Our Commitment</h2>
                  <p>
                    Monday Morning is committed to ensuring digital accessibility for people with disabilities. We believe everyone deserves to drink differently, and we are continually improving the user experience for everyone and applying the relevant accessibility standards to both our website and our physical tasting rooms.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Conformance Status</h2>
                  <p>
                    We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA, the standard referenced by the Americans with Disabilities Act (ADA) and California's Unruh Civil Rights Act. We are actively working toward full conformance and regularly review the site for areas to improve.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">What We've Done</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Semantic page structure with a single main heading and logical heading order</li>
                    <li>A "skip to main content" link for keyboard and screen-reader users</li>
                    <li>Descriptive text alternatives (alt text) for meaningful images</li>
                    <li>Labels and accessible names on buttons, links, and form fields</li>
                    <li>Visible keyboard focus indicators throughout the site</li>
                    <li>Color choices reviewed for contrast against our cream and forest palette</li>
                    <li>Respect for the "reduce motion" setting on your device</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Known Limitations</h2>
                  <p>
                    Despite our efforts, some content may not yet be fully accessible. This can include third-party tools we rely on (such as our Shopify checkout, embedded maps, social media feeds, and certain product imagery supplied by brands). We monitor these areas and work with our partners to improve them. If you encounter a barrier, please tell us, we want to fix it.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Need Help? We're Here.</h2>
                  <p>
                    If you have difficulty accessing any part of this website, or if you'd like to place an order or get product recommendations in a way that works better for you, contact us and a real person will help, including completing your purchase for you if needed. We will make reasonable accommodations to provide the information, item, or transaction you're looking for through an accessible method.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Feedback & Contact</h2>
                  <p>
                    We welcome your feedback on the accessibility of Monday Morning. Please let us know if you run into any barriers:<br />
                    <strong className="text-forest">Monday Morning</strong><br />
                    Email: info@mondaymorning-af.com<br />
                    In person: our Pacific Beach and Ocean Beach tasting rooms<br />
                    San Diego, California
                  </p>
                  <p>
                    We try to respond to accessibility feedback within 3 to 5 business days.
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

export default Accessibility;

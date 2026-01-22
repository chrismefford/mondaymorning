import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import textureCream from "@/assets/texture-cream.svg";

const Returns = () => {
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
                Returns & <span className="italic text-gold">Refunds</span>
              </h1>
              
              <div className="prose prose-lg max-w-none font-sans text-muted-foreground space-y-8">
                <div className="bg-sand border-2 border-forest p-6 mb-8">
                  <p className="text-forest font-medium text-lg m-0">
                    <strong>Our Promise:</strong> We want you to love what you drink. If you're not satisfied with your purchase, we'll make it right.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Return Policy</h2>
                  <p>
                    We accept returns within 30 days of purchase for unopened products in their original packaging. Due to the nature of consumable products, we cannot accept returns on opened items unless they are defective.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">How to Initiate a Return</h2>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Contact us at hello@mondaymorning.com with your order number and reason for return</li>
                    <li>We'll provide you with a return authorization and shipping instructions</li>
                    <li>Pack items securely in original packaging if possible</li>
                    <li>Ship the return using the provided label or carrier of your choice</li>
                  </ol>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Refund Processing</h2>
                  <p>
                    Once we receive your return, we'll inspect the items and process your refund within 5-7 business days. Refunds will be credited to your original payment method. Please note that it may take additional time for the refund to appear on your statement depending on your bank.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Damaged or Defective Products</h2>
                  <p>
                    Received something damaged or defective? We're sorry! Please contact us within 48 hours of delivery with photos of the damaged items. We'll send a replacement or issue a full refund—no need to return the damaged products.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Exchanges</h2>
                  <p>
                    Want to exchange for a different product? The quickest way is to return your original purchase for a refund and place a new order for the items you'd like. This ensures you get your new products as fast as possible.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Return Shipping Costs</h2>
                  <p>
                    For returns due to customer preference (changed mind, ordered wrong item, etc.), return shipping costs are the responsibility of the customer. For damaged, defective, or incorrectly shipped items, we'll cover all return shipping costs.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Non-Returnable Items</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Opened or partially consumed products (unless defective)</li>
                    <li>Gift cards</li>
                    <li>Sale or clearance items (final sale)</li>
                    <li>Items returned after 30 days</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="font-serif text-2xl text-forest">Contact Us</h2>
                  <p>
                    Questions about returns? We're here to help:<br />
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

export default Returns;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, Building2, ArrowRight, Lock, ExternalLink } from "lucide-react";
import logoSecondaryGold from "@/assets/logo-secondary-gold.svg";
import { SITE_NAME, getCanonicalUrl } from "@/lib/seo";

// Shopify B2B customer account URL
const SHOPIFY_B2B_LOGIN_URL = "https://shopify.com/90213777708/account";

export default function WholesaleAuth() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleShopifyLogin = () => {
    setIsRedirecting(true);
    // Open Shopify's B2B customer account login in a new tab (required since Shopify blocks iframes)
    window.open(SHOPIFY_B2B_LOGIN_URL, '_blank', 'noopener,noreferrer');
    // Reset state after a short delay since user is opening new tab
    setTimeout(() => setIsRedirecting(false), 1000);
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Helmet>
        <title>B2B Login | {SITE_NAME}</title>
        <meta name="description" content="Login to your Monday Morning wholesale account to access B2B pricing and ordering." />
        <link rel="canonical" href={getCanonicalUrl("/wholesale-login")} />
      </Helmet>

      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-forest/10 p-8 shadow-lg">
            {/* Logo */}
            <div className="text-center mb-8">
              <img
                src={logoSecondaryGold}
                alt="Monday Morning"
                className="h-12 mx-auto mb-4"
              />
              <div className="flex items-center justify-center gap-2 text-forest mb-2">
                <Building2 className="w-5 h-5" />
                <h1 className="font-serif text-2xl">B2B Partner Portal</h1>
              </div>
              <p className="text-forest/60 text-sm">
                Access your wholesale account with B2B pricing
              </p>
            </div>

            {/* Shopify B2B Login Button */}
            <Button
              type="button"
              onClick={handleShopifyLogin}
              disabled={isRedirecting}
              className="w-full bg-gold hover:bg-gold/90 text-forest-deep font-semibold py-6 mb-4"
            >
              {isRedirecting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Redirecting to login...
                </>
              ) : (
                <>
                  <Building2 className="w-5 h-5 mr-2" />
                  Sign In to B2B Account
                  <ExternalLink className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            <p className="text-center text-sm text-forest/60 mb-6">
              You'll be redirected to our secure B2B login portal.
              <br />
              A one-time code will be sent to your email.
            </p>

            {/* Info section */}
            <div className="bg-forest/5 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-forest text-sm mb-2">B2B Account Benefits</h3>
              <ul className="text-sm text-forest/70 space-y-1">
                <li>• Exclusive wholesale pricing</li>
                <li>• Net payment terms</li>
                <li>• Bulk order discounts</li>
                <li>• Dedicated account support</li>
              </ul>
            </div>

            {/* Help links */}
            <div className="pt-6 border-t border-forest/10">
              <div className="text-center space-y-3">
                <p className="text-sm text-forest/60">
                  <Lock className="w-3 h-3 inline mr-1" />
                  B2B accounts are invite-only
                </p>
                <p className="text-sm text-forest/70">
                  Interested in becoming a partner?{" "}
                  <Link
                    to="/services"
                    className="text-gold hover:underline font-medium"
                  >
                    Apply here
                  </Link>
                </p>
                <p className="text-sm text-forest/60">
                  Need help?{" "}
                  <a
                    href="mailto:sales@mondaymorning-af.com"
                    className="text-forest hover:underline"
                  >
                    sales@mondaymorning-af.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

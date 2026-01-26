import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Building2, ArrowRight, Lock } from "lucide-react";
import logoSecondaryGold from "@/assets/logo-secondary-gold.svg";
import { SITE_NAME, getCanonicalUrl } from "@/lib/seo";

const loginSchema = z.object({
  email: z.string().email("Valid email is required").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function WholesaleAuth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    // Check if already logged in and is a wholesale customer
    const checkWholesaleStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Check if user is a wholesale customer
        const { data: wholesaleData } = await supabase
          .from("wholesale_customers")
          .select("id, is_active")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (wholesaleData?.is_active) {
          navigate("/wholesale-catalog");
          return;
        }
      }
      setCheckingAuth(false);
    };

    checkWholesaleStatus();
  }, [navigate]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      if (authData.user) {
        // Check if user is a wholesale customer
        const { data: wholesaleData, error: wsError } = await supabase
          .from("wholesale_customers")
          .select("id, is_active, company_name")
          .eq("user_id", authData.user.id)
          .maybeSingle();

        if (wsError || !wholesaleData) {
          toast.error("This account is not registered for wholesale access.");
          await supabase.auth.signOut();
          return;
        }

        if (!wholesaleData.is_active) {
          toast.error("Your wholesale account is currently inactive. Please contact sales@mondaymorning-af.com");
          await supabase.auth.signOut();
          return;
        }

        toast.success(`Welcome back, ${wholesaleData.company_name}!`);
        navigate("/wholesale-catalog");
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to log in");
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-forest" />
      </div>
    );
  }

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
                <h1 className="font-serif text-2xl">B2B Partner Login</h1>
              </div>
              <p className="text-forest/60 text-sm">
                Access your wholesale account and catalog
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-forest">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="you@company.com"
                  className="border-forest/20 focus:border-gold"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-forest">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  placeholder="••••••••"
                  className="border-forest/20 focus:border-gold"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gold hover:bg-gold/90 text-forest-deep font-semibold py-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Help links */}
            <div className="mt-6 pt-6 border-t border-forest/10">
              <div className="text-center space-y-3">
                <p className="text-sm text-forest/60">
                  <Lock className="w-3 h-3 inline mr-1" />
                  Wholesale accounts are invite-only
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

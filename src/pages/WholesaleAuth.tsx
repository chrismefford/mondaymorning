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

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/wholesale-catalog`,
        },
      });

      if (error) throw error;
    } catch (err) {
      console.error("Google login error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to log in with Google");
      setIsLoading(false);
    }
  };

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

            {/* Google Sign In */}
            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              variant="outline"
              className="w-full border-forest/20 hover:bg-forest/5 text-forest font-medium py-6 mb-4"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-forest/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-forest/50">Or</span>
              </div>
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

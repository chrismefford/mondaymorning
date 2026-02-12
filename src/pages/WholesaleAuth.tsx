import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "@/lib/helmet-compat";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Building2, Lock, Mail, Eye, EyeOff } from "lucide-react";
import logoSecondaryGold from "@/assets/logo-secondary-gold.svg";
import { SITE_NAME, getCanonicalUrl } from "@/lib/seo";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

export default function WholesaleAuth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Error state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Check if already logged in as wholesale customer
  useEffect(() => {
    const checkWholesaleStatus = async (userId: string) => {
      const { data: wholesaleData } = await supabase
        .from("wholesale_customers")
        .select("id, company_name, is_active")
        .eq("user_id", userId)
        .eq("is_active", true)
        .maybeSingle();

      if (wholesaleData) {
        toast.success(`Welcome, ${wholesaleData.company_name}!`);
        navigate("/wholesale-catalog");
      } else {
        // User is logged in but not a wholesale customer
        toast.error("Your account is not registered as a B2B partner. Please contact sales@mondaymorning-af.com to apply.");
        await supabase.auth.signOut();
      }
    };

    // Check existing session on mount
    const checkExistingSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        checkWholesaleStatus(session.user.id);
      }
    };

    checkExistingSession();

    // Listen for auth state changes (handles Google OAuth callback)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Defer the check to prevent deadlock
          setTimeout(() => {
            checkWholesaleStatus(session.user.id);
          }, 0);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const validateForm = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    try {
      emailSchema.parse(email);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setEmailError(e.errors[0].message);
        isValid = false;
      }
    }

    try {
      passwordSchema.parse(password);
    } catch (e) {
      if (e instanceof z.ZodError) {
        setPasswordError(e.errors[0].message);
        isValid = false;
      }
    }

    if (activeTab === "signup" && password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password. Please try again.");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.user) {
        // Check if they're an active wholesale customer
        const { data: wholesaleData, error: wholesaleError } = await supabase
          .from("wholesale_customers")
          .select("id, company_name, is_active")
          .eq("user_id", data.user.id)
          .maybeSingle();

        if (wholesaleError) {
          toast.error("Error checking wholesale status. Please try again.");
          return;
        }

        if (!wholesaleData) {
          toast.error("Your account is not registered as a B2B partner. Please contact sales@mondaymorning-af.com to apply.");
          await supabase.auth.signOut();
          return;
        }

        if (!wholesaleData.is_active) {
          toast.error("Your B2B account is pending approval. We'll notify you once it's activated.");
          await supabase.auth.signOut();
          return;
        }

        toast.success(`Welcome back, ${wholesaleData.company_name}!`);
        navigate("/wholesale-catalog");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/wholesale-login`,
        },
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          toast.error("An account with this email already exists. Please sign in instead.");
          setActiveTab("login");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.user) {
        toast.success(
          "Account created! Our team will review your B2B application and activate your wholesale access. You'll receive an email once approved.",
          { duration: 8000 }
        );
        
        // Clear form
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setActiveTab("login");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + "/wholesale-login",
      });

      if (error) {
        toast.error(error.message || "Failed to sign in with Google");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
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

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Create Account</TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email" className="text-forest">Email</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`pl-10 ${emailError ? "border-red-500" : "border-forest/20"}`}
                        disabled={isLoading}
                      />
                    </div>
                    {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                  </div>

                  <div>
                    <Label htmlFor="login-password" className="text-forest">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`pl-10 pr-10 ${passwordError ? "border-red-500" : "border-forest/20"}`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-forest/40 hover:text-forest"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
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
                        <Building2 className="w-5 h-5 mr-2" />
                        Sign In to B2B Account
                      </>
                    )}
                  </Button>

                  <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-forest/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-forest/60">Or continue with</span>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading || isGoogleLoading}
                    className="w-full border-forest/20 hover:bg-forest/5"
                  >
                    {isGoogleLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
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
                    )}
                    Sign in with Google
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Form */}
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-email" className="text-forest">Business Email</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`pl-10 ${emailError ? "border-red-500" : "border-forest/20"}`}
                        disabled={isLoading}
                      />
                    </div>
                    {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                  </div>

                  <div>
                    <Label htmlFor="signup-password" className="text-forest">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`pl-10 pr-10 ${passwordError ? "border-red-500" : "border-forest/20"}`}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-forest/40 hover:text-forest"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
                  </div>

                  <div>
                    <Label htmlFor="signup-confirm-password" className="text-forest">Confirm Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
                      <Input
                        id="signup-confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Repeat your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`pl-10 ${confirmPasswordError ? "border-red-500" : "border-forest/20"}`}
                        disabled={isLoading}
                      />
                    </div>
                    {confirmPasswordError && <p className="text-red-500 text-xs mt-1">{confirmPasswordError}</p>}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading || isGoogleLoading}
                    className="w-full bg-gold hover:bg-gold/90 text-forest-deep font-semibold py-6"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create B2B Account"
                    )}
                  </Button>

                  <p className="text-xs text-forest/60 text-center">
                    After creating an account, our team will review and activate your wholesale access.
                  </p>
                </form>
              </TabsContent>
            </Tabs>

            {/* Info section */}
            <div className="bg-forest/5 rounded-xl p-4 mt-6 mb-6">
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
                  B2B accounts require approval
                </p>
                <p className="text-sm text-forest/70">
                  New to wholesale?{" "}
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

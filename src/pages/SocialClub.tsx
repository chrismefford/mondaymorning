import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Crown, Star, Gem, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import stampGold from "@/assets/stamp-gold.svg";
import zaneFounder from "@/assets/zane-founder.png";

const tiers_founders_benefits = [
  "Four exclusive events annually", "Founder tasting nights", "Private product launch events",
  "Founders Happy Hour with menu previews", "Annual Founders Celebration party",
  "20% off drinks at the bar", "Four complimentary slushies per month",
  "10% off bottles and cans", "$10 cap on all shipping",
  "Personalized Founders Card", "Founders Only product releases", "Bring one guest to Founders events",
  "Monday Morning branded tote", "Recognition across social channels",
  "Guests receive 50% off Founder's Event tickets",
];

const tiers = [
  {
    name: "Founder's Club",
    icon: Star,
    price: "$1,000",
    priceNote: "per year",
    spots: "100",
    color: "gold" as const,
    description: "The core community behind Monday Morning and the individuals helping establish America's alcohol-free social culture.",
    benefits: [
      { category: "Events", items: ["Four exclusive events annually", "Founder tasting nights", "Private product launch events", "Founders Happy Hour with menu previews", "Annual Founders Celebration party", "Guests receive 50% off Founder's Event tickets"] },
      { category: "Bar Privileges", items: ["20% off drinks at the bar", "Four complimentary slushies per month"] },
      { category: "Bottle Shop", items: ["10% off bottles and cans", "$10 cap on all shipping"] },
      { category: "Extras", items: ["Personalized Founders Card", "Founders Only product releases", "Bring one guest to Founders events", "Monday Morning branded tote", "Recognition across social channels"] },
    ],
  },
  {
    name: "Founder's Circle",
    icon: Crown,
    price: "$5,000",
    priceNote: "per year",
    spots: "20",
    color: "terracotta" as const,
    featured: true,
    description: "For individuals who want to support the growth of alcohol-free culture while gaining deeper access to the community.",
    includedFrom: [
      { label: "Founder's Club Benefits", items: tiers_founders_benefits },
    ],
    benefits: [
      { category: "Founder's Circle Privileges", items: ["Six complimentary slushies per month", "Guest drink discount included", "Early access to limited drops", "Two seats at all Founders Club events", "Private industry tastings with NA brand founders", "Annual curated premium NA beverage package", "Tote + exclusive limited-edition Founder's merch", "Recognition as Founder's Circle supporter"] },
    ],
  },
  {
    name: "Founder's Table",
    icon: Gem,
    price: "$10,000",
    priceNote: "per year",
    spots: "10",
    color: "ocean" as const,
    description: "A small group of supporters helping establish the long-term foundation of Monday Morning and the alcohol-free social movement.",
    includedFrom: [
      { label: "Founder's Club + Founder's Circle Benefits", items: [...tiers_founders_benefits, "Two seats at all Founders Club events", "Private industry tastings with NA brand founders", "Annual curated premium NA beverage package", "Recognition as Founder's Circle supporter"] },
    ],
    benefits: [
      { category: "Founder's Table Privileges", items: ["Ten complimentary slushies per month", "Private dinners with NA brand founders and industry leaders", "Small private tastings and product previews", "Access to unreleased beverages", "One annual private bar buyout for a personal event", "VIP seating and recognition at major events"] },
    ],
  },
];

const comparisonFeatures = [
  { feature: "Exclusive events per year", founders: "4+", patron: "4+", table: "4+" },
  { feature: "Founder tasting nights", founders: true, patron: true, table: true },
  { feature: "Private product launches", founders: true, patron: true, table: true },
  { feature: "Founders Happy Hour", founders: true, patron: true, table: true },
  { feature: "Personalized Founders Card", founders: true, patron: true, table: true },
  { feature: "Bar drink discount", founders: "20%", patron: "20%", table: "20%" },
  { feature: "Complimentary slushies/month", founders: "4", patron: "6", table: "10" },
  { feature: "Bottle shop discount", founders: "10%", patron: "10%", table: "10%" },
  { feature: "Shipping cap", founders: "$10", patron: "$10", table: "—" },
  { feature: "Early access to new products", founders: true, patron: true, table: true },
  { feature: "Founders Only releases", founders: true, patron: true, table: true },
  { feature: "Limited edition merch", founders: true, patron: true, table: true },
  { feature: "Guest passes to events", founders: "50%", patron: "2", table: "2+" },
  { feature: "Community recognition", founders: true, patron: true, table: true },
  { feature: "Annual Founders Celebration", founders: true, patron: true, table: true },
  { feature: "Private industry tastings", founders: false, patron: true, table: true },
  { feature: "Curated NA beverage package", founders: false, patron: true, table: true },
  { feature: "Private dinners with NA leaders", founders: false, patron: false, table: true },
  { feature: "Access to unreleased beverages", founders: false, patron: false, table: true },
  { feature: "Annual private bar buyout", founders: false, patron: false, table: true },
  { feature: "VIP seating at major events", founders: false, patron: false, table: true },
];

const tierColorMap = {
  gold: { text: "text-gold-rich", check: "text-gold-rich", label: "text-gold-shimmer", border: "border-gold-rich" },
  terracotta: { text: "text-terracotta", check: "text-terracotta", label: "text-terracotta-light", border: "border-terracotta" },
  ocean: { text: "text-ocean", check: "text-ocean", label: "text-ocean-light", border: "border-ocean" },
};

const SocialClub = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    tier: "founders",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    celebrationDate: "",
    celebrationNote: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: application, error: insertError } = await supabase
        .from("social_club_applications")
        .insert({
          tier: formData.tier,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          address: formData.address || null,
          celebration_date: formData.celebrationDate || null,
          celebration_note: formData.celebrationNote || null,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      try {
        await supabase.functions.invoke("send-social-club-notification", {
          body: { applicationId: application.id },
        });
      } catch (emailErr) {
        console.error("Email notification failed:", emailErr);
      }

      toast({
        title: "Application Received",
        description: "Thank you for your interest in the Monday Morning Founders Club. We will be in touch soon.",
      });
      setFormData({
        tier: "founders",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        celebrationDate: "",
        celebrationNote: "",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Monday Morning Founders Club",
      description: "America's premier non alcoholic founders club with three tiers.",
      brand: { "@type": "Brand", name: "Monday Morning" },
      offers: [
        { "@type": "Offer", name: "Founder's Club", price: "1000", priceCurrency: "USD", availability: "https://schema.org/LimitedAvailability" },
        { "@type": "Offer", name: "Founder's Circle", price: "5000", priceCurrency: "USD", availability: "https://schema.org/LimitedAvailability" },
        { "@type": "Offer", name: "Founder's Table", price: "10000", priceCurrency: "USD", availability: "https://schema.org/LimitedAvailability" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-forest-deep">
      <SEO
        title="Founders Club - America's Non Alcoholic Founders Club"
        description="Join the Monday Morning Founders Club, an exclusive collective for those shaping America's alcohol-free social culture. Three tiers, 130 founding spots."
        path="/social-club"
        schema={schema}
      />
      <Header />

      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center justify-center bg-forest-deep overflow-hidden">
        {/* Radial gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(42_80%_45%_/_0.08)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 grain pointer-events-none opacity-20" />
        <div className="absolute top-20 right-10 w-64 lg:w-96 opacity-[0.03] pointer-events-none">
          <img src={stampGold} alt="" className="w-full animate-float" />
        </div>
        {/* Top and bottom gold hairlines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-gold-rich to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center py-32">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.5em] text-gold-rich/70 mb-8 animate-fade-up">
            By Invitation Only · 130 Founding Positions
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[6.5rem] text-cream mb-8 animate-fade-up delay-100 leading-[0.9]">
            Monday Morning<br />
            <span className="italic shimmer-gold">Founders Club</span>
          </h1>
          <div className="w-16 h-px bg-gold-rich/40 mx-auto mb-8 animate-fade-up delay-150" />
          <p className="font-sans text-base md:text-lg text-champagne/60 max-w-xl mx-auto mb-10 animate-fade-up delay-200 leading-relaxed tracking-wide">
            America's non alcoholic founders club. Great drinks, vibrant community, and memorable experiences, without alcohol.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-300">
            <Button
              onClick={() => document.getElementById("tiers")?.scrollIntoView({ behavior: "smooth" })}
              className="shimmer-gold-bg text-forest-deep font-sans text-xs font-semibold uppercase tracking-[0.2em] px-10 py-6 border-0 hover:opacity-90 transition-opacity"
            >
              View Tiers
            </Button>
            <Button
              onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-gold-rich/30 text-gold-rich/80 hover:bg-gold-rich/10 hover:text-gold-rich font-sans text-xs font-semibold uppercase tracking-[0.2em] px-10 py-6 bg-transparent transition-all"
            >
              Apply Now
            </Button>
          </div>
          <p className="font-sans text-[10px] text-champagne/30 mt-12 uppercase tracking-[0.3em] animate-fade-up delay-400">
            Enrollment closes April 30, 2026
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-forest-deep to-transparent" />
      </section>

      {/* Intro Section */}
      <section className="py-24 lg:py-32 bg-forest relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-gold-rich/20 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-14">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-rich/60 mb-6">The Movement</p>
            <h2 className="font-serif text-3xl md:text-5xl text-cream mb-0">
              An Invitation to the Inner Circle
            </h2>
          </div>
          <div className="space-y-6 font-sans text-base text-champagne/50 leading-relaxed tracking-wide">
            <p>
              In a city known for its nightlife and craft beverage culture, Monday Morning is building something different: a place where great drinks, vibrant community, and memorable nights out exist without alcohol.
            </p>
            <p>
              The Monday Morning Founders Club is an exclusive collective for those who want to be part of shaping the next chapter of social culture. More than a title or a card, the Founders Club is a gathering point for people who believe connection, creativity, and hospitality thrive without alcohol.
            </p>
            <p>
              With a focus on experiences, discovery, and community, founders receive access to private events, new drink releases, and the inside track on the evolving alcohol-free movement.
            </p>
          </div>
        </div>
      </section>

      {/* Tier Cards */}
      <section id="tiers" className="py-24 lg:py-32 bg-forest-deep relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(42_80%_45%_/_0.04)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 grain pointer-events-none opacity-15" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-rich/60 mb-6">Three Tiers</p>
            <h2 className="font-serif text-3xl md:text-5xl text-cream mb-5">
              Choose Your Tier
            </h2>
            <p className="font-sans text-sm text-champagne/40 max-w-xl mx-auto tracking-wide">
              The Founders Club launches with a limited founding cohort of 130 founders across three tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              const colors = tierColorMap[tier.color];
              return (
                <div
                  key={tier.name}
                  className={`relative border p-8 lg:p-10 flex flex-col transition-all duration-500 hover:border-gold-rich/30 ${
                    tier.featured
                      ? "border-gold-rich/40 bg-forest lg:scale-[1.03] lg:-my-4 shadow-[0_0_80px_-20px_hsl(42_80%_45%_/_0.15)]"
                      : "border-champagne/10 bg-forest-deep"
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 shimmer-gold-bg text-forest-deep px-5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.3em]">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className={`h-5 w-5 ${colors.text}`} />
                    <h3 className="font-serif text-xl text-cream">{tier.name}</h3>
                  </div>
                  <div className="mb-5">
                    <span className={`font-serif text-4xl gold-gradient-text`}>{tier.price}</span>
                    <span className="font-sans text-xs text-champagne/30 ml-2 uppercase tracking-wider">/{tier.priceNote}</span>
                  </div>
                  <p className="font-sans text-xs text-champagne/40 mb-2 tracking-wide">
                    Limited to <span className={`${colors.text} font-semibold`}>{tier.spots}</span> positions
                  </p>
                  <p className="font-sans text-sm text-champagne/50 mb-8 leading-relaxed">
                    {tier.description}
                  </p>
                  <div className="space-y-6 flex-1">
                    {tier.benefits.map((group) => (
                      <div key={group.category}>
                        <p className={`font-sans text-[10px] font-semibold uppercase tracking-[0.2em] mb-3 ${colors.label}`}>
                          {group.category}
                        </p>
                        <ul className="space-y-2.5">
                          {group.items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <span className="font-sans text-sm text-champagne/60">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {'includedFrom' in tier && (tier as any).includedFrom?.map((inc: { label: string; items: string[] }) => (
                      <details key={inc.label} className="group border border-champagne/10">
                        <summary className="flex items-center justify-between cursor-pointer px-4 py-3 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne/40 hover:text-champagne/60 transition-colors">
                          <span>{inc.label}</span>
                          <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
                        </summary>
                        <ul className="space-y-2 px-4 pb-4 pt-1">
                          {inc.items.map((item: string) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <Check className="h-3.5 w-3.5 mt-0.5 shrink-0 text-champagne/25" />
                              <span className="font-sans text-sm text-champagne/40">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ))}
                  </div>
                  <Button
                    onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}
                    className={`mt-10 w-full font-sans text-[10px] font-semibold uppercase tracking-[0.25em] py-6 transition-all ${
                      tier.featured
                        ? "shimmer-gold-bg text-forest-deep hover:opacity-90"
                        : "bg-transparent text-champagne/50 hover:text-champagne/80 border border-champagne/15 hover:border-champagne/30"
                    }`}
                  >
                    Apply Now
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="py-24 lg:py-32 bg-forest">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-rich/60 mb-6">At a Glance</p>
            <h2 className="font-serif text-3xl md:text-5xl text-cream mb-4">
              Compare Benefits
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-gold-rich/20">
                  <th className="text-left py-5 pr-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne/40 w-2/5">
                    Benefit
                  </th>
                  <th className="py-5 px-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-rich text-center">
                    <Star className="h-3.5 w-3.5 mx-auto mb-1.5 text-gold-rich" />
                    Founders<br />$1,000/yr
                  </th>
                  <th className="py-5 px-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-terracotta text-center">
                    <Crown className="h-3.5 w-3.5 mx-auto mb-1.5 text-terracotta" />
                    Founder's Circle<br />$5,000/yr
                  </th>
                  <th className="py-5 px-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ocean text-center">
                    <Gem className="h-3.5 w-3.5 mx-auto mb-1.5 text-ocean" />
                    Founder's Table<br />$10,000/yr
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-champagne/5 ${i % 2 === 0 ? "bg-champagne/[0.02]" : ""}`}>
                    <td className="py-3.5 pr-4 font-sans text-sm text-champagne/60">{row.feature}</td>
                    {[row.founders, row.patron, row.table].map((val, j) => (
                      <td key={j} className="py-3.5 px-4 text-center">
                        {val === true ? (
                          <Check className="h-3.5 w-3.5 mx-auto text-gold-rich" />
                        ) : val === false ? (
                          <span className="text-champagne/15">—</span>
                        ) : (
                          <span className="font-sans text-sm font-semibold text-champagne/70">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="py-20 lg:py-28 bg-forest-deep">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-14">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-rich/60 mb-6">FAQ</p>
            <h2 className="font-serif text-3xl md:text-5xl text-cream mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {[
              { q: "How long does my Founder's Club last?", a: "The Founder's Club is valid from May 1, 2026 to April 30, 2027." },
              { q: "Can I share my Founder's Club benefits?", a: "Club benefits are non-transferable and intended for use by the registered founder." },
              { q: "How do complimentary slushies work?", a: "Founders receive four, six, or ten complimentary slushies per month depending on tier. Complimentary slushies reset each calendar month, unused drinks do not roll over." },
              { q: "Can I combine my discount with other promotions?", a: "Founders Club discounts cannot be combined with other promotions or special offers. When multiple discounts are available, the greater discount will be applied." },
              { q: "Does the bottle shop discount work online?", a: "Yes, bottle shop discounts apply to both in-store and online purchases." },
              { q: "Do I need to RSVP for events?", a: "Yes. Event invitations may require advance RSVP and are subject to capacity." },
              { q: "Is early access guaranteed for limited products?", a: "Early access to limited products does not guarantee availability, as quantities may be limited." },
              { q: "Will benefits ever change?", a: "Monday Morning will not change the benefits during the Founder's Club term." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-champagne/10 px-6 data-[state=open]:border-gold-rich/30 transition-colors">
                <AccordionTrigger className="font-sans text-sm font-semibold text-cream hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm text-champagne/50 leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-24 lg:py-32 bg-forest relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(42_80%_45%_/_0.05)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 grain pointer-events-none opacity-15" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-14">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-rich/60 mb-6">Join the Club</p>
              <h2 className="font-serif text-3xl md:text-5xl text-cream mb-5">
                Founder Questionnaire
              </h2>
              <p className="font-sans text-sm text-champagne/40 tracking-wide">
                Enrollment for the founding cohort closes April 30, 2026.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Tier Selection */}
              <div>
                <Label className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-rich/70 mb-4 block">
                  What tier would you like to join?
                </Label>
                <RadioGroup
                  value={formData.tier}
                  onValueChange={(val) => setFormData({ ...formData, tier: val })}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {[
                    { value: "founders", label: "Founder's Club", price: "$1,000/yr" },
                    { value: "patron", label: "Founder's Circle", price: "$5,000/yr" },
                    { value: "table", label: "Founder's Table", price: "$10,000/yr" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 border p-4 cursor-pointer transition-all ${
                        formData.tier === opt.value
                          ? "border-gold-rich/50 bg-gold-rich/5"
                          : "border-champagne/10 hover:border-champagne/20"
                      }`}
                    >
                      <RadioGroupItem value={opt.value} className="border-champagne/30 text-gold-rich" />
                      <div>
                        <p className="font-sans text-sm font-semibold text-cream">{opt.label}</p>
                        <p className="font-sans text-[10px] text-champagne/40 uppercase tracking-wider">{opt.price}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <Label className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-rich/70 block">
                  Basic Information
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-sans text-[10px] text-champagne/40 mb-1 block uppercase tracking-wider">First Name</Label>
                    <Input
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="bg-champagne/[0.03] border-champagne/10 text-cream placeholder:text-champagne/20 focus:border-gold-rich/40"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <Label className="font-sans text-[10px] text-champagne/40 mb-1 block uppercase tracking-wider">Last Name</Label>
                    <Input
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="bg-champagne/[0.03] border-champagne/10 text-cream placeholder:text-champagne/20 focus:border-gold-rich/40"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-sans text-[10px] text-champagne/40 mb-1 block uppercase tracking-wider">Email</Label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-champagne/[0.03] border-champagne/10 text-cream placeholder:text-champagne/20 focus:border-gold-rich/40"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <Label className="font-sans text-[10px] text-champagne/40 mb-1 block uppercase tracking-wider">Phone Number</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-champagne/[0.03] border-champagne/10 text-cream placeholder:text-champagne/20 focus:border-gold-rich/40"
                    placeholder="(555) 555-5555"
                  />
                </div>
                <div>
                  <Label className="font-sans text-[10px] text-champagne/40 mb-1 block uppercase tracking-wider">Address</Label>
                  <Textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="bg-champagne/[0.03] border-champagne/10 text-cream placeholder:text-champagne/20 focus:border-gold-rich/40 min-h-[80px]"
                    placeholder="Street address, City, State, ZIP"
                  />
                </div>
              </div>

              {/* Celebration Date */}
              <div className="space-y-4">
                <Label className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-rich/70 block">
                  When would you like us to celebrate you?
                </Label>
                <p className="font-sans text-[10px] text-champagne/30 -mt-2 tracking-wide">
                  Sobriety date, birthday, wedding anniversary. Please provide month and day only.
                </p>
                <Input
                  value={formData.celebrationDate}
                  onChange={(e) => setFormData({ ...formData, celebrationDate: e.target.value })}
                  className="bg-champagne/[0.03] border-champagne/10 text-cream placeholder:text-champagne/20 focus:border-gold-rich/40"
                  placeholder="e.g. March 15"
                />
                <Input
                  value={formData.celebrationNote}
                  onChange={(e) => setFormData({ ...formData, celebrationNote: e.target.value })}
                  className="bg-champagne/[0.03] border-champagne/10 text-cream placeholder:text-champagne/20 focus:border-gold-rich/40"
                  placeholder="What are we celebrating? (optional)"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full shimmer-gold-bg text-forest-deep font-sans text-[10px] font-semibold uppercase tracking-[0.25em] py-6 hover:opacity-90 transition-opacity"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Founder Note */}
      <section className="py-24 lg:py-32 bg-forest-deep">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-12 items-start">
            <div className="shrink-0">
              <div className="relative">
                <img
                  src={zaneFounder}
                  alt="Zane Curtis, Founder of Monday Morning"
                  className="w-32 h-32 md:w-40 md:h-40 object-cover grayscale"
                />
                <div className="absolute inset-0 border border-gold-rich/20" />
              </div>
            </div>
            <div>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-rich/60 mb-6">A Note from the Founder</p>
              <div className="space-y-5 font-sans text-sm text-champagne/50 leading-relaxed tracking-wide">
                <p>
                  When I stopped drinking, I realized something pretty quickly. People still want great drinks, great places, and great company. What they do not want is the pressure that alcohol often brings with it.
                </p>
                <p>
                  Monday Morning was built to create a new kind of space, one where great drinks, community, and culture exist without alcohol at the center of it.
                </p>
                <p>
                  The Founders Club is about supporting that vision and helping us push it even further. Your support helps us expand events, bring in new products, and continue building the best non alcoholic experience in San Diego.
                </p>
                <p>Thank you for being part of this with us.</p>
                <p>Welcome to the club.</p>
              </div>
              <div className="mt-8 pt-6 border-t border-champagne/10">
                <p className="font-sans text-[10px] text-champagne/50 uppercase tracking-[0.2em]">Cheers,</p>
                <p className="font-serif text-2xl text-cream italic mt-2">Zane Curtis</p>
                <p className="font-sans text-[10px] text-champagne/30 uppercase tracking-[0.3em] mt-1">Founder, Monday Morning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-24 bg-forest relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(42_80%_45%_/_0.06)_0%,_transparent_70%)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-gold-rich/20 to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl text-cream mb-5">
            Building the Future of Alcohol-Free Culture
          </h2>
          <p className="font-sans text-sm text-champagne/40 max-w-xl mx-auto mb-10 tracking-wide leading-relaxed">
            With spots limited across all tiers, the Monday Morning Founders Club represents the community helping define a new kind of nightlife, one rooted in great drinks, inclusive experiences, and meaningful connection.
          </p>
          <Button
            onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}
            className="shimmer-gold-bg text-forest-deep font-sans text-[10px] font-semibold uppercase tracking-[0.25em] px-12 py-6 hover:opacity-90 transition-opacity"
          >
            Apply Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SocialClub;

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Crown, Star, Gem, Calendar, Gift, Users, Wine, ShoppingBag, Ticket, ChevronDown } from "lucide-react";
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

const tiers = [
  {
    name: "Founders Club",
    icon: Star,
    price: "$1,000",
    priceNote: "per year",
    spots: "100",
    color: "gold",
    description: "The core community behind Monday Morning and the individuals helping establish San Diego's alcohol-free social culture.",
    benefits: [
      { category: "Events", items: ["Four exclusive events annually", "Founder tasting nights", "Private product launch events", "Founders Happy Hour with menu previews", "Annual Founders Celebration party"] },
      { category: "Bar Privileges", items: ["20% off drinks at the bar", "Six complimentary slushies per month", "Discounts apply to guest drinks too"] },
      { category: "Bottle Shop", items: ["10% off bottles and cans", "$10 cap on all shipping", "Early access to new products", "Priority access to limited drops"] },
      { category: "Extras", items: ["Personalized Founders Card", "Members Only product releases", "Bring one guest to Founders events", "Limited edition Founders merch", "Recognition across social channels"] },
    ],
  },
  {
    name: "Patron Circle",
    icon: Crown,
    price: "$5,000",
    priceNote: "per year",
    spots: "20",
    color: "terracotta",
    featured: true,
    description: "For individuals who want to support the growth of alcohol-free culture while gaining deeper access to the community.",
    benefits: [
      { category: "Everything in Founders Club, plus", items: [] },
      { category: "Patron Privileges", items: ["Two seats at all Social Club events", "Private industry tastings with NA brand founders", "Annual curated premium NA beverage package", "Recognition as Patron Circle supporter"] },
    ],
  },
  {
    name: "The Founding Table",
    icon: Gem,
    price: "$10,000",
    priceNote: "per year",
    spots: "10",
    color: "ocean",
    description: "A small group of supporters helping establish the long-term foundation of Monday Morning and the alcohol-free social movement.",
    benefits: [
      { category: "Everything in Founders + Patron, plus", items: [] },
      { category: "Founding Table Privileges", items: ["Private dinners with NA brand founders and industry leaders", "Small private tastings and product previews", "Access to unreleased beverages", "One annual private bar buyout for a personal event", "VIP seating and recognition at major events"] },
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
  { feature: "Complimentary slushies/month", founders: "6", patron: "6", table: "6" },
  { feature: "Bottle shop discount", founders: "10%", patron: "10%", table: "10%" },
  { feature: "Shipping cap", founders: "$10", patron: "$10", table: "$10" },
  { feature: "Early access to new products", founders: true, patron: true, table: true },
  { feature: "Members Only releases", founders: true, patron: true, table: true },
  { feature: "Limited edition merch", founders: true, patron: true, table: true },
  { feature: "Guest passes to events", founders: "1", patron: "2", table: "2+" },
  { feature: "Community recognition", founders: true, patron: true, table: true },
  { feature: "Annual Founders Celebration", founders: true, patron: true, table: true },
  { feature: "Private industry tastings", founders: false, patron: true, table: true },
  { feature: "Curated NA beverage package", founders: false, patron: true, table: true },
  { feature: "Private dinners with NA leaders", founders: false, patron: false, table: true },
  { feature: "Access to unreleased beverages", founders: false, patron: false, table: true },
  { feature: "Annual private bar buyout", founders: false, patron: false, table: true },
  { feature: "VIP seating at major events", founders: false, patron: false, table: true },
];

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
      // For now, send via edge function or store in DB
      toast({
        title: "Application Received",
        description: "Thank you for your interest in the Monday Morning Social Club. We will be in touch soon.",
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
      name: "Monday Morning Social Club Membership",
      description: "San Diego's premier non-alcoholic social club with three membership tiers.",
      brand: { "@type": "Brand", name: "Monday Morning" },
      offers: [
        { "@type": "Offer", name: "Founders Club", price: "1000", priceCurrency: "USD", availability: "https://schema.org/LimitedAvailability" },
        { "@type": "Offer", name: "Patron Circle", price: "5000", priceCurrency: "USD", availability: "https://schema.org/LimitedAvailability" },
        { "@type": "Offer", name: "The Founding Table", price: "10000", priceCurrency: "USD", availability: "https://schema.org/LimitedAvailability" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Social Club - San Diego's Non-Alcoholic Social Club"
        description="Join the Monday Morning Social Club, a limited membership for those shaping San Diego's alcohol-free social culture. Three tiers, 130 founding members."
        path="/social-club"
        schema={schema}
      />
      <Header />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-forest overflow-hidden">
        <div className="absolute inset-0 grain pointer-events-none opacity-40" />
        <div className="absolute top-20 right-10 w-64 lg:w-96 opacity-[0.04] pointer-events-none">
          <img src={stampGold} alt="" className="w-full animate-float" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center py-32">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-6 animate-fade-up">
            Limited to 130 Founding Members
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream mb-6 animate-fade-up delay-100">
            Monday Morning<br />
            <span className="italic text-gold">Social Club</span>
          </h1>
          <p className="font-sans text-lg md:text-xl text-cream/70 max-w-2xl mx-auto mb-8 animate-fade-up delay-200 leading-relaxed">
            San Diego's non-alcoholic social club. Great drinks, vibrant community, and memorable nights out, without alcohol.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-300">
            <Button
              onClick={() => document.getElementById("tiers")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-gold text-forest hover:bg-gold-light font-sans text-sm font-semibold uppercase tracking-wider px-8 py-6"
            >
              View Membership Tiers
            </Button>
            <Button
              onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}
              variant="outline"
              className="border-2 border-cream/30 text-cream hover:bg-cream/10 font-sans text-sm font-semibold uppercase tracking-wider px-8 py-6"
            >
              Apply Now
            </Button>
          </div>
          <p className="font-sans text-sm text-cream/40 mt-8 animate-fade-up delay-400">
            Enrollment closes April 30, 2026
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Intro Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">The Movement</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-8">
              More Than a Membership
            </h2>
          </div>
          <div className="space-y-6 font-sans text-lg text-muted-foreground leading-relaxed">
            <p>
              In a city known for its nightlife and craft beverage culture, Monday Morning is building something different: a place where great drinks, vibrant community, and memorable nights out exist without alcohol.
            </p>
            <p>
              The Monday Morning Social Club is a limited membership created for those who want to be part of shaping the next chapter of San Diego's social culture. More than a membership program, the Social Club is a gathering point for people who believe connection, creativity, and hospitality thrive without alcohol.
            </p>
            <p>
              With a focus on experiences, discovery, and community, members receive access to private events, new drink releases, and the inside track on the evolving alcohol-free movement.
            </p>
          </div>
        </div>
      </section>

      {/* Tier Cards */}
      <section id="tiers" className="py-20 lg:py-28 bg-forest relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 grain pointer-events-none opacity-30" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">Three Tiers</p>
            <h2 className="font-serif text-3xl md:text-5xl text-cream mb-4">
              Choose Your Tier
            </h2>
            <p className="font-sans text-lg text-cream/60 max-w-2xl mx-auto">
              The Social Club launches with a limited founding cohort of 130 members across three tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.name}
                  className={`relative border-2 p-8 lg:p-10 flex flex-col ${
                    tier.featured
                      ? "border-gold bg-forest-deep lg:scale-105 lg:-my-4"
                      : "border-cream/15 bg-forest-deep/50"
                  }`}
                >
                  {tier.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-forest px-4 py-1 font-sans text-xs font-bold uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className={`h-6 w-6 ${
                      tier.color === "gold" ? "text-gold" : tier.color === "terracotta" ? "text-terracotta" : "text-ocean"
                    }`} />
                    <h3 className="font-serif text-2xl text-cream">{tier.name}</h3>
                  </div>
                  <div className="mb-4">
                    <span className="font-serif text-4xl text-gold">{tier.price}</span>
                    <span className="font-sans text-sm text-cream/50 ml-2">/{tier.priceNote}</span>
                  </div>
                  <p className="font-sans text-sm text-cream/50 mb-2">
                    Limited to <span className="text-gold font-semibold">{tier.spots}</span> members
                  </p>
                  <p className="font-sans text-sm text-cream/70 mb-8 leading-relaxed">
                    {tier.description}
                  </p>
                  <div className="space-y-6 flex-1">
                    {tier.benefits.map((group) => (
                      <div key={group.category}>
                        <p className={`font-sans text-xs font-semibold uppercase tracking-wider mb-3 ${
                          tier.color === "gold" ? "text-gold" : tier.color === "terracotta" ? "text-terracotta" : "text-ocean"
                        }`}>
                          {group.category}
                        </p>
                        <ul className="space-y-2">
                          {group.items.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <Check className={`h-4 w-4 mt-0.5 shrink-0 ${
                                tier.color === "gold" ? "text-gold" : tier.color === "terracotta" ? "text-terracotta" : "text-ocean"
                              }`} />
                              <span className="font-sans text-sm text-cream/80">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}
                    className={`mt-8 w-full font-sans text-sm font-semibold uppercase tracking-wider py-6 ${
                      tier.featured
                        ? "bg-gold text-forest hover:bg-gold-light"
                        : "bg-cream/10 text-cream hover:bg-cream/20 border border-cream/20"
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
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">At a Glance</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
              Compare Benefits
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-foreground">
                  <th className="text-left py-4 pr-4 font-sans text-xs font-semibold uppercase tracking-wider text-muted-foreground w-2/5">
                    Benefit
                  </th>
                  <th className="py-4 px-4 font-sans text-xs font-semibold uppercase tracking-wider text-gold text-center">
                    <Star className="h-4 w-4 mx-auto mb-1 text-gold" />
                    Founders<br />$1,000/yr
                  </th>
                  <th className="py-4 px-4 font-sans text-xs font-semibold uppercase tracking-wider text-terracotta text-center">
                    <Crown className="h-4 w-4 mx-auto mb-1 text-terracotta" />
                    Patron<br />$5,000/yr
                  </th>
                  <th className="py-4 px-4 font-sans text-xs font-semibold uppercase tracking-wider text-ocean text-center">
                    <Gem className="h-4 w-4 mx-auto mb-1 text-ocean" />
                    Founding Table<br />$10,000/yr
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-border ${i % 2 === 0 ? "bg-muted/30" : ""}`}>
                    <td className="py-3 pr-4 font-sans text-sm text-foreground">{row.feature}</td>
                    {[row.founders, row.patron, row.table].map((val, j) => (
                      <td key={j} className="py-3 px-4 text-center">
                        {val === true ? (
                          <Check className="h-4 w-4 mx-auto text-primary" />
                        ) : val === false ? (
                          <span className="text-muted-foreground/30">—</span>
                        ) : (
                          <span className="font-sans text-sm font-semibold text-foreground">{val}</span>
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
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">FAQ</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {[
              { q: "How long does my membership last?", a: "Founders Club membership is valid for 12 months from the date of purchase. Club fees are non-refundable and recur annually." },
              { q: "Can I share my membership benefits?", a: "Club benefits are non-transferable and intended for use by the registered member. However, bar discounts apply to all drinks purchased by the member, including drinks purchased for guests, as long as the member is present at the time of purchase." },
              { q: "How do complimentary slushies work?", a: "Founders receive six complimentary slushies per month. Complimentary slushies reset each calendar month, unused drinks do not roll over." },
              { q: "Can I combine my discount with other promotions?", a: "Founders Club discounts cannot be combined with other promotions or special offers. When multiple discounts are available, the greater discount will be applied." },
              { q: "Does the bottle shop discount work online?", a: "Yes, bottle shop discounts apply to both in-store and online purchases. Founders also receive complimentary shipping on online orders placed through the Monday Morning website." },
              { q: "Do I need to RSVP for events?", a: "Event invitations may require advance RSVP and are subject to capacity." },
              { q: "Is early access guaranteed for limited products?", a: "Early access to limited products does not guarantee availability, as quantities may be limited." },
              { q: "Will benefits ever change?", a: "Monday Morning may occasionally adjust programming, events, or benefits as the Founders Club evolves." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-2 border-border px-6 data-[state=open]:border-primary">
                <AccordionTrigger className="font-sans text-base font-semibold text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-20 lg:py-28 bg-forest relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 grain pointer-events-none opacity-30" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-4">Join the Club</p>
              <h2 className="font-serif text-3xl md:text-5xl text-cream mb-4">
                Founder Questionnaire
              </h2>
              <p className="font-sans text-lg text-cream/60">
                Enrollment for the founding cohort closes April 30, 2026.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Tier Selection */}
              <div>
                <Label className="font-sans text-xs font-semibold uppercase tracking-wider text-gold mb-4 block">
                  What tier would you like to join?
                </Label>
                <RadioGroup
                  value={formData.tier}
                  onValueChange={(val) => setFormData({ ...formData, tier: val })}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {[
                    { value: "founders", label: "Founders Club", price: "$1,000/yr" },
                    { value: "patron", label: "Patron Circle", price: "$5,000/yr" },
                    { value: "table", label: "Founding Table", price: "$10,000/yr" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 border-2 p-4 cursor-pointer transition-all ${
                        formData.tier === opt.value
                          ? "border-gold bg-gold/10"
                          : "border-cream/15 hover:border-cream/30"
                      }`}
                    >
                      <RadioGroupItem value={opt.value} className="border-cream text-gold" />
                      <div>
                        <p className="font-sans text-sm font-semibold text-cream">{opt.label}</p>
                        <p className="font-sans text-xs text-cream/50">{opt.price}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <Label className="font-sans text-xs font-semibold uppercase tracking-wider text-gold block">
                  Basic Information
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-sans text-xs text-cream/60 mb-1 block">First Name</Label>
                    <Input
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/30 focus:border-gold"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <Label className="font-sans text-xs text-cream/60 mb-1 block">Last Name</Label>
                    <Input
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/30 focus:border-gold"
                      placeholder="Last name"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-sans text-xs text-cream/60 mb-1 block">Email</Label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/30 focus:border-gold"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <Label className="font-sans text-xs text-cream/60 mb-1 block">Phone Number</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/30 focus:border-gold"
                    placeholder="(555) 555-5555"
                  />
                </div>
                <div>
                  <Label className="font-sans text-xs text-cream/60 mb-1 block">Address</Label>
                  <Textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/30 focus:border-gold min-h-[80px]"
                    placeholder="Street address, City, State, ZIP"
                  />
                </div>
              </div>

              {/* Celebration Date */}
              <div className="space-y-4">
                <Label className="font-sans text-xs font-semibold uppercase tracking-wider text-gold block">
                  When would you like us to celebrate you?
                </Label>
                <p className="font-sans text-xs text-cream/50 -mt-2">
                  Sobriety date, birthday, wedding anniversary. Please provide month and day only.
                </p>
                <Input
                  value={formData.celebrationDate}
                  onChange={(e) => setFormData({ ...formData, celebrationDate: e.target.value })}
                  className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/30 focus:border-gold"
                  placeholder="e.g. March 15"
                />
                <Input
                  value={formData.celebrationNote}
                  onChange={(e) => setFormData({ ...formData, celebrationNote: e.target.value })}
                  className="bg-cream/5 border-cream/20 text-cream placeholder:text-cream/30 focus:border-gold"
                  placeholder="What are we celebrating? (optional)"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-forest hover:bg-gold-light font-sans text-sm font-semibold uppercase tracking-wider py-6"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Founder Note */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-10 items-start">
            <div className="shrink-0">
              <img
                src={zaneFounder}
                alt="Zane Curtis, Founder of Monday Morning"
                className="w-32 h-32 md:w-40 md:h-40 object-cover border-2 border-foreground"
              />
            </div>
            <div>
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">A Note from the Founder</p>
              <div className="space-y-4 font-sans text-base text-muted-foreground leading-relaxed">
                <p>
                  When I stopped drinking, I realized something pretty quickly. People still want great drinks, great places, and great company. What they do not want is the pressure that alcohol often brings with it.
                </p>
                <p>
                  Monday Morning was built to create a new kind of space, one where great drinks, community, and culture exist without alcohol at the center of it.
                </p>
                <p>
                  The Founders Club is about supporting that vision and helping us push it even further. Your support helps us expand events, bring in new products, and continue building the best non-alcoholic experience in San Diego.
                </p>
                <p>Thank you for being part of this with us.</p>
                <p>Welcome to the club.</p>
              </div>
              <div className="mt-6">
                <p className="font-sans text-sm text-foreground font-semibold">Cheers,</p>
                <p className="font-serif text-2xl text-foreground italic mt-1">Zane Curtis</p>
                <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider">Founder, Monday Morning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-20 bg-gold text-forest">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Building the Future of Alcohol-Free Social Culture
          </h2>
          <p className="font-sans text-base text-forest/80 max-w-2xl mx-auto mb-8">
            With membership limited across all tiers, the Monday Morning Social Club represents the community helping define a new kind of nightlife in San Diego, one rooted in great drinks, inclusive experiences, and meaningful connection.
          </p>
          <Button
            onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-forest text-cream hover:bg-forest-deep font-sans text-sm font-semibold uppercase tracking-wider px-10 py-6"
          >
            Apply for Membership
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SocialClub;

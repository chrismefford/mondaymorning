import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, ChevronDown } from "lucide-react";
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
import foundersLogo from "@/assets/founders-club-logo.png";

const tiers = [
  {
    name: "Founder's Chair",
    price: "$1,000",
    priceNote: "per year",
    spots: "100",
    description: "The starting point for anyone who wants to be part of this from the beginning. You get the perks, the access, and the bragging rights of being a founding member.",
    benefits: [
      { category: "Events & Access", items: [
        { text: "Four exclusive founders events per year", subItems: [
          "Founder tasting nights with new products",
          "Private product launch events",
          "Founders Happy Hour with menu previews",
          "Annual Founders Celebration party",
        ]},
        "Bring one guest to founders events",
        "50% off event tickets for your guest",
      ]},
      { category: "Bar & Bottle Shop", items: [
        "20% off drinks at the bar",
        "Four Kava Haven slushies per month",
        "10% off bottles and cans",
      ]},
      { category: "Extras", items: [
        "Personalized Founders Card",
        "Access to Founders Only product releases",
        "Branded founders tote",
        "Recognition across our social channels",
      ]},
    ],
  },
  {
    name: "Founder's Circle",
    price: "$5,000",
    priceNote: "per year",
    spots: "20",
    featured: true,
    description: "Everything in the Founder's Chair, turned up. More slushies, more access, and you are helping us grow this thing in a real way.",
    benefits: [
      { category: "Events & Access", items: [
        { text: "Four exclusive founders events per year", subItems: [
          "Founder tasting nights with new products",
          "Private product launch events",
          "Founders Happy Hour with menu previews",
          "Annual Founders Celebration party",
        ]},
        "Two seats at all founders events",
        "Two free guest passes to founders events",
        "Private industry tastings with NA brand founders",
      ]},
      { category: "Bar & Bottle Shop", items: [
        "20% off drinks at the bar",
        "Guest drink discount included",
        "Six Kava Haven slushies per month",
        "10% off bottles and cans",
        "$10 cap on all shipping",
        "Early access to limited drops",
      ]},
      { category: "Extras", items: [
        "Personalized Founders Card",
        "Access to Founders Only product releases",
        "Annual curated premium NA beverage package",
        "Branded founders tote + limited merch",
        "Recognition as a Founder's Circle supporter",
      ]},
    ],
  },
  {
    name: "Founder's Table",
    price: "$10,000",
    priceNote: "per year",
    spots: "10",
    isTable: true,
    description: "This is the inner circle of the inner circle. Private dinners, unreleased products, and a level of access that is genuinely one of a kind.",
    benefits: [
      { category: "Events & Access", items: [
        { text: "Four exclusive founders events per year", subItems: [
          "Founder tasting nights with new products",
          "Private product launch events",
          "Founders Happy Hour with menu previews",
          "Annual Founders Celebration party",
        ]},
        "Two or more seats at all founders events",
        "Free guest passes to all founders events",
        "Private industry tastings with NA brand founders",
        "Private dinners with NA brand founders and industry leaders",
        "Small private tastings and product previews",
        "One annual private bar buyout for a personal event",
      ]},
      { category: "Bar & Bottle Shop", items: [
        "20% off drinks at the bar",
        "Guest drink discount included",
        "Ten complimentary slushies per month",
        "10% off bottles and cans",
        "$10 cap on all shipping",
        "Early access to limited drops",
        "Access to unreleased beverages",
      ]},
      { category: "Extras", items: [
        "Personalized Founders Card",
        "Access to Founders Only product releases",
        "Annual curated premium NA beverage package",
        "Branded founders tote + limited merch",
        "VIP seating and recognition at major events",
      ]},
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
  { feature: "Guest drink discount", founders: false, patron: true, table: true },
  { feature: "Complimentary slushies/month", founders: "4", patron: "6", table: "10" },
  { feature: "Bottle shop discount", founders: "10%", patron: "10%", table: "10%" },
  { feature: "Shipping cap", founders: false, patron: "$10", table: "$10" },
  { feature: "Early access to limited drops", founders: false, patron: true, table: true },
  { feature: "Founders Only releases", founders: true, patron: true, table: true },
  { feature: "Branded founders merchandise", founders: "Tote", patron: "Tote + Limited Merch", table: "Tote + Limited Merch" },
  { feature: "Guest passes to events", founders: "1 at 50% off", patron: "2 free", table: "2+ free" },
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
      const applicationId = crypto.randomUUID();

      const { error: insertError } = await supabase
        .from("social_club_applications")
        .insert({
          id: applicationId,
          tier: formData.tier,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          address: formData.address || null,
          celebration_date: formData.celebrationDate || null,
          celebration_note: formData.celebrationNote || null,
        });

      if (insertError) throw insertError;

      try {
        const { error: notificationError } = await supabase.functions.invoke("send-social-club-notification", {
          body: { applicationId },
        });

        if (notificationError) {
          console.error("Email notification failed:", notificationError);
        }
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
        { "@type": "Offer", name: "Founder's Chair", price: "1000", priceCurrency: "USD", availability: "https://schema.org/LimitedAvailability" },
        { "@type": "Offer", name: "Founder's Circle", price: "5000", priceCurrency: "USD", availability: "https://schema.org/LimitedAvailability" },
        { "@type": "Offer", name: "Founder's Table", price: "10000", priceCurrency: "USD", availability: "https://schema.org/LimitedAvailability" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Founders Club - America's Non Alcoholic Founders Club"
        description="Join the Monday Morning Founders Club, an exclusive collective for those shaping America's alcohol-free social culture. Three tiers, 130 founding spots."
        path="/social-club"
        schema={schema}
      />
      <Header />

      {/* Hero — keeps the dark forest feel */}
      <section className="relative min-h-[100vh] flex items-center justify-center bg-forest-deep overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(42_80%_45%_/_0.08)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 grain pointer-events-none opacity-20" />
        <div className="absolute top-20 right-10 w-64 lg:w-96 opacity-[0.03] pointer-events-none">
          <img src={stampGold} alt="" className="w-full animate-float" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-gold-rich to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center py-32">
          <img src={foundersLogo} alt="Monday Morning Founders Club Est. 2026" className="w-32 md:w-40 mx-auto mb-10 animate-fade-up opacity-80" />
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.5em] text-gold-rich/70 mb-8 animate-fade-up">
            By Invitation Only · 130 Founding Positions
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[6.5rem] text-cream mb-8 animate-fade-up delay-100 leading-[1.15] overflow-visible">
            Monday Morning<br />
            <span className="italic shimmer-gold inline-block pb-4">Founders Club</span>
          </h1>
          <div className="w-16 h-px bg-gold-rich/40 mx-auto mb-8 animate-fade-up delay-150" />
          <p className="font-sans text-base md:text-lg text-champagne/60 max-w-xl mx-auto mb-10 animate-fade-up delay-200 leading-relaxed tracking-wide">
            Great drinks, real community, unforgettable nights out, all without alcohol. This is what we are building and we want you in on it from the start.
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
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Intro Section — light */}
      <section className="py-24 lg:py-32 bg-background relative">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-14">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-primary/60 mb-6">The Movement</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-0">
              An Invitation to the Inner Circle
            </h2>
          </div>
          <div className="space-y-6 font-sans text-base text-muted-foreground leading-relaxed tracking-wide">
            <p>
              In a city known for its nightlife and craft beverage culture, Monday Morning is building something different: a place where great drinks, vibrant community, and memorable nights out exist without alcohol.
            </p>
            <p>
              The Monday Morning Social Club is a limited membership created for those who want to be part of shaping the next chapter of San Diego's social culture. More than a membership program, the Social Club is a gathering point for people who believe connection, creativity, and hospitality thrive without alcohol.
            </p>
            <p>
              With a focus on experiences, discovery, and community, members receive access to private events, new drink releases, and the inside track on the evolving alcohol-free movement.
            </p>
            <p>
              The Social Club launches with a limited founding cohort of 130 members across three tiers, each offering a different level of access and involvement in the growing alcohol-free movement.
            </p>
          </div>
        </div>
      </section>

      {/* Tier Cards — light background */}
      <section id="tiers" className="py-24 lg:py-32 bg-muted/50 relative scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-primary/60 mb-6">Three Tiers</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-5">
              Pick Your Spot
            </h2>
            <p className="font-sans text-sm text-muted-foreground max-w-xl mx-auto tracking-wide">
              130 founding positions across three tiers. Every tier includes a full year of benefits from May 1, 2026 through April 30, 2027.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4">
            {tiers.map((tier) => {
              const isTable = 'isTable' in tier && tier.isTable;
              return (
              <div
                key={tier.name}
                className={`relative p-[1px] flex flex-col transition-all duration-500 group/tier ${
                  tier.featured ? "lg:scale-[1.03] lg:-my-4" : ""
                } ${isTable ? "lg:scale-[1.01]" : ""}`}
              >
                {/* Gold ornamental frame */}
                <div className={`absolute inset-0 pointer-events-none ${
                  tier.featured || isTable ? "opacity-100" : "opacity-50 group-hover/tier:opacity-80"
                } transition-opacity duration-500`}>
                  <div className={`absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] ${isTable ? "border-gold-rich" : "border-primary"}`} />
                  <div className={`absolute top-0 right-0 w-12 h-12 border-t-[3px] border-r-[3px] ${isTable ? "border-gold-rich" : "border-primary"}`} />
                  <div className={`absolute bottom-0 left-0 w-12 h-12 border-b-[3px] border-l-[3px] ${isTable ? "border-gold-rich" : "border-primary"}`} />
                  <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] ${isTable ? "border-gold-rich" : "border-primary"}`} />
                  <div className={`absolute top-0 left-14 right-14 h-[1.5px] bg-gradient-to-r ${isTable ? "from-gold-rich via-gold-rich/30 to-gold-rich" : "from-primary via-primary/30 to-primary"}`} />
                  <div className={`absolute bottom-0 left-14 right-14 h-[1.5px] bg-gradient-to-r ${isTable ? "from-gold-rich via-gold-rich/30 to-gold-rich" : "from-primary via-primary/30 to-primary"}`} />
                  <div className={`absolute left-0 top-14 bottom-14 w-[1.5px] bg-gradient-to-b ${isTable ? "from-gold-rich via-gold-rich/30 to-gold-rich" : "from-primary via-primary/30 to-primary"}`} />
                  <div className={`absolute right-0 top-14 bottom-14 w-[1.5px] bg-gradient-to-b ${isTable ? "from-gold-rich via-gold-rich/30 to-gold-rich" : "from-primary via-primary/30 to-primary"}`} />
                  <div className={`absolute top-[9px] left-[9px] w-2 h-2 rotate-45 ${isTable ? "bg-gold-rich" : "bg-primary"}`} />
                  <div className={`absolute top-[9px] right-[9px] w-2 h-2 rotate-45 ${isTable ? "bg-gold-rich" : "bg-primary"}`} />
                  <div className={`absolute bottom-[9px] left-[9px] w-2 h-2 rotate-45 ${isTable ? "bg-gold-rich" : "bg-primary"}`} />
                  <div className={`absolute bottom-[9px] right-[9px] w-2 h-2 rotate-45 ${isTable ? "bg-gold-rich" : "bg-primary"}`} />
                  <div className={`absolute top-[-3px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${isTable ? "bg-gold-rich" : "bg-primary"}`} />
                  <div className={`absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 ${isTable ? "bg-gold-rich" : "bg-primary"}`} />
                  <div className={`absolute left-[-3px] top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 ${isTable ? "bg-gold-rich" : "bg-primary"}`} />
                  <div className={`absolute right-[-3px] top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 ${isTable ? "bg-gold-rich" : "bg-primary"}`} />
                </div>
                <div className={`relative p-8 lg:p-10 flex flex-col flex-1 ${
                  isTable
                    ? "bg-forest-deep shadow-[0_0_80px_-20px_hsl(42_80%_45%_/_0.2)]"
                    : tier.featured
                      ? "bg-card shadow-[0_0_60px_-20px_hsl(var(--primary)_/_0.12)]"
                      : "bg-card"
                }`}>
                  {/* Subtle gold radial glow for Table */}
                  {isTable && (
                    <>
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(42_80%_45%_/_0.08)_0%,_transparent_60%)] pointer-events-none" />
                      <div className="absolute inset-0 grain pointer-events-none opacity-15" />
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 shimmer-gold-bg text-forest-deep px-5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.3em]">
                        Limited to 10
                      </div>
                    </>
                  )}
                  {tier.featured && !isTable && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 shimmer-gold-bg text-forest-deep px-5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.3em]">
                      Most Popular
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-5 relative">
                    <img src={foundersLogo} alt="" className={`h-7 w-7 object-contain ${isTable ? "opacity-90" : "opacity-80"}`} />
                    <h3 className={`font-serif text-xl ${isTable ? "text-cream" : "text-foreground"}`}>{tier.name}</h3>
                  </div>
                  <div className="mb-5 relative">
                    <span className={`font-serif text-4xl ${isTable ? "shimmer-gold" : "text-primary"}`}>{tier.price}</span>
                    <span className={`font-sans text-xs ml-2 uppercase tracking-wider ${isTable ? "text-champagne/40" : "text-muted-foreground"}`}>/{tier.priceNote}</span>
                  </div>
                  {!isTable && (
                    <p className="font-sans text-xs text-muted-foreground mb-2 tracking-wide relative">
                      Limited to <span className="text-primary font-semibold">{tier.spots}</span> positions
                    </p>
                  )}
                  <p className={`font-sans text-sm mb-8 leading-relaxed relative ${isTable ? "text-champagne/60" : "text-muted-foreground"}`}>
                    {tier.description}
                  </p>
                  <div className="space-y-6 flex-1 relative">
                    {tier.benefits.map((group) => (
                      <div key={group.category}>
                        <p className={`font-sans text-[10px] font-semibold uppercase tracking-[0.2em] mb-3 ${isTable ? "text-gold-rich/80" : "text-primary/70"}`}>
                          {group.category}
                        </p>
                        <ul className="space-y-2.5">
                          {group.items.map((item, idx) => {
                            const isNested = typeof item === 'object' && item !== null && 'text' in item;
                            const text = isNested ? item.text : item;
                            const subItems = isNested ? item.subItems : undefined;
                            return (
                              <li key={typeof text === 'string' ? text : idx}>
                                <div className="flex items-start gap-2.5">
                                  <Check className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${isTable ? "text-gold-rich/70" : "text-primary/60"}`} />
                                  <span className={`font-sans text-sm ${isTable ? "text-champagne/70" : "text-foreground/70"}`}>{text as string}</span>
                                </div>
                                {subItems && (
                                  <ul className="ml-6 mt-1.5 space-y-1.5">
                                    {subItems.map((sub: string) => (
                                      <li key={sub} className="flex items-start gap-2">
                                        <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${isTable ? "bg-gold-rich/40" : "bg-primary/30"}`} />
                                        <span className={`font-sans text-xs ${isTable ? "text-champagne/50" : "text-foreground/50"}`}>{sub}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}
                    className={`mt-10 w-full font-sans text-[10px] font-semibold uppercase tracking-[0.25em] py-6 transition-all relative ${
                      isTable
                        ? "shimmer-gold-bg text-forest-deep hover:opacity-90"
                        : tier.featured
                          ? "shimmer-gold-bg text-forest-deep hover:opacity-90"
                          : "bg-transparent text-foreground/60 hover:text-foreground border border-border hover:border-primary/40"
                    }`}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* Comparison Grid — light */}
      <section className="py-24 lg:py-32 bg-background relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-primary/60 mb-6">At a Glance</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
              Compare Benefits
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="text-left py-5 pr-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground w-2/5">
                    Benefit
                  </th>
                  <th className="py-5 px-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-primary text-center">
                    Founders<br />$1,000/yr
                  </th>
                  <th className="py-5 px-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-primary text-center">
                    Circle<br />$5,000/yr
                  </th>
                  <th className="py-5 px-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-primary text-center">
                    Table<br />$10,000/yr
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr key={row.feature} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-muted/30" : ""} hover:bg-primary/10 transition-colors duration-200 cursor-default`}>
                    <td className="py-3.5 pr-4 font-sans text-sm text-foreground/70">{row.feature}</td>
                    {[row.founders, row.patron, row.table].map((val, j) => (
                      <td key={j} className="py-3.5 px-4 text-center">
                        {val === true ? (
                          <Check className="h-3.5 w-3.5 mx-auto text-primary" />
                        ) : val === false ? (
                          <span className="text-muted-foreground/30">—</span>
                        ) : (
                          <span className="font-sans text-sm font-semibold text-foreground/80">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-14">
            <Button
              onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}
              className="shimmer-gold-bg text-forest-deep font-sans text-[10px] font-semibold uppercase tracking-[0.25em] px-12 py-6 hover:opacity-90 transition-opacity"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ — light with subtle muted bg */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-14">
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-primary/60 mb-6">FAQ</p>
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
              Good Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {[
              { q: "How long does my membership last?", a: "Your Founders Club membership is valid from May 1, 2026 to April 30, 2027. One full year of access, events, and perks." },
              { q: "Can I share my benefits with someone else?", a: "Benefits are tied to you as the registered founder. That said, every tier includes guest access so you can bring people along to events and share the experience." },
              { q: "How do complimentary slushies work?", a: "Depending on your tier, you get four, six, or ten complimentary slushies per month. They reset at the beginning of each month and do not roll over, so make sure you use them." },
              { q: "Can I stack my discount with other promos?", a: "Founders Club discounts cannot be combined with other promotions. If multiple discounts apply, we will always give you the bigger one." },
              { q: "Does the bottle shop discount work online?", a: "Yes. Your 10% off applies to both in-store and online purchases." },
              { q: "Do I need to RSVP for events?", a: "Yes, most events require an RSVP in advance. We will always give founders priority, but spots can fill up so do not wait too long." },
              { q: "Is early access guaranteed for limited products?", a: "Early access means you get first look before the public, but quantities on limited drops are limited. If something is really special, move fast." },
              { q: "Will benefits ever change during my membership?", a: "No. Whatever is included in your tier when you join is locked in for the full year. We will not change the deal on you." },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border px-6 data-[state=open]:border-primary/30 transition-colors">
                <AccordionTrigger className="font-sans text-sm font-semibold text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="text-center mt-14">
            <Button
              onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}
              className="shimmer-gold-bg text-forest-deep font-sans text-[10px] font-semibold uppercase tracking-[0.25em] px-12 py-6 hover:opacity-90 transition-opacity"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* Application Form — forest green section for contrast */}
      <section id="apply" className="py-24 lg:py-32 bg-forest-deep relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_hsl(42_80%_45%_/_0.05)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 grain pointer-events-none opacity-15" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-14">
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-gold-rich/60 mb-6">Join the Club</p>
              <h2 className="font-serif text-3xl md:text-5xl text-cream mb-5">
                Let's Get You In
              </h2>
              <p className="font-sans text-sm text-champagne/50 tracking-wide">
                Fill this out and we will be in touch. The founding cohort closes April 30, 2026.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <Label className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-rich/70 mb-4 block">
                  What tier are you interested in?
                </Label>
                <RadioGroup
                  value={formData.tier}
                  onValueChange={(val) => setFormData({ ...formData, tier: val })}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {[
                    { value: "founders", label: "Founder's Chair", price: "$1,000/yr" },
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

              <div className="space-y-4">
                <Label className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-rich/70 block">
                  About You
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

              <div className="space-y-4">
                <Label className="font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-rich/70 block">
                  When should we celebrate you?
                </Label>
                <p className="font-sans text-[10px] text-champagne/30 -mt-2 tracking-wide">
                  Sobriety date, birthday, anniversary, anything. Just the month and day.
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

      {/* Founder Note — light */}
      <section className="py-24 lg:py-32 bg-background relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-12 items-start">
            <div className="shrink-0">
              <div className="relative">
                <img
                  src={zaneFounder}
                  alt="Zane Curtis, Founder of Monday Morning"
                  className="w-32 h-32 md:w-40 md:h-40 object-cover grayscale"
                />
                <div className="absolute inset-0 border border-primary/20" />
              </div>
            </div>
            <div>
              <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-primary/60 mb-6">A Note from the Founder</p>
              <div className="space-y-5 font-sans text-sm text-muted-foreground leading-relaxed tracking-wide">
                <p>
                  When I stopped drinking, I noticed something right away. People still want great drinks, great places, and great company. What they do not want is the baggage that comes with alcohol.
                </p>
                <p>
                  Monday Morning was built to give people exactly that: a place where you can go out, have an incredible time, and feel great the next day. No compromise on the drinks, the atmosphere, or the experience.
                </p>
                <p>
                  The Founders Club is not just a membership. It is your way of saying "I believe in this" and helping us take it further. More events, more products, more of the experience that San Diego has been missing.
                </p>
                <p>Thank you for being part of this with us.</p>
                <p>Welcome to the club.</p>
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Cheers,</p>
                <p className="font-serif text-2xl text-foreground italic mt-2">Zane Curtis</p>
                <p className="font-sans text-[10px] text-muted-foreground/60 uppercase tracking-[0.3em] mt-1">Founder, Monday Morning</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA — forest green accent */}
      <section className="py-20 lg:py-24 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(42_80%_45%_/_0.06)_0%,_transparent_70%)]" />
        <div className="absolute inset-0 grain pointer-events-none opacity-15" />
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary-foreground mb-5">
            130 Spots. One Founding Class.
          </h2>
          <p className="font-sans text-sm text-secondary-foreground/60 max-w-xl mx-auto mb-10 tracking-wide leading-relaxed">
            Once the founding cohort fills up, that is it. There is no waitlist, no second round. If you want to be part of the group that helped build this from the ground up, now is the time.
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

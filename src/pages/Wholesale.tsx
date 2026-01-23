import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Sparkles, 
  Wine, 
  GraduationCap, 
  Truck, 
  CheckCircle2, 
  XCircle,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Linkedin,
  Facebook,
  ArrowRight,
  MessageCircle,
  Send,
  X,
  Trash2,
  ExternalLink
} from "lucide-react";
import stampGold from "@/assets/stamp-gold.svg";
import textureBlue from "@/assets/texture-blue.svg";
import textureCream from "@/assets/texture-cream.svg";
import logoSecondaryGold from "@/assets/logo-secondary-gold.svg";
import { cn } from "@/lib/utils";

// Partner locations data
const partners = [
  { name: "BoujieMana", badge: "Yelp's #8 Best New Restaurant in USA", type: "restaurant" },
  { name: "Miss B's Coconut Club", type: "bar" },
  { name: "Bare Back Grill", type: "restaurant" },
  { name: "Raglan Public House", type: "bar" },
  { name: "Queenstown Village", type: "restaurant" },
  { name: "Paradisaea", type: "restaurant" },
  { name: "Queenstown Public House", type: "bar" },
  { name: "Moniker General Outpost", type: "restaurant" },
  { name: "Boney's Bayside Market", type: "market" },
];

// Stats data
const stats = [
  { value: "30%", label: "NA beverage sales growth YoY", icon: TrendingUp },
  { value: "$12–$15", label: "What guests pay for functional NA cocktails", icon: DollarSign },
  { value: "< $2", label: "Cost to make one", icon: Sparkles },
];

// Services offered
const services = [
  { icon: Wine, text: "Curated flavor-forward & functional cocktails" },
  { icon: Wine, text: "Crisp NA beers that pair beautifully with food" },
  { icon: Sparkles, text: "Drop-in menus & rotating seasonal recipes" },
  { icon: GraduationCap, text: "Staff training & tasting notes" },
  { icon: Truck, text: "Fast delivery, no alcohol license needed" },
];

// Comparison table data
const comparisonFeatures = [
  { feature: "Syrupy & sweet", traditional: true, mondayMorning: false },
  { feature: "Craft cocktail experience", traditional: false, mondayMorning: true },
  { feature: "Functional benefits", traditional: false, mondayMorning: true },
  { feature: "On-trend, Gen Z appeal", traditional: false, mondayMorning: true },
  { feature: "Profit margins", traditional: "😐", mondayMorning: "🚀" },
];

// Wholesale Chat Hook
type Message = { role: "user" | "assistant"; content: string };

const useWholesaleChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/wholesale-chat`;

  const sendMessage = useCallback(async (input: string) => {
    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    let assistantSoFar = "";
    
    const upsertAssistant = (nextChunk: string) => {
      assistantSoFar += nextChunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to get response");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsertAssistant(content);
          } catch { /* ignore */ }
        }
      }
    } catch (e) {
      console.error("Chat error:", e);
      setError(e instanceof Error ? e.message : "Something went wrong");
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearChat };
};

// Wholesale Chat Component
const WholesaleChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { messages, isLoading, error, sendMessage, clearChat } = useWholesaleChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue.trim());
    setInputValue("");
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-gold text-forest-deep font-semibold rounded-full shadow-xl hover:bg-gold/90 transition-all duration-300",
          isOpen && "hidden"
        )}
      >
        <MessageCircle className="w-5 h-5" />
        <span>Wholesale Help</span>
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-cream border-2 border-forest/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-forest text-cream p-4 flex items-center justify-between shrink-0">
            <div>
              <h3 className="font-serif text-lg">Wholesale Expert</h3>
              <p className="text-xs text-cream/70">Questions about partnering with us?</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="p-2 hover:bg-cream/10 rounded-lg transition-colors"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-cream/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream/50">
            {messages.length === 0 && (
              <div className="text-center py-8 text-forest/60">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-sans text-sm">Ask me anything about wholesale partnerships, pricing, or getting started!</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] p-3 rounded-2xl",
                  msg.role === "user"
                    ? "ml-auto bg-forest text-cream rounded-br-md"
                    : "mr-auto bg-white text-forest border border-forest/10 rounded-bl-md"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="mr-auto bg-white text-forest border border-forest/10 rounded-2xl rounded-bl-md p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-forest/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-forest/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-forest/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            {error && (
              <div className="mr-auto bg-red-50 text-red-600 border border-red-200 rounded-2xl p-3">
                <p className="text-sm">{error}</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-forest/10 shrink-0">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about wholesale..."
                disabled={isLoading}
                className="flex-1 border-forest/20 focus:border-gold"
              />
              <Button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-gold hover:bg-gold/90 text-forest-deep shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

const Wholesale = () => {
  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-forest text-cream py-24 lg:py-32 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: `url(${textureBlue})`, backgroundSize: 'cover' }}
          />
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <img 
                src={logoSecondaryGold} 
                alt="Monday Morning" 
                className="h-20 mx-auto mb-8"
              />
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl italic mb-6">
                Functional AF Cocktails<br />
                <span className="text-gold">That Actually Sell</span>
              </h1>
              <p className="font-sans text-lg md:text-xl text-cream/80 mb-10 max-w-2xl mx-auto">
                Modern guests want more than soda. Give them a reason to stay, sip, and come back.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="https://maps.google.com/?q=1854+Garnet+Ave,+San+Diego,+CA+92109"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-gold hover:bg-gold/90 text-forest-deep font-semibold px-8">
                    Visit Our Tasting Room
                    <MapPin className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="mailto:sales@mondaymorning-af.com">
                  <Button size="lg" variant="outline" className="border-cream/40 text-cream hover:bg-cream/10">
                    Contact Sales
                    <Mail className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-20 bg-cream relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl italic text-forest mb-4">
                Your current NA menu is<br />
                <span className="text-gold">costing you thousands.</span>
              </h2>
              <p className="font-sans text-forest/70 max-w-2xl mx-auto">
                Most venues only offer NA options as an afterthought—soda, juice, or watered-down versions of boozy drinks. But the data tells a different story.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white p-8 rounded-2xl border border-forest/10 text-center hover:shadow-lg transition-shadow"
                >
                  <stat.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                  <div className="font-serif text-3xl md:text-4xl text-forest mb-2">{stat.value}</div>
                  <p className="font-sans text-sm text-forest/60">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Revenue Callout */}
            <div className="max-w-2xl mx-auto bg-forest text-cream rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-4 right-4 w-24 h-24 opacity-10">
                <img src={stampGold} alt="" className="w-full h-full" />
              </div>
              <p className="font-sans text-xs uppercase tracking-wider text-gold mb-4">Revenue Opportunity</p>
              <div className="font-serif text-4xl md:text-5xl italic mb-4">$15K–$25K</div>
              <p className="font-sans text-cream/70">Additional revenue per month for venues with real NA programs</p>
            </div>
          </div>
        </section>

        {/* Customer Insights */}
        <section className="py-20 bg-forest text-cream relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <blockquote className="font-serif text-2xl md:text-3xl italic text-center mb-12 text-gold">
                "They're not avoiding drinking. They're avoiding alcohol."
              </blockquote>
              
              <p className="font-sans text-center text-cream/80 mb-12 max-w-2xl mx-auto">
                Gen Z and Millennials still want the ritual, the experience, and the vibe of going out—but without the hangover. They're craving:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Functional Ingredients", desc: "Adaptogens, nootropics, kava, CBD that enhance mood and wellbeing" },
                  { title: "Bold Flavors", desc: "Smoky, bitter, herbaceous, refreshing—complex taste profiles" },
                  { title: "Social Experience", desc: "Not just another soda—a premium social ritual" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <Sparkles className="w-8 h-8 text-gold mx-auto mb-4" />
                    <h3 className="font-serif text-xl italic mb-2">{item.title}</h3>
                    <p className="font-sans text-sm text-cream/70">{item.desc}</p>
                  </div>
                ))}
              </div>

              <p className="font-sans text-center text-gold mt-12 text-lg">
                This is a premium experience—meant to be featured, not hidden.
              </p>
            </div>
          </div>
        </section>

        {/* Partner Network */}
        <section className="py-20 bg-cream relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl italic text-forest text-center mb-4">
              Where You Can <span className="text-gold">Find Us</span>
            </h2>
            <p className="font-sans text-forest/60 text-center mb-12 max-w-xl mx-auto">
              Join these San Diego favorites who are already serving Monday Morning
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
              {partners.map((partner, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-xl border border-forest/10 text-center hover:shadow-md transition-shadow"
                >
                  <p className="font-serif text-forest">{partner.name}</p>
                  {partner.badge && (
                    <span className="inline-block mt-2 text-xs bg-gold/20 text-gold px-2 py-1 rounded-full">
                      {partner.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link to="/locations">
                <Button variant="outline" className="border-forest text-forest hover:bg-forest hover:text-cream">
                  View All Locations
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-forest-light relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl italic text-forest mb-4">
                We make launching a high-performing<br />
                <span className="text-gold">NA program easy.</span>
              </h2>
              <p className="font-sans text-forest/70">You get access to:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 bg-cream p-6 rounded-xl"
                >
                  <service.icon className="w-6 h-6 text-gold shrink-0 mt-1" />
                  <p className="font-sans text-forest">{service.text}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="font-serif text-2xl italic text-forest">
                Zero effort. <span className="text-gold">Maximum upside.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-20 bg-cream relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl italic text-forest mb-4">
                We don't sell sugary mocktails<br />
                <span className="text-gold">or "virgin" versions.</span>
              </h2>
              <p className="font-sans text-forest/70">
                We offer elevated, premium zero-proof beverages with purpose.
              </p>
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-forest/10 overflow-hidden">
              <div className="grid grid-cols-3 bg-forest text-cream">
                <div className="p-4 font-sans text-sm uppercase tracking-wider">Feature</div>
                <div className="p-4 font-sans text-sm uppercase tracking-wider text-center">Traditional NA</div>
                <div className="p-4 font-sans text-sm uppercase tracking-wider text-center text-gold">Monday Morning</div>
              </div>
              {comparisonFeatures.map((row, index) => (
                <div 
                  key={index}
                  className={cn(
                    "grid grid-cols-3 border-t border-forest/10",
                    index % 2 === 0 ? "bg-white" : "bg-cream/50"
                  )}
                >
                  <div className="p-4 font-sans text-forest">{row.feature}</div>
                  <div className="p-4 flex justify-center items-center">
                    {typeof row.traditional === "boolean" ? (
                      row.traditional ? (
                        <CheckCircle2 className="w-5 h-5 text-forest/40" />
                      ) : (
                        <XCircle className="w-5 h-5 text-forest/20" />
                      )
                    ) : (
                      <span className="text-xl">{row.traditional}</span>
                    )}
                  </div>
                  <div className="p-4 flex justify-center items-center">
                    {typeof row.mondayMorning === "boolean" ? (
                      row.mondayMorning ? (
                        <CheckCircle2 className="w-5 h-5 text-gold" />
                      ) : (
                        <XCircle className="w-5 h-5 text-forest/20" />
                      )
                    ) : (
                      <span className="text-xl">{row.mondayMorning}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-forest text-cream relative overflow-hidden">
          <div className="absolute -bottom-32 -right-32 w-80 opacity-[0.05] pointer-events-none">
            <img src={stampGold} alt="" className="w-full h-full" />
          </div>
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl italic mb-6">
                Ready to transform your <span className="text-gold">NA program?</span>
              </h2>
              <p className="font-sans text-cream/70 mb-10 max-w-xl mx-auto">
                Visit our bottle shop for a complete tasting experience and build the perfect starter menu for your venue.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
                <div className="bg-cream/10 rounded-2xl p-6 text-center">
                  <MapPin className="w-8 h-8 text-gold mx-auto mb-4" />
                  <h3 className="font-serif text-xl italic mb-2">Visit Our Tasting Room</h3>
                  <p className="font-sans text-sm text-cream/70 mb-4">Experience the full range before you stock</p>
                  <a 
                    href="https://maps.google.com/?q=1854+Garnet+Ave,+San+Diego,+CA+92109"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gold hover:underline"
                  >
                    1854 Garnet Ave, San Diego
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
                <div className="bg-cream/10 rounded-2xl p-6 text-center">
                  <Mail className="w-8 h-8 text-gold mx-auto mb-4" />
                  <h3 className="font-serif text-xl italic mb-2">Get In Touch</h3>
                  <a href="mailto:sales@mondaymorning-af.com" className="block font-sans text-cream hover:text-gold transition-colors mb-2">
                    sales@mondaymorning-af.com
                  </a>
                  <a href="tel:8584123253" className="block font-sans text-cream hover:text-gold transition-colors">
                    (858) 412-3253
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-4">
                <a 
                  href="https://www.instagram.com/mondaymorning.af/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-cream/30 flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold transition-colors rounded-full"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/monday-morning-af/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-cream/30 flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold transition-colors rounded-full"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.facebook.com/mondaymorningaf/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-cream/30 flex items-center justify-center text-cream/70 hover:text-gold hover:border-gold transition-colors rounded-full"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WholesaleChat />
    </div>
  );
};

export default Wholesale;

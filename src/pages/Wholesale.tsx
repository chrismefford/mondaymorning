import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ContactFormDialog from "@/components/ContactFormDialog";
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
  ExternalLink,
  AlertTriangle,
  Zap,
  Target,
  TrendingDown,
  Award,
  Clock,
  Star
} from "lucide-react";
import stampGold from "@/assets/stamp-gold.svg";
import textureBlue from "@/assets/texture-blue.svg";
import textureCream from "@/assets/texture-cream.svg";
import logoSecondaryGold from "@/assets/logo-secondary-gold.svg";
import { cn } from "@/lib/utils";

// Partner locations data with context
const partners = [
  { name: "BoujieMana", accolade: "Yelp's #8 Best New Restaurant in USA", type: "restaurant" },
  { name: "Miss B's Coconut Club", type: "bar" },
  { name: "Bare Back Grill", type: "restaurant" },
  { name: "Raglan Public House", type: "bar" },
  { name: "Queenstown Village", type: "restaurant" },
  { name: "Paradisaea", type: "restaurant" },
  { name: "Queenstown Public House", type: "bar" },
  { name: "Moniker General Outpost", type: "restaurant" },
  { name: "Boney's Bayside Market", type: "market" },
];

// What they get
const programIncludes = [
  { 
    icon: Wine, 
    title: "Curated Menu", 
    desc: "Flavor-forward cocktails and functional elixirs designed to sell" 
  },
  { 
    icon: GraduationCap, 
    title: "Staff Training", 
    desc: "Your team learns to recommend with confidence" 
  },
  { 
    icon: Sparkles, 
    title: "Seasonal Rotations", 
    desc: "Fresh recipes that keep guests coming back" 
  },
  { 
    icon: Truck, 
    title: "Fast Delivery", 
    desc: "No alcohol license headaches, just great drinks" 
  },
];

// Comparison table data
const comparisonFeatures = [
  { feature: "Syrupy & sweet", traditional: true, mondayMorning: false },
  { feature: "Craft cocktail experience", traditional: false, mondayMorning: true },
  { feature: "Functional benefits (adaptogens, nootropics)", traditional: false, mondayMorning: true },
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
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-gold text-forest-deep font-semibold rounded-full shadow-xl hover:bg-gold/90 transition-all duration-300",
          isOpen && "hidden"
        )}
      >
        <MessageCircle className="w-5 h-5" />
        <span>Wholesale Questions Answered Here</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-cream border-2 border-forest/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-forest text-cream p-4 flex items-center justify-between shrink-0">
            <div>
              <h3 className="font-serif text-lg">Talk to Our Team</h3>
              <p className="text-xs text-cream/70">Get answers about wholesale partnerships</p>
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

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-cream/50">
            {messages.length === 0 && (
              <div className="text-center py-8 text-forest/60">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-40" />
                <p className="font-sans text-sm mb-4">Ask me anything about partnering with Monday Morning</p>
                <div className="space-y-2">
                  {["What's the minimum order?", "How does pricing work?", "Do you do staff training?"].map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="block w-full text-left text-sm bg-white p-3 rounded-lg border border-forest/10 hover:border-gold transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
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
        {/* SECTION 1: The Hook - Create Urgency */}
        <section className="relative bg-forest text-cream py-20 lg:py-28 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: `url(${textureBlue})`, backgroundSize: 'cover' }}
          />
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Warning badge */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-2 rounded-full text-sm font-sans">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Your NA menu is losing you money</span>
                </div>
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-center mb-6 leading-tight">
                Every week you wait,<br />
                <span className="text-gold italic">you're leaving $3K+ on the table.</span>
              </h1>
              
              <p className="font-sans text-lg md:text-xl text-cream/80 text-center max-w-2xl mx-auto mb-10">
                Your competitors are already serving premium NA cocktails. Your guests are noticing. Let's fix that.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ContactFormDialog 
                  trigger={
                    <Button size="lg" className="bg-gold hover:bg-gold/90 text-forest-deep font-semibold px-8">
                      Let's Talk
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  }
                />
                <a 
                  href="https://maps.google.com/?q=1854+Garnet+Ave,+San+Diego,+CA+92109"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-forest">
                    Come Taste First
                    <MapPin className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: The Problem - Make It Real */}
        <section className="py-20 bg-cream relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest text-center mb-6">
                Here's what's happening<br />
                <span className="italic text-gold">while you're not watching:</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {/* Problem Card 1 */}
                <div className="bg-white p-6 rounded-2xl border border-forest/10 text-center">
                  <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingDown className="w-6 h-6 text-coral" />
                  </div>
                  <h3 className="font-serif text-xl text-forest mb-2">Tables Turning Faster</h3>
                  <p className="font-sans text-sm text-forest/70">
                    Non-drinkers leave early when there's nothing good to order. That's lost covers.
                  </p>
                </div>
                
                {/* Problem Card 2 */}
                <div className="bg-white p-6 rounded-2xl border border-forest/10 text-center">
                  <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-coral" />
                  </div>
                  <h3 className="font-serif text-xl text-forest mb-2">Groups Going Elsewhere</h3>
                  <p className="font-sans text-sm text-forest/70">
                    One sober person in the group picks the spot. If you can't serve them, you lose the whole party.
                  </p>
                </div>
                
                {/* Problem Card 3 */}
                <div className="bg-white p-6 rounded-2xl border border-forest/10 text-center">
                  <div className="w-12 h-12 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-6 h-6 text-coral" />
                  </div>
                  <h3 className="font-serif text-xl text-forest mb-2">"Just Water, Thanks"</h3>
                  <p className="font-sans text-sm text-forest/70">
                    Every time someone orders water instead of a $14 drink, that's pure margin walking out the door.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: The Shift - Customer Quote */}
        <section className="py-16 bg-forest text-cream relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl italic leading-relaxed">
                "They're not avoiding <span className="text-gold">drinking.</span><br />
                They're avoiding <span className="text-gold">alcohol.</span>"
              </blockquote>
              <p className="mt-8 font-sans text-cream/70 max-w-xl mx-auto">
                Gen Z and Millennials still want the ritual, the experience, and the vibe of going out—just without the hangover. They're spending more than ever. Are you capturing it?
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: The Opportunity - Show the Math */}
        <section className="py-20 bg-cream relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest text-center mb-4">
                Let's do the math.
              </h2>
              <p className="font-sans text-forest/70 text-center mb-12 max-w-xl mx-auto">
                This isn't wishful thinking. These are real numbers from real venues.
              </p>
              
              {/* The Math Grid */}
              <div className="bg-forest rounded-3xl p-8 md:p-12 text-cream relative overflow-hidden">
                <div className="absolute top-4 right-4 w-32 h-32 opacity-5">
                  <img src={stampGold} alt="" className="w-full h-full" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                  <div className="text-center">
                    <div className="font-serif text-3xl md:text-4xl text-gold mb-2">$14</div>
                    <p className="font-sans text-xs text-cream/70">Average NA cocktail price</p>
                  </div>
                  <div className="text-center">
                    <div className="font-serif text-3xl md:text-4xl text-gold mb-2">$2</div>
                    <p className="font-sans text-xs text-cream/70">Your cost to make it</p>
                  </div>
                  <div className="text-center">
                    <div className="font-serif text-3xl md:text-4xl text-gold mb-2">85%</div>
                    <p className="font-sans text-xs text-cream/70">Gross margin per drink</p>
                  </div>
                  <div className="text-center">
                    <div className="font-serif text-3xl md:text-4xl text-gold mb-2">$0</div>
                    <p className="font-sans text-xs text-cream/70">Alcohol tax</p>
                  </div>
                </div>
                
                <div className="border-t border-cream/20 pt-8 text-center">
                  <p className="font-sans text-xs uppercase tracking-wider text-gold mb-3">Monthly revenue opportunity</p>
                  <div className="font-serif text-5xl md:text-6xl lg:text-7xl">$15K–$25K</div>
                  <p className="font-sans text-cream/60 mt-3">for venues with a real NA program</p>
                </div>
              </div>
              
              {/* Growth callout */}
              <div className="mt-8 flex items-center justify-center gap-4 p-4 bg-gold/10 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-gold" />
                <p className="font-sans text-forest">
                  <span className="font-semibold">30% year-over-year growth</span> in NA beverage sales. This isn't a trend—it's a shift.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Social Proof - Who's Already Doing This */}
        <section className="py-20 bg-forest-light relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <p className="font-sans text-xs uppercase tracking-wider text-gold mb-3">You'll be in good company</p>
                <h2 className="font-serif text-3xl md:text-4xl text-forest">
                  San Diego's best spots<br />
                  <span className="italic text-gold">already figured this out.</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {partners.map((partner, index) => (
                  <div 
                    key={index}
                    className="bg-cream p-5 rounded-xl text-center hover:shadow-lg transition-shadow border border-forest/5"
                  >
                    <p className="font-serif text-lg text-forest">{partner.name}</p>
                    {partner.accolade && (
                      <div className="mt-2 inline-flex items-center gap-1 text-xs bg-gold/20 text-gold px-2 py-1 rounded-full">
                        <Award className="w-3 h-3" />
                        <span>{partner.accolade}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Link to="/locations">
                  <Button variant="outline" className="border-forest text-forest hover:bg-forest hover:text-cream">
                    See All Partner Locations
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: The Solution - What You Get */}
        <section className="py-20 bg-cream relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
                  We make this <span className="italic text-gold">embarrassingly easy.</span>
                </h2>
                <p className="font-sans text-forest/70 max-w-xl mx-auto">
                  You don't need to become an NA expert. That's our job. Here's what you get:
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {programIncludes.map((item, index) => (
                  <div 
                    key={index}
                    className="flex gap-4 bg-white p-6 rounded-2xl border border-forest/10"
                  >
                    <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-forest mb-1">{item.title}</h3>
                      <p className="font-sans text-sm text-forest/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center p-8 bg-forest rounded-2xl text-cream">
                <Zap className="w-10 h-10 text-gold mx-auto mb-4" />
                <p className="font-serif text-2xl md:text-3xl italic">
                  Zero effort. Maximum upside.
                </p>
                <p className="font-sans text-cream/70 mt-2">No alcohol license needed. No complicated setup.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Differentiation - We're Not Mocktails */}
        <section className="py-20 bg-forest text-cream relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-4xl mb-4">
                  We don't sell <span className="line-through opacity-50">mocktails.</span>
                </h2>
                <p className="font-sans text-cream/70 max-w-xl mx-auto">
                  "Mocktail" implies fake. There's nothing fake about what we do. These are premium, functional, craft-quality alcohol-free cocktails.
                </p>
              </div>
              
              {/* Comparison Table */}
              <div className="bg-cream/10 backdrop-blur rounded-2xl overflow-hidden">
                <div className="grid grid-cols-3 bg-cream/10">
                  <div className="p-4 font-sans text-sm uppercase tracking-wider"></div>
                  <div className="p-4 font-sans text-sm uppercase tracking-wider text-center text-cream/60">Traditional NA</div>
                  <div className="p-4 font-sans text-sm uppercase tracking-wider text-center text-gold">Monday Morning</div>
                </div>
                {comparisonFeatures.map((row, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "grid grid-cols-3 border-t border-cream/10",
                    )}
                  >
                    <div className="p-4 font-sans text-cream/90">{row.feature}</div>
                    <div className="p-4 flex justify-center items-center">
                      {typeof row.traditional === "boolean" ? (
                        row.traditional ? (
                          <CheckCircle2 className="w-5 h-5 text-cream/40" />
                        ) : (
                          <XCircle className="w-5 h-5 text-cream/20" />
                        )
                      ) : (
                        <span className="text-2xl">{row.traditional}</span>
                      )}
                    </div>
                    <div className="p-4 flex justify-center items-center">
                      {typeof row.mondayMorning === "boolean" ? (
                        row.mondayMorning ? (
                          <CheckCircle2 className="w-5 h-5 text-gold" />
                        ) : (
                          <XCircle className="w-5 h-5 text-cream/20" />
                        )
                      ) : (
                        <span className="text-2xl">{row.mondayMorning}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: CTA - Make It Easy */}
        <section className="py-24 bg-cream relative overflow-hidden">
          <div className="absolute -bottom-32 -right-32 w-80 opacity-[0.03] pointer-events-none">
            <img src={stampGold} alt="" className="w-full h-full" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest mb-6">
                Ready to stop leaving<br />
                <span className="italic text-gold">money on the table?</span>
              </h2>
              <p className="font-sans text-forest/70 mb-10 max-w-xl mx-auto">
                Come by the shop for a tasting. See what your guests have been missing. No pressure, just great drinks.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
                {/* Tasting Room */}
                <div className="bg-forest text-cream rounded-2xl p-6 text-center">
                  <MapPin className="w-8 h-8 text-gold mx-auto mb-4" />
                  <h3 className="font-serif text-xl italic mb-2">Visit the Tasting Room</h3>
                  <p className="font-sans text-sm text-cream/70 mb-4">Experience the full range in person</p>
                  <a 
                    href="https://maps.google.com/?q=1854+Garnet+Ave,+San+Diego,+CA+92109"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-gold hover:bg-gold/90 text-forest-deep">
                      Get Directions
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                  </a>
                </div>
                
                {/* Contact */}
                <div className="bg-forest text-cream rounded-2xl p-6 text-center">
                  <Mail className="w-8 h-8 text-gold mx-auto mb-4" />
                  <h3 className="font-serif text-xl italic mb-2">Let's Talk</h3>
                  <p className="font-sans text-sm text-cream/70 mb-4">Email or call us directly</p>
                  <a href="mailto:sales@mondaymorning-af.com">
                    <Button className="w-full bg-gold hover:bg-gold/90 text-forest-deep">
                      sales@mondaymorning-af.com
                    </Button>
                  </a>
                  <a href="tel:8584123253" className="block mt-3 font-sans text-sm text-cream/70 hover:text-gold transition-colors">
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
                  className="w-10 h-10 border border-forest/30 flex items-center justify-center text-forest/70 hover:text-gold hover:border-gold transition-colors rounded-full"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/monday-morning-af/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-forest/30 flex items-center justify-center text-forest/70 hover:text-gold hover:border-gold transition-colors rounded-full"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.facebook.com/mondaymorningaf/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-forest/30 flex items-center justify-center text-forest/70 hover:text-gold hover:border-gold transition-colors rounded-full"
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

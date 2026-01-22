import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNAExpertChat } from "@/hooks/useNAExpertChat";
import { cn } from "@/lib/utils";
import stampGold from "@/assets/stamp-gold.svg";

// Parse product links from message content
// Format: [[PRODUCT:handle|Product Name]]
const parseProductLinks = (content: string) => {
  const productLinkRegex = /\[\[PRODUCT:([^\]|]+)\|([^\]]+)\]\]/g;
  const parts: Array<{ type: "text" | "product"; content: string; handle?: string; name?: string }> = [];
  let lastIndex = 0;
  let match;

  while ((match = productLinkRegex.exec(content)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push({ type: "text", content: content.slice(lastIndex, match.index) });
    }
    // Add the product link
    parts.push({ type: "product", content: match[0], handle: match[1], name: match[2] });
    lastIndex = productLinkRegex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({ type: "text", content: content.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: "text" as const, content }];
};

const MessageContent = ({ content }: { content: string }) => {
  const parts = parseProductLinks(content);

  return (
    <>
      {parts.map((part, i) => {
        if (part.type === "product" && part.handle && part.name) {
          return (
            <Link
              key={i}
              to={`/product/${part.handle}`}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-gold/20 hover:bg-gold/30 text-forest font-medium rounded-md transition-colors mx-0.5"
            >
              <ShoppingBag className="w-3 h-3" />
              {part.name}
            </Link>
          );
        }
        return <span key={i}>{part.content}</span>;
      })}
    </>
  );
};

const NAExpertChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { messages, isLoading, error, sendMessage, clearChat } = useNAExpertChat();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
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
      {/* Floating Chat Button with Hover Message */}
      <div 
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-300",
          isOpen && "scale-0 opacity-0 pointer-events-none"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Hover tooltip */}
        <div 
          className={cn(
            "bg-forest text-cream px-4 py-2.5 rounded-2xl rounded-br-sm shadow-lg max-w-[220px] text-sm leading-snug transition-all duration-300 origin-right",
            isHovered ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
          )}
        >
          <span className="font-medium">Hey! 👋</span> I'm your NA drink expert—ask me anything!
        </div>
        
        {/* Chat button */}
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-forest text-cream rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[550px] max-h-[calc(100vh-100px)] bg-cream border-2 border-forest/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-forest text-cream p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img src={stampGold} alt="" className="w-8 h-8" />
            <div>
              <h3 className="font-serif text-lg leading-tight">NA Expert</h3>
              <p className="text-xs text-cream/70">Ask me anything about NA drinks!</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={clearChat}
              className="text-cream/70 hover:text-cream hover:bg-cream/10 h-8 w-8"
              aria-label="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-cream/70 hover:text-cream hover:bg-cream/10 h-8 w-8"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <img src={stampGold} alt="" className="w-16 h-16 opacity-30 mb-4" />
              <p className="text-forest/60 text-sm">
                Hey there! 👋 I'm your NA beverage expert. Ask me about mocktail recipes, drink recommendations, or anything else about alcohol-free options!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-forest text-cream rounded-br-md"
                        : "bg-forest/10 text-forest rounded-bl-md"
                    )}
                  >
                    {msg.role === "assistant" ? (
                      <MessageContent content={msg.content} />
                    ) : (
                      msg.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="bg-forest/10 text-forest rounded-2xl rounded-bl-md px-4 py-2.5 text-sm">
                    <span className="inline-flex gap-1">
                      <span className="w-2 h-2 bg-forest/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-forest/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-forest/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Error Message */}
        {error && (
          <div className="px-4 py-2 bg-red-50 text-red-600 text-xs border-t border-red-100">
            {error}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-forest/10 shrink-0">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about NA drinks..."
              disabled={isLoading}
              className="flex-1 bg-white border-forest/20 focus:border-forest text-forest placeholder:text-forest/40"
            />
            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-forest hover:bg-forest/90 text-cream shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NAExpertChat;

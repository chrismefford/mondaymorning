import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Offering =
  | "b2b"
  | "kegs"
  | "consulting"
  | "popups"
  | "brewing"
  | "events"
  | "tasting"
  | "samples"
  | "general";

// Per-offering copy. Keeps the form to one short step while nudging the
// visitor to give us the detail that actually qualifies the lead.
const COPY: Record<
  Offering,
  { title: string; blurb: string; placeholder: string; companyLabel: string; next?: string[] }
> = {
  b2b: {
    title: "B2B & Distribution",
    blurb: "Tell us about your venue and we'll get you set up with wholesale.",
    placeholder: "What kind of venue, and what are you looking to stock?",
    companyLabel: "Business / Venue",
    next: [
      "We review your venue and reach out, usually within 1 to 2 business days.",
      "We set up your wholesale account and approve you for B2B pricing.",
      "You log in and order by the case at your wholesale pricing.",
      "We ship or deliver, and reorders are a few clicks away.",
    ],
  },
  kegs: {
    title: "Kegs & Draft",
    blurb: "Put our non-alcoholic beer on tap at your venue.",
    placeholder: "Your venue, how many taps, and which beers you're after.",
    companyLabel: "Business / Venue",
    next: [
      "We review your venue and reach out, usually within 1 to 2 business days.",
      "We set you up with keg pricing and delivery.",
      "You pick your pours: Haymaker and rotating non-alcoholic seasonals.",
      "We deliver, and keep your line rotating.",
    ],
  },
  consulting: {
    title: "Consulting",
    blurb: "Building something alcohol-free? Let's talk through it.",
    placeholder: "What are you building, and where are you stuck?",
    companyLabel: "Company",
    next: [
      "We review your goals and reach out, usually within 1 to 2 business days.",
      "We set up an intro call to understand what you are building.",
      "We send a simple proposal and agreement scoped to your project.",
      "Once it is signed, we get to work.",
    ],
  },
  popups: {
    title: "Retail Pop-Up",
    blurb: "Let's bring a Monday Morning pop-up to your space.",
    placeholder: "Location, dates, and the foot traffic you have in mind.",
    companyLabel: "Company / Venue",
    next: [
      "We review your space and reach out, usually within 1 to 2 business days.",
      "We plan the details together: location, dates, and what we bring.",
      "We send a simple agreement to lock it in.",
      "We show up and run the pop-up.",
    ],
  },
  brewing: {
    title: "Contract Brewing",
    blurb: "Make your own alcohol-free brew at The Lab.",
    placeholder: "What do you want to make, target volume, and timeline?",
    companyLabel: "Company / Brand",
    next: [
      "We review your request and reach out, usually within 1 to 2 business days.",
      "We send you a quick agreement to e-sign. It sets the terms and keeps your recipe confidential.",
      "As soon as it is signed, you build your order and see your live quote, right in your browser.",
      "We confirm the details together and schedule your brew.",
      "You follow it from grain to can on a private link, no login needed.",
    ],
  },
  events: {
    title: "Events & Vibations",
    blurb: "Vibations for your event, done right.",
    placeholder: "Date, guest count, location, and the vibe you're after.",
    companyLabel: "Company / Host",
    next: [
      "We review your event and reach out, usually within 1 to 2 business days.",
      "We plan the details: date, guest count, and the vibe.",
      "We send the agreement to lock in your date.",
      "We bring the Vibations and handle the rest.",
    ],
  },
  tasting: {
    title: "Book a Tasting",
    blurb: "Come taste before you commit.",
    placeholder: "When works for you, and how many people?",
    companyLabel: "Company (optional)",
    next: [
      "We confirm a time that works for you, usually within 1 to 2 business days.",
      "Come in and taste across our alcohol-free lineup.",
      "We help you find what fits, no pressure.",
    ],
  },
  samples: {
    title: "Submit Your Brand",
    blurb: "Make something non-alcoholic and want us to carry it? Tell us about it.",
    placeholder: "What do you make, what's the story, and where can we learn more (site or links)?",
    companyLabel: "Brand",
    next: [
      "We review your submission, usually within a few business days.",
      "If it's a fit, we reply with where to ship samples.",
      "Our buyers and floor team taste it together.",
      "If it earns a spot, we get you on the shelf and online.",
    ],
  },
  general: {
    title: "Get in Touch",
    blurb: "Have a question? We'd love to hear from you.",
    placeholder: "How can we help?",
    companyLabel: "Company (optional)",
  },
};

// B2B applications become Shopify B2B companies, so they require a business
// name + shipping address (street/city/state/zip) for shipping and the CA tax
// exemption. The other offerings keep the short form.
const schemaFor = (isB2B: boolean) =>
  z.object({
    name: z.string().trim().min(1, "Name is required").max(100),
    email: z.string().trim().email("Please enter a valid email").max(255),
    phone: z.string().trim().max(40).optional(),
    message: z.string().trim().min(1, "Tell us a bit more").max(2000),
    company: isB2B
      ? z.string().trim().min(1, "Business name is required").max(150)
      : z.string().trim().max(150).optional(),
    address: isB2B
      ? z.string().trim().min(1, "Street address is required").max(200)
      : z.string().trim().max(200).optional(),
    city: isB2B
      ? z.string().trim().min(1, "City is required").max(100)
      : z.string().trim().max(100).optional(),
    state: isB2B
      ? z.string().trim().min(2, "State is required").max(50)
      : z.string().trim().max(50).optional(),
    zip: isB2B
      ? z.string().trim().min(3, "ZIP is required").max(20)
      : z.string().trim().max(20).optional(),
  });

interface InquiryDialogProps {
  offering: Offering;
  trigger?: React.ReactNode;
}

export default function InquiryDialog({ offering, trigger }: InquiryDialogProps) {
  const copy = COPY[offering] ?? COPY.general;
  const isB2B = offering === "b2b";
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    eventKind: "general",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = schemaFor(isB2B).safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Generate the id client-side so we can fire the notification without a
      // read-back. (Anon has no SELECT policy on inquiries, so .select() after
      // insert would trip RLS; admins only can read them.)
      const id = crypto.randomUUID();
      const row = {
        id,
        offering,
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        phone: formData.phone || null,
        message: formData.message,
        address: isB2B ? (formData.address || null) : null,
        city: isB2B ? (formData.city || null) : null,
        state: isB2B ? (formData.state || null) : null,
        zip: isB2B ? (formData.zip || null) : null,
        event_kind: offering === "events" ? formData.eventKind : null,
      };
      const { error: insertError } = await supabase.from("inquiries").insert(row);

      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error("Failed to submit inquiry");
      }

      // Notify the right inbox (non-blocking on failure).
      supabase.functions
        .invoke("send-inquiry-notification", { body: { inquiryId: id } })
        .catch((err) => console.error("Notification error:", err));

      setIsSuccess(true);
      toast.success(
        offering === "brewing"
          ? "Thanks! Our brewers will be in touch shortly."
          : "Thanks! We'll be in touch shortly."
      );

    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setFormData({
            name: "",
            email: "",
            company: "",
            phone: "",
            message: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            eventKind: "general",
          });
          setIsSuccess(false);
        }
      }}
    >
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gold hover:bg-gold/90 text-forest-deep font-semibold">
            {copy.title}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-cream border-2 border-forest">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-forest">
            {copy.title}
          </DialogTitle>
          <DialogDescription className="text-forest/70">
            {copy.blurb}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-serif text-2xl text-forest mb-2">
                {offering === "brewing" ? "Brew intake received" : copy.next ? "Request received" : "Got it!"}
              </h3>
              <p className="text-forest/70 max-w-sm">
                {copy.next
                  ? "Thanks for reaching out. Here is exactly what happens next:"
                  : "Thanks for reaching out. We'll get back to you within 1 to 2 business days."}
              </p>
            </div>

            {copy.next && (
              <ol className="mt-6 space-y-3 text-left">
                {copy.next.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold/20 text-forest font-semibold text-sm flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-forest/80 text-sm leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            )}

            <Button
              onClick={() => setOpen(false)}
              className="mt-7 w-full bg-forest text-cream hover:bg-forest-light font-semibold uppercase tracking-wider"
            >
              Got it
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="iq-name" className="text-forest font-semibold">Name *</Label>
                <Input
                  id="iq-name"
                  value={formData.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your name"
                  className="border-forest/20 focus:border-gold"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="iq-email" className="text-forest font-semibold">Email *</Label>
                <Input
                  id="iq-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="you@email.com"
                  className="border-forest/20 focus:border-gold"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="iq-company" className="text-forest font-semibold">{copy.companyLabel}{isB2B ? " *" : ""}</Label>
                <Input
                  id="iq-company"
                  value={formData.company}
                  onChange={(e) => set("company", e.target.value)}
                  placeholder="Name"
                  className="border-forest/20 focus:border-gold"
                  disabled={isSubmitting}
                />
                {errors.company && <p className="text-sm text-red-600">{errors.company}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="iq-phone" className="text-forest font-semibold">Phone (optional)</Label>
                <Input
                  id="iq-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="(555) 123-4567"
                  className="border-forest/20 focus:border-gold"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Events sub-type select: drives which agreement the CRM sends */}
            {offering === "events" && (
              <div className="space-y-2">
                <Label htmlFor="iq-eventkind" className="text-forest font-semibold">What kind of event?</Label>
                <select
                  id="iq-eventkind"
                  value={formData.eventKind}
                  onChange={(e) => set("eventKind", e.target.value)}
                  disabled={isSubmitting}
                  className="w-full h-10 rounded-md border border-forest/20 bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none"
                >
                  <option value="general">General event / party / corporate</option>
                  <option value="wedding">Wedding</option>
                  <option value="space">Rent the Monday Morning space</option>
                </select>
              </div>
            )}

            {isB2B && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="iq-address" className="text-forest font-semibold">Street address *</Label>
                  <Input
                    id="iq-address"
                    value={formData.address}
                    onChange={(e) => set("address", e.target.value)}
                    placeholder="1450 Market Street"
                    className="border-forest/20 focus:border-gold"
                    disabled={isSubmitting}
                  />
                  {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="iq-city" className="text-forest font-semibold">City *</Label>
                    <Input
                      id="iq-city"
                      value={formData.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="San Diego"
                      className="border-forest/20 focus:border-gold"
                      disabled={isSubmitting}
                    />
                    {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="iq-state" className="text-forest font-semibold">State *</Label>
                    <Input
                      id="iq-state"
                      value={formData.state}
                      onChange={(e) => set("state", e.target.value)}
                      placeholder="CA"
                      className="border-forest/20 focus:border-gold"
                      disabled={isSubmitting}
                    />
                    {errors.state && <p className="text-sm text-red-600">{errors.state}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="iq-zip" className="text-forest font-semibold">ZIP *</Label>
                    <Input
                      id="iq-zip"
                      value={formData.zip}
                      onChange={(e) => set("zip", e.target.value)}
                      placeholder="92101"
                      className="border-forest/20 focus:border-gold"
                      disabled={isSubmitting}
                    />
                    {errors.zip && <p className="text-sm text-red-600">{errors.zip}</p>}
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="iq-message" className="text-forest font-semibold">Tell us a bit more *</Label>
              <Textarea
                id="iq-message"
                rows={4}
                value={formData.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder={copy.placeholder}
                className="border-forest/20 focus:border-gold resize-none"
                disabled={isSubmitting}
              />
              {errors.message && <p className="text-sm text-red-600">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-forest text-cream hover:bg-forest-light font-semibold uppercase tracking-wider"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send
                </>
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

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
  | "consulting"
  | "popups"
  | "brewing"
  | "events"
  | "tasting"
  | "general";

// Per-offering copy. Keeps the form to one short step while nudging the
// visitor to give us the detail that actually qualifies the lead.
const COPY: Record<
  Offering,
  { title: string; blurb: string; placeholder: string; companyLabel: string }
> = {
  b2b: {
    title: "B2B & Distribution",
    blurb: "Tell us about your venue and we'll get you set up with wholesale.",
    placeholder: "What kind of venue, and what are you looking to stock?",
    companyLabel: "Business / Venue",
  },
  consulting: {
    title: "Consulting",
    blurb: "Building something alcohol-free? Let's talk through it.",
    placeholder: "What are you building, and where are you stuck?",
    companyLabel: "Company",
  },
  popups: {
    title: "Retail Pop-Up",
    blurb: "Let's bring a Monday Morning pop-up to your space.",
    placeholder: "Location, dates, and the foot traffic you have in mind.",
    companyLabel: "Company / Venue",
  },
  brewing: {
    title: "Contract Brewing",
    blurb: "Make your own alcohol-free brew at The Lab.",
    placeholder: "What do you want to make, target volume, and timeline?",
    companyLabel: "Company / Brand",
  },
  events: {
    title: "Events & Vibations",
    blurb: "Vibations for your event, done right.",
    placeholder: "Date, guest count, location, and the vibe you're after.",
    companyLabel: "Company / Host",
  },
  tasting: {
    title: "Book a Tasting",
    blurb: "Come taste before you commit.",
    placeholder: "When works for you, and how many people?",
    companyLabel: "Company (optional)",
  },
  general: {
    title: "Get in Touch",
    blurb: "Have a question? We'd love to hear from you.",
    placeholder: "How can we help?",
    companyLabel: "Company (optional)",
  },
};

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(150).optional(),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(1, "Tell us a bit more").max(2000),
});

interface InquiryDialogProps {
  offering: Offering;
  trigger?: React.ReactNode;
}

export default function InquiryDialog({ offering, trigger }: InquiryDialogProps) {
  const copy = COPY[offering] ?? COPY.general;
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = schema.safeParse(formData);
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
      // insert would trip RLS — admins only can read them.)
      const id = crypto.randomUUID();
      const { error: insertError } = await supabase
        .from("inquiries")
        .insert({
          id,
          offering,
          name: formData.name,
          email: formData.email,
          company: formData.company || null,
          phone: formData.phone || null,
          message: formData.message,
        });

      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error("Failed to submit inquiry");
      }

      // Notify the right inbox (non-blocking on failure).
      supabase.functions
        .invoke("send-inquiry-notification", { body: { inquiryId: id } })
        .catch((err) => console.error("Notification error:", err));

      setIsSuccess(true);
      toast.success("Thanks! We'll be in touch shortly.");

      setTimeout(() => {
        setFormData({ name: "", email: "", company: "", phone: "", message: "" });
        setIsSuccess(false);
        setOpen(false);
      }, 2500);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-serif text-2xl text-forest mb-2">Got it!</h3>
            <p className="text-forest/70 max-w-sm">
              Thanks for reaching out. We'll get back to you within 1-2 business days.
            </p>
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
                <Label htmlFor="iq-company" className="text-forest font-semibold">{copy.companyLabel}</Label>
                <Input
                  id="iq-company"
                  value={formData.company}
                  onChange={(e) => set("company", e.target.value)}
                  placeholder="Name"
                  className="border-forest/20 focus:border-gold"
                  disabled={isSubmitting}
                />
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

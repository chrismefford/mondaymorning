import { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be less than 2000 characters"),
});

interface ContactFormDialogProps {
  trigger?: React.ReactNode;
}

const ContactFormDialog = ({ trigger }: ContactFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      // Open email client
      window.location.href = `mailto:zane@mondaymorning-af.com?subject=${subject}&body=${body}`;
      
      toast({
        title: "Opening your email client...",
        description: "Your message has been prepared. Please send it from your email app.",
      });

      // Reset form and close dialog
      setFormData({ name: "", email: "", message: "" });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly at zane@mondaymorning-af.com",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTrigger = (
    <button
      className="w-10 h-10 border-2 border-cream/30 flex items-center justify-center text-cream/70 hover:text-cream hover:border-gold hover:bg-gold/10 transition-colors"
      aria-label="Contact us"
    >
      <Mail className="h-5 w-5" />
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-cream border-2 border-forest">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-forest">
            Get in Touch
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Have a question? We'd love to hear from you.
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-forest font-semibold">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-forest/20 focus:border-gold"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-forest font-semibold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-forest/20 focus:border-gold"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-forest font-semibold">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="How can we help you?"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="border-forest/20 focus:border-gold resize-none"
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="text-sm text-red-600">{errors.message}</p>
            )}
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
                Send Message
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;

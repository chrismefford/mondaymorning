import { useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Send, Loader2 } from "lucide-react";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const tastingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().max(20, "Phone must be less than 20 characters").optional(),
  date: z.date({ required_error: "Please select a date" }),
  notes: z.string().trim().max(1000, "Notes must be less than 1000 characters").optional(),
});

interface TastingFormDialogProps {
  trigger?: React.ReactNode;
}

const TastingFormDialog = ({ trigger }: TastingFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: undefined as Date | undefined,
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = tastingSchema.safeParse(formData);
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
      const dateStr = formData.date ? format(formData.date, "EEEE, MMMM d, yyyy") : "Not specified";
      const subject = encodeURIComponent(`Tasting Visit Request - ${formData.name}`);
      const body = encodeURIComponent(
        `Tasting Visit Request\n\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone || "Not provided"}\n` +
        `Preferred Date: ${dateStr}\n\n` +
        `Additional Notes:\n${formData.notes || "None"}`
      );
      
      // Open email client
      window.location.href = `mailto:zane@mondaymorning-af.com?subject=${subject}&body=${body}`;
      
      toast({
        title: "Opening your email client...",
        description: "Your tasting request has been prepared. Please send it from your email app.",
      });

      // Reset form and close dialog
      setFormData({ name: "", email: "", phone: "", date: undefined, notes: "" });
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
    <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-forest">
      Come Taste First
      <MapPin className="w-4 h-4 ml-2" />
    </Button>
  );

  // Disable past dates
  const disabledDays = { before: new Date() };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-cream border-2 border-forest">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-forest">
            Schedule a Tasting
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Visit our shop and sample our NA selection. We'll confirm your visit via email.
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="tasting-name" className="text-forest font-semibold">
              Name *
            </Label>
            <Input
              id="tasting-name"
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
            <Label htmlFor="tasting-email" className="text-forest font-semibold">
              Email *
            </Label>
            <Input
              id="tasting-email"
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
            <Label htmlFor="tasting-phone" className="text-forest font-semibold">
              Phone
            </Label>
            <Input
              id="tasting-phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="border-forest/20 focus:border-gold"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-forest font-semibold">
              Preferred Date *
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-forest/20",
                    !formData.date && "text-muted-foreground"
                  )}
                  disabled={isSubmitting}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-cream border-forest/20 z-[100]" align="start">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => setFormData({ ...formData, date })}
                  disabled={disabledDays}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-sm text-red-600">{errors.date}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tasting-notes" className="text-forest font-semibold">
              Notes (optional)
            </Label>
            <Textarea
              id="tasting-notes"
              placeholder="Group size, specific interests, questions..."
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="border-forest/20 focus:border-gold resize-none"
              disabled={isSubmitting}
            />
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
                Request Visit
              </>
            )}
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            📍 1854 Garnet Ave, San Diego, CA 92109
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TastingFormDialog;
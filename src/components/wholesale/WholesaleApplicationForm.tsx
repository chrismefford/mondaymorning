import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Building2, CheckCircle2, Loader2 } from "lucide-react";

const applicationSchema = z.object({
  company_name: z.string().min(2, "Company name is required").max(200),
  contact_name: z.string().min(2, "Contact name is required").max(100),
  email: z.string().email("Valid email is required").max(255),
  phone: z.string().max(30).optional(),
  business_type: z.enum(["restaurant", "bar", "market", "hotel", "cafe", "other"]),
  tax_id: z.string().max(50).optional(),
  estimated_monthly_volume: z.string().optional(),
  locations_count: z.coerce.number().min(1).max(1000).optional(),
  website_url: z.string().url().max(500).optional().or(z.literal("")),
  additional_notes: z.string().max(2000).optional(),
  product_interests: z.array(z.string()).optional(),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

const productCategories = [
  { id: "na-beer", label: "NA Beer" },
  { id: "na-wine", label: "NA Wine" },
  { id: "na-spirits", label: "NA Spirits" },
  { id: "functional", label: "Functional Beverages" },
  { id: "rtd-cocktails", label: "RTD Cocktails" },
  { id: "mixers", label: "Mixers & Botanicals" },
];

const volumeOptions = [
  "Under $500/month",
  "$500 - $1,000/month",
  "$1,000 - $2,500/month",
  "$2,500 - $5,000/month",
  "$5,000 - $10,000/month",
  "$10,000+/month",
];

interface WholesaleApplicationFormProps {
  trigger?: React.ReactNode;
}

export default function WholesaleApplicationForm({ trigger }: WholesaleApplicationFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      business_type: "restaurant",
      locations_count: 1,
      product_interests: [],
    },
  });

  const toggleInterest = (id: string) => {
    const updated = selectedInterests.includes(id)
      ? selectedInterests.filter((i) => i !== id)
      : [...selectedInterests, id];
    setSelectedInterests(updated);
    setValue("product_interests", updated);
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("wholesale_applications").insert({
        company_name: data.company_name,
        contact_name: data.contact_name,
        email: data.email,
        phone: data.phone || null,
        business_type: data.business_type,
        tax_id: data.tax_id || null,
        estimated_monthly_volume: data.estimated_monthly_volume || null,
        locations_count: data.locations_count || 1,
        website_url: data.website_url || null,
        additional_notes: data.additional_notes || null,
        product_interests: selectedInterests,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Application submitted! We'll be in touch within 24-48 hours.");
    } catch (err) {
      console.error("Application error:", err);
      toast.error("Failed to submit application. Please try again or email sales@mondaymorning-af.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (isSuccess) {
      reset();
      setSelectedInterests([]);
      setIsSuccess(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gold hover:bg-gold/90 text-forest-deep font-semibold">
            <Building2 className="w-4 h-4 mr-2" />
            Apply for Wholesale
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-cream">
        {isSuccess ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-forest" />
            </div>
            <DialogTitle className="font-serif text-2xl text-forest mb-3">
              Application Received!
            </DialogTitle>
            <DialogDescription className="text-forest/70 mb-6">
              Thank you for your interest in partnering with Monday Morning.
              <br />
              Our team will review your application and reach out within 24-48 hours.
            </DialogDescription>
            <Button onClick={handleClose} className="bg-forest hover:bg-forest/90 text-cream">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-forest">
                Wholesale Partnership Application
              </DialogTitle>
              <DialogDescription className="text-forest/70">
                Fill out the form below and our team will reach out within 24-48 hours.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
              {/* Company & Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company_name" className="text-forest">
                    Company Name *
                  </Label>
                  <Input
                    id="company_name"
                    {...register("company_name")}
                    placeholder="Your business name"
                    className="border-forest/20 focus:border-gold"
                  />
                  {errors.company_name && (
                    <p className="text-sm text-red-600">{errors.company_name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_name" className="text-forest">
                    Contact Name *
                  </Label>
                  <Input
                    id="contact_name"
                    {...register("contact_name")}
                    placeholder="Your full name"
                    className="border-forest/20 focus:border-gold"
                  />
                  {errors.contact_name && (
                    <p className="text-sm text-red-600">{errors.contact_name.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-forest">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="you@company.com"
                    className="border-forest/20 focus:border-gold"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-forest">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="(555) 123-4567"
                    className="border-forest/20 focus:border-gold"
                  />
                </div>
              </div>

              {/* Business Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business_type" className="text-forest">
                    Business Type *
                  </Label>
                  <Select
                    defaultValue="restaurant"
                    onValueChange={(value) =>
                      setValue("business_type", value as ApplicationFormData["business_type"])
                    }
                  >
                    <SelectTrigger className="border-forest/20 focus:border-gold">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="bar">Bar / Nightclub</SelectItem>
                      <SelectItem value="hotel">Hotel / Resort</SelectItem>
                      <SelectItem value="market">Market / Grocery</SelectItem>
                      <SelectItem value="cafe">Cafe / Coffee Shop</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="locations_count" className="text-forest">
                    Number of Locations
                  </Label>
                  <Input
                    id="locations_count"
                    type="number"
                    min={1}
                    {...register("locations_count")}
                    placeholder="1"
                    className="border-forest/20 focus:border-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tax_id" className="text-forest">
                    Tax ID / EIN (optional)
                  </Label>
                  <Input
                    id="tax_id"
                    {...register("tax_id")}
                    placeholder="XX-XXXXXXX"
                    className="border-forest/20 focus:border-gold"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimated_monthly_volume" className="text-forest">
                    Estimated Monthly Volume
                  </Label>
                  <Select onValueChange={(value) => setValue("estimated_monthly_volume", value)}>
                    <SelectTrigger className="border-forest/20 focus:border-gold">
                      <SelectValue placeholder="Select volume" />
                    </SelectTrigger>
                    <SelectContent>
                      {volumeOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website_url" className="text-forest">
                  Website (optional)
                </Label>
                <Input
                  id="website_url"
                  type="url"
                  {...register("website_url")}
                  placeholder="https://yourcompany.com"
                  className="border-forest/20 focus:border-gold"
                />
              </div>

              {/* Product Interests */}
              <div className="space-y-3">
                <Label className="text-forest">Product Categories of Interest</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {productCategories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2 p-3 bg-white border border-forest/10 rounded-lg hover:border-gold transition-colors cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedInterests.includes(cat.id)}
                        onCheckedChange={() => toggleInterest(cat.id)}
                      />
                      <span className="text-sm text-forest">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-2">
                <Label htmlFor="additional_notes" className="text-forest">
                  Tell us about your business
                </Label>
                <Textarea
                  id="additional_notes"
                  {...register("additional_notes")}
                  placeholder="What draws you to NA beverages? Any specific products or brands you're interested in?"
                  rows={3}
                  className="border-forest/20 focus:border-gold resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold hover:bg-gold/90 text-forest-deep font-semibold py-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>

              <p className="text-xs text-center text-forest/60">
                By submitting, you agree to be contacted about wholesale opportunities.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface WholesaleApplicationFormProps {
  trigger?: React.ReactNode;
}


export default function WholesaleApplicationForm({ trigger }: WholesaleApplicationFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    taxId: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database first
      const { data: application, error: insertError } = await supabase
        .from("wholesale_applications")
        .insert({
          company_name: formData.companyName,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          business_type: "Wholesale Inquiry",
          tax_id: formData.taxId || null,
          status: "pending",
        })
        .select()
        .single();

      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error("Failed to submit application");
      }

      // Sync to Shopify (will create as Draft - ordering not approved)
      try {
        const { error: syncError } = await supabase.functions.invoke("sync-wholesale-shopify", {
          body: { applicationId: application.id },
        });

        if (syncError) {
          console.error("Shopify sync error:", syncError);
          // Don't throw - application was saved successfully
        }
      } catch (syncErr) {
        console.error("Shopify sync failed:", syncErr);
        // Don't throw - application was saved successfully
      }

      setIsSuccess(true);
      toast.success("Application submitted successfully!");

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          companyName: "",
          contactName: "",
          email: "",
          phone: "",
          taxId: "",
        });
        setIsSuccess(false);
        setOpen(false);
      }, 3000);

    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = isSuccess ? (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle2 className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="font-serif text-2xl text-forest mb-2">Application Received!</h3>
      <p className="text-forest/70 max-w-sm">
        Thank you for your interest in partnering with Monday Morning. Our team will review your application and reach out within 1-2 business days.
      </p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Company Info */}
      <div className="space-y-4">
        <h3 className="font-serif text-lg text-forest border-b border-forest/10 pb-2">Business Information</h3>
        
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            placeholder="Your business name"
            required
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-4">
        <h3 className="font-serif text-lg text-forest border-b border-forest/10 pb-2">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Name *</Label>
            <Input
              id="contactName"
              value={formData.contactName}
              onChange={(e) => handleInputChange("contactName", e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="you@company.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="taxId">Tax ID / EIN (optional)</Label>
            <Input
              id="taxId"
              value={formData.taxId}
              onChange={(e) => handleInputChange("taxId", e.target.value)}
              placeholder="XX-XXXXXXX"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gold hover:bg-gold/90 text-forest-deep font-semibold"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Building2 className="w-4 h-4 mr-2" />
            Submit Application
          </>
        )}
      </Button>

      <p className="text-xs text-forest/50 text-center">
        By submitting, you agree to be contacted by our wholesale team regarding partnership opportunities.
      </p>
    </form>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-gold hover:bg-gold/90 text-forest-deep font-semibold">
            <Building2 className="w-4 h-4 mr-2" />
            Apply for Wholesale
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-cream">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-forest">
            Wholesale Application
          </DialogTitle>
          <DialogDescription className="text-forest/70">
            Join our network of premium hospitality partners. Fill out the form below and our team will be in touch.
          </DialogDescription>
        </DialogHeader>
        {formContent}
      </DialogContent>
    </Dialog>
  );
}

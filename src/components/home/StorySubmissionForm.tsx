import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Send, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const storySchema = z.object({
  text: z
    .string()
    .trim()
    .min(10, { message: "Story must be at least 10 characters" })
    .max(200, { message: "Story must be less than 200 characters" }),
  author_name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),
  author_location: z
    .string()
    .trim()
    .max(50, { message: "Location must be less than 50 characters" })
    .optional(),
});

interface StorySubmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const StorySubmissionForm = ({ isOpen, onClose }: StorySubmissionFormProps) => {
  const [text, setText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorLocation, setAuthorLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate input
    const result = storySchema.safeParse({
      text,
      author_name: authorName,
      author_location: authorLocation || undefined,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("story_submissions").insert({
        text: result.data.text,
        author_name: result.data.author_name,
        author_location: result.data.author_location || null,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Story submitted!",
        description: "Thanks for sharing. We'll review it soon.",
      });

      // Reset form after delay
      setTimeout(() => {
        setText("");
        setAuthorName("");
        setAuthorLocation("");
        setIsSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-forest-deep/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-cream border-2 border-forest p-6 lg:p-8 shadow-brutal animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-forest/60 hover:text-forest transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-forest-deep" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-forest mb-2">
              Thanks for sharing!
            </h3>
            <p className="font-sans text-sm text-forest/60">
              We'll review your story and add it to our wall soon.
            </p>
          </div>
        ) : (
          <>
            <h3 className="font-serif text-2xl font-bold text-forest mb-2">
              Share your story
            </h3>
            <p className="font-sans text-sm text-forest/60 mb-6">
              Why did you choose to go alcohol-free? Your story might inspire
              someone else.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="story"
                  className="font-sans text-xs uppercase tracking-wider text-forest/80 mb-1 block"
                >
                  Your reason (keep it short & sweet)
                </label>
                <Textarea
                  id="story"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="e.g., Hangovers were stealing my weekends."
                  className="bg-white border-2 border-forest/20 focus:border-gold text-forest placeholder:text-forest/40 resize-none"
                  rows={3}
                  maxLength={200}
                />
                {errors.text && (
                  <p className="text-red-600 text-xs mt-1">{errors.text}</p>
                )}
                <p className="font-sans text-xs text-forest/40 mt-1 text-right">
                  {text.length}/200
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="font-sans text-xs uppercase tracking-wider text-forest/80 mb-1 block"
                  >
                    First name
                  </label>
                  <Input
                    id="name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Alex"
                    className="bg-white border-2 border-forest/20 focus:border-gold text-forest placeholder:text-forest/40"
                    maxLength={50}
                  />
                  {errors.author_name && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.author_name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="font-sans text-xs uppercase tracking-wider text-forest/80 mb-1 block"
                  >
                    Location (optional)
                  </label>
                  <Input
                    id="location"
                    value={authorLocation}
                    onChange={(e) => setAuthorLocation(e.target.value)}
                    placeholder="San Diego"
                    className="bg-white border-2 border-forest/20 focus:border-gold text-forest placeholder:text-forest/40"
                    maxLength={50}
                  />
                  {errors.author_location && (
                    <p className="text-red-600 text-xs mt-1">
                      {errors.author_location}
                    </p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-forest text-cream font-sans text-sm font-bold uppercase tracking-wider py-6 hover:bg-forest-light disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    Submit Your Story
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <p className="font-sans text-xs text-forest/40 text-center">
                By submitting, you agree to let us share your story publicly.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default StorySubmissionForm;

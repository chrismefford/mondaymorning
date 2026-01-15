import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <section className="py-20 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl lg:text-5xl font-medium mb-4">
            Join the morning ritual
          </h2>
          <p className="font-sans text-lg opacity-90 mb-8">
            Be the first to know about new releases, exclusive recipes, 
            and 10% off your first order.
          </p>

          <form 
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary-foreground/40"
            />
            <Button 
              type="submit"
              variant="secondary"
              size="lg"
              className="font-sans text-sm font-medium shrink-0"
            >
              Subscribe
            </Button>
          </form>

          <p className="font-sans text-xs opacity-60 mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

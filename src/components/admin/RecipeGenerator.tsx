import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Loader2, Sparkles, Check, X, Trash2 } from "lucide-react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useAllRecipes, useApproveRecipe, useDeleteRecipe } from "@/hooks/useGeneratedRecipes";
import { supabase } from "@/integrations/supabase/client";

const occasions = [
  { value: "breakfast", label: "☀️ Breakfast" },
  { value: "dinner", label: "🍽️ Dinner" },
  { value: "relaxing", label: "🛋️ Relaxing" },
  { value: "beach", label: "🏖️ Beach" },
  { value: "celebration", label: "🎉 Celebration" },
];

export function RecipeGenerator() {
  const { data: shopifyProducts, isLoading: productsLoading } = useShopifyProducts(100);
  const { data: recipes, isLoading: recipesLoading } = useAllRecipes();
  const approveRecipe = useApproveRecipe();
  const deleteRecipe = useDeleteRecipe();

  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedOccasion, setSelectedOccasion] = useState("celebration");
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter out gift cards and memberships
  const products = shopifyProducts?.filter(
    (p) => 
      !p.title.toLowerCase().includes("gift") &&
      !p.title.toLowerCase().includes("membership") &&
      !p.title.toLowerCase().includes("subscription")
  ) || [];

  const handleToggleProduct = (handle: string) => {
    setSelectedProducts((prev) =>
      prev.includes(handle)
        ? prev.filter((h) => h !== handle)
        : [...prev, handle]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((p) => p.handle));
    }
  };

  const handleGenerate = async () => {
    if (selectedProducts.length === 0) {
      toast.error("Please select at least one product");
      return;
    }

    setIsGenerating(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please log in as admin");
        return;
      }

      const productsToSend = products
        .filter((p) => selectedProducts.includes(p.handle))
        .map((p) => ({
          handle: p.handle,
          name: p.title,
          category: p.productType || "Beverage",
          description: p.description?.substring(0, 200),
        }));

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-recipes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            products: productsToSend,
            occasion: selectedOccasion,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to generate recipes");
      }

      toast.success(
        `Generated ${result.results.success.length} recipes, skipped ${result.results.skipped.length}, failed ${result.results.failed.length}`
      );
      setSelectedProducts([]);
    } catch (error) {
      console.error("Generation error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate recipes");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApprove = (id: string, currentStatus: boolean) => {
    approveRecipe.mutate(
      { id, is_approved: !currentStatus },
      {
        onSuccess: () => toast.success(currentStatus ? "Recipe unapproved" : "Recipe approved!"),
        onError: () => toast.error("Failed to update recipe"),
      }
    );
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;
    deleteRecipe.mutate(id, {
      onSuccess: () => toast.success("Recipe deleted"),
      onError: () => toast.error("Failed to delete recipe"),
    });
  };

  return (
    <div className="space-y-6">
      {/* Generator Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-gold" />
            AI Recipe Generator
          </CardTitle>
          <CardDescription>
            Select products from your Shopify catalog to generate custom mocktail recipes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Select value={selectedOccasion} onValueChange={setSelectedOccasion}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select occasion" />
              </SelectTrigger>
              <SelectContent>
                {occasions.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              {selectedProducts.length === products.length ? "Deselect All" : "Select All"}
            </Button>

            <span className="text-sm text-muted-foreground">
              {selectedProducts.length} of {products.length} selected
            </span>
          </div>

          <ScrollArea className="h-64 rounded-md border p-4">
            {productsLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {products.map((product) => (
                  <label
                    key={product.handle}
                    className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                  >
                    <Checkbox
                      checked={selectedProducts.includes(product.handle)}
                      onCheckedChange={() => handleToggleProduct(product.handle)}
                    />
                    <span className="text-sm truncate">{product.title}</span>
                  </label>
                ))}
              </div>
            )}
          </ScrollArea>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || selectedProducts.length === 0}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Recipes...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate {selectedProducts.length} Recipe{selectedProducts.length !== 1 ? "s" : ""}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Recipes List */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Recipes</CardTitle>
          <CardDescription>
            Review and approve recipes before they appear on the site
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recipesLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : recipes?.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No recipes generated yet. Select some products above to get started!
            </p>
          ) : (
            <div className="space-y-4">
              {recipes?.map((recipe) => (
                <div
                  key={recipe.id}
                  className="flex items-start justify-between gap-4 p-4 rounded-lg border"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold">{recipe.title}</h4>
                      <Badge variant={recipe.is_approved ? "default" : "secondary"}>
                        {recipe.is_approved ? "Approved" : "Pending"}
                      </Badge>
                      <Badge variant="outline">{recipe.occasion}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{recipe.tagline}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Product: {recipe.featured_product_name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant={recipe.is_approved ? "outline" : "default"}
                      onClick={() => handleApprove(recipe.id, recipe.is_approved)}
                    >
                      {recipe.is_approved ? (
                        <X className="h-4 w-4" />
                      ) : (
                        <Check className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(recipe.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

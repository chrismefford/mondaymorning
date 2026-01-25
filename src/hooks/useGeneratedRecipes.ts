import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface GeneratedRecipe {
  id: string;
  title: string;
  slug: string;
  description: string;
  tagline: string | null;
  occasion: "breakfast" | "dinner" | "relaxing" | "beach" | "celebration";
  prep_time: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Advanced";
  ingredients: string[];
  instructions: string[];
  featured_product_handle: string;
  featured_product_name: string;
  product_handles: string[];
  image_url: string | null;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

// Fetch all approved recipes
export function useApprovedRecipes() {
  return useQuery({
    queryKey: ["generated-recipes", "approved"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("generated_recipes")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as GeneratedRecipe[];
    },
  });
}

// Fetch recipes for a specific product
export function useRecipesForProduct(productHandle: string) {
  return useQuery({
    queryKey: ["generated-recipes", "product", productHandle],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("generated_recipes")
        .select("*")
        .eq("is_approved", true)
        .eq("featured_product_handle", productHandle)
        .limit(5);

      if (error) throw error;
      return data as GeneratedRecipe[];
    },
    enabled: !!productHandle,
  });
}

// Admin: Fetch all recipes (including unapproved)
export function useAllRecipes() {
  return useQuery({
    queryKey: ["generated-recipes", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("generated_recipes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as GeneratedRecipe[];
    },
  });
}

// Admin: Approve/unapprove a recipe
export function useApproveRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, is_approved }: { id: string; is_approved: boolean }) => {
      const { error } = await supabase
        .from("generated_recipes")
        .update({ is_approved })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generated-recipes"] });
    },
  });
}

// Admin: Delete a recipe
export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("generated_recipes")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generated-recipes"] });
    },
  });
}

// Admin: Update a recipe
export function useUpdateRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<GeneratedRecipe> }) => {
      const { error } = await supabase
        .from("generated_recipes")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["generated-recipes"] });
    },
  });
}

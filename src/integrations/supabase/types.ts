export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          published_at: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      generated_recipes: {
        Row: {
          created_at: string
          description: string
          difficulty: string
          featured_product_handle: string
          featured_product_name: string
          id: string
          image_url: string | null
          ingredients: Json
          instructions: Json
          is_approved: boolean
          is_featured: boolean
          occasion: string
          prep_time: string
          product_handles: Json
          servings: number
          slug: string
          tagline: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          difficulty?: string
          featured_product_handle: string
          featured_product_name: string
          id?: string
          image_url?: string | null
          ingredients?: Json
          instructions?: Json
          is_approved?: boolean
          is_featured?: boolean
          occasion: string
          prep_time?: string
          product_handles?: Json
          servings?: number
          slug: string
          tagline?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          difficulty?: string
          featured_product_handle?: string
          featured_product_name?: string
          id?: string
          image_url?: string | null
          ingredients?: Json
          instructions?: Json
          is_approved?: boolean
          is_featured?: boolean
          occasion?: string
          prep_time?: string
          product_handles?: Json
          servings?: number
          slug?: string
          tagline?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      processed_image_cache: {
        Row: {
          created_at: string
          id: string
          original_url: string
          processed_url: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          original_url: string
          processed_url?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          original_url?: string
          processed_url?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      story_submissions: {
        Row: {
          author_location: string | null
          author_name: string
          created_at: string
          id: string
          is_approved: boolean
          text: string
        }
        Insert: {
          author_location?: string | null
          author_name: string
          created_at?: string
          id?: string
          is_approved?: boolean
          text: string
        }
        Update: {
          author_location?: string | null
          author_name?: string
          created_at?: string
          id?: string
          is_approved?: boolean
          text?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wholesale_applications: {
        Row: {
          additional_notes: string | null
          business_type: string
          company_name: string
          contact_name: string
          created_at: string
          email: string
          estimated_monthly_volume: string | null
          id: string
          locations_count: number | null
          phone: string | null
          product_interests: string[] | null
          status: string
          tax_id: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          additional_notes?: string | null
          business_type: string
          company_name: string
          contact_name: string
          created_at?: string
          email: string
          estimated_monthly_volume?: string | null
          id?: string
          locations_count?: number | null
          phone?: string | null
          product_interests?: string[] | null
          status?: string
          tax_id?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          additional_notes?: string | null
          business_type?: string
          company_name?: string
          contact_name?: string
          created_at?: string
          email?: string
          estimated_monthly_volume?: string | null
          id?: string
          locations_count?: number | null
          phone?: string | null
          product_interests?: string[] | null
          status?: string
          tax_id?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      wholesale_customers: {
        Row: {
          application_id: string | null
          business_type: string
          company_name: string
          created_at: string
          discount_tier: string | null
          id: string
          is_active: boolean | null
          payment_terms: string | null
          shopify_company_location_id: string | null
          tax_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          application_id?: string | null
          business_type: string
          company_name: string
          created_at?: string
          discount_tier?: string | null
          id?: string
          is_active?: boolean | null
          payment_terms?: string | null
          shopify_company_location_id?: string | null
          tax_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          application_id?: string | null
          business_type?: string
          company_name?: string
          created_at?: string
          discount_tier?: string | null
          id?: string
          is_active?: boolean | null
          payment_terms?: string | null
          shopify_company_location_id?: string | null
          tax_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wholesale_customers_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "wholesale_applications"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_wholesale_customer: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { toast } from "sonner";

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      handle: string;
      featuredImage: {
        url: string;
        altText: string | null;
      } | null;
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: Array<{ node: CartLine }>;
  };
}

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  cartItems: CartLine[];
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = "shopify_cart_id";

async function cartFetch(action: string, body?: Record<string, unknown>) {
  const baseUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/shopify-storefront`;
  
  const response = await fetch(`${baseUrl}?action=${action}`, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Cart operation failed");
  }

  return response.json();
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load existing cart on mount
  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (cartId) {
      loadCart(cartId);
    }
  }, []);

  const loadCart = async (cartId: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/shopify-storefront?action=cart-get&cartId=${encodeURIComponent(cartId)}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (data.cart) {
        setCart(data.cart);
      } else {
        // Cart no longer exists, clear localStorage
        localStorage.removeItem(CART_ID_KEY);
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
      localStorage.removeItem(CART_ID_KEY);
    }
  };

  const createCart = async (variantId: string, quantity: number): Promise<Cart> => {
    const data = await cartFetch("cart-create", {
      lines: [{ merchandiseId: variantId, quantity }],
    });
    localStorage.setItem(CART_ID_KEY, data.cart.id);
    return data.cart;
  };

  const addToCart = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true);
    try {
      let newCart: Cart;
      
      if (!cart) {
        // Create new cart
        newCart = await createCart(variantId, quantity);
      } else {
        // Add to existing cart
        const data = await cartFetch("cart-add", {
          cartId: cart.id,
          lines: [{ merchandiseId: variantId, quantity }],
        });
        newCart = data.cart;
      }
      
      setCart(newCart);
      setIsOpen(true);
      toast.success("Added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const updateQuantity = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) return;
    
    setIsLoading(true);
    try {
      if (quantity <= 0) {
        await removeFromCart(lineId);
        return;
      }

      const data = await cartFetch("cart-update", {
        cartId: cart.id,
        lines: [{ id: lineId, quantity }],
      });
      setCart(data.cart);
    } catch (error) {
      console.error("Failed to update quantity:", error);
      toast.error("Failed to update quantity");
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const removeFromCart = useCallback(async (lineId: string) => {
    if (!cart) return;
    
    setIsLoading(true);
    try {
      const data = await cartFetch("cart-remove", {
        cartId: cart.id,
        lineIds: [lineId],
      });
      setCart(data.cart);
      toast.success("Removed from cart");
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      toast.error("Failed to remove from cart");
    } finally {
      setIsLoading(false);
    }
  }, [cart]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const cartItems = cart?.lines.edges.map(edge => edge.node) || [];
  const cartTotal = cart ? parseFloat(cart.cost.totalAmount.amount) : 0;
  const cartCount = cart?.totalQuantity || 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartItems,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

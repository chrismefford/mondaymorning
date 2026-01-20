import { useCart } from "@/hooks/useCart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const { 
    isOpen, 
    closeCart, 
    cartItems, 
    cartTotal, 
    cartCount,
    updateQuantity, 
    removeFromCart, 
    isLoading,
    cart 
  } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg bg-cream border-l-2 border-forest flex flex-col">
        <SheetHeader className="border-b-2 border-forest/10 pb-4">
          <SheetTitle className="font-serif text-2xl text-forest flex items-center gap-3">
            <ShoppingBag className="h-6 w-6" />
            Your Cart
            {cartCount > 0 && (
              <span className="bg-gold text-forest-deep text-sm font-sans font-bold px-2.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 rounded-full bg-forest/5 flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 text-forest/30" />
            </div>
            <h3 className="font-serif text-xl text-forest mb-2">Your cart is empty</h3>
            <p className="font-sans text-sm text-muted-foreground mb-6">
              Discover something refreshing to add to your cart
            </p>
            <Button 
              onClick={closeCart}
              className="bg-forest text-cream hover:bg-forest-light font-sans text-sm uppercase tracking-wider"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-3 border-2 border-forest/10">
                  {/* Product Image */}
                  <Link 
                    to={`/product/${item.merchandise.product.handle}`}
                    onClick={closeCart}
                    className="w-20 h-20 bg-sand flex-shrink-0 overflow-hidden"
                  >
                    {item.merchandise.product.featuredImage ? (
                      <img
                        src={item.merchandise.product.featuredImage.url}
                        alt={item.merchandise.product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-forest/20">
                        <ShoppingBag className="h-8 w-8" />
                      </div>
                    )}
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/product/${item.merchandise.product.handle}`}
                      onClick={closeCart}
                      className="hover:text-gold transition-colors"
                    >
                      <h4 className="font-serif text-base font-medium text-forest truncate">
                        {item.merchandise.product.title}
                      </h4>
                    </Link>
                    {item.merchandise.title !== "Default Title" && (
                      <p className="font-sans text-xs text-muted-foreground">
                        {item.merchandise.title}
                      </p>
                    )}
                    <p className="font-sans text-sm font-medium text-forest mt-1">
                      ${parseFloat(item.merchandise.price.amount).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border-2 border-forest/20">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={isLoading}
                          className="p-1.5 hover:bg-forest/5 transition-colors disabled:opacity-50"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3 font-sans text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={isLoading}
                          className="p-1.5 hover:bg-forest/5 transition-colors disabled:opacity-50"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        disabled={isLoading}
                        className="p-1.5 text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="text-right">
                    <p className="font-sans text-sm font-bold text-forest">
                      ${(parseFloat(item.merchandise.price.amount) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="border-t-2 border-forest/10 pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-sans text-sm text-muted-foreground">Subtotal</span>
                <span className="font-sans text-xl font-bold text-forest">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <p className="font-sans text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout
              </p>
              
              {cart?.checkoutUrl && (
                <a 
                  href={cart.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button 
                    className="w-full bg-forest text-cream hover:bg-forest-light font-sans text-sm font-semibold uppercase tracking-wider py-6 gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Checkout
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </a>
              )}

              <Button
                variant="outline"
                onClick={closeCart}
                className="w-full border-2 border-forest text-forest hover:bg-forest hover:text-cream font-sans text-sm uppercase tracking-wider"
              >
                Continue Shopping
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;

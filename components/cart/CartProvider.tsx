"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products/types";
import type { CartItem, CartProduct } from "@/lib/cart/types";
import { isAvailableNow, isSoldOut } from "@/lib/products/status";
import { CartDrawer } from "./CartDrawer";
import { cn } from "@/lib/utils/cn";

const CART_KEY = "funni-farm-cart";

type Toast = {
  id: string;
  message: string;
};

type CartContextValue = {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(CART_KEY);

    if (saved) {
      try {
        setItems(JSON.parse(saved) as CartItem[]);
      } catch {
        window.localStorage.removeItem(CART_KEY);
      }
    }

    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    }
  }, [hasLoaded, items]);

  const pushToast = useCallback((message: string) => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      if (!isAvailableNow(product)) {
        pushToast(
          isSoldOut(product)
            ? `${product.name} is sold out.`
            : `${product.name} is not open for order requests yet.`,
        );
        return;
      }

      const cartProduct: CartProduct = {
        id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.image,
        category: product.category,
        price: product.price,
        inventory: product.inventory,
        ageRestricted: product.ageRestricted,
      };

      setItems((current) => {
        const existing = current.find((item) => item.product.id === product.id);

        if (!existing) {
          return [
            ...current,
            {
              product: cartProduct,
              quantity: Math.min(Math.max(quantity, 1), product.inventory),
            },
          ];
        }

        return current.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                product: cartProduct,
                quantity: Math.min(
                  item.quantity + Math.max(quantity, 1),
                  product.inventory,
                ),
              }
            : item,
        );
      });

      setIsOpen(true);
      pushToast(`${product.name} added to order request.`);
    },
    [pushToast],
  );

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: Math.min(
                  Math.max(quantity, 0),
                  item.product.inventory || quantity,
                ),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) =>
      current.filter((item) => item.product.id !== productId),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const subtotal = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);

    return {
      items,
      subtotal,
      itemCount,
      isOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [addItem, clearCart, isOpen, items, removeItem, updateQuantity]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-[90] flex w-[min(92vw,22rem)] flex-col gap-2"
      >
        {toasts.map((toast) => (
          <div
            className={cn(
              "rounded-2xl border border-cream-100/20 bg-forest-900 px-4 py-3 text-sm font-bold text-cream-50 shadow-farm",
            )}
            key={toast.id}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

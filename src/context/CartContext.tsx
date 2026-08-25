import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartContextValue, CartItem, MenuItem, MenuVariant } from '../types';

const CartContext = createContext<CartContextValue | null>(null);

function makeCartId(menuItemId: string, variantName: string) {
  return `${menuItemId}__${variantName}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback(
    (item: MenuItem, variant: MenuVariant, quantity = 1) => {
      const id = makeCartId(item.id, variant.name);
      setItems((prev) => {
        const existing = prev.find((c) => c.id === id);
        if (existing) {
          return prev.map((c) =>
            c.id === id ? { ...c, quantity: c.quantity + quantity } : c
          );
        }
        return [
          ...prev,
          {
            id,
            menuItemId: item.id,
            name: item.name,
            image: item.image,
            variant,
            quantity,
          },
        ];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((c) => c.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, quantity } : c))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.variant.price * i.quantity, 0),
    [items]
  );

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen((o) => !o),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

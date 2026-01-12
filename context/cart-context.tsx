'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';
import { MENU_ITEMS } from '@/lib/data/menu';

export type CartLine = {
  itemId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  addToCart: (itemId: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);

  const addToCart = (itemId: string, quantity = 1) => {
    if (quantity <= 0) return;
    setItems((prev) => {
      const existing = prev.find((item) => item.itemId === itemId);
      if (!existing) {
        return [...prev, { itemId, quantity }];
      }
      return prev.map((item) =>
        item.itemId === itemId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.itemId !== itemId));
  };

  const clearCart = () => setItems([]);

  const { totalItems, totalPrice } = useMemo(() => {
    const totals = items.reduce(
      (acc, item) => {
        const menuItem = MENU_ITEMS.find((menu) => menu.id === item.itemId);
        const linePrice = menuItem ? menuItem.price * item.quantity : 0;
        acc.totalItems += item.quantity;
        acc.totalPrice += linePrice;
        return acc;
      },
      { totalItems: 0, totalPrice: 0 }
    );

    return totals;
  }, [items]);

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, clearCart, totalItems, totalPrice }),
    [items, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

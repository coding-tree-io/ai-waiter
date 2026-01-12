'use client';

import { useState } from 'react';
import { MessageCircle, MinusCircle, ShoppingBag, X } from 'lucide-react';
import { ChatPanel } from '@/components/chat-panel';
import { MenuPanel } from '@/components/menu-panel';
import { useCart } from '@/context/cart-context';
import { formatPrice } from '@/lib/utils/format';
import { MENU_ITEMS } from '@/lib/data/menu';
import type { CartLineSummary } from '@/lib/types/cart';
import { Button } from '@/components/ui/button';

export function MobileShell() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems, totalPrice } = useCart();
  const { items, removeFromCart } = useCart();

  const cartLines: CartLineSummary[] = items.reduce<CartLineSummary[]>((acc, line) => {
    const menuItem = MENU_ITEMS.find((item) => item.id === line.itemId);
    if (!menuItem) return acc;
    acc.push({
      itemId: menuItem.id,
      name: menuItem.name,
      quantity: line.quantity,
      price: menuItem.price,
      lineTotal: line.quantity * menuItem.price
    });
    return acc;
  }, []);

  return (
    <div className="relative z-10 min-h-screen">
      <div className="relative min-h-screen lg:hidden">
        <MenuPanel />

        <Button
          type="button"
          variant="secondary"
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-5 left-5 right-20 z-20 h-auto justify-between rounded-2xl border-white/10 bg-surface/90 px-4 py-3 text-left backdrop-blur-xl"
          aria-label="Open cart"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
            <ShoppingBag className="h-4 w-4 text-accent" />
            <span>{totalItems} items</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-ink">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </Button>

        {!isChatOpen && (
          <Button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-5 right-5 z-30 h-14 w-14 rounded-full bg-accent text-white shadow-glow hover:bg-accentDark"
            aria-label="Open chat"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        )}

        <div
          className={`fixed inset-0 z-30 transition ${isCartOpen ? 'visible' : 'invisible'}`}
        >
          <div
            className={`absolute inset-0 bg-black/60 transition ${
              isCartOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsCartOpen(false)}
          />
          <div
            className={`absolute inset-x-0 bottom-0 h-[70%] rounded-t-3xl border-t border-white/10 bg-surface/95 backdrop-blur-2xl transition ${
              isCartOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
                <ShoppingBag className="h-4 w-4 text-accent" />
                Cart Details
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setIsCartOpen(false)}
                className="h-8 w-8 border-white/10 text-muted hover:text-ink"
                aria-label="Close cart"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-[calc(100%-64px)] overflow-y-auto px-6 py-5">
              {cartLines.length === 0 && (
                <p className="text-sm text-muted">Your cart is empty. Ask the waiter for a rec.</p>
              )}
              <div className="space-y-4">
                {cartLines.map((line) => (
                  <div
                    key={line.itemId}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-surfaceElevated p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink">{line.name}</p>
                      <p className="text-xs text-muted">
                        {line.quantity} x {formatPrice(line.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-ink">
                        {formatPrice(line.lineTotal)}
                      </span>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromCart(line.itemId)}
                        className="h-7 w-7 border-white/10 bg-surface text-muted hover:text-ink"
                        aria-label={`Remove ${line.name}`}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold text-ink">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-20 transition ${isChatOpen ? 'visible' : 'invisible'}`}
        >
          <div
            className={`absolute inset-0 bg-black/60 transition ${
              isChatOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsChatOpen(false)}
          />
          <div
            className={`absolute inset-x-0 bottom-0 h-[85%] rounded-t-3xl border-t border-white/10 bg-surface/95 backdrop-blur-2xl transition ${
              isChatOpen ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="relative h-full">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setIsChatOpen(false)}
                className="absolute right-4 top-4 z-10 h-9 w-9 border-white/10 bg-surface/80 text-muted hover:text-ink"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
              <ChatPanel onMenuLinkClick={() => setIsChatOpen(false)} />
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:grid lg:h-screen lg:grid-cols-[2fr_1fr]">
        <MenuPanel />
        <ChatPanel />
      </div>
    </div>
  );
}

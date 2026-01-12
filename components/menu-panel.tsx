'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { MinusCircle, PlusCircle, ShoppingBag } from 'lucide-react';
import { MENU_ITEMS } from '@/lib/data/menu';
import { useCart } from '@/context/cart-context';
import { formatPrice } from '@/lib/utils/format';
import type { CartLineSummary } from '@/lib/types/cart';

export function MenuPanel() {
  const { items, addToCart, removeFromCart, totalItems, totalPrice } = useCart();
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    const focusElement = (targetId: string) => {
      const element = document.getElementById(targetId);
      if (!element) return;
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (element as HTMLElement).focus({ preventScroll: true });
      setHighlightedId(targetId);
      window.setTimeout(() => setHighlightedId(null), 2200);
    };

    const focusFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;
      focusElement(hash);
    };

    const focusFromEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ id?: string }>;
      const targetId = customEvent.detail?.id;
      if (!targetId) return;
      focusElement(targetId);
    };

    focusFromHash();
    window.addEventListener('hashchange', focusFromHash);
    window.addEventListener('menu:focus', focusFromEvent as EventListener);
    return () => {
      window.removeEventListener('hashchange', focusFromHash);
      window.removeEventListener('menu:focus', focusFromEvent as EventListener);
    };
  }, []);

  const cartLines = useMemo<CartLineSummary[]>(
    () =>
      items.reduce<CartLineSummary[]>((acc, line) => {
        const menuItem = MENU_ITEMS.find((menu) => menu.id === line.itemId);
        if (!menuItem) return acc;
        acc.push({
          itemId: menuItem.id,
          name: menuItem.name,
          quantity: line.quantity,
          price: menuItem.price,
          lineTotal: line.quantity * menuItem.price
        });
        return acc;
      }, []),
    [items]
  );

  return (
    <section className="flex min-h-screen flex-col overflow-hidden border-b border-white/10 bg-surface/70 backdrop-blur-2xl lg:min-h-0 lg:h-full lg:border-b-0 lg:border-r">
      <header className="px-5 pb-4 pt-8 sm:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">Restaurant Floor</p>
        <h1 className="mt-3 font-[var(--font-display)] text-4xl text-ink">
          Smart Waiter Menu
        </h1>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Ask the AI to curate a full meal, tune the spice, or handle the entire order for the table.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-28 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {MENU_ITEMS.map((item) => (
            <article
              key={item.id}
              id={`menu-${item.id}`}
              tabIndex={-1}
              className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/90 shadow-card backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-glow ${
                highlightedId === `menu-${item.id}`
                  ? 'ring-2 ring-glow shadow-glow'
                  : ''
              }`}
            >
              <div className="relative h-40 w-full">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-ink">{item.name}</h3>
                    <span className="text-sm font-semibold text-ink">{formatPrice(item.price)}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-surface px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(item.id, 1)}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-accentDark"
                >
                  <PlusCircle className="h-4 w-4" />
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="sticky bottom-0 hidden w-full border-t border-white/10 bg-surface/90 px-5 py-5 backdrop-blur-xl sm:px-8 lg:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm font-semibold text-ink">Current Cart</p>
              <p className="text-xs text-muted">{totalItems} items</p>
            </div>
          </div>
          <p className="text-lg font-semibold text-ink">{formatPrice(totalPrice)}</p>
        </div>
        <div className="mt-4 space-y-3">
          {cartLines.length === 0 && (
            <p className="text-sm text-muted">Your cart is empty. Ask the waiter for suggestions.</p>
          )}
          {cartLines.map((line) => (
            <div key={line.itemId} className="flex items-center justify-between text-sm">
              <div>
                <p className="font-semibold text-ink">{line.name}</p>
                <p className="text-xs text-muted">
                  {line.quantity} x {formatPrice(line.price)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-ink">{formatPrice(line.lineTotal)}</span>
                <button
                  type="button"
                  onClick={() => removeFromCart(line.itemId)}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-surface p-1 text-muted transition hover:text-ink"
                >
                  <MinusCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { CartProvider } from '@/context/cart-context';
import { MenuPanel } from '@/components/menu-panel';
import { MENU_ITEMS } from '@/lib/data/menu';

const firstItem = MENU_ITEMS[0];

describe('MenuPanel', () => {
  beforeEach(() => {
    window.location.hash = '';
  });

  it('adds menu items to the cart summary', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <MenuPanel />
      </CartProvider>
    );

    await user.click(screen.getAllByRole('button', { name: /add to cart/i })[0]);
    const cart = screen.getByText(/current cart/i).closest('aside');
    expect(cart).not.toBeNull();
    if (!cart) return;
    expect(within(cart).getByText(firstItem.name)).toBeInTheDocument();
    expect(within(cart).getByText(/1 items/i)).toBeInTheDocument();
  });

  it('scrolls to the menu item from the hash on load', () => {
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    window.location.hash = '#/menu-burger-classic';

    render(
      <CartProvider>
        <MenuPanel />
      </CartProvider>
    );

    expect(scrollIntoView).toHaveBeenCalled();

    Element.prototype.scrollIntoView = originalScrollIntoView;
  });
});

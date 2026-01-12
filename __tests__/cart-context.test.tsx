import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCart, CartProvider } from '@/context/cart-context';
import { MENU_ITEMS } from '@/lib/data/menu';

function CartTester() {
  const { addToCart, removeFromCart, totalItems, totalPrice } = useCart();
  return (
    <div>
      <button type="button" onClick={() => addToCart(MENU_ITEMS[0].id, 2)}>
        Add first
      </button>
      <button type="button" onClick={() => removeFromCart(MENU_ITEMS[0].id)}>
        Remove first
      </button>
      <div data-testid="items">{totalItems}</div>
      <div data-testid="total">{totalPrice.toFixed(2)}</div>
    </div>
  );
}

describe('CartContext', () => {
  it('tracks totals when items are added and removed', async () => {
    const user = userEvent.setup();
    render(
      <CartProvider>
        <CartTester />
      </CartProvider>
    );

    await user.click(screen.getByRole('button', { name: /add first/i }));
    expect(screen.getByTestId('items')).toHaveTextContent('2');
    expect(screen.getByTestId('total')).toHaveTextContent(
      (MENU_ITEMS[0].price * 2).toFixed(2)
    );

    await user.click(screen.getByRole('button', { name: /remove first/i }));
    expect(screen.getByTestId('items')).toHaveTextContent('0');
    expect(screen.getByTestId('total')).toHaveTextContent('0.00');
  });
});

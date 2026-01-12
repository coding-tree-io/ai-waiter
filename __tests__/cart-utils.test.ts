import { describe, expect, it } from 'vitest';
import { addCartLine, removeCartLine, summarizeCart } from '@/lib/cart-utils';
import { MENU_ITEMS } from '@/lib/data/menu';

describe('cart utils', () => {
  it('adds to an existing line', () => {
    const itemId = MENU_ITEMS[0].id;
    const lines = addCartLine([{ itemId, quantity: 1 }], itemId, 2);
    expect(lines).toEqual([{ itemId, quantity: 3 }]);
  });

  it('removes a line', () => {
    const firstId = MENU_ITEMS[0].id;
    const secondId = MENU_ITEMS[1].id;
    const lines = removeCartLine(
      [
        { itemId: firstId, quantity: 1 },
        { itemId: secondId, quantity: 2 }
      ],
      secondId
    );
    expect(lines).toEqual([{ itemId: firstId, quantity: 1 }]);
  });

  it('summarizes the updated cart state', () => {
    const item = MENU_ITEMS[0];
    const { lines, total } = summarizeCart([{ itemId: item.id, quantity: 2 }], MENU_ITEMS);
    expect(lines).toHaveLength(1);
    expect(lines[0]?.itemId).toBe(item.id);
    expect(lines[0]?.quantity).toBe(2);
    expect(total).toBe(Number((item.price * 2).toFixed(2)));
  });
});

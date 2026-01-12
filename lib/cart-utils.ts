import type { MenuItem } from '@/lib/data/menu';
import type { CartLine, CartLineSummary } from '@/lib/types/cart';

export function addCartLine(lines: CartLine[], itemId: string, quantity: number): CartLine[] {
  if (!itemId || quantity <= 0) return lines;
  const next = [...lines];
  const existing = next.find((line) => line.itemId === itemId);
  if (existing) {
    existing.quantity += quantity;
    return next;
  }
  next.push({ itemId, quantity });
  return next;
}

export function removeCartLine(lines: CartLine[], itemId: string): CartLine[] {
  if (!itemId) return lines;
  return lines.filter((line) => line.itemId !== itemId);
}

export function summarizeCart(lines: CartLine[], menu: MenuItem[]) {
  const summaries: CartLineSummary[] = lines
    .map((line) => {
      const item = menu.find((menuItem) => menuItem.id === line.itemId);
      if (!item) return null;
      const quantity = Number(line.quantity ?? 0);
      return {
        itemId: item.id,
        name: item.name,
        quantity,
        price: item.price,
        lineTotal: Number((item.price * quantity).toFixed(2))
      };
    })
    .filter((line): line is CartLineSummary => Boolean(line));

  const total = summaries.reduce((sum, line) => sum + line.lineTotal, 0);

  return {
    lines: summaries,
    total: Number(total.toFixed(2))
  };
}

import {
  convertToModelMessages,
  safeValidateUIMessages,
  streamText,
  tool,
  type Tool,
  type UIMessage,
  zodSchema
} from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';
import { MENU_ITEMS } from '@/lib/data/menu';
import type { CartLine, CartLineSummary } from '@/lib/types/cart';

export const runtime = 'edge';

const menuSummary = MENU_ITEMS.map(
  (item) =>
    `${item.id} - ${item.name} (${item.price.toFixed(2)} EUR): ${item.description} [${item.category}] (link: #menu-${item.id})`
).join('\n');

export async function POST(req: Request) {
  const { messages, cart } = await req.json();
  const cartSchema = z
    .array(
      z.object({
        itemId: z.string(),
        quantity: z.number().int().min(0)
      })
    )
    .default([]);
  const cartSnapshot = cartSchema.parse(cart) as CartLine[];

  const tools = {
    getCart: tool({
      description: 'Get the current cart contents and quantities with names and prices.',
      inputSchema: zodSchema(z.object({})),
      execute: async () => {
        const lines: CartLineSummary[] = cartSnapshot
          .map((line: { itemId?: string; quantity?: number }) => {
            const item = MENU_ITEMS.find((menuItem) => menuItem.id === line.itemId);
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

        const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);

        return {
          currency: 'EUR',
          lines,
          total: Number(total.toFixed(2))
        };
      }
    }),
    getMenu: tool({
      description: 'List the full menu to help with recommendations.',
      inputSchema: zodSchema(z.object({})),
      execute: async () => {
        return MENU_ITEMS;
      }
    }),
    addToCart: tool({
      description: 'Add a menu item to the cart by id and quantity.',
      inputSchema: zodSchema(
        z.object({
          itemId: z.string().describe('Menu item id'),
          quantity: z.number().int().min(1).describe('Quantity to add')
        })
      ),
      execute: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
        const item = MENU_ITEMS.find((menuItem) => menuItem.id === itemId);
        if (!item) {
          return { ok: false, message: 'Item not found', itemId, quantity };
        }
        return {
          ok: true,
          action: 'addToCart',
          itemId,
          quantity,
          name: item.name
        };
      }
    }),
    removeFromCart: tool({
      description: 'Remove a menu item from the cart by id.',
      inputSchema: zodSchema(
        z.object({
          itemId: z.string().describe('Menu item id')
        })
      ),
      execute: async ({ itemId }: { itemId: string }) => {
        const item = MENU_ITEMS.find((menuItem) => menuItem.id === itemId);
        if (!item) {
          return { ok: false, message: 'Item not found', itemId };
        }
        return {
          ok: true,
          action: 'removeFromCart',
          itemId,
          name: item.name
        };
      }
    })
  };

  const toolSet = tools as Record<string, Tool<unknown, unknown>>;
  const validatedMessages = await safeValidateUIMessages<UIMessage>({
    messages,
    tools: toolSet
  });
  const uiMessages = (validatedMessages.success ? validatedMessages.data : []) as UIMessage[];
  const modelMessages = await convertToModelMessages(
    uiMessages.map(
      ({ id, ...rest }) => rest as Omit<UIMessage, 'id'>
    ),
    { tools: toolSet }
  );

  const result = streamText({
      model: openai('gpt-4o'),
      system: 'You are a warm, proactive restaurant waiter for this app only. Only answer with food ordering, menu questions, cart updates, or dining guidance based on the provided menu. If the user asks for anything unrelated (recipes, programming, general knowledge), politely refuse and steer them back to ordering. Suggest dishes that fit the guest preferences, ask concise follow-up questions when needed, and always use tools to update the cart. Use getCart when you need to confirm the current order. Confirm additions/removals in natural language after each tool call. Whenever you mention a menu item, format it as a Markdown link to its menu anchor using this pattern: [Item Name](#menu-item-id).\n\nMenu:\n' +
          menuSummary,
      messages: modelMessages,
      tools: toolSet
  });

  return result.toUIMessageStreamResponse();
}

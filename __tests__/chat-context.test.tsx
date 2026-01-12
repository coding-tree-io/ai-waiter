import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ChatProvider } from '@/context/chat-context';
import { MENU_ITEMS } from '@/lib/data/menu';

const addToCart = vi.fn();
const removeFromCart = vi.fn();
let mockMessages: Array<{ id: string; role: string; parts: unknown[] }> = [];

vi.mock('@/context/cart-context', () => ({
  useCart: () => ({ items: [], addToCart, removeFromCart })
}));

vi.mock('@ai-sdk/react', () => ({
  useChat: () => ({
    messages: mockMessages
  })
}));

vi.mock('ai', async () => {
  const actual = await vi.importActual<typeof import('ai')>('ai');
  return {
    ...actual,
    DefaultChatTransport: class {
      constructor() {}
    },
    isStaticToolUIPart: (part: { type?: string }) => Boolean(part?.type?.startsWith('tool-'))
  };
});

describe('ChatProvider tool flow', () => {
  beforeEach(() => {
    mockMessages = [];
    addToCart.mockClear();
    removeFromCart.mockClear();
  });

  it('applies addToCart tool output once', async () => {
    const itemId = MENU_ITEMS[0].id;
    mockMessages = [
      {
        id: 'm1',
        role: 'assistant',
        parts: [
          {
            type: 'tool-addToCart',
            state: 'output-available',
            toolCallId: 'call-1',
            input: { itemId, quantity: 2 }
          }
        ]
      }
    ];

    const { rerender } = render(
      <ChatProvider>
        <div />
      </ChatProvider>
    );

    await waitFor(() => expect(addToCart).toHaveBeenCalledWith(itemId, 2));
    expect(addToCart).toHaveBeenCalledTimes(1);

    rerender(
      <ChatProvider>
        <div />
      </ChatProvider>
    );

    expect(addToCart).toHaveBeenCalledTimes(1);
  });

  it('applies removeFromCart tool output', async () => {
    const itemId = MENU_ITEMS[1].id;
    mockMessages = [
      {
        id: 'm2',
        role: 'assistant',
        parts: [
          {
            type: 'tool-removeFromCart',
            state: 'output-available',
            toolCallId: 'call-2',
            input: { itemId }
          }
        ]
      }
    ];

    render(
      <ChatProvider>
        <div />
      </ChatProvider>
    );

    await waitFor(() => expect(removeFromCart).toHaveBeenCalledWith(itemId));
  });

  it('ignores tool output with unknown menu item', async () => {
    mockMessages = [
      {
        id: 'm3',
        role: 'assistant',
        parts: [
          {
            type: 'tool-addToCart',
            state: 'output-available',
            toolCallId: 'call-3',
            input: { itemId: 'unknown-item', quantity: 1 }
          }
        ]
      }
    ];

    render(
      <ChatProvider>
        <div />
      </ChatProvider>
    );

    await waitFor(() => {
      expect(addToCart).not.toHaveBeenCalled();
      expect(removeFromCart).not.toHaveBeenCalled();
    });
  });

  it('handles multiple tool outputs in order', async () => {
    const firstItem = MENU_ITEMS[0].id;
    const secondItem = MENU_ITEMS[1].id;
    mockMessages = [
      {
        id: 'm4',
        role: 'assistant',
        parts: [
          {
            type: 'tool-addToCart',
            state: 'output-available',
            toolCallId: 'call-4',
            input: { itemId: firstItem, quantity: 1 }
          },
          {
            type: 'tool-removeFromCart',
            state: 'output-available',
            toolCallId: 'call-5',
            input: { itemId: secondItem }
          }
        ]
      }
    ];

    render(
      <ChatProvider>
        <div />
      </ChatProvider>
    );

    await waitFor(() => {
      expect(addToCart).toHaveBeenCalledWith(firstItem, 1);
      expect(removeFromCart).toHaveBeenCalledWith(secondItem);
    });

    const addOrder = addToCart.mock.invocationCallOrder[0];
    const removeOrder = removeFromCart.mock.invocationCallOrder[0];
    expect(addOrder).toBeLessThan(removeOrder);
  });
});

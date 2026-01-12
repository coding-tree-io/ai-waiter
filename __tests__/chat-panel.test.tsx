import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ChatPanel } from '@/components/chat-panel';
import { formatPrice } from '@/lib/utils/format';

const sendMessage = vi.fn();
let mockMessages: Array<{ id: string; role: 'user' | 'assistant'; parts: unknown[] }> = [];
let mockStatus: 'idle' | 'submitted' | 'streaming' = 'idle';
let mockCartItems: Array<{ itemId: string; quantity: number }> = [];
const addToCart = vi.fn();
const removeFromCart = vi.fn();
const setMessages = vi.fn();

vi.mock('@/context/chat-context', () => ({
  useChatContext: () => ({
    messages: mockMessages,
    sendMessage,
    setMessages,
    status: mockStatus
  })
}));

vi.mock('@/context/cart-context', () => ({
  useCart: () => ({
    items: mockCartItems,
    addToCart,
    removeFromCart
  })
}));

describe('ChatPanel tool ordering', () => {
  const originalScrollIntoView = Element.prototype.scrollIntoView;

  beforeAll(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterAll(() => {
    Element.prototype.scrollIntoView = originalScrollIntoView;
  });

  beforeEach(() => {
    mockMessages = [];
    mockStatus = 'idle';
    mockCartItems = [];
    sendMessage.mockClear();
    setMessages.mockClear();
    addToCart.mockClear();
    removeFromCart.mockClear();
  });

  it('renders tool output after preceding text part', () => {
    mockMessages = [
      {
        id: 'm1',
        role: 'assistant',
        parts: [
          { type: 'text', text: 'Sure, adding it now.' },
          {
            type: 'tool-addToCart',
            state: 'output-available',
            toolCallId: 'call-1',
            input: { itemId: 'burger-classic', quantity: 1 }
          }
        ]
      }
    ];

    render(<ChatPanel />);

    const textBubble = screen.getByText('Sure, adding it now.').closest('div');
    const toolBubble = screen
      .getByRole('button', { name: 'Classic Cheeseburger' })
      .closest('div');

    expect(textBubble).not.toBeNull();
    expect(toolBubble).not.toBeNull();
    if (!textBubble || !toolBubble) return;

    const follows =
      textBubble.compareDocumentPosition(toolBubble) & Node.DOCUMENT_POSITION_FOLLOWING;
    expect(follows).toBeTruthy();
  });

  it('shows a typing indicator while loading', () => {
    mockStatus = 'streaming';
    render(<ChatPanel />);
    expect(screen.getByText(/AI is typing/i)).toBeInTheDocument();
  });

  it('renders getCart tool output details', () => {
    mockMessages = [
      {
        id: 'm2',
        role: 'assistant',
        parts: [
          {
            type: 'tool-getCart',
            state: 'output-available',
            toolCallId: 'call-cart',
            output: {
              lines: [
                {
                  itemId: 'burger-classic',
                  name: 'Classic Cheeseburger',
                  quantity: 2,
                  lineTotal: 25.98
                }
              ],
              total: 25.98
            }
          }
        ]
      }
    ];

    render(<ChatPanel />);
    expect(screen.getByText(/Current cart/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Classic Cheeseburger/i).length).toBeGreaterThan(0);
    const priceText = formatPrice(25.98);
    expect(
      screen.getAllByText((_, element) => element?.textContent?.includes(priceText) ?? false)
        .length
    ).toBeGreaterThan(0);
  });
});

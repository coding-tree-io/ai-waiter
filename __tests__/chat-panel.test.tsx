import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ChatPanel } from '@/components/chat-panel';

const sendMessage = vi.fn();
let mockMessages: Array<{ id: string; role: 'user' | 'assistant'; parts: unknown[] }> = [];
let mockStatus: 'idle' | 'submitted' | 'streaming' = 'idle';
let mockCartItems: Array<{ itemId: string; quantity: number }> = [];

vi.mock('@/context/chat-context', () => ({
  useChatContext: () => ({
    messages: mockMessages,
    sendMessage,
    status: mockStatus
  })
}));

vi.mock('@/context/cart-context', () => ({
  useCart: () => ({
    items: mockCartItems
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

  it('adds an add-to-cart button for menu links', async () => {
    const user = userEvent.setup();
    mockMessages = [
      {
        id: 'm2',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: 'Try the [Classic Cheeseburger](#menu-burger-classic).'
          }
        ]
      }
    ];

    render(<ChatPanel />);
    const addButton = screen.getByRole('button', { name: /add classic cheeseburger to cart/i });
    await user.click(addButton);
    expect(sendMessage).toHaveBeenCalledWith({
      text: 'Add 1 [Classic Cheeseburger](#menu-burger-classic) to the cart.'
    });
  });

  it('shows a remove button when the item is already in the cart', async () => {
    const user = userEvent.setup();
    mockCartItems = [{ itemId: 'burger-classic', quantity: 1 }];
    mockMessages = [
      {
        id: 'm3',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: 'Want to adjust [Classic Cheeseburger](#menu-burger-classic)?'
          }
        ]
      }
    ];

    render(<ChatPanel />);
    const removeButton = screen.getByRole('button', {
      name: /remove classic cheeseburger from cart/i
    });
    await user.click(removeButton);
    expect(sendMessage).toHaveBeenCalledWith({
      text: 'Remove [Classic Cheeseburger](#menu-burger-classic) from the cart.'
    });
  });
});

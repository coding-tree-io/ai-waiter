import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ChatPanel } from '@/components/chat-panel';

const sendMessage = vi.fn();
let mockMessages: Array<{ id: string; role: 'user' | 'assistant'; parts: unknown[] }> = [];

vi.mock('@/context/chat-context', () => ({
  useChatContext: () => ({
    messages: mockMessages,
    sendMessage,
    status: 'idle'
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
      .getByRole('button', { name: /classic cheeseburger/i })
      .closest('div');

    expect(textBubble).not.toBeNull();
    expect(toolBubble).not.toBeNull();
    if (!textBubble || !toolBubble) return;

    const follows =
      textBubble.compareDocumentPosition(toolBubble) & Node.DOCUMENT_POSITION_FOLLOWING;
    expect(follows).toBeTruthy();
  });
});

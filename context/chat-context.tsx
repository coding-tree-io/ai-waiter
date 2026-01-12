'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { useCart } from '@/context/cart-context';
import { MENU_ITEMS } from '@/lib/data/menu';
import type { CartLine } from '@/lib/types/cart';
import { DefaultChatTransport, isStaticToolUIPart, type UIMessage } from 'ai';

type ChatContextValue = ReturnType<typeof useChat>;

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { items, addToCart, removeFromCart } = useCart();
  const handledToolCalls = useRef(new Set<string>());
  const cartRef = useRef(items);
  const [transport] = useState(
    // eslint-disable-next-line react-hooks/refs
    () =>
      new DefaultChatTransport({
        api: '/api/chat',
        body: () => ({
          cart: cartRef.current as CartLine[]
        })
      })
  );

  useEffect(() => {
    cartRef.current = items;
  }, [items]);

  const chat = useChat<UIMessage>({
    transport,
    onError: (error) => {
      console.error('Chat error:', error);
    },
    onFinish: ({ messages }) => {
      console.debug('Chat finished with messages:', messages);
    }
  });

  useEffect(() => {
    chat.messages.forEach((message) => {
      message.parts.forEach((part) => {
        if (!isStaticToolUIPart(part) || part.state !== 'output-available') return;
        const toolCallId = part.toolCallId;
        if (handledToolCalls.current.has(toolCallId)) return;

        const toolName = part.type.startsWith('tool-') ? part.type.slice(5) : null;
        if (!toolName) return;

        if (toolName === 'addToCart') {
          const input = part.input as { itemId?: string; quantity?: number };
          const itemId = String(input.itemId ?? '');
          const quantity = Number(input.quantity ?? 1);
          if (MENU_ITEMS.some((item) => item.id === itemId)) {
            addToCart(itemId, quantity);
          }
        }

        if (toolName === 'removeFromCart') {
          const input = part.input as { itemId?: string };
          const itemId = String(input.itemId ?? '');
          if (MENU_ITEMS.some((item) => item.id === itemId)) {
            removeFromCart(itemId);
          }
        }

        handledToolCalls.current.add(toolCallId);
      });
    });
  }, [chat.messages, addToCart, removeFromCart]);

  return <ChatContext.Provider value={chat}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider');
  }
  return context;
}

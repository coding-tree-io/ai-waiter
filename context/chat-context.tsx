'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useChat } from 'ai/react';
import { useCart } from '@/context/cart-context';
import { MENU_ITEMS } from '@/lib/data/menu';
import type { CartLine } from '@/lib/types/cart';

type ChatContextValue = ReturnType<typeof useChat>;

type ToolInvocation = {
  toolCallId: string;
  toolName: string;
  args: Record<string, unknown>;
  state: 'call' | 'result';
  result?: unknown;
};

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { items, addToCart, removeFromCart } = useCart();
  const handledToolCalls = useRef(new Set<string>());

  const chat = useChat({
    api: '/api/chat',
    body: {
      cart: items as CartLine[]
    }
  });

  useEffect(() => {
    chat.messages.forEach((message) => {
      const toolInvocations = (message as { toolInvocations?: ToolInvocation[] })
        .toolInvocations;
      if (!toolInvocations) return;

      toolInvocations.forEach((invocation) => {
        if (invocation.state !== 'result') return;
        if (handledToolCalls.current.has(invocation.toolCallId)) return;

        if (invocation.toolName === 'addToCart') {
          const itemId = String(invocation.args.itemId ?? '');
          const quantity = Number(invocation.args.quantity ?? 1);
          if (MENU_ITEMS.some((item) => item.id === itemId)) {
            addToCart(itemId, quantity);
          }
        }

        if (invocation.toolName === 'removeFromCart') {
          const itemId = String(invocation.args.itemId ?? '');
          if (MENU_ITEMS.some((item) => item.id === itemId)) {
            removeFromCart(itemId);
          }
        }

        handledToolCalls.current.add(invocation.toolCallId);
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

'use client';

import { useMemo } from 'react';
import { SendHorizontal, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useChatContext } from '@/context/chat-context';
import { MENU_ITEMS } from '@/lib/data/menu';

const QUICK_PROMPTS = [
  'Build a spicy combo with a drink.',
  'I want a light vegetarian starter and dessert.',
  'Surprise me with a full meal under $25.'
];

const menuById = new Map(MENU_ITEMS.map((item) => [item.id, item]));

type ToolInvocation = {
  toolCallId: string;
  toolName: string;
  args: Record<string, unknown>;
  state: 'call' | 'result';
  result?: unknown;
};

function getToolMessage(invocation: ToolInvocation) {
  if (invocation.toolName === 'addToCart') {
    const itemId = String(invocation.args.itemId ?? '');
    const quantity = Number(invocation.args.quantity ?? 1);
    const item = menuById.get(itemId);
    const name = item?.name ?? itemId;
    return `Added ${quantity} x [${name}](#menu-${itemId}) to the cart.`;
  }

  if (invocation.toolName === 'removeFromCart') {
    const itemId = String(invocation.args.itemId ?? '');
    const item = menuById.get(itemId);
    const name = item?.name ?? itemId;
    return `Removed [${name}](#menu-${itemId}) from the cart.`;
  }

  if (invocation.toolName === 'getCart') {
    return 'Checked the current cart.';
  }

  return null;
}

function scrollToMenuAnchor(href: string | undefined, onDone?: () => void) {
  if (!href || !href.startsWith('#')) return;
  const targetId = href.replace('#', '');
  const element = document.getElementById(targetId);
  window.dispatchEvent(new CustomEvent('menu:focus', { detail: { id: targetId } }));
  if (!element) return;
  window.location.hash = href;
  window.requestAnimationFrame(() => {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    onDone?.();
  });
}

export function ChatPanel({ onMenuLinkClick }: { onMenuLinkClick?: () => void }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, append } =
    useChatContext();

  const orderedMessages = useMemo(
    () => messages.filter((message) => message.role !== 'system'),
    [messages]
  );

  return (
    <section className="flex h-full min-h-0 flex-col bg-surface/70 backdrop-blur-2xl">
      <header className="border-b border-white/10 px-5 py-6 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">AI Waiter</p>
            <h2 className="font-[var(--font-orbitron)] text-2xl text-ink">
              Concierge Chat
            </h2>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
        <div className="space-y-6">
          {orderedMessages.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-surfaceElevated p-6 text-sm text-muted shadow-card">
              Welcome! Tell me your mood, budget, or cravings and I will assemble your order.
            </div>
          )}

          {orderedMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div className="space-y-2">
                {message.content && (
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                      message.role === 'user'
                        ? 'bg-accent text-white shadow-glow'
                        : 'bg-surfaceElevated text-ink border border-white/10'
                    }`}
                  >
                    <ReactMarkdown
                      components={{
                        a: ({ href, children }) => (
                          <button
                            type="button"
                            onClick={() => scrollToMenuAnchor(href, onMenuLinkClick)}
                            className="font-semibold text-accent underline decoration-transparent underline-offset-4 transition hover:text-glow hover:decoration-glow"
                          >
                            {children}
                          </button>
                        )
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
                {(message as { toolInvocations?: ToolInvocation[] }).toolInvocations
                  ?.filter((invocation) => invocation.state === 'result')
                  .map((invocation) => {
                    const toolMessage = getToolMessage(invocation);
                    if (!toolMessage) return null;
                    return (
                      <div
                        key={invocation.toolCallId}
                        className="max-w-[80%] rounded-2xl border border-white/10 bg-surfaceElevated px-4 py-2 text-xs text-muted"
                      >
                        <ReactMarkdown
                          components={{
                            a: ({ href, children }) => (
                              <button
                                type="button"
                                onClick={() => scrollToMenuAnchor(href, onMenuLinkClick)}
                                className="font-semibold text-accent underline decoration-transparent underline-offset-4 transition hover:text-glow hover:decoration-glow"
                              >
                                {children}
                              </button>
                            )
                          }}
                        >
                          {toolMessage}
                        </ReactMarkdown>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 sm:px-8">
        <div className="mb-3 flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => append({ role: 'user', content: prompt })}
              className="rounded-full border border-white/10 bg-surfaceElevated px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted transition hover:border-white/30 hover:text-ink"
            >
              {prompt}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask for recommendations, edits, or full orders..."
            className="flex-1 rounded-full border border-white/10 bg-surfaceElevated px-4 py-3 text-sm text-ink shadow-sm focus:border-white/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-accentDark disabled:cursor-not-allowed disabled:opacity-60"
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

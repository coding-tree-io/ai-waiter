'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Mic, MicOff, SendHorizontal, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useChatContext } from '@/context/chat-context';
import { MENU_ITEMS } from '@/lib/data/menu';
import { formatPrice } from '@/lib/utils/format';
import { isStaticToolUIPart, isTextUIPart, type ToolUIPart, type UIMessage } from 'ai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const QUICK_PROMPTS = [
  'Build a spicy combo with a drink.',
  'I want a light vegetarian starter and dessert.',
  'Surprise me with a full meal under €25.'
];

const menuById = new Map(MENU_ITEMS.map((item) => [item.id, item]));

function getToolMessage(part: ToolUIPart) {
  const toolName = part.type.startsWith('tool-') ? part.type.slice(5) : null;
  if (!toolName) return null;

  if (toolName === 'addToCart') {
    const input = part.input as { itemId?: string; quantity?: number };
    const itemId = String(input.itemId ?? '');
    const quantity = Number(input.quantity ?? 1);
    const item = menuById.get(itemId);
    const name = item?.name ?? itemId;
    return `Added ${quantity} x [${name}](#menu-${itemId}) to the cart.`;
  }

  if (toolName === 'removeFromCart') {
    const input = part.input as { itemId?: string };
    const itemId = String(input.itemId ?? '');
    const item = menuById.get(itemId);
    const name = item?.name ?? itemId;
    return `Removed [${name}](#menu-${itemId}) from the cart.`;
  }

  if (toolName === 'getCart') {
    const output = (part as ToolUIPart & { output?: unknown }).output as
      | {
          lines?: Array<{ itemId: string; name: string; quantity: number; lineTotal: number }>;
          total?: number;
        }
      | undefined;

    if (!output || !Array.isArray(output.lines)) {
      return 'Checked the current cart.';
    }

    if (output.lines.length === 0) {
      return 'The cart is empty.';
    }

    const lineItems = output.lines
      .map(
        (line) =>
          `- ${line.quantity} x [${line.name}](#menu-${line.itemId}) — ${formatPrice(
            line.lineTotal
          )}`
      )
      .join('\n');

    return `Current cart:\n${lineItems}\n\n**Total:** ${formatPrice(output.total ?? 0)}`;
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

type SpeechRecognitionConstructor = new () => {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

export function ChatPanel({ onMenuLinkClick }: { onMenuLinkClick?: () => void }) {
  const { messages, sendMessage, status } = useChatContext();
  const [input, setInput] = useState('');
  const isLoading = status === 'submitted' || status === 'streaming';
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<InstanceType<SpeechRecognitionConstructor> | null>(null);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSpeechSupported('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
    const SpeechRecognition =
      ((window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor })
        .SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor })
          .webkitSpeechRecognition) ?? null;

    if (!SpeechRecognition) {
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? '')
        .join('')
        .trim();
      if (transcript) {
        setInput(transcript);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
    };
  }, [setInput]);

  const toggleListening = () => {
    if (!speechSupported || !recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }
    recognitionRef.current.start();
    setIsListening(true);
  };

  const orderedMessages = useMemo(
    () => (messages as UIMessage[]).filter((message) => message.role !== 'system'),
    [messages]
  );
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [orderedMessages]);

  return (
    <section className="flex h-full min-h-0 flex-col bg-surface/70 backdrop-blur-2xl">
      <header className="border-b border-white/10 px-5 py-6 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">AI Waiter</p>
            <h2 className="font-[var(--font-display)] text-2xl text-ink">
                Chat
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
                {message.parts.map((part, index) => {
                  if (isTextUIPart(part)) {
                    const linkTone =
                      message.role === 'user'
                        ? 'font-semibold text-white underline decoration-white/50 underline-offset-4 transition hover:text-white'
                        : 'font-semibold text-accent underline decoration-transparent underline-offset-4 transition hover:text-glow hover:decoration-glow';
                    return (
                      <div
                        key={`${message.id}-text-${index}`}
                        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                          message.role === 'user'
                            ? 'bg-accent text-white shadow-glow'
                            : 'bg-surfaceElevated text-ink border border-white/10'
                        }`}
                      >
                        <ReactMarkdown
                          components={{
                            a: ({ href, children }) => {
                              return (
                                <span className="inline-flex items-center gap-1">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => scrollToMenuAnchor(href, onMenuLinkClick)}
                                    className={`${linkTone} h-auto p-0`}
                                  >
                                    {children}
                                  </Button>
                                </span>
                              );
                            }
                          }}
                        >
                          {part.text}
                        </ReactMarkdown>
                      </div>
                    );
                  }

                  if (isStaticToolUIPart(part) && part.state === 'output-available') {
                    const toolMessage = getToolMessage(part);
                    if (!toolMessage) return null;
                    const linkTone =
                      message.role === 'user'
                        ? 'font-semibold text-white underline decoration-white/50 underline-offset-4 transition hover:text-white'
                        : 'font-semibold text-accent underline decoration-transparent underline-offset-4 transition hover:text-glow hover:decoration-glow';
                    return (
                      <div
                        key={`${message.id}-tool-${part.toolCallId}`}
                        className="max-w-[80%] rounded-2xl border border-white/10 bg-surfaceElevated px-4 py-2 text-xs text-muted"
                      >
                        <ReactMarkdown
                          components={{
                            a: ({ href, children }) => {
                              return (
                                <span className="inline-flex items-center gap-1">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => scrollToMenuAnchor(href, onMenuLinkClick)}
                                    className={`${linkTone} h-auto p-0`}
                                  >
                                    {children}
                                  </Button>
                                </span>
                              );
                            }
                          }}
                        >
                          {toolMessage}
                        </ReactMarkdown>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl border border-white/10 bg-surfaceElevated px-4 py-2 text-xs text-muted">
                AI is typing…
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 sm:px-8">
        <div className="mb-3 flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((prompt) => (
            <Button
              key={prompt}
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => sendMessage({ text: prompt })}
              className="rounded-full border-white/10 bg-surfaceElevated px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted hover:border-white/30 hover:text-ink"
            >
              {prompt}
            </Button>
          ))}
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const trimmed = input.trim();
            if (!trimmed) return;
            sendMessage({ text: trimmed });
            setInput('');
          }}
          className="flex items-center gap-3"
        >
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask for recommendations, edits, or full orders..."
            className="flex-1"
          />
          <Button
            type="button"
            variant="secondary"
            onClick={toggleListening}
            disabled={!speechSupported}
            className={`rounded-full border-white/10 bg-surfaceElevated px-4 py-3 text-sm font-semibold text-muted hover:text-ink ${
              isListening ? 'ring-2 ring-glow shadow-glow' : ''
            }`}
            aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white shadow-glow hover:bg-accentDark"
          >
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </section>
  );
}

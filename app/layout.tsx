import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import { ChatProvider } from '@/context/chat-context';

export const metadata: Metadata = {
  title: 'Smart Waiter',
  description: 'AI-powered ordering with tool calling.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-[var(--font-body)]">
        <CartProvider>
          <ChatProvider>{children}</ChatProvider>
        </CartProvider>
      </body>
    </html>
  );
}

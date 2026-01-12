import type { Metadata } from 'next';
import { Orbitron, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import { ChatProvider } from '@/context/chat-context';

const space = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap'
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap'
});

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
    <html lang="en" className={`${space.variable} ${orbitron.variable}`}>
      <body className="min-h-screen font-[var(--font-space)]">
        <CartProvider>
          <ChatProvider>{children}</ChatProvider>
        </CartProvider>
      </body>
    </html>
  );
}

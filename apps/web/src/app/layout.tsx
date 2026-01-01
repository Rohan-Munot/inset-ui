import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';

const urbanist = Urbanist({
  variable: '--font-urbanist',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Inset UI',
  description: 'Beautiful UI components for React',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${urbanist.variable} bg-background font-sans antialiased flex flex-col min-h-screen`}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

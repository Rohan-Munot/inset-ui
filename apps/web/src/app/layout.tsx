import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import { NextProvider } from 'fumadocs-core/framework/next';
import { ThemeProvider } from '@/components/theme-provider';
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
      <body
        className={`${urbanist.variable} bg-background flex h-screen flex-col overflow-hidden font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextProvider>{children}</NextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

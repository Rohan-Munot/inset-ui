import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import { NextProvider } from 'fumadocs-core/framework/next';
import type { ReactNode } from 'react';
import { source } from '@/lib/source';
import { MobileSidebar, MobileSidebarTrigger } from '@/components/docs/mobile-sidebar';

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
  const tree = source.getPageTree();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${urbanist.variable} bg-background min-h-screen pt-14 font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextProvider>
            <MobileSidebar tree={tree}>
              <Header leftSlot={<MobileSidebarTrigger />} />
            </MobileSidebar>
            {children}
          </NextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

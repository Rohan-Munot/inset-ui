import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import SideMenu from '@/components/side-menu'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Inset UI',
  description:
    'Inset UI is a collection of UI components for your next project.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="white"/><line x1="98.52" y1="122.52" x2="133.48" y2="157.48" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="122.52" y1="98.52" x2="157.48" y2="133.48" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="96" cy="96" r="72" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="160" cy="160" r="72" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="164.91" y1="116.91" x2="228.91" y2="180.91" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="146.91" y1="146.91" x2="210.91" y2="210.91" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="116.91" y1="164.91" x2="180.91" y2="228.91" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="75.09" y1="27.09" x2="139.09" y2="91.09" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="45.09" y1="45.09" x2="109.09" y2="109.09" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="27.08" y1="75.08" x2="91.08" y2="139.08" fill="none" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <main className="h-[100dvh] flex-1 items-center justify-center bg-[#0a0a0a]">
            <section className="border-border container mx-auto flex h-[100dvh] max-w-7xl items-center border-2 border-y-0 border-dashed">
              <div className="border-border flex h-[90dvh] w-full gap-1.5 rounded-[20px] border-2 border-x-0 border-dashed p-1.5">
                <SideMenu />
                {children}
              </div>
            </section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

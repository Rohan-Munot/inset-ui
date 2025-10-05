import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
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

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Inset UI',
  description: 'Inset UI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="h-[100dvh] flex-1 items-center justify-center">
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

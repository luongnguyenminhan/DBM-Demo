'use client';
import { Inter } from 'next/font/google'
import { GeistSans } from 'geist/font'
import { GeistMono } from 'geist/font'
import './globals.css'
import StoreProvider from '@/redux/provider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
      <html lang="en" className={`${inter.className} ${GeistSans.variable} ${GeistMono.variable}`}>
        <body className={`${inter.className} ${GeistSans.variable} ${GeistMono.variable}`}>
          <StoreProvider>
            <main className="min-h-screen bg-gray-50">
              {children}
            </main>
          </StoreProvider>
        </body>
      </html>
    )
  }
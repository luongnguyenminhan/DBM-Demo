'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
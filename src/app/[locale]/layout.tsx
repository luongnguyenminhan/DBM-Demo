import React from 'react';
import { notFound } from 'next/navigation';
import { supportedLocales } from '@/utils/config-loader';

export function generateStaticParams() {
  return supportedLocales.map(locale => ({ locale }));
}

// Make this a Server Component (not async function)
export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // This is a Server Component so params are always available synchronously
  const locale = params.locale;
  
  // Validate locale and show 404 if not supported
  if (!supportedLocales.includes(locale)) {
    notFound();
  }
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

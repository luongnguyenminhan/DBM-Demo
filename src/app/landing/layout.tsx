'use client';

import React from 'react';
import { Header } from '@/components/organisms';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Tính năng', href: '#features' },
    { label: 'Bảng giá', href: '#pricing' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Landing Header */}
      <Header 
        logoText="Meobeo.ai"
        navItems={navItems}
        position="fixed"
        variant="default"
        logoHref="/"
      />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

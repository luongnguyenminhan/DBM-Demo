'use client';

import React from 'react';
import { Header } from '@/components/organisms';

export default function MoleculesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/common' },
    { label: 'Molecules', href: '/molecules', isActive: true },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Molecules Header */}
      <Header 
        logoText="ENTERVIU"
        navItems={navItems}
        position="sticky"
        variant="default"
        logoHref="/"
        actions={
          <a href="https://github.com/your-repo" className="text-gray-600 hover:text-gray-900">
            GitHub
          </a>
        }
      />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        {children}
      </div>
    </div>
  );
}

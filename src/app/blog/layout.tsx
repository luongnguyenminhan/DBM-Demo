'use client';

import React from 'react';
import { Header } from '@/components/organisms';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Blog', href: '/blog', isActive: true },
    { label: 'Hỗ trợ', href: '/support' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Blog Header */}
      <Header 
        logoText="ENTERVIU"
        navItems={navItems}
        position="static"
        variant="default"
        logoHref="/"
      />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50">
        {children}
      </div>
      
      {/* Simple Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} ENTERVIU. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

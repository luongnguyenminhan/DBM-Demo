'use client';

import React, { useState } from 'react';
import { 
  faTachometerAlt, 
} from '@fortawesome/free-solid-svg-icons';
import { Sidebar, Header } from '@/components/organisms';
import { RootState } from '@/redux/store';
import { useAppSelector } from '@/redux/hooks';

const sidebarItems = [
  { key: 'overview', label: 'Tổng quan', href: '/dashboard', icon: faTachometerAlt },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const { isAuthenticated, user } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        items={sidebarItems}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
        variant="light"
        width="240px"
        collapsedWidth="70px"
        isCollapsible={true}
        isOpen={true}
        logoText="Meobeo.ai"
        logoImageSrc="/logo.png"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with auth data from Redux */}
        <Header
          variant="default"
          position="static"
          logoText="Meobeo.ai"
          logoHref="/dashboard"
          isLoggedIn={isAuthenticated}
          user={{
            name: user.name || undefined,
            role: user.role || undefined,
          }}
          navItems={[
            { label: 'Dashboard', href: '/dashboard', isActive: true },
            { label: 'Help', href: '/support' }
          ]}
          hideMenu={true}
          className="shadow-sm"
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

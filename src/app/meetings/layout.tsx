'use client';

import React, { useState } from 'react';
import { 
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Sidebar, Header } from '@/components/organisms';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const sidebarItems = [
  { key: 'overview', label: 'Tổng quan', href: '/dashboard', icon: faTachometerAlt },
];
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isLoggedIn, name, email } = useSelector((state: RootState) => state.user);

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
        {/* Header */}
        <Header
          variant="default"
          position="static"
          logoText="Meobeo.ai"
          logoHref="/dashboard"
          isLoggedIn={isLoggedIn}
          user={{
            name: name || (email ? email.split('@')[0] : "User"),
            avatar: `https://ui-avatars.com/api/?name=${name || email?.charAt(0) || "U"}&background=random`
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

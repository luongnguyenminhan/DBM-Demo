'use client';

import React, { useState } from 'react';
import { 
  faTachometerAlt, 
  faFileAlt, 
  faChartPie, 
  faUser, 
  faUserTie, 
  faBriefcase, 
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Sidebar, Header } from '@/components/organisms';
import Button from '@/components/atomic/button';

const sidebarItems = [
  { key: 'overview', label: 'Tổng quan', href: '/dashboard', icon: faTachometerAlt },
  { key: 'ai-scoring', label: 'Chấm điểm CV', href: '/dashboard/ai-scoring', icon: faFileAlt },
  { key: 'cv-optimizer', label: 'Tối ưu CV', href: '/dashboard/cv-optimizer', icon: faChartPie },
  { key: 'mock-interview', label: 'Phỏng vấn ảo', href: '/dashboard/mock-interview', icon: faUser },
  { key: 'career-advisor', label: 'Tư vấn nghề nghiệp', href: '/dashboard/career-advisor', icon: faUserTie },
  { key: 'job-tracker', label: 'Theo dõi ứng tuyển', href: '/dashboard/job-tracker', icon: faBriefcase },
  { key: 'settings', label: 'Cài đặt', href: '/dashboard/settings', icon: faCog },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const sidebarFooter = (isCollapsed: boolean) => (
    <Button 
      variant="outline" 
      isFullWidth={!isCollapsed}
      className={isCollapsed ? 'w-10 h-10 mx-auto' : ''}
      leftIcon={faSignOutAlt}
    >
      {isCollapsed ? '' : 'Log Out'}
    </Button>
  );

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
        userProfile={{
          name: "Nguyen Van A",
          role: "pro",
          avatar: "https://i.pravatar.cc/300"
        }}
        logoText="ENTERVIU"
        logoImageSrc="/logo.png"
        footer={sidebarFooter(sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header
          variant="default"
          position="static"
          logoText="ENTERVIU"
          logoHref="/dashboard"
          isLoggedIn={true}
          user={{
            name: "Nguyen Van A",
            avatar: "https://i.pravatar.cc/300"
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

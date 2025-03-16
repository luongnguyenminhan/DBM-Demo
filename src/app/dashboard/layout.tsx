'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { 
  faTachometerAlt, 
  faFileAlt, 
  faBriefcase, 
  faCog,
  faSignOutAlt,
  faChartPie,
  faUser,
  faUserTie,
} from '@fortawesome/free-solid-svg-icons';

import Sidebar from '@/components/organisms/sidebar';
import PageHeader from '@/components/organisms/PageHeader';
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
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const pathname = usePathname();
  
  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Set active section based on path
  useEffect(() => {
    const path = pathname.split('/').pop();
    if (path === 'dashboard') {
      setActiveSection('overview');
    } else if (path) {
      setActiveSection(path);
    }
  }, [pathname]);
  
  // Handle nav item click
  const handleNavClick = (key: string) => {
    setActiveSection(key);
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };
  
  // Get page title based on active section
  const getPageTitle = () => {
    switch (activeSection) {
      case 'chat':
        return 'Trợ lý AI nghề nghiệp';
      case 'cv':
        return 'CV của tôi';
      case 'jobs':
        return 'Công việc gợi ý';
      case 'skills':
        return 'Phân tích kỹ năng';
      case 'achievements':
        return 'Thành tựu của tôi';
      case 'settings':
        return 'Cài đặt';
      default:
        return 'Bảng điều khiển nghề nghiệp';
    }
  };
  
  const sidebarFooter = (isCollapsed: boolean) => (
    <Button 
      variant="outline" 
      isFullWidth={!isCollapsed}
      className={isCollapsed ? 'w-10 h-10 mx-auto' : ''}
      leftIcon={faSignOutAlt}
    >
      {isCollapsed ? '' : 'Đăng xuất'}
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
        isOpen={!isMobile || isMobileSidebarOpen}
        onToggle={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
        activeItemKey={activeSection}
        onActiveItemChange={handleNavClick}
        overlayMode={isMobile}
        userProfile={{
          name: "Alex Johnson",
          role: "pro",
          avatar: "https://i.pravatar.cc/150?img=32"
        }}
        logoText="CareerAI"
        logoImageSrc='/logo.png'
        footer={sidebarFooter(sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Page Header */}
        <PageHeader
          title={getPageTitle()}
          subtitle={activeSection === 'overview' ? "Chào mừng trở lại, hãy tiếp tục hành trình nghề nghiệp của bạn" : undefined}
          withSearch={activeSection === 'overview' || activeSection === 'jobs'}
          searchPlaceholder="Tìm kiếm việc làm, kỹ năng, tài nguyên..."
          onSearch={(query) => console.log('Search:', query)}
          userAvatar="https://i.pravatar.cc/150?img=32"
          userName="Alex Johnson"
          notificationCount={3}
          onNotificationClick={() => console.log('Notifications clicked')}
          onMenuToggle={() => setMobileSidebarOpen(true)}
          showMobileMenu={isMobile}
          onUserClick={() => console.log('User clicked')}
          withBorder
          withBackground
          withShadow
        />

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

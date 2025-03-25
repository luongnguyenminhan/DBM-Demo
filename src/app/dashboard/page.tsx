'use client';

import React from 'react';
import MeetingsPanel from '@/components/organisms/MeetingsPanel';
import AnalyticsPanel from '@/components/organisms/AnalyticsPanel';
import NotificationAlert from '@/components/organisms/NotificationAlert';
import { useDashboard } from '@/hooks/use-dashboard';
import { useRouter } from 'next/navigation';
import { MeetingResponse } from '@/types/meeting.type';

export default function DashboardPage() {
  const router = useRouter();
  const {
    activeTab,
    setActiveTab,
    currentPage,
    setCurrentPage,
    pageSize,
    visibleContent,
    setVisibleContent,
    upcomingMeetingsMetadata,
    pastMeetingsMetadata, // Fixed variable name
    currentItems,
    isLoading,
    totalItems,
    totalPages,
    completedMeetingsCount,
    cancelledMeetingsCount,
    filterItems,
    viewOptions,
    handleViewFullReport
  } = useDashboard();

  // Override the handleViewMeetingDetails to use router
  const handleViewMeetingDetails = (meeting: MeetingResponse) => {
    router.push(`/dashboard/meetings/${meeting.id}`);
  };

  if (isLoading && currentItems.length === 0) {
    return (
      <div className="p-6 h-full space-y-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-600">Đang tải dữ liệu cuộc họp...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 h-full space-y-6">
      
      {/* Thông báo cảnh báo */}
      <NotificationAlert
        message="Chào mừng đến với bảng điều khiển của bạn!"
        description="Tại đây bạn có thể quản lý tất cả các cuộc họp và kiểm tra phân tích."
      />
      
      {/* Khu vực nội dung chính */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Danh sách cuộc họp - Trải dài 2 cột */}
        <div className="lg:col-span-2 space-y-4">
          <MeetingsPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentItems={currentItems}
            totalItems={totalItems}
            totalPages={totalPages}
            currentPage={currentPage}
            pageSize={pageSize}
            visibleContent={visibleContent}
            setVisibleContent={setVisibleContent}
            filterItems={filterItems}
            viewOptions={viewOptions}
            setCurrentPage={setCurrentPage}
            upcomingMeetingsCount={upcomingMeetingsMetadata?.total_count || 0}
            pastMeetingsCount={pastMeetingsMetadata?.total_count || 0}
            onViewDetails={handleViewMeetingDetails}
          />
        </div>
        
        {/* Bảng điều khiển phụ - Phân tích */}
        <div className="lg:col-span-1 space-y-4">
          <AnalyticsPanel
            scheduledCount={upcomingMeetingsMetadata?.total_count || 0}
            completedCount={completedMeetingsCount}
            cancelledCount={cancelledMeetingsCount}
            onViewFullReport={handleViewFullReport}
          />
        </div>
      </div>
    </div>
  );
}

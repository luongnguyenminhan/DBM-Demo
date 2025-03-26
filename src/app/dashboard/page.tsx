'use client';

import React from 'react';
import MeetingsPanel from '@/components/organisms/MeetingsPanel';
import AnalyticsPanel from '@/components/organisms/AnalyticsPanel';
import NotificationAlert from '@/components/organisms/NotificationAlert';
import { useDashboard } from '@/hooks/use-dashboard';
import { useRouter } from 'next/navigation';
import { MeetingResponse } from '@/types/meeting.type';
import Button from '@/components/atomic/button';
import { faUpload, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import TextUploadModal from '@/components/organisms/TextUploadModal';
import AudioUploadModal from '@/components/organisms/AudioUploadModal';

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
    pastMeetingsMetadata,
    currentItems,
    isLoading,
    totalItems,
    totalPages,
    completedMeetingsCount,
    cancelledMeetingsCount,
    filterItems,
    viewOptions,
    handleViewFullReport,
    isTextModalOpen,
    isAudioModalOpen,
    notification,
    openTextModal,
    closeTextModal,
    openAudioModal,
    closeAudioModal,
    handleTextUpload,
    handleAudioUpload,
    handleNotification
  } = useDashboard();

  const handleViewMeetingDetails = (meeting: MeetingResponse) => {
    router.push(`/dashboard/meetings/${meeting.id}`);
  };
  
  const handleTabChange = (tab: string) => {
    if (tab === 'upcoming' || tab === 'past') {
      setActiveTab(tab as 'upcoming' | 'past');
    }
  };

  const handleTextUploadClick = () => {
    openTextModal();
  };

  const handleAudioUploadClick = () => {
    openAudioModal();
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
      {notification ? (
        <NotificationAlert
          message={notification.message}
          variant={notification.type}
          description=""
        />
      ) : (
        <NotificationAlert
          message="Chào mừng đến với bảng điều khiển của bạn!"
          description="Tại đây bạn có thể quản lý tất cả các cuộc họp và kiểm tra phân tích."
        />
      )}
      
      {/* Khu vực nội dung chính */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Danh sách cuộc họp - Trải dài 2 cột */}
        <div className="lg:col-span-2 space-y-4">
          {/* Upload buttons */}
          <div className="flex gap-2 mb-4">
            <Button 
              variant="gradient"
              size="small"
              leftIcon={faUpload}
              onClick={handleTextUploadClick}
            >
              Tải lên văn bản
            </Button>
            <Button 
              variant="gradient"
              size="small"
              leftIcon={faMicrophone}
              onClick={handleAudioUploadClick}
            >
              Tải lên âm thanh
            </Button>
          </div>
          
          <MeetingsPanel
            activeTab={activeTab}
            setActiveTab={handleTabChange}
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
      
      {/* Modal Components */}
      <TextUploadModal 
        isOpen={isTextModalOpen} 
        onClose={closeTextModal}
        onUpload={handleTextUpload}
        onNotification={handleNotification}
      />
      
      <AudioUploadModal
        isOpen={isAudioModalOpen}
        onClose={closeAudioModal}
        onUpload={handleAudioUpload}
        onNotification={handleNotification}
      />
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { MeetingResponse } from '@/types/meeting.type';
import meetingApi from '@/apis/meetingApi';
import transcriptApi from '@/apis/transcriptApi';
import { PaginationMetadata } from '@/types/common.type';
import { 
  faFileAlt,
  faCalendarDay
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import NotificationToast from '@/components/organisms/NotificationToast';

export const useDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('past');
  
  // Track pagination separately for each tab
  const [paginationState, setPaginationState] = useState({
    upcoming: { currentPage: 1 },
    past: { currentPage: 1 }
  });
  
  const [pageSize] = useState(9);
  const [visibleContent, setVisibleContent] = useState<'table' | 'calendar'>('table');
  
  // Modal states
  const [isTextModalOpen, setIsTextModalOpen] = useState<boolean>(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

  // Modal handlers
  const openTextModal = () => setIsTextModalOpen(true);
  const closeTextModal = () => setIsTextModalOpen(false);
  const openAudioModal = () => setIsAudioModalOpen(true);
  const closeAudioModal = () => setIsAudioModalOpen(false);

  const [upcomingMeetings, setUpcomingMeetings] = useState<MeetingResponse[]>([]);
  const [upcomingMeetingsMetadata, setUpcomingMeetingsMetadata] = useState<PaginationMetadata>({
    total_count: 0,
    page_size: pageSize,
    current_page: 1,
    total_pages: 0,
    has_next: false,
    has_previous: false
  });
  
  const [pastMeetings, setPastMeetings] = useState<MeetingResponse[]>([]);
  const [pastMeetingsMetadata, setPastMeetingsMetadata] = useState<PaginationMetadata>({
    total_count: 0,
    page_size: pageSize,
    current_page: 1,
    total_pages: 0,
    has_next: false,
    has_previous: false
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [completedMeetingsCount, setCompletedMeetingsCount] = useState(0);
  const [cancelledMeetingsCount, setCancelledMeetingsCount] = useState(0);
  
  // Current page is derived from the active tab's pagination state
  const currentPage = paginationState[activeTab as 'upcoming' | 'past'].currentPage;
  
  // Custom setter for the current page that respects the active tab
  const setCurrentPage = (page: number) => {
    setPaginationState(prev => ({
      ...prev,
      [activeTab]: { ...prev[activeTab as 'upcoming' | 'past'], currentPage: page }
    }));
  };

  // Notification handler
  const handleNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Helper function to safely extract metadata total_count from API response
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extractTotalCount = (response: any): number => {
    // Check if metadata exists directly
    if (response.metadata && typeof response.metadata.total_count === 'number') {
      return response.metadata.total_count;
    }
    
    // Check if metadata is nested in data
    if (response.data && response.data.metadata && typeof response.data.metadata.total_count === 'number') {
      return response.data.metadata.total_count;
    }
    
    // Check if total_count is directly in data
    if (response.data && typeof response.data.total_count === 'number') {
      return response.data.total_count;
    }
    
    // Default fallback
    return 0;
  };

  // Set current page specifically for a view
  const setCurrentPageForView = (page: number, viewKey: string) => {
    if (viewKey === 'upcoming' || viewKey === 'past') {
      setPaginationState(prev => ({
        ...prev,
        [viewKey]: { ...prev[viewKey], currentPage: page }
      }));
      
      // Only update the current page and fetch data if this is the active tab
      if (viewKey === activeTab) {
        fetchMeetingsData(viewKey);
      }
    }
  };

  // Helper function to fetch meetings data for a specific tab
  const fetchMeetingsData = useCallback(async (tab: 'upcoming' | 'past') => {
    const currentTabPage = paginationState[tab].currentPage;
    const status = tab === 'upcoming' ? 'Active' : 'completed';
    
    try {
      setIsLoading(true);
      const response = await meetingApi.searchMeetings(
        { status },
        { page_index: currentTabPage, page_size: pageSize }
      );
      
      const meetings = response.data?.items || [];
      
      // Safely extract metadata
      const totalCount = extractTotalCount(response);
      const metadata: PaginationMetadata = {
        total_count: totalCount,
        page_size: pageSize,
        current_page: currentTabPage,
        total_pages: Math.ceil(totalCount / pageSize),
        has_next: currentTabPage * pageSize < totalCount,
        has_previous: currentTabPage > 1
      };
      
      if (tab === 'upcoming') {
        setUpcomingMeetings(meetings);
        setUpcomingMeetingsMetadata(metadata);
      } else {
        setPastMeetings(meetings);
        setPastMeetingsMetadata(metadata);
      }
      
      // Update total counts if this is the active tab
      if (tab === activeTab) {
        setTotalItems(metadata.total_count);
        setTotalPages(metadata.total_pages);
      }
    } catch (error) {
      console.error(`Error fetching ${tab} meetings:`, error);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab, pageSize, paginationState]);
  
  // Handle tab changes
  const handleTabChange = (tab: 'upcoming' | 'past') => {
    setActiveTab(tab);
    
    // Update total items and pages for the new tab
    if (tab === 'upcoming') {
      setTotalItems(upcomingMeetingsMetadata?.total_count || 0);
      setTotalPages(upcomingMeetingsMetadata?.total_pages || 1);
    } else {
      setTotalItems(pastMeetingsMetadata?.total_count || 0);
      setTotalPages(pastMeetingsMetadata?.total_pages || 1);
    }
  };
  
  // Validate audio file
  const validateAudioFile = (file: File) => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      throw new Error('Kích thước file vượt quá giới hạn cho phép (100MB)');
    }
    
    const validAudioTypes = ['mp3', 'mpeg', 'wav', 'webm', 'm4a'];
    console.log('File type:', file.type.split("/")[1]);
    console.log('Valid audio types:', validAudioTypes);
    console.log('File size:', file.size);
    if (!validAudioTypes.includes(file.type.split("/")[1])) {
      throw new Error('Định dạng file không được hỗ trợ. Vui lòng sử dụng MP3, WAV, M4A hoặc WEBM');
    }
  };

  // Handle text upload
  const handleTextUpload = async (content: string, meetingId?: string) => {
    if (!content || content.trim() === '') {
      handleNotification('Nội dung bản ghi không được để trống', 'error');
      return;
    }

    setIsUploading(true);
    try {
      let response;
      
      // If meetingId is provided, upload transcript to that meeting
      if (meetingId) {
        response = await transcriptApi.uploadTranscript({
          transcript_content: content,
          meeting_id: meetingId
        });
      } else {
        alert('Vui lòng chọn một cuộc họp để tải lên bản ghi');
        return;
      }
      
      if (response.data) {
        handleNotification('Tải lên bản ghi thành công', 'success');
        setIsTextModalOpen(false);
        
        // If this created a new meeting, navigate to it
        if (response.data && 'meeting_id' in response.data && !meetingId) {
          NotificationToast({
            message: 'Tải lên bản ghi thành công',
            type: 'success',
          });
        } else {
          // Refresh the meeting list
          await fetchMeetingsData('past');
          await fetchMeetingsData('upcoming');
        }
      }
    } catch (err) {
      console.error('Error uploading transcript:', err);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMsg = (err as any).response?.data?.detail || 
                       (err as Error).message || 
                       'Đã xảy ra lỗi khi tải lên bản ghi';
      handleNotification(errorMsg, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle audio upload
  const handleAudioUpload = async (file: File, numSpeakers?: number, meetingId?: string) => {
    if (!file) {
      handleNotification('Vui lòng chọn file âm thanh', 'error');
      return;
    }

    // Validate audio file
    try {
      validateAudioFile(file);
    } catch (error) {
      handleNotification((error as Error).message, 'error');
      return;
    }

    setIsUploading(true);
    try {
      let response;
      
      // If meetingId is provided, upload audio to that meeting
      if (meetingId) {
        response = await transcriptApi.uploadAudioForTranscription(file, meetingId, numSpeakers);
      } else {
        alert('Vui lòng chọn một cuộc họp để tải lên file âm thanh');
        return;
      }
      
      if (response) {
        handleNotification('Tải lên file âm thanh thành công. Quá trình xử lý có thể mất một chút thời gian.', 'success');
        setIsAudioModalOpen(false);
        
        // If this created a new meeting, navigate to it
        if (response.data && 'meeting_id' in response.data && !meetingId) {
          NotificationToast({
            message: 'Tải lên file âm thanh thành công. Quá trình xử lý có thể mất một chút thời gian.',
            type: 'success',
          });
        } else {
          // Refresh the meeting list
          await fetchMeetingsData('past');
          await fetchMeetingsData('upcoming');
        }
      }
    } catch (err) {
      console.error('Error uploading audio:', err);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMsg = (err as any).response?.data?.detail || 
                       (err as Error).message || 
                       'Đã xảy ra lỗi khi tải lên file âm thanh';
      handleNotification(errorMsg, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // Fetch status counts only once when the component mounts
  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        // Fetch completed meetings count
        const completedResponse = await meetingApi.searchMeetings(
          { status: 'completed' },
          { page_index: 1, page_size: 1 }
        );
        
        // Safely extract the total count
        const completedCount = extractTotalCount(completedResponse);
        setCompletedMeetingsCount(completedCount);
        
        // Fetch cancelled meetings count
        const cancelledResponse = await meetingApi.searchMeetings(
          { status: 'cancelled' },
          { page_index: 1, page_size: 1 }
        );
        
        // Safely extract the total count
        const cancelledCount = extractTotalCount(cancelledResponse);
        setCancelledMeetingsCount(cancelledCount);
        
      } catch (error) {
        console.error('Error fetching status counts:', error);
      }
    };
    
    fetchStatusCounts();
  }, []);
  
  // Initial data fetch for both tabs
  useEffect(() => {
    const initData = async () => {
      try {
        await Promise.all([
          fetchMeetingsData('upcoming'),
          fetchMeetingsData('past')
        ]);
      } catch (error) {
        console.error('Error initializing dashboard data:', error);
      }
    };
    
    initData();
  }, []);
  
  // Fetch data only when page changes for the active tab
  useEffect(() => {
    fetchMeetingsData(activeTab as 'upcoming' | 'past');
  }, [activeTab, paginationState[activeTab as 'upcoming' | 'past'].currentPage, fetchMeetingsData]);
  
  const filterItems = [
    { key: 'all', label: 'Tất cả cuộc họp' },
    { key: 'today', label: 'Hôm nay' },
    { key: 'week', label: 'Tuần này' },
    { key: 'month', label: 'Tháng này' },
    { key: 'divider-1', label: '', divider: true },
    { key: 'scheduled', label: 'Đã lên lịch', icon: faCalendarDay },
    { key: 'completed', label: 'Hoàn thành', icon: faFileAlt },
    { key: 'cancelled', label: 'Đã hủy', icon: faFileAlt },
  ];

  const viewOptions = [
    { key: 'table', label: 'Xem Bảng', icon: faFileAlt },
    { key: 'calendar', label: 'Xem Lịch', icon: faCalendarDay },
  ];

  const currentItems = activeTab === 'past' ? pastMeetings : upcomingMeetings;

  const handleViewMeetingDetails = (meeting: MeetingResponse) => {
    console.log('Xem chi tiết cuộc họp:', meeting);
    return router.push(`/dashboard/meetings/${meeting.id}`);
  };

  const handleViewFullReport = () => {
    router.push('/dashboard/meetings');
  };

  return {
    // State
    activeTab,
    setActiveTab: handleTabChange,
    visibleContent, 
    setVisibleContent,
    currentPage,
    pageSize,
    upcomingMeetings,
    upcomingMeetingsMetadata,
    pastMeetings,
    pastMeetingsMetadata,
    isLoading,
    totalItems,
    totalPages,
    completedMeetingsCount,
    cancelledMeetingsCount,
    
    // Modal states
    isTextModalOpen,
    isAudioModalOpen,
    isUploading,
    notification,
    
    // Pagination
    setCurrentPage,
    setCurrentPageForView,
    
    // Derived values
    currentItems,
    filterItems,
    viewOptions,
    
    // Handlers
    handleViewMeetingDetails,
    handleViewFullReport,
    
    // Modal handlers
    openTextModal,
    closeTextModal,
    openAudioModal,
    closeAudioModal,
    handleTextUpload,
    handleAudioUpload,
    handleNotification
  };
};

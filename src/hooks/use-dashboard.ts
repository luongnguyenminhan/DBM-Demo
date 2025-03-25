'use client';

import { useState, useEffect } from 'react';
import { MeetingResponse } from '@/types/meeting.type';
import meetingApi from '@/apis/meetingApi';
import { PaginationMetadata } from '@/types/common.type';
import { 
  faFileAlt,
  faCalendarDay
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

export const useDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('past');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);
  const [visibleContent, setVisibleContent] = useState<'table' | 'calendar'>('table');
  
  const [upcomingMeetings, setUpcomingMeetings] = useState<MeetingResponse[]>([]);
  const [upcomingMeetingsMetadata, setUpcomingMeetingsMetadata] = useState<PaginationMetadata>({
    total_count: 0,
    page_size: pageSize,
    current_page: currentPage,
    total_pages: 0,
    has_next: false,
    has_previous: false
  });
  const [pastMeetingsMetadata, setPastMeetingsMetadata] = useState<PaginationMetadata>({
    total_count: 0,
    page_size: pageSize,
    current_page: currentPage,
    total_pages: 0,
    has_next: false,
    has_previous: false
  });
  const [pastMeetings, setPastMeetings] = useState<MeetingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [completedMeetingsCount, setCompletedMeetingsCount] = useState(0);
  const [cancelledMeetingsCount, setCancelledMeetingsCount] = useState(0);
  
  useEffect(() => {
    const fetchUpcomingMeetings = async () => {
      try {
        const response = await meetingApi.searchMeetings(
          { status: 'Active' },
          { page_index: currentPage, page_size: pageSize }
        );
        
        const meetings = response.data?.items || [];
        const metadata = response.metadata as unknown as PaginationMetadata;
        
        setUpcomingMeetings(meetings);
        setUpcomingMeetingsMetadata(metadata);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu cuộc họp sắp tới:', error);
      }
    };

    const fetchPastMeetings = async () => {
      try {
        const response = await meetingApi.searchMeetings(
          { status: 'completed' },
          { page_index: currentPage, page_size: pageSize }
        );
        
        const meetings = response.data?.items || [];
        const metadata = response.metadata as unknown as PaginationMetadata;
        
        setPastMeetings(meetings);
        setPastMeetingsMetadata(metadata);
        
        // Update total counts based on active tab
        if (activeTab === 'past') {
          setTotalItems(metadata?.total_count as number);
          setTotalPages(metadata?.total_pages as number);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu cuộc họp đã qua:', error);
      }
    };
    
    const fetchStatusCounts = async () => {
      try {
        // Fetch completed meetings count
        const completedResponse = await meetingApi.searchMeetings(
          { status: 'completed' },
          { page_index: 1, page_size: 1 }
        );
        setCompletedMeetingsCount(completedResponse.metadata?.total_count as number);
        
        // Fetch cancelled meetings count
        const cancelledResponse = await meetingApi.searchMeetings(
          { status: 'cancelled' },
          { page_index: 1, page_size: 1 }
        );
        if (cancelledResponse.metadata) {
          setCancelledMeetingsCount(cancelledResponse.metadata?.total_count as number);
        } else {
          setCancelledMeetingsCount(0);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu số lượng:', error);
      }
    };
    
    setIsLoading(true);
    
    Promise.all([
      fetchUpcomingMeetings(),
      fetchPastMeetings(),
      fetchStatusCounts()
    ]).finally(() => {
      setIsLoading(false);
    });
    
  }, [currentPage, pageSize, activeTab]);

  useEffect(() => {
    // Update total items and pages when active tab changes
    if (activeTab === 'upcoming') {
      setTotalItems(upcomingMeetingsMetadata?.total_count as number);
      setTotalPages(upcomingMeetingsMetadata?.total_pages as number);
    } else {
      setTotalItems(pastMeetingsMetadata?.total_count as number);
      setTotalPages(pastMeetingsMetadata?.total_pages as number);
    }
  }, [activeTab, upcomingMeetingsMetadata, pastMeetingsMetadata]);
  
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
    return router.push(`/meetings/${meeting.id}`);
  };

  const handleViewFullReport = () => {
    console.log('Xem báo cáo phân tích đầy đủ');
  };

  return {
    // State
    activeTab,
    setActiveTab,
    currentPage,
    setCurrentPage,
    pageSize,
    visibleContent,
    setVisibleContent,
    upcomingMeetings,
    upcomingMeetingsMetadata,
    pastMeetingsMetadata, // Fixed variable name
    pastMeetings,
    isLoading,
    totalItems,
    totalPages,
    completedMeetingsCount,
    cancelledMeetingsCount,
    
    // Derived values
    currentItems,
    filterItems,
    viewOptions,
    
    // Handlers
    handleViewMeetingDetails,
    handleViewFullReport
  };
};

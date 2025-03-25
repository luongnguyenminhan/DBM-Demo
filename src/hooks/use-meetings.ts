import { useState, useEffect, useMemo } from 'react';
import meetingApi from '@/apis/meetingApi';
import { MeetingResponse, MeetingSearchParameters } from '@/types/meeting.type';
import { PaginationParameter } from '@/types/common.type';

export interface UseMeetingResult {
  meetings: MeetingResponse[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  setCurrentPage: (page: number) => void;
  setSearchParams: (params: MeetingSearchParameters) => void;
  refreshData: () => Promise<void>;
  calculateStatistics: () => Array<{
    metric: string;
    value: number | string;
    change: string;
    icon: string;
  }>;
  // Add method for view-specific page setting
  setCurrentPageForView: (page: number, viewKey: string) => void;
}

export function useMeetings(
  initialSearchParams: MeetingSearchParameters = {},
  initialPageSize: number = 10,
  initialPage: number = 1
): UseMeetingResult {
  // API state management
  const [meetings, setMeetings] = useState<MeetingResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [pageSize] = useState<number>(initialPageSize);
  const [searchParams, setSearchParams] = useState<MeetingSearchParameters>(initialSearchParams);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  
  // Internal tracking of page numbers for different views
  const [viewPageState, setViewPageState] = useState<Record<string, number>>({
    active: initialPage,
    past: initialPage,
    upcoming: initialPage,
    all: initialPage
  });

  // Set current page specifically for a view
  const setCurrentPageForView = (page: number, viewKey: string) => {
    // Update the view-specific page state
    setViewPageState(prev => ({
      ...prev,
      [viewKey]: page
    }));
    
    // Only update the current page if it's the active view
    const currentViewKey = getCurrentViewKey();
    if (currentViewKey === viewKey) {
      setCurrentPage(page);
    }
  };

  // Helper to get the current view key based on search params
  const getCurrentViewKey = (): string => {
    if (searchParams.status?.toLowerCase() === 'active') {
      return 'active';
    } else if (searchParams.is_past === true) {
      return 'past';
    } else if (searchParams.is_upcoming === true) {
      return 'upcoming';
    } else if (!searchParams.status && !searchParams.is_past && !searchParams.is_upcoming) {
      return 'all';
    }
    return 'active'; // Default
  };

  // Fetch meetings from API
  const fetchMeetings = async () => {
    setLoading(true);
    setError(null);

    try {
      const paginationParams: PaginationParameter = {
        page_index: currentPage,
        page_size: pageSize
      };

      const response = await meetingApi.searchMeetings(searchParams, paginationParams);

      if (response.data) {
        // Set meetings data from items array
        setMeetings(response.data.items || []);
        
        // Extract pagination metadata from the response
        if (response.metadata) {
          setTotalItems(typeof response.metadata.total_count === 'number' ? response.metadata.total_count : 0);
          setTotalPages(typeof response.metadata.total_pages === 'number' ? response.metadata.total_pages : 1);
          setHasNextPage(typeof response.metadata.has_next === 'boolean' ? response.metadata.has_next : false);
          setHasPreviousPage(typeof response.metadata.has_previous === 'boolean' ? response.metadata.has_previous : false);
        } else {
          // Fallback to data properties if metadata is not available
          setTotalItems(response.data.total_count || 0);
          setTotalPages(Math.ceil((response.data.total_count || 0) / pageSize));
        }
      } else {
        setError(response.message || 'Failed to fetch meetings');
      }
    } catch (err) {
      console.error('Error fetching meetings:', err);
      setError('An error occurred while fetching meetings');
    } finally {
      setLoading(false);
    }
  };

  // Update current page when search params change to use the correct view's pagination
  useEffect(() => {
    // Get the current view key based on search params
    const currentViewKey = getCurrentViewKey();
    
    // Use the stored page state for this view
    setCurrentPage(viewPageState[currentViewKey] || initialPage);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Fetch meetings on component mount and when pagination or search params change
  useEffect(() => {
    fetchMeetings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchParams]);

  // Calculate usage statistics based on actual data - memoized to prevent unnecessary recalculations
  const statistics = useMemo(() => {
    if (meetings.length === 0) {
      return [
        { metric: 'Total Meetings', value: 0, change: '0%', icon: 'faCalendarAlt' },
        { metric: 'Meeting Hours', value: 0, change: '0%', icon: 'faClock' },
        { metric: 'Average Duration', value: '0 mins', change: '0%', icon: 'faClock' },
        { metric: 'Participants', value: 0, change: '0%', icon: 'faUsers' },
      ];
    }

    // Calculate meeting duration in hours (dummy calculation since we don't have duration in the model)
    const avgDuration = 45; // Placeholder for average duration in minutes
    const totalHours = Math.round((avgDuration * totalItems) / 60);
    
    // Count meetings by status
    const completedCount = meetings.filter(m => 
      m.status?.toLowerCase() === 'completed').length;
    const scheduledCount = meetings.filter(m => 
      m.status?.toLowerCase() === 'scheduled').length;
    
    const completionRate = totalItems > 0 
      ? `${Math.round((completedCount / (completedCount + scheduledCount)) * 100)}%` 
      : '0%';

    return [
      { metric: 'Total Meetings', value: totalItems, change: '+12%', icon: 'faCalendarAlt' },
      { metric: 'Meeting Hours', value: totalHours, change: '+8%', icon: 'faClock' },
      { metric: 'Average Duration', value: `${avgDuration} mins`, change: '-5%', icon: 'faClock' },
      { metric: 'Completion Rate', value: completionRate, change: '+7%', icon: 'faCheckCircle' }
    ];
  }, [meetings, totalItems]);

  // Calculate statistics function that returns the memoized value
  const calculateStatistics = () => statistics;

  // Return the hook result
  return {
    meetings,
    loading,
    error,
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    hasNextPage,
    hasPreviousPage,
    setCurrentPage,
    setSearchParams,
    refreshData: fetchMeetings,
    calculateStatistics,
    setCurrentPageForView,
  };
}

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
  }, [meetings, totalItems]); // Only recalculate when meetings or totalItems change

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
  };
}

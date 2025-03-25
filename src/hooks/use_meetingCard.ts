/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { MeetingResponse, MeetingSearchParameters } from '@/types/meeting.type';
import { useMeetings } from './use-meetings';

interface UseMeetingCardResult {
  activeKey: string;
  meetings: MeetingResponse[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  viewOptions: Array<{ key: string; label: string }>;
  setActiveKey: (key: string) => void;
  setCurrentPage: (page: number) => void;
  setCurrentPageForView: (page: number, viewKey: string) => void;
  handleTabChange: (key: string) => void;
  tabData: Record<string, {
    items: MeetingResponse[];
    loading: boolean;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>;
}

/**
 * A custom hook for managing meeting cards with separate pagination state for each view/tab
 */
export function useMeetingCard(
  initialActiveKey: string = 'active',
  pageSize: number = 10
): UseMeetingCardResult {
  // Track the active tab/view
  const [activeKey, setActiveKey] = useState<string>(initialActiveKey);
  
  // Search parameters are derived from the active key
  const [searchParams, setSearchParams] = useState<MeetingSearchParameters>(
    getSearchParamsFromKey(initialActiveKey)
  );

  // Use the meetings hook with our active key's search params
  const {
    meetings,
    loading,
    error,
    totalItems,
    totalPages,
    currentPage,
    pageSize: meetingPageSize,
    setCurrentPageForView,
    setCurrentPage,
    setSearchParams: updateSearchParams,
  } = useMeetings(searchParams, pageSize, 1);

  // View options for the dropdown
  const viewOptions = [
    { key: 'active', label: 'Cuộc họp hiện tại' },
    { key: 'past', label: 'Cuộc họp đã kết thúc' },
    { key: 'upcoming', label: 'Cuộc họp sắp tới' },
    { key: 'all', label: 'Tất cả cuộc họp' },
  ];

  // Track data for each tab separately to maintain state when switching
  const [tabData, setTabData] = useState<Record<string, {
    items: MeetingResponse[];
    loading: boolean;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }>>({
    active: { items: [], loading: true, totalItems: 0, totalPages: 1, currentPage: 1 },
    past: { items: [], loading: true, totalItems: 0, totalPages: 1, currentPage: 1 },
    upcoming: { items: [], loading: true, totalItems: 0, totalPages: 1, currentPage: 1 },
    all: { items: [], loading: true, totalItems: 0, totalPages: 1, currentPage: 1 },
  });

  // Helper to get search params from a tab key
  function getSearchParamsFromKey(key: string): MeetingSearchParameters {
    switch (key) {
      case 'active':
        return { status: 'active' };
      case 'past':
        return { is_past: true };
      case 'upcoming':
        return { is_upcoming: true };
      case 'all':
      default:
        return {};
    }
  }

  // Handle tab change
  const handleTabChange = (key: string) => {
    setActiveKey(key);
    const newSearchParams = getSearchParamsFromKey(key);
    updateSearchParams(newSearchParams);
  };

  // Update the tab data when meetings data changes
  useEffect(() => {
    if (!loading) {
      setTabData(prev => ({
        ...prev,
        [activeKey]: {
          items: meetings,
          loading,
          totalItems,
          totalPages,
          currentPage
        }
      }));
    }
  }, [meetings, loading, totalItems, totalPages, activeKey, currentPage]);

  return {
    activeKey,
    meetings,
    loading,
    error,
    totalItems,
    totalPages,
    currentPage,
    pageSize: meetingPageSize,
    viewOptions,
    setActiveKey,
    setCurrentPage,
    setCurrentPageForView,
    handleTabChange,
    tabData
  };
}

export default useMeetingCard;

'use client';

import React from 'react';
import { faCalendarAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Card from '@/components/atomic/card';
import TabNavigation from '@/components/molecules/tabNavigation';
import MeetingsTable from './MeetingsTable';
import MeetingsCalendar from './MeetingsCalendar';
import {MeetingResponse } from '@/types/meeting.type';

interface MeetingsPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentItems: MeetingResponse[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  visibleContent: 'table' | 'calendar';
  setVisibleContent: (content: 'table' | 'calendar') => void;
  filterItems: Array<{ key: string; label: string; icon?: IconDefinition; divider?: boolean }>;
  viewOptions: Array<{ key: string; label: string; icon?: IconDefinition }>;
  setCurrentPage: (page: number) => void;
  upcomingMeetingsCount: number;
  pastMeetingsCount: number;
  onViewDetails?: (meeting: MeetingResponse) => void;
}

const MeetingsPanel: React.FC<MeetingsPanelProps> = ({
  activeTab,
  setActiveTab,
  currentItems,
  totalItems,
  totalPages,
  currentPage,
  pageSize,
  visibleContent,
  setVisibleContent,
  filterItems,
  viewOptions,
  setCurrentPage,
  upcomingMeetingsCount,
  pastMeetingsCount,
  onViewDetails
}) => {
  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleViewOptionChange = (key: string) => {
    if (key === 'table' || key === 'calendar') {
      setVisibleContent(key);
    }
  };

  const renderMeetingTabContent = () => {
    return (
      <>
        {visibleContent === 'table' ? (
          <MeetingsTable
            currentItems={currentItems}
            totalItems={totalItems}
            totalPages={totalPages}
            currentPage={currentPage}
            pageSize={pageSize}
            visibleContent={visibleContent}
            filterItems={filterItems}
            viewOptions={viewOptions}
            setCurrentPage={setCurrentPage}
            onViewOptionChange={handleViewOptionChange}
            onViewDetails={onViewDetails}
          />
        ) : (
          <MeetingsCalendar
            currentItems={currentItems}
            totalItems={totalItems}
            totalPages={totalPages}
            visibleContent={visibleContent}
            viewOptions={viewOptions}
            currentPage={currentPage}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            onViewOptionChange={handleViewOptionChange}
            onViewDetails={onViewDetails}
          />
        )}
      </>
    );
  };

  return (
    <Card 
      title="Cuộc Họp"
      subtitle="Quản lý cuộc họp sắp tới và đã qua"
      headerIcon={faCalendarAlt}
      variant="default"
      withShadow
    >
      {/* Tab Navigation cho các loại cuộc họp */}
      <TabNavigation
        activeKey={activeTab}
        tabs={[
          { 
            key: 'past', 
            label: 'Đã qua', 
            badge: pastMeetingsCount.toString(),
            badgeVariant: 'secondary',
            content: renderMeetingTabContent()
          },
          { 
            key: 'upcoming', 
            label: 'Sắp tới', 
            badge: upcomingMeetingsCount.toString(),
            badgeVariant: 'primary',
            content: renderMeetingTabContent()
          },
        ]}
        variant="default"
        withBorder
        borderRadius="medium"
        onChange={handleTabChange}
      />
    </Card>
  );
};

export default MeetingsPanel;

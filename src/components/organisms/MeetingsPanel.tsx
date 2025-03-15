'use client';

import React from 'react';
import { faCalendarAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Card from '@/components/atomic/card';
import TabNavigation from '@/components/molecules/tabNavigation';
import MeetingsTable from './MeetingsTable';
import MeetingsCalendar from './MeetingsCalendar';
import { Meeting } from '@/types/meeting.type';

interface MeetingsPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setActiveFilter: (filter: string) => void;
  activeFilter: string;
  currentItems: Meeting[];
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
  onViewDetails?: (meeting: Meeting) => void;
}

const MeetingsPanel: React.FC<MeetingsPanelProps> = ({
  activeTab,
  setActiveTab,
  setActiveFilter,
  activeFilter,
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
    setActiveFilter('all');
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
            activeFilter={activeFilter}
            setCurrentPage={setCurrentPage}
            onViewOptionChange={handleViewOptionChange}
            onFilterChange={setActiveFilter}
            onViewDetails={onViewDetails}
          />
        ) : (
          <MeetingsCalendar
            currentItems={currentItems}
            totalItems={totalItems}
            totalPages={totalPages}
            currentPage={currentPage}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
            onViewDetails={onViewDetails}
          />
        )}
      </>
    );
  };

  return (
    <Card 
      title="Meetings"
      subtitle="Manage your upcoming and past meetings"
      headerIcon={faCalendarAlt}
      variant="default"
      withShadow
    >
      {/* Tab Navigation for meeting types */}
      <TabNavigation
        activeKey={activeTab}
        tabs={[
          { 
            key: 'upcoming', 
            label: 'Upcoming', 
            badge: upcomingMeetingsCount.toString(),
            badgeVariant: 'primary',
            content: renderMeetingTabContent()
          },
          { 
            key: 'past', 
            label: 'Past', 
            badge: pastMeetingsCount.toString(),
            badgeVariant: 'secondary',
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

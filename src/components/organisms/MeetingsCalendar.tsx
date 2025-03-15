'use client';

import React from 'react';
import { 
  faCalendarAlt, 
  faClock, 
  faUsers,
  faChevronRight 
} from '@fortawesome/free-solid-svg-icons';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Icon from '@/components/atomic/icon';
import Card from '@/components/atomic/card';
import PaginationControl from '@/components/molecules/paginationControl';
import { Meeting } from '@/types/meeting.type';

const { Text } = Typography;

interface MeetingsCalendarProps {
  currentItems: Meeting[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  onViewDetails?: (meeting: Meeting) => void;
  setCurrentPage: (page: number) => void;
}

const MeetingsCalendar: React.FC<MeetingsCalendarProps> = ({
  currentItems,
  totalItems,
  totalPages,
  currentPage,
  pageSize,
  onViewDetails,
  setCurrentPage
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
        {currentItems.length > 0 ? currentItems.map((meeting) => (
          <Card 
            key={meeting.id} 
            size="small" 
            padding="md"
            withAnimation
            withShadow
          >
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-start">
                <Text weight="medium" size="sm">{meeting.title}</Text>
                {meeting.status === 'scheduled' && (
                  <span className="px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">
                    {meeting.status}
                  </span>
                )}
                {meeting.status === 'completed' && (
                  <span className="px-1.5 py-0.5 rounded-full text-xs bg-green-100 text-green-700">
                    {meeting.status}
                  </span>
                )}
                {meeting.status === 'cancelled' && (
                  <span className="px-1.5 py-0.5 rounded-full text-xs bg-red-100 text-red-700">
                    {meeting.status}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Icon icon={faCalendarAlt} size="xs" />
                <Text size="xs" variant="muted">{meeting.date}</Text>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Icon icon={faClock} size="xs" />
                <Text size="xs" variant="muted">{meeting.duration}</Text>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Icon icon={faUsers} size="xs" />
                <Text size="xs" variant="muted">{meeting.attendees} attendees</Text>
              </div>
              <div className="mt-2">
                <Button 
                  variant="outline"
                  size="small"
                  isFullWidth
                  rightIcon={faChevronRight}
                  onClick={() => onViewDetails?.(meeting)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        )) : (
          <div className="col-span-full flex justify-center py-8">
            <Text variant="muted">No meetings match your filters</Text>
          </div>
        )}
      </div>
      
      {totalItems > pageSize && (
        <div className="mt-4">
          <PaginationControl
            totalPages={totalPages}
            currentPage={currentPage}
            onChange={setCurrentPage}
            showTotal
            totalItems={totalItems}
            pageSize={pageSize}
            size="small"
            align="right"
            rounded
          />
        </div>
      )}
    </div>
  );
};

export default MeetingsCalendar;

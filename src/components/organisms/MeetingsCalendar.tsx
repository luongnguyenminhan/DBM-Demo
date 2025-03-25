'use client';

import React from 'react';
import { 
  faCalendarAlt, 
  faClock, 
  faChevronRight,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Icon from '@/components/atomic/icon';
import Card from '@/components/atomic/card';
import PaginationControl from '@/components/molecules/paginationControl';
import DropdownMenu from '@/components/molecules/dropdown';
import { MeetingResponse } from '@/types/meeting.type';

const { Text } = Typography;

interface MeetingsCalendarProps {
  currentItems: MeetingResponse[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  visibleContent: 'table' | 'calendar';
  viewOptions: Array<{ key: string; label: string; icon?: IconDefinition }>;
  onViewOptionChange?: (view: string) => void;
  onViewDetails?: (meeting: MeetingResponse) => void;
  setCurrentPage: (page: number) => void;
}

const MeetingsCalendar: React.FC<MeetingsCalendarProps> = ({
  currentItems,
  totalItems,
  totalPages,
  currentPage,
  pageSize,
  visibleContent,
  viewOptions,
  onViewOptionChange,
  onViewDetails,
  setCurrentPage
}) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
        <Text size="sm" variant="muted">
          Hiển thị {currentItems.length} trong số {totalItems} cuộc họp
        </Text>
        <div className="flex flex-wrap gap-2">
          <DropdownMenu
            items={viewOptions.map(item => ({
              key: item.key,
              label: item.label,
              icon: item.icon as IconDefinition | undefined,
              divider: false
            }))}
            label={visibleContent === 'table' ? 'Xem Bảng' : 'Xem Lịch'}
            variant="outline"
            size="small"
            rounded
            onSelect={onViewOptionChange}
          />
        </div>
      </div>
      
      {visibleContent === 'calendar' ? (
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
                  <Text weight="medium" size="sm">{meeting.title || meeting.meeting_id}</Text>
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    meeting.status?.toLocaleLowerCase() === 'active' || meeting.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                    meeting.status?.toLocaleLowerCase() === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {meeting.status === 'active' || meeting.status === 'scheduled' ? 'Đã lên lịch' : 
                     meeting.status?.toLocaleLowerCase() === 'completed' ? 'Hoàn thành' : 
                     meeting.status?.toLocaleLowerCase() === 'cancelled' ? 'Đã hủy' : meeting.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Icon icon={faCalendarAlt} size="xs" />
                  <Text size="xs" variant="muted">
                    {new Date(meeting.start_time as string).toLocaleDateString('vi-VN', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </Text>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Icon icon={faClock} size="xs" />
                  <Text size="xs" variant="muted">
                    {new Date(meeting.start_time as string).toLocaleTimeString('vi-VN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                </div>
                <div className="mt-2">
                  <Button 
                    variant="outline"
                    size="small"
                    isFullWidth
                    rightIcon={faChevronRight}
                    onClick={() => onViewDetails?.(meeting)}
                  >
                    Xem Chi Tiết
                  </Button>
                </div>
              </div>
            </Card>
          )) : (
            <div className="col-span-full flex justify-center py-8">
              <Text variant="muted">Không có cuộc họp nào phù hợp với bộ lọc của bạn</Text>
            </div>
          )}
        </div>
      ) : null}
      
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

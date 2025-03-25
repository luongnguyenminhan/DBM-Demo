'use client';

import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  faCalendarAlt, 
  faCheck, 
  faTimes, 
  faChevronRight, 
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Icon from '@/components/atomic/icon';
import PaginationControl from '@/components/molecules/paginationControl';
import DropdownMenu from '@/components/molecules/dropdown';
import {MeetingResponse } from '@/types/meeting.type';

const { Text } = Typography;

interface MeetingsTableProps {
  currentItems: MeetingResponse[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  visibleContent: 'table' | 'calendar';
  filterItems: Array<{ key: string; label: string; icon?: IconDefinition; divider?: boolean }>;
  viewOptions: Array<{ key: string; label: string; icon?: IconDefinition }>;
  setCurrentPage: (page: number) => void;
  onViewOptionChange?: (view: string) => void;
  onViewDetails?: (meeting: MeetingResponse) => void;
}

const MeetingsTable: React.FC<MeetingsTableProps> = ({
  currentItems,
  totalItems,
  totalPages,
  currentPage,
  pageSize,
  visibleContent,
  viewOptions,
  setCurrentPage,
  onViewOptionChange,
  onViewDetails
}) => {
  // Định nghĩa cột cho Bảng Ant Design với mã hóa màu trạng thái
  const columns: ColumnsType<MeetingResponse> = [
    {
      title: 'Cuộc họp',
      dataIndex: 'meeting_id',
      key: 'meeting_id',
      render: (text) => <Text weight="medium">{text}</Text>,
      width: '20%',
      ellipsis: true,
    },
    {
      title: 'Ngày',
      dataIndex: 'start_time',
      key: 'start_time',
      render: (text) => {
        const date = new Date(text);
        const formattedDate = date.toLocaleDateString('vi-VN', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        const formattedTime = date.toLocaleTimeString('vi-VN', {
          hour: '2-digit',
          minute: '2-digit'
        });
        return <Text variant="muted" size="sm">{`${formattedDate}, ${formattedTime}`}</Text>;
      },
      width: '20%',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      render: (status) => {
        let color = '';
        let icon;
        let statusText = '';
        
        switch(status.toLowerCase()) {
          case 'active':
            color = 'text-blue-600 bg-blue-50 border border-blue-200';
            icon = faCalendarAlt;
            statusText = 'Đã lên lịch';
            break;
          case 'completed':
            color = 'text-green-600 bg-green-50 border border-green-200';
            icon = faCheck;
            statusText = 'Hoàn thành';
            break;
          case 'cancelled':
            color = 'text-red-600 bg-red-50 border border-red-200';
            icon = faTimes;
            statusText = 'Đã hủy';
            break;
        }
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${color} flex items-center gap-1 w-fit`}>
            <Icon icon={icon!} size="xs" />
            {statusText}
          </span>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      align: 'right',
      width: '10%',
      render: (_, record) => (
        <Button 
          variant="outline" 
          size="small" 
          rightIcon={faChevronRight} 
          rounded
          onClick={() => onViewDetails?.(record)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="overflow-auto py-2">
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
      
      {visibleContent === 'table' ? (
        <>
          <Table
            columns={columns} 
            dataSource={currentItems} 
            rowKey="id"
            pagination={false}
            className="custom-antd-table"
            size="middle"
            scroll={{ x: 800 }}
            locale={{
              emptyText: totalItems === 0 ? 
                'Không tìm thấy cuộc họp nào' : 
                'Không có cuộc họp nào phù hợp với bộ lọc của bạn'
            }}
          />
          
          {totalItems > 0 && (
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
                showFirstLastButtons
              />
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

export default MeetingsTable;

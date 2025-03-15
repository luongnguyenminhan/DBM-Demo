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
import { Meeting } from '@/types/meeting.type';

const { Text } = Typography;

interface MeetingsTableProps {
  currentItems: Meeting[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  visibleContent: 'table' | 'calendar';
  filterItems: Array<{ key: string; label: string; icon?: IconDefinition; divider?: boolean }>;
  viewOptions: Array<{ key: string; label: string; icon?: IconDefinition }>;
  activeFilter: string;
  setCurrentPage: (page: number) => void;
  onViewOptionChange?: (view: string) => void;
  onFilterChange?: (filter: string) => void;
  onViewDetails?: (meeting: Meeting) => void;
}

const MeetingsTable: React.FC<MeetingsTableProps> = ({
  currentItems,
  totalItems,
  totalPages,
  currentPage,
  pageSize,
  visibleContent,
  filterItems,
  viewOptions,
  activeFilter,
  setCurrentPage,
  onViewOptionChange,
  onFilterChange,
  onViewDetails
}) => {
  // Define columns for Ant Design Table with status color coding
  const columns: ColumnsType<Meeting> = [
    {
      title: 'Meeting',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text) => <Text weight="medium">{text}</Text>,
      width: '25%',
      ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date),
      render: (text) => <Text variant="muted" size="sm">{text}</Text>,
      width: '15%',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (text) => <Text variant="muted" size="sm">{text}</Text>,
      width: '15%',
    },
    {
      title: 'Attendees',
      dataIndex: 'attendees',
      key: 'attendees',
      sorter: (a, b) => a.attendees - b.attendees,
      render: (text) => <Text variant="primary" weight="medium">{text}</Text>,
      width: '10%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '15%',
      render: (status) => {
        let color = '';
        let icon;
        
        switch(status) {
          case 'scheduled':
            color = 'text-blue-600 bg-blue-50 border border-blue-200';
            icon = faCalendarAlt;
            break;
          case 'completed':
            color = 'text-green-600 bg-green-50 border border-green-200';
            icon = faCheck;
            break;
          case 'cancelled':
            color = 'text-red-600 bg-red-50 border border-red-200';
            icon = faTimes;
            break;
        }
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${color} flex items-center gap-1 w-fit`}>
            <Icon icon={icon!} size="xs" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      align: 'right',
      width: '15%',
      render: (_, record) => (
        <Button 
          variant="outline" 
          size="small" 
          rightIcon={faChevronRight} 
          rounded
          onClick={() => onViewDetails?.(record)}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <div className="overflow-auto py-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
        <Text size="sm" variant="muted">
          Showing {currentItems.length} of {totalItems} meetings
        </Text>
        <div className="flex flex-wrap gap-2">
          <DropdownMenu
            items={viewOptions.map(item => ({
              key: item.key,
              label: item.label,
              icon: item.icon as IconDefinition | undefined,
              divider: false
            }))}
            label={visibleContent === 'table' ? 'Table View' : 'Calendar View'}
            variant="outline"
            size="small"
            rounded
            onSelect={onViewOptionChange}
          />
          <DropdownMenu
            items={filterItems.map(item => 
              item.divider 
            ? { key: item.key, divider: true as const } 
            : {
                key: item.key,
                label: item.label,
                icon: item.icon as IconDefinition | undefined,
                divider: false
              }
            )}
            label={`Filter: ${filterItems.find(item => item.key === activeFilter)?.label || 'All'}`}
            variant="outline"
            size="small"
            rounded
            onSelect={onFilterChange}
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
                'No meetings found' : 
                'No meetings match your filters'
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

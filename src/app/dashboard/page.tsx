'use client';

import React from 'react';
import StatCard from '@/components/molecules/StatCard';
import { faCalendarAlt, faClock, faUsers, faCheckCircle, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import PaginationControl from '@/components/molecules/paginationControl';
import { useMeetings } from '@/hooks/use-meetings';
import { MeetingResponse, MeetingSearchParameters } from '@/types/meeting.type';
import Button from '@/components/atomic/button';

// Map for icon string to actual icon components
const iconMap = {
  faCalendarAlt,
  faClock,
  faUsers,
  faCheckCircle
};

export default function DashboardPage() {
  // Use the meetings hook
  const {
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
    refreshData: fetchMeetings,
    calculateStatistics
  } = useMeetings({} as MeetingSearchParameters, 10, 1);

  // Map the statistics data with proper icon objects
  const statisticsData = calculateStatistics().map(stat => ({
    ...stat,
    icon: iconMap[stat.icon as keyof typeof iconMap]
  }));

  // Handlers for meeting actions
  const handleViewMeetingDetails = (meeting: MeetingResponse) => {
    alert(`View details for meeting: ${meeting.meeting_id}`);
  };

  const handleEditMeeting = (meeting: MeetingResponse) => {
    alert(`Edit meeting: ${meeting.meeting_id}`);
  };

  const handleDeleteMeeting = (meeting: MeetingResponse) => {
    alert(`Delete meeting: ${meeting.meeting_id}`);
  };

  // Format date for display
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      console.error('Error parsing date', error);
      return 'Invalid Date';
    }
  };

  return (
    <div className="h-screen grid grid-rows-[120px_1fr] gap-4 p-4">
      {/* Usage Summary Cards - Top Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {statisticsData.map((item, index) => (
          <StatCard 
            key={`stat-${item.metric}-${index}`}
            metric={item.metric}
            value={item.value}
            change={item.change}
            icon={item.icon}
            withAnimation
          />
        ))}
      </div>

      {/* Bottom Row: Meeting List and Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100%-120px)]">
        {/* Meeting List - Spans 2 columns */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow flex flex-col h-full">
          <div className="flex-grow overflow-auto">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Loading meetings...</p>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-red-500">{error}</p>
                <button 
                  onClick={fetchMeetings}
                  className="ml-2 text-blue-500 hover:text-blue-700"
                >
                  Retry
                </button>
              </div>
            ) : meetings.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">No meetings found</p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Meeting ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Platform
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {meetings.map((meeting) => (
                    <tr 
                      key={meeting.id || meeting.meeting_id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {meeting.meeting_id || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {meeting.platform || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(meeting.start_time)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {meeting.start_time && meeting.end_time ? 
                          `${Math.round((new Date(meeting.end_time).getTime() - new Date(meeting.start_time).getTime()) / 60000)} mins` : 
                          'N/A'
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          meeting.status?.toLowerCase() === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          meeting.status?.toLowerCase() === 'completed' ? 'bg-green-100 text-green-800' :
                          meeting.status?.toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {meeting.status || 'Unknown'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="small"
                            leftIcon={faEye}
                            rounded
                            onClick={() => handleViewMeetingDetails(meeting)}
                          >
                            View
                          </Button>
                          <Button
                            variant="outline"
                            size="small"
                            leftIcon={faEdit}
                            rounded
                            onClick={() => handleEditMeeting(meeting)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="small"
                            leftIcon={faTrash}
                            rounded
                            onClick={() => handleDeleteMeeting(meeting)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="border-t border-gray-200 p-3">
            {!loading && meetings.length > 0 && (
              <PaginationControl
                totalPages={totalPages}
                currentPage={currentPage}
                onChange={setCurrentPage}
                isDisabled={loading}
                variant="primary"
                size="small"
                align="right"
                showTotal={true}
                totalItems={totalItems}
                pageSize={pageSize}
                showQuickJump={true}
                showFirstLastButtons={true}
                withAnimation={true}
                rounded={true}
                withBorder={true}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
              />
            )}
          </div>
        </div>

        {/* Side Panel - Spans 1 column */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow flex flex-col h-full">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Meeting Analytics</h3>
          </div>
          <div className="flex-grow overflow-auto p-4">
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center items-center h-[100px]">
                  <p className="text-gray-500">Loading analytics...</p>
                </div>
              ) : (
                <>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Meeting Status</h4>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">Scheduled</p>
                        <p className="text-2xl font-semibold text-blue-600">
                          {meetings.filter(m => m.status?.toLowerCase() === 'scheduled').length}
                        </p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-green-800">Completed</p>
                        <p className="text-2xl font-semibold text-green-600">
                          {meetings.filter(m => m.status?.toLowerCase() === 'completed').length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Most Active Platforms</h4>
                    <div className="mt-2">
                      {Array.from(new Set(meetings.map(m => m.platform)))
                        .filter(platform => platform) // Filter out null/undefined
                        .map((platform, idx) => (
                          <div key={idx} className="py-2 flex justify-between">
                            <span className="text-sm">{platform}</span>
                            <span className="text-sm font-medium text-gray-900">
                              {meetings.filter(m => m.platform === platform).length} meetings
                            </span>
                          </div>
                        ))}
                      {/* Show Unknown platforms count if there are any */}
                      {meetings.some(m => !m.platform) && (
                        <div className="py-2 flex justify-between">
                          <span className="text-sm">Unknown</span>
                          <span className="text-sm font-medium text-gray-900">
                            {meetings.filter(m => !m.platform).length} meetings
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Pagination Summary</h4>
                    <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                      <div className="py-1 flex justify-between">
                        <span className="text-xs text-gray-500">Current Page</span>
                        <span className="text-xs font-medium">{currentPage}</span>
                      </div>
                      <div className="py-1 flex justify-between">
                        <span className="text-xs text-gray-500">Total Pages</span>
                        <span className="text-xs font-medium">{totalPages}</span>
                      </div>
                      <div className="py-1 flex justify-between">
                        <span className="text-xs text-gray-500">Total Items</span>
                        <span className="text-xs font-medium">{totalItems}</span>
                      </div>
                      <div className="py-1 flex justify-between">
                        <span className="text-xs text-gray-500">Has Next</span>
                        <span className="text-xs font-medium">{hasNextPage ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="py-1 flex justify-between">
                        <span className="text-xs text-gray-500">Has Previous</span>
                        <span className="text-xs font-medium">{hasPreviousPage ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button 
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              onClick={() => alert('View full report clicked')}
            >
              View Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import DashboardHeader from '@/components/organisms/DashboardHeader';
import StatsSummary from '@/components/organisms/StatsSummary';
import MeetingsPanel from '@/components/organisms/MeetingsPanel';
import AnalyticsPanel from '@/components/organisms/AnalyticsPanel';
import NotificationAlert from '@/components/organisms/NotificationAlert';
import { 
  faFileAlt,
  faCalendarDay
} from '@fortawesome/free-solid-svg-icons';
import { Meeting } from '@/types/meeting.type';

export default function DashboardPage() {
  // State for tab navigation, pagination, and filters
  const [activeTab, setActiveTab] = useState('upcoming');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleContent, setVisibleContent] = useState<'table' | 'calendar'>('table');
  
  // Sample data - in a real app, this would come from API or database
  const upcomingMeetings = useMemo<Meeting[]>(() => [
    { id: 1, title: 'Weekly Sprint Review', date: '2023-06-10', duration: '45 mins', attendees: 8, status: 'scheduled' },
    { id: 2, title: 'Product Design Discussion', date: '2023-06-12', duration: '60 mins', attendees: 5, status: 'scheduled' },
    { id: 3, title: 'Quarterly Planning', date: '2023-06-15', duration: '120 mins', attendees: 12, status: 'scheduled' },
    { id: 4, title: 'Client Presentation', date: '2023-06-18', duration: '30 mins', attendees: 4, status: 'scheduled' },
    { id: 5, title: 'Marketing Strategy', date: '2023-06-20', duration: '90 mins', attendees: 7, status: 'scheduled' },
    { id: 6, title: 'Budget Review', date: '2023-06-22', duration: '60 mins', attendees: 6, status: 'scheduled' },
    { id: 7, title: 'Team Onboarding', date: '2023-06-25', duration: '45 mins', attendees: 9, status: 'scheduled' },
    { id: 8, title: 'Project Status Update', date: '2023-06-27', duration: '30 mins', attendees: 5, status: 'scheduled' },
    { id: 9, title: 'Customer Feedback Session', date: '2023-06-29', duration: '75 mins', attendees: 10, status: 'scheduled' },
    { id: 10, title: 'UI/UX Review', date: '2023-06-30', duration: '45 mins', attendees: 6, status: 'scheduled' },
    { id: 11, title: 'System Architecture Planning', date: '2023-07-01', duration: '120 mins', attendees: 8, status: 'scheduled' },
    { id: 12, title: 'Data Security Audit', date: '2023-07-03', duration: '90 mins', attendees: 5, status: 'scheduled' },
  ], []);

  const pastMeetings = useMemo<Meeting[]>(() => [
    { id: 101, title: 'Initial Project Kickoff', date: '2023-05-15', duration: '60 mins', attendees: 12, status: 'completed' },
    { id: 102, title: 'Technical Review', date: '2023-05-18', duration: '45 mins', attendees: 8, status: 'completed' },
    { id: 103, title: 'Stakeholder Presentation', date: '2023-05-20', duration: '30 mins', attendees: 15, status: 'completed' },
    { id: 104, title: 'Design Workshop', date: '2023-05-22', duration: '120 mins', attendees: 6, status: 'completed' },
    { id: 105, title: 'Code Review', date: '2023-05-25', duration: '90 mins', attendees: 4, status: 'completed' },
    { id: 106, title: 'User Testing Session', date: '2023-05-28', duration: '60 mins', attendees: 9, status: 'completed' },
    { id: 107, title: 'Team Retrospective', date: '2023-05-30', duration: '45 mins', attendees: 10, status: 'completed' },
    { id: 108, title: 'Feedback Collection', date: '2023-06-01', duration: '30 mins', attendees: 7, status: 'completed' },
    { id: 109, title: 'Feature Planning', date: '2023-06-03', duration: '75 mins', attendees: 8, status: 'completed' },
    { id: 110, title: 'Monthly Report Review', date: '2023-06-05', duration: '45 mins', attendees: 6, status: 'cancelled' },
    { id: 111, title: 'Product Demo', date: '2023-06-07', duration: '60 mins', attendees: 11, status: 'completed' },
    { id: 112, title: 'Architecture Discussion', date: '2023-06-08', duration: '90 mins', attendees: 5, status: 'cancelled' },
    { id: 113, title: 'User Journey Mapping', date: '2023-06-09', duration: '120 mins', attendees: 7, status: 'completed' },
  ], []);

  // Calculate statistics for summary cards
  const totalMeetingCount = upcomingMeetings.length + pastMeetings.length;
  const completedMeetings = pastMeetings.filter(m => m.status === 'completed').length;
  const cancelledMeetings = pastMeetings.filter(m => m.status === 'cancelled').length;
  
  // Calculate total meeting hours
  const calculateTotalHours = (meetings: Meeting[]) => {
    return meetings.reduce((total, meeting) => {
      const duration = parseInt(meeting.duration.split(' ')[0]);
      return total + duration;
    }, 0) / 60; // Convert minutes to hours
  };
  
  const totalMeetingHours = Math.round(calculateTotalHours(upcomingMeetings) + calculateTotalHours(pastMeetings));
  
  // Calculate average meeting duration
  const calculateAverageDuration = (meetings: Meeting[]) => {
    if (meetings.length === 0) return 0;
    const totalMinutes = meetings.reduce((total, meeting) => {
      return total + parseInt(meeting.duration.split(' ')[0]);
    }, 0);
    return Math.round(totalMinutes / meetings.length);
  };
  
  const averageDuration = calculateAverageDuration([...upcomingMeetings, ...pastMeetings]);
  
  // Calculate total participants
  const totalParticipants = [...upcomingMeetings, ...pastMeetings].reduce((sum, meeting) => sum + meeting.attendees, 0);

  const filterItems = [
    { key: 'all', label: 'All Meetings' },
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'divider-1', label: '', divider: true },
    { key: 'scheduled', label: 'Scheduled', icon: faCalendarDay },
    { key: 'completed', label: 'Completed', icon: faFileAlt },
    { key: 'cancelled', label: 'Cancelled', icon: faFileAlt },
  ];

  const viewOptions = [
    { key: 'table', label: 'Table View', icon: faFileAlt },
    { key: 'calendar', label: 'Calendar View', icon: faCalendarDay },
  ];

  // Reset pagination when tab or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, activeFilter, searchQuery]);

  // Filter meetings based on active filter and search query
  const filteredMeetings = useMemo(() => {
    const meetings = activeTab === 'upcoming' ? upcomingMeetings : pastMeetings;
    
    return meetings.filter(meeting => {
      // Filter by status
      if (activeFilter === 'scheduled' || activeFilter === 'completed' || activeFilter === 'cancelled') {
        if (meeting.status !== activeFilter) return false;
      }
      
      // Filter by time period
      const meetingDate = new Date(meeting.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (activeFilter === 'today') {
        const todayEnd = new Date(today);
        todayEnd.setHours(23, 59, 59, 999);
        if (meetingDate < today || meetingDate > todayEnd) return false;
      } else if (activeFilter === 'week') {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        if (meetingDate < weekStart || meetingDate > weekEnd) return false;
      } else if (activeFilter === 'month') {
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        monthEnd.setHours(23, 59, 59, 999);
        if (meetingDate < monthStart || meetingDate > monthEnd) return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        return meeting.title.toLowerCase().includes(searchQuery.toLowerCase());
      }
      
      return true;
    });
  }, [activeTab, activeFilter, searchQuery, upcomingMeetings, pastMeetings]);

  // Calculate pagination details
  const totalItems = filteredMeetings.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  
  // Get current page items
  const currentItems = filteredMeetings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle view meeting details
  const handleViewMeetingDetails = (meeting: Meeting) => {
    console.log('Viewing meeting details:', meeting);
    // Implementation for viewing meeting details would go here
  };

  // Handle creating new meeting
  const handleNewMeeting = () => {
    console.log('Creating new meeting');
    // Implementation for creating new meeting would go here
  };

  // Handle viewing full analytics report
  const handleViewFullReport = () => {
    console.log('Viewing full analytics report');
    // Implementation for viewing full report would go here
  };

  // Prepare stats data for the StatsSummary component
  const statsData = {
    totalMeetings: totalMeetingCount,
    totalMeetingHours,
    averageDuration,
    totalParticipants
  };

  return (
    <div className="p-6 h-full space-y-6">
      {/* Dashboard Header with Breadcrumb, Title and Search */}
      <DashboardHeader 
        searchQuery={searchQuery} 
        onSearchChange={handleSearchChange} 
        onNewMeeting={handleNewMeeting}
      />
      
      {/* Alert for notifications */}
      <NotificationAlert
        message="Welcome to your dashboard!"
        description="Here you can manage all your meetings and check analytics."
      />

      {/* Usage Summary Stats Cards */}
      <StatsSummary stats={statsData} />
      
      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Meeting List - Spans 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <MeetingsPanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
            currentItems={currentItems}
            totalItems={totalItems}
            totalPages={totalPages}
            currentPage={currentPage}
            pageSize={pageSize}
            visibleContent={visibleContent}
            setVisibleContent={setVisibleContent}
            filterItems={filterItems}
            viewOptions={viewOptions}
            setCurrentPage={setCurrentPage}
            upcomingMeetingsCount={upcomingMeetings.length}
            pastMeetingsCount={pastMeetings.length}
            onViewDetails={handleViewMeetingDetails}
          />
        </div>
        
        {/* Side Panel - Analytics */}
        <div className="lg:col-span-1 space-y-4">
          <AnalyticsPanel
            scheduledCount={upcomingMeetings.length}
            completedCount={completedMeetings}
            cancelledCount={cancelledMeetings}
            onViewFullReport={handleViewFullReport}
          />
        </div>
      </div>
    </div>
  );
}

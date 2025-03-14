'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
    faUsers, 
    faClock, 
    faCalendarAlt, 
    faChartLine, 
    faFileAlt, 
    faChevronRight,
    faFilter,
    faCheck, 
    faTimes,
    faCalendarDay
} from '@fortawesome/free-solid-svg-icons';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Input from '@/components/atomic/input';
import Card from '@/components/atomic/card';
import Alert from '@/components/molecules/alert';
import TabNavigation from '@/components/molecules/tabNavigation';
import PaginationControl from '@/components/molecules/paginationControl';
import Breadcrumb from '@/components/molecules/breadcrumb';
import DropdownMenu from '@/components/molecules/dropdown';
import StatCard, { StatCardProps } from '@/components/molecules/StatCard';
import Icon from '@/components/atomic/icon';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Avatar from '@/components/atomic/avatar';
import Badge from '@/components/atomic/badge';

const { Heading, Text } = Typography;

// Define the Meeting type for better TypeScript support
interface Meeting {
    id: number;
    title: string;
    date: string;
    duration: string;
    attendees: number;
    status: 'scheduled' | 'completed' | 'cancelled';
}

export default function DashboardPage() {
    // State for tab navigation, pagination, and filters
    const [activeTab, setActiveTab] = useState('upcoming');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleContent] = useState<'table' | 'calendar'>('table');
    
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

    const usageSummary = [
        { metric: 'Total Meetings', value: totalMeetingCount, change: '+12%', icon: faCalendarAlt, color: 'blue' },
        { metric: 'Meeting Hours', value: totalMeetingHours, change: '+8%', icon: faClock, color: 'green' },
        { metric: 'Average Duration', value: `${averageDuration} mins`, change: '-5%', icon: faChartLine, color: 'purple' },
        { metric: 'Participants', value: totalParticipants, change: '+20%', icon: faUsers, color: 'orange' },
    ];

    const filterItems = [
        { key: 'all', label: 'All Meetings' },
        { key: 'today', label: 'Today' },
        { key: 'week', label: 'This Week' },
        { key: 'month', label: 'This Month' },
        { key: 'divider-1', label: '', divider: true },
        { key: 'scheduled', label: 'Scheduled', icon: faCalendarAlt },
        { key: 'completed', label: 'Completed', icon: faCheck },
        { key: 'cancelled', label: 'Cancelled', icon: faTimes },
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
            render: () => (
                <Button variant="outline" size="small" rightIcon={faChevronRight} rounded>
                    Details
                </Button>
            ),
        },
    ];

    // Render meeting tab content
    const renderMeetingTabContent = () => {
        return (
            <div className="overflow-auto py-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
                    <Text size="sm" variant="muted">
                        Showing {currentItems.length} of {filteredMeetings.length} meetings
                    </Text>
                    <div className="flex flex-wrap gap-2">
                        <DropdownMenu
                            items={viewOptions}
                            label={visibleContent === 'table' ? 'Table View' : 'Calendar View'}
                            variant="outline"
                            size="small"
                            rounded
                        />
                        <DropdownMenu
                            items={filterItems}
                            label={`Filter: ${filterItems.find(item => item.key === activeFilter)?.label || 'All'}`}
                            variant="outline"
                            size="small"
                            rounded
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
                                emptyText: searchQuery || activeFilter !== 'all' ? 
                                    'No meetings match your filters' : 
                                    `No ${activeTab} meetings found`
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
                ) : (
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
                )}
                
                {totalItems > pageSize && visibleContent === 'calendar' && (
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

    return (
        <div className="p-6 h-full space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="mb-6">
                <Breadcrumb 
                    items={[
                        { key: 'home', label: 'Home', href: '/' },
                        { key: 'dashboard', label: 'Dashboard' }
                    ]}
                    withHomeIcon
                    variant="default"
                    size="medium"
                />
            </div>
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <Heading level="h1" size="2xl">Dashboard</Heading>
                    <Text variant="muted" size="lg" className="mt-1">
                        Overview of your meeting activities
                    </Text>
                </div>
                
                <div className="flex gap-3">
                    <Input 
                        placeholder="Search meetings..."
                        variant="outlined"
                        size="medium"
                        leftIcon={faFilter}
                        rounded
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Button 
                        variant="primary"
                        size="medium"
                        leftIcon={faCalendarAlt}
                        rounded
                    >
                        New Meeting
                    </Button>
                </div>
            </div>
            
            {/* Alert for notifications */}
            <Alert
                message="Welcome to your dashboard!"
                description="Here you can manage all your meetings and check analytics."
                variant="info"
                showIcon
                closable
                withAnimation
                borderRadius="medium"
            />

            {/* Usage Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {usageSummary.map((item, index) => (
                    <StatCard 
                        key={`stat-${item.metric}-${index}`}
                        metric={item.metric}
                        value={item.value}
                        change={item.change}
                        icon={item.icon}
                        variant={item.color as StatCardProps['variant']}
                        withAnimation
                    />
                ))}
            </div>
            
            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Meeting List - Spans 2 columns */}
                <div className="lg:col-span-2 space-y-4">
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
                                    badge: upcomingMeetings.length.toString(),
                                    badgeVariant: 'primary',
                                    content: renderMeetingTabContent()
                                },
                                { 
                                    key: 'past', 
                                    label: 'Past', 
                                    badge: pastMeetings.length.toString(),
                                    badgeVariant: 'secondary',
                                    content: renderMeetingTabContent()
                                },
                            ]}
                            variant="default"
                            withBorder
                            borderRadius="medium"
                            onChange={(key) => {
                                setActiveTab(key);
                                setActiveFilter('all'); // Reset filter when changing tabs
                            }}
                        />
                    </Card>
                </div>
                
                {/* Side Panel - Analytics */}
                <div className="lg:col-span-1 space-y-4">
                    {/* Analytics Card */}
                    <Card 
                        title="Meeting Analytics"
                        headerIcon={faChartLine}
                        variant="default"
                        withShadow
                    >
                        <div className="space-y-5">
                            <div>
                                <Text size="sm" variant="muted" weight="medium">Meeting Status</Text>
                                <div className="mt-2 grid grid-cols-3 gap-2">
                                    <StatCard 
                                        metric="Scheduled"
                                        value={upcomingMeetings.length}
                                        variant="primary"
                                        size="small"
                                        withShadow={false}
                                        withBorder
                                    />
                                    <StatCard 
                                        metric="Completed"
                                        value={completedMeetings}
                                        variant="success"
                                        size="small"
                                        withShadow={false}
                                        withBorder
                                    />
                                    <StatCard 
                                        metric="Cancelled"
                                        value={cancelledMeetings}
                                        variant="error"
                                        size="small"
                                        withShadow={false}
                                        withBorder
                                    />
                                </div>
                            </div>

                            <div>
                                <Text size="sm" variant="muted" weight="medium">Most Active Participants</Text>
                                <ul className="mt-2 divide-y divide-gray-100">
                                    {[
                                        { name: 'John Doe', count: 12 },
                                        { name: 'Jane Smith', count: 9 },
                                        { name: 'Mike Johnson', count: 7 }
                                    ].map((person, idx) => (
                                        <li key={idx} className="py-2 flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <Avatar 
                                                    name={person.name}
                                                    size="sm"
                                                    variant="light"
                                                    withBorder
                                                />
                                                <Text size="sm">{person.name}</Text>
                                            </div>
                                            <Badge 
                                                content={`${person.count} meetings`}
                                                variant="primary"
                                                size="sm"
                                                shape="pill"
                                                leftIcon={faUsers}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div className="pt-2">
                                <Text size="sm" variant="muted" weight="medium">Meeting Distribution</Text>
                                <div className="mt-2 grid grid-cols-2 gap-3">
                                    <StatCard 
                                        metric="Wednesday"
                                        value={8}
                                        variant="primary"
                                        size="small"
                                        withShadow={false}
                                        withBorder
                                    />
                                    <StatCard 
                                        metric="Thursday"
                                        value={6}
                                        variant="secondary"
                                        size="small"
                                        withShadow={false}
                                        withBorder
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Button 
                                variant="primary"
                                size="medium"
                                rightIcon={faFileAlt}
                                isFullWidth
                                withRipple
                                rounded
                            >
                                View Full Report
                            </Button>
                        </div>
                    </Card> 
                </div>
            </div>
        </div>
    );
}

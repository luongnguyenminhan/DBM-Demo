'use client';

import React from 'react';
import { faCalendarAlt, faClock, faChartLine, faUsers } from '@fortawesome/free-solid-svg-icons';
import StatCard, { StatCardProps } from '@/components/molecules/StatCard';

export interface StatsData {
  totalMeetings: number;
  totalMeetingHours: number;
  averageDuration: number;
  totalParticipants: number;
}

interface StatsSummaryProps {
  stats: StatsData;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ stats }) => {
  const usageSummary = [
    { 
      metric: 'Total Meetings', 
      value: stats.totalMeetings, 
      change: '+12%', 
      icon: faCalendarAlt, 
      color: 'blue' 
    },
    { 
      metric: 'Meeting Hours', 
      value: stats.totalMeetingHours, 
      change: '+8%', 
      icon: faClock, 
      color: 'green' 
    },
    { 
      metric: 'Average Duration', 
      value: `${stats.averageDuration} mins`, 
      change: '-5%', 
      icon: faChartLine, 
      color: 'purple' 
    },
    { 
      metric: 'Participants', 
      value: stats.totalParticipants, 
      change: '+20%', 
      icon: faUsers, 
      color: 'orange' 
    },
  ];

  return (
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
  );
};

export default StatsSummary;

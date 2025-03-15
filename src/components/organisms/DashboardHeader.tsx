'use client';

import React from 'react';
import { faFilter, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Input from '@/components/atomic/input';
import Breadcrumb from '@/components/molecules/breadcrumb';

const { Heading, Text } = Typography;

interface DashboardHeaderProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNewMeeting?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  searchQuery, 
  onSearchChange,
  onNewMeeting 
}) => {
  return (
    <>
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
            onChange={onSearchChange}
          />
          <Button 
            variant="primary"
            size="medium"
            leftIcon={faCalendarAlt}
            rounded
            onClick={onNewMeeting}
          >
            New Meeting
          </Button>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;

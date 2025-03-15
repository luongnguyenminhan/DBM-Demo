'use client';

import React from 'react';
import { faChartLine, faFileAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import StatCard from '@/components/molecules/StatCard';
import Avatar from '@/components/atomic/avatar';
import Badge from '@/components/atomic/badge';

const { Text } = Typography;

interface AnalyticsPanelProps {
  scheduledCount: number;
  completedCount: number;
  cancelledCount: number;
  onViewFullReport?: () => void;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({
  scheduledCount,
  completedCount,
  cancelledCount,
  onViewFullReport
}) => {
  return (
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
              value={scheduledCount}
              variant="primary"
              size="small"
              withShadow={false}
              withBorder
            />
            <StatCard 
              metric="Completed"
              value={completedCount}
              variant="success"
              size="small"
              withShadow={false}
              withBorder
            />
            <StatCard 
              metric="Cancelled"
              value={cancelledCount}
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
          onClick={onViewFullReport}
        >
          View Full Report
        </Button>
      </div>
    </Card>
  );
};

export default AnalyticsPanel;

'use client';

import React from 'react';
import Link from 'next/link';
import { faFileAlt, faEllipsisV, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import DropdownMenu from '@/components/molecules/dropdown';

interface MeetingHeaderProps {
  title: string;
  actionItems: Array<{ key: string; label: React.ReactNode; icon?: IconDefinition; disabled?: boolean; danger?: boolean; divider?: false; onClick?(): void }>;
}

const MeetingHeader: React.FC<MeetingHeaderProps> = ({ title, actionItems }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <Typography.Heading level="h1" size="3xl">
        {title || "Meeting Details"}
      </Typography.Heading>
      <div className="flex gap-3">
        <DropdownMenu
          items={actionItems}
          trigger={
            <Button variant="ghost" rightIcon={faEllipsisV}>
              Actions
            </Button>
          }
        />
        <Link href="/dashboard">
          <Button variant="outline" leftIcon={faFileAlt}>
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default MeetingHeader;

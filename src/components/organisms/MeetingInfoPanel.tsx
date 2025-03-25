'use client';

import React from 'react';
import { faCalendarAlt, faClock, faUsers, faChartPie } from '@fortawesome/free-solid-svg-icons';
import Card from '@/components/atomic/card';
import Typography from '@/components/atomic/typo';
import Badge from '@/components/atomic/badge';
import Avatar from '@/components/atomic/avatar';
import Icon from '@/components/atomic/icon';
import { MeetingResponse } from '@/types/meeting.type';

interface MeetingInfo {
  title: string;
  date: string;
  attendees: string;
  agenda: string;
  goals: string;
}

interface TranscriptSummary {
  totalParagraphs: number;
  positive: number;
  neutral: number;
  negative: number;
  positivePercentage: number;
  neutralPercentage: number;
  negativePercentage: number;
}

interface Participant {
  id: string;
  username: string;
  email: string;
}

interface MeetingInfoPanelProps {
  meeting: MeetingResponse;
  meetingInfo: MeetingInfo | null;
  transcriptData: { summary: TranscriptSummary } | null;
  transcriptType: string;
  participants: Participant[] | undefined;
}

const MeetingInfoPanel: React.FC<MeetingInfoPanelProps> = ({
  meeting,
  meetingInfo,
  transcriptData,
  transcriptType,
  participants
}) => {
  const sentimentSummary = (transcriptType === 'sentiment' && transcriptData?.summary) ? (
    <Card
      title="Phân tích nội dung"
      variant="default"
      withShadow
      headerIcon={faChartPie}
      className="mt-6"
    >
      <div className="space-y-3 p-2">
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            <Icon icon={faUsers} size="sm" variant="primary" />
            <Typography.Text size="sm" weight="medium">Tổng đoạn văn</Typography.Text>
          </div>
          <Badge 
            variant="primary" 
            content={transcriptData.summary.totalParagraphs} 
            shape="pill"
          />
        </div>
        
        <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-lg">🟢</span>
            <Typography.Text size="sm" weight="medium">Tích cực</Typography.Text>
          </div>
          <Badge 
            variant="success" 
            content={`${transcriptData.summary.positive} (${transcriptData.summary.positivePercentage}%)`} 
            shape="pill"
          />
        </div>
        
        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-lg">⚪</span>
            <Typography.Text size="sm" weight="medium">Trung lập</Typography.Text>
          </div>
          <Badge 
            variant="secondary" 
            content={`${transcriptData.summary.neutral} (${transcriptData.summary.neutralPercentage}%)`} 
            shape="pill"
          />
        </div>
        
        <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-lg">🔴</span>
            <Typography.Text size="sm" weight="medium">Tiêu cực</Typography.Text>
          </div>
          <Badge 
            variant="error" 
            content={`${transcriptData.summary.negative} (${transcriptData.summary.negativePercentage}%)`} 
            shape="pill"
          />
        </div>
      </div>
    </Card>
  ) : null;
  
  return (
    <div className="space-y-6">
      <Card
        title="Thông tin cuộc họp"
        variant="default"
        withShadow
        headerIcon={faCalendarAlt}
      >
        <div className="space-y-4 p-2">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="mb-2">
              <Badge 
                variant={meeting.status === 'Active' ? 'success' : 'warning'} 
                content={meeting.status} 
                shape="pill"
              />
              <Typography.Text size="sm" variant="muted" className="ml-2">Trạng thái</Typography.Text>
            </div>
            
            {meetingInfo?.date && (
              <div className="flex items-center gap-2 mb-2">
                <Icon icon={faCalendarAlt} size="sm" variant="primary" />
                <Typography.Text size="sm">
                  {meetingInfo.date}
                </Typography.Text>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Icon icon={faClock} size="sm" variant="primary" />
              <Typography.Text size="sm">
                {meeting.start_time ? new Date(meeting.start_time).toLocaleString() : 'Chưa bắt đầu'}
              </Typography.Text>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon={faClock} size="sm" variant="secondary" />
              <Typography.Text size="sm">
                {meeting.end_time ? new Date(meeting.end_time).toLocaleString() : 'Chưa kết thúc'}
              </Typography.Text>
            </div>
            
            {meetingInfo?.agenda && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <Typography.Text weight="medium" size="sm">Nội dung:</Typography.Text>
                <Typography.Text size="sm" variant="muted" className="mt-1">
                  {meetingInfo.agenda}
                </Typography.Text>
              </div>
            )}
            
            {meetingInfo?.goals && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <Typography.Text weight="medium" size="sm">Mục tiêu:</Typography.Text>
                <Typography.Text size="sm" variant="muted" className="mt-1">
                  {meetingInfo.goals}
                </Typography.Text>
              </div>
            )}
          </div>
        </div>
      </Card>
      
      {sentimentSummary}
      
      <Card
        title={`Người tham gia (${participants?.length || 0})`}
        variant="default"
        withShadow
        headerIcon={faUsers}
      >
        {participants && participants.length > 0 ? (
          <div className="space-y-3 p-2">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Avatar 
                  name={participant.username} 
                  size="md" 
                  withBorder
                  shape="circle"
                  className="mr-3"
                />
                <div>
                  <Typography.Text weight="medium">{participant.username}</Typography.Text>
                  <Typography.Text size="xs" variant="muted">{participant.email}</Typography.Text>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500 bg-gray-50/50 rounded-xl">
            <Icon icon={faUsers} size="xl" variant="primary" className="mb-3" />
            <Typography.Text align="center">
              Chưa có người tham gia
            </Typography.Text>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MeetingInfoPanel;

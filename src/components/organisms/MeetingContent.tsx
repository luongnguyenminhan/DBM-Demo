'use client';

import React from 'react';
import { faMicrophone, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import TabNavigation from '@/components/molecules/tabNavigation';
import TranscriptTab from './TranscriptTab';
import NotesTab from './NotesTab';

interface MeetingContentProps {
  transcript_content: string | undefined;
  formattedTranscript: string;
  meeting_note_content: string | undefined;
  formattedNote: string;
  isProcessingTranscript: boolean;
  isGeneratingNote: boolean;
  onTextUploadClick: () => void;
  onAudioUploadClick: () => void;
  onProcessTranscript: () => void;
  onGenerateNote: () => void;
  onDownloadTranscript: () => void;
  onDownloadNote: () => void;
}

const MeetingContent: React.FC<MeetingContentProps> = ({
  transcript_content,
  formattedTranscript,
  meeting_note_content,
  formattedNote,
  isGeneratingNote,
  onTextUploadClick,
  onAudioUploadClick,
  onGenerateNote,
  onDownloadTranscript,
  onDownloadNote,
}) => {
  const tabs = [
    {
      key: 'transcript',
      label: 'Nội dung ghi âm',
      icon: faMicrophone,
      content: (
        <TranscriptTab
          transcript_content={transcript_content}
          formattedTranscript={formattedTranscript}
          onTextUploadClick={onTextUploadClick}
          onAudioUploadClick={onAudioUploadClick}
          onDownloadTranscript={onDownloadTranscript}
        />
      )
    },
    {
      key: 'notes',
      label: 'Ghi chú cuộc họp',
      icon: faNoteSticky,
      content: (
        <NotesTab
          meeting_note_content={meeting_note_content}
          transcript_content={transcript_content}
          formattedNote={formattedNote}
          isGeneratingNote={isGeneratingNote}
          onGenerateNote={onGenerateNote}
          onDownloadNote={onDownloadNote}
        />
      )
    }
  ];

  return (
    <TabNavigation
      tabs={tabs}
      variant="primary"
      size="medium"
      withIcon
      withBorder
      withShadow
      isFullWidth
      borderRadius="medium"
    />
  );
};

export default MeetingContent;

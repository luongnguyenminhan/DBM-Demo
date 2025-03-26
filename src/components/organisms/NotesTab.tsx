'use client';

import React from 'react';
import { faPencilAlt, faDownload, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import Icon from '@/components/atomic/icon';
import Typography from '@/components/atomic/typo';

interface NotesTabProps {
  meeting_note_content: string | undefined;
  transcript_content: string | undefined;
  formattedNote: string;
  isGeneratingNote: boolean;
  onGenerateNote: () => void;
  onDownloadNote: () => void;
}

const NotesTab: React.FC<NotesTabProps> = ({
  meeting_note_content,
  transcript_content,
  formattedNote,
  isGeneratingNote,
  onGenerateNote,
  onDownloadNote,
}) => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <div>
          <Button 
            variant="primary"
            size="small"
            leftIcon={faPencilAlt}
            isLoading={isGeneratingNote}
            isDisabled={!transcript_content}
            onClick={onGenerateNote}
          >
            Tạo ghi chú
          </Button>
        </div>
        <div>
          <Button 
            variant="outline"
            size="small"
            leftIcon={faDownload}
            onClick={onDownloadNote}
            isDisabled={!meeting_note_content}
          >
            Tải ghi chú
          </Button>
        </div>
      </div>
      <div className="h-[calc(100vh-400px)] overflow-hidden">
        {meeting_note_content ? (
          <div className="prose max-w-none p-2 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {formattedNote ? (
              <div 
                className="text-sm bg-gray-50 p-4 rounded-xl meeting-note-formatted"
                dangerouslySetInnerHTML={{ __html: formattedNote }}
              />
            ) : (
              <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-50 p-4 rounded-xl">{meeting_note_content}</pre>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500 bg-gray-50/50 rounded-xl h-full">
            <Icon icon={faNoteSticky} size="xl" variant="primary" className="mb-3" />
            <Typography.Text align="center">
              Chưa có ghi chú cho cuộc họp này
            </Typography.Text>
          </div>
        )}
      </div>
    </Card>
  );
};

export default NotesTab;

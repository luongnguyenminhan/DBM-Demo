'use client';

import React from 'react';
import { faUpload, faMicrophone, faDownload } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import Icon from '@/components/atomic/icon';
import Typography from '@/components/atomic/typo';

interface TranscriptTabProps {
  transcript_content: string | undefined;
  formattedTranscript: string;
  onTextUploadClick: () => void;
  onAudioUploadClick: () => void;
  onDownloadTranscript: () => void;
}

const TranscriptTab: React.FC<TranscriptTabProps> = ({
  transcript_content,
  formattedTranscript,
  onTextUploadClick,
  onAudioUploadClick,
  onDownloadTranscript,
}) => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Button 
            variant="gradient"
            size="small"
            leftIcon={faUpload}
            onClick={onTextUploadClick}
          >
            Tải lên văn bản
          </Button>
          <Button 
            variant="gradient"
            size="small"
            leftIcon={faMicrophone}
            onClick={onAudioUploadClick}
          >
            Tải lên âm thanh
          </Button>
        </div>
        <div className="flex gap-2">
          {/* <Button 
            variant="primary"
            size="small"
            leftIcon={faChartBar}
            isLoading={false}
            isDisabled={!transcript_content}
            onClick={() => {}}
          >
            Analyze Emotions
          </Button> */}
          <Button 
            variant="ghost"
            size="small"
            leftIcon={faDownload}
            onClick={onDownloadTranscript}
            isDisabled={!transcript_content}
          >
            Tải bản ghi
          </Button>
        </div>
      </div>
      <div className="h-[calc(100vh-400px)] overflow-hidden">
        {transcript_content ? (
          <div className="prose max-w-none p-2 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {formattedTranscript ? (
              <div 
                className="bg-white rounded-xl transcript-formatted"
                dangerouslySetInnerHTML={{ __html: formattedTranscript }}
              />
            ) : (
              <pre className="whitespace-pre-wrap text-sm font-mono bg-gray-50 p-4 rounded-xl">{transcript_content}</pre>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500 bg-gray-50/50 rounded-xl h-full">
            <Icon icon={faMicrophone} size="xl" variant="primary" className="mb-3" />
            <Typography.Text align="center">
              Chưa có nội dung ghi âm cho cuộc họp này
            </Typography.Text>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TranscriptTab;

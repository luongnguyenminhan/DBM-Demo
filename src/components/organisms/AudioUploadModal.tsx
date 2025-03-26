'use client';

import React, { useState } from 'react';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import Modal from '@/components/atomic/modal';
import Button from '@/components/atomic/button';
import Typography from '@/components/atomic/typo';

interface AudioUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, numSpeakers?: number, meetingId?: string) => void;
  onNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  meetingId?: string;
}

const AudioUploadModal: React.FC<AudioUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  onNotification,
  meetingId
}) => {
  // Allow the user to override the meeting ID if needed
  const [customMeetingId, setCustomMeetingId] = useState<string>(meetingId || '');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [fileSelected, setFileSelected] = useState<boolean>(false);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileSelected(true);
      setSelectedFileName(e.target.files[0].name);
    } else {
      setFileSelected(false);
      setSelectedFileName('');
    }
  };

  const handleUpload = () => {
    const fileInput = document.getElementById('audio-file') as HTMLInputElement;
    const speakerInput = document.getElementById('num-speakers') as HTMLInputElement;
    
    if (!fileInput?.files?.[0]) {
      onNotification('Vui lòng chọn file âm thanh', 'error');
      return;
    }

    const finalMeetingId = customMeetingId || meetingId;
    if (!finalMeetingId) {
      onNotification('Vui lòng nhập Meeting ID', 'error');
      return;
    }

    const numSpeakers = speakerInput?.value ? parseInt(speakerInput.value) : undefined;
    
    // Validate file type and size here
    const audioFile = fileInput.files[0];
    
    setIsUploading(true);
    try {
      // Call the onUpload function with the updated parameters
      onUpload(audioFile, numSpeakers, finalMeetingId);
    } catch (error) {
      console.error('Error uploading audio:', error);
      onNotification('Có lỗi xảy ra khi tải lên file âm thanh', 'error');
    } finally {
      setIsUploading(false);
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tải lên file âm thanh"
      size="md"
      headerIcon={faMicrophone}
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Hủy
          </Button>
          <Button 
            variant="primary" 
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? 'Đang tải...' : 'Tải lên'}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Typography.Text size="sm">
          Chọn file âm thanh để phân tích và tạo bản ghi:
        </Typography.Text>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input 
            type="file" 
            id="audio-file" 
            accept="audio/mp3,audio/wav,audio/webm,audio/mpeg,audio/m4a"
            className="w-full" 
            onChange={handleFileChange}
            disabled={isUploading}
          />
          {fileSelected && (
            <p className="text-sm text-green-600 mt-2">Đã chọn: {selectedFileName}</p>
          )}
          <p className="text-xs text-gray-500 mt-2">Định dạng hỗ trợ: MP3, WAV, M4A, WEBM. Kích thước tối đa: 100MB</p>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số lượng người nói (tùy chọn)
          </label>
          <input 
            type="number" 
            id="num-speakers" 
            min="1" 
            max="10"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent" 
            placeholder="Nhập số lượng người nói (để trống để tự động phát hiện)"
            disabled={isUploading}
          />
          <p className="text-xs text-gray-500 mt-1">Nhập số lượng người tham gia cuộc họp để cải thiện độ chính xác phân tích</p>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Meeting ID <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="meeting-id"
            value={customMeetingId}
            onChange={(e) => setCustomMeetingId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent" 
            placeholder="Nhập Meeting ID"
            disabled={isUploading}
          />
          {meetingId && (
            <p className="text-xs text-gray-500 mt-1">
              Meeting ID hiện tại: {meetingId}
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AudioUploadModal;

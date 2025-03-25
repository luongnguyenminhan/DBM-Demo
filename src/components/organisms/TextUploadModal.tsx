'use client';

import React, { useState, useEffect } from 'react';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from '@/components/atomic/modal';
import Button from '@/components/atomic/button';
import Typography from '@/components/atomic/typo';

interface TextUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (content: string, meetingId?: string) => void;
  onNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  meetingId?: string;
}

const TextUploadModal: React.FC<TextUploadModalProps> = ({ 
  isOpen, 
  onClose, 
  onUpload,
  onNotification,
  meetingId
}) => {
  // Allow the user to override the meeting ID if needed
  const [customMeetingId, setCustomMeetingId] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Update customMeetingId whenever meetingId prop changes
  useEffect(() => {
    if (meetingId) {
      setCustomMeetingId(meetingId);
    }
  }, [meetingId, isOpen]); // Add isOpen to reset/update when modal reopens

  const handleUpload = () => {
    const textArea = document.getElementById('transcript-text') as HTMLTextAreaElement;
    if (!textArea || !textArea.value.trim()) {
      onNotification('Vui lòng nhập nội dung bản ghi', 'error');
      return;
    }

    const finalMeetingId = customMeetingId || meetingId;
    if (!finalMeetingId) {
      onNotification('Vui lòng nhập Meeting ID', 'error');
      return;
    }

    setIsUploading(true);
    // Use the new API with enhanced error handling
    try {
      onUpload(textArea.value, finalMeetingId);
    } catch (error) {
      console.error('Error in text upload:', error);
      onNotification('Có lỗi xảy ra khi tải lên bản ghi', 'error');
      setIsUploading(false); // Make sure to reset isUploading state on error
    }
    // Note: success case is handled by parent component which will call onClose
  };

  // Reset the form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // When modal opens, initialize the meeting ID
      if (meetingId) {
        setCustomMeetingId(meetingId);
      }
    } else {
      // When modal closes, reset the uploading state
      setIsUploading(false);
    }
  }, [isOpen, meetingId]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tải lên bản ghi văn bản"
      size="md"
      headerIcon={faFileAlt}
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
          Nhập nội dung bản ghi văn bản vào khung bên dưới:
        </Typography.Text>
        <textarea
          id="transcript-text"
          rows={10}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
          placeholder="Nhập nội dung bản ghi văn bản ở đây..."
          disabled={isUploading}
        ></textarea>
        
        {/* Meeting ID input field - now auto-initialized */}
        <div>
          <label htmlFor="meeting-id" className="block text-sm font-medium text-gray-700 mb-1">
            Meeting ID <span className="text-red-500">*</span>
          </label>
          <input
            id="meeting-id"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            placeholder="Nhập Meeting ID"
            value={customMeetingId}
            onChange={(e) => setCustomMeetingId(e.target.value)}
            disabled={isUploading}
          />
          {meetingId && customMeetingId !== meetingId && (
            <p className="text-xs text-gray-500 mt-1">
              Meeting ID hiện tại: {meetingId}
              {' '}
              <button 
                type="button"
                className="text-blue-500 hover:text-blue-700 underline"
                onClick={() => setCustomMeetingId(meetingId)}
              >
                Sử dụng
              </button>
            </p>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          <p>Định dạng bản ghi:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Mỗi người nói nên được đánh dấu rõ ràng</li>
            <li>Ví dụ: &quot;Speaker 1: Nội dung...&quot;</li>
            <li>Phần thời gian (nếu có) nên đặt trong ngoặc vuông [00:00]</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default TextUploadModal;

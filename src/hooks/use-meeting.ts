/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import meetingApi from '@/apis/meetingApi';
import transcriptApi from '@/apis/transcriptApi';
import meetingNoteApi from '@/apis/meetingNoteApi';
import { MeetingDetailResponse } from '@/types/meeting.type';
import { CommonResponse } from '@/types/common.type';
import { formatMeetingNoteForDisplay, extractMeetingInfo } from '@/utils/meetingNoteUtils';
import { formatTranscriptForDisplay, getTranscriptData, detectTranscriptType } from '@/utils/transcriptUtils';

interface MeetingInfo {
  title: string;
  date: string;
  attendees: string;
  agenda: string;
  goals: string;
}

export function useMeeting(meetingId: string) {
  // Data states
  const [meetingDetail, setMeetingDetail] = useState<CommonResponse<MeetingDetailResponse>>();
  const [formattedNote, setFormattedNote] = useState<string>('');
  const [formattedTranscript, setFormattedTranscript] = useState<string>('');
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfo | null>(null);
  const [transcriptData, setTranscriptData] = useState<any>(null);
  const [transcriptType, setTranscriptType] = useState<string>('standard');
  
  // UI states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessingTranscript, setIsProcessingTranscript] = useState(false);
  const [isGeneratingNote, setIsGeneratingNote] = useState(false);
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null);

  // Get the actual meeting ID (meeting_id) from the meeting object
  const getActualMeetingId = (): string => {
    return meetingDetail?.data?.meeting?.meeting_id || meetingId;
  };

  // Fetch meeting data on component mount
  useEffect(() => {
    const fetchMeetingDetails = async () => {
      setIsLoading(true);
      try {
        const response = await meetingApi.getMeetingContent(meetingId);
        setMeetingDetail(response);
        
        // Format meeting note if available
        if (response.data?.meeting_note_content) {
          const formatted = formatMeetingNoteForDisplay(response.data.meeting_note_content);
          setFormattedNote(formatted);
          
          const info = extractMeetingInfo(response.data.meeting_note_content);
          setMeetingInfo(info);
        }
        
        // Format transcript if available
        if (response.data?.transcript_content) {
          const type = detectTranscriptType(response.data.transcript_content);
          setTranscriptType(type);
          
          const formattedTranscript = formatTranscriptForDisplay(response.data.transcript_content);
          setFormattedTranscript(formattedTranscript);
          
          const data = getTranscriptData(response.data.transcript_content);
          setTranscriptData(data);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching meeting details:', err);
        setError('Không thể tải thông tin cuộc họp. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false);
      }
    };

    if (meetingId) {
      fetchMeetingDetails();
    }
  }, [meetingId]);

  // Notification handler
  const handleNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Process transcript
  const handleProcessTranscript = async () => {
    if (!meetingDetail?.data) {
      handleNotification('Không có bản ghi để phân tích', 'error');
      return;
    }
    
    const actualMeetingId = getActualMeetingId();
    
    if (!actualMeetingId || !meetingDetail?.data?.transcript_content) {
      handleNotification('Không có bản ghi để phân tích', 'error');
      return;
    }
    
    setIsProcessingTranscript(true);
    try {
      const response = await transcriptApi.analyzeTranscript(actualMeetingId);
      
      if (response.data) {
        handleNotification('Phân tích cảm xúc thành công', 'success');
        refreshMeetingData();
      } else {
        handleNotification('Không nhận được kết quả phân tích hợp lệ', 'error');
      }
    } catch (err) {
      console.error('Error analyzing transcript:', err);
      handleErrorNotification(err);
    } finally {
      setIsProcessingTranscript(false);
    }
  };

  // Generate meeting note
  const handleGenerateNote = async () => {
    if (!meetingDetail?.data) {
      handleNotification('Cần có bản ghi để tạo ghi chú cuộc họp', 'error');
      return;
    }
    
    const actualMeetingId = getActualMeetingId();
    
    if (!actualMeetingId || !meetingDetail?.data?.transcript_content) {
      handleNotification('Cần có bản ghi để tạo ghi chú cuộc họp', 'error');
      return;
    }
    
    setIsGeneratingNote(true);
    try {
      const response = await meetingNoteApi.generateMeetingNote({ 
        prompt: meetingDetail.data.transcript_content, 
        meeting_id: actualMeetingId 
      });
      
      if (response.data) {
        handleNotification('Đã tạo ghi chú cuộc họp thành công', 'success');
        refreshMeetingData();
      } else {
        handleNotification('Không thể tạo ghi chú cuộc họp', 'error');
      }
    } catch (err) {
      console.error('Error generating meeting note:', err);
      handleNotification('Không thể tạo ghi chú. Vui lòng thử lại sau.', 'error');
    } finally {
      setIsGeneratingNote(false);
    }
  };

  // Download transcript
  const handleDownloadTranscript = () => {
    if (!meetingDetail?.data?.transcript_content) return;
    
    const actualMeetingId = getActualMeetingId();
    
    const blob = new Blob([meetingDetail.data.transcript_content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript_${actualMeetingId || 'unnamed'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Download note
  const handleDownloadNote = () => {
    if (!meetingDetail?.data?.meeting_note_content) return;
    
    const actualMeetingId = getActualMeetingId();
    
    const blob = new Blob([meetingDetail.data.meeting_note_content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting_note_${actualMeetingId || 'unnamed'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Upload transcript text
  const handleTextUpload = async (content: string, overrideMeetingId?: string) => {
    try {
      // Use provided meeting ID, or get from meeting detail, or use the initial one
      const actualMeetingId = overrideMeetingId || getActualMeetingId();
      
      if (!actualMeetingId) {
        handleNotification('ID cuộc họp không hợp lệ', 'error');
        return;
      }
      
      if (!content || content.trim() === '') {
        handleNotification('Nội dung bản ghi không được để trống', 'error');
        return;
      }
      
      const response = await transcriptApi.uploadTranscript({
        transcript_content: content,
        meeting_id: actualMeetingId
      });
      
      if (response.data) {
        handleNotification('Tải lên bản ghi thành công', 'success');
        setIsTextModalOpen(false);
        refreshMeetingData();
      }
    } catch (err) {
      console.error('Error uploading transcript:', err);
      handleErrorNotification(err);
    }
  };

  // Upload audio file
  const handleAudioUpload = async (file: File, numSpeakers?: number, overrideMeetingId?: string) => {
    try {
      // Use provided meeting ID, or get from meeting detail, or use the initial one
      const actualMeetingId = overrideMeetingId || getActualMeetingId();
      
      if (!actualMeetingId) {
        handleNotification('ID cuộc họp không hợp lệ', 'error');
        return;
      }
      
      if (!file) {
        handleNotification('Vui lòng chọn file âm thanh', 'error');
        return;
      }
      
      // Check file size and type
      validateAudioFile(file);
      
      const response = await transcriptApi.uploadAudioForTranscription(
        file, 
        actualMeetingId,
        numSpeakers
      );
      
      if (response) {
        handleNotification('Tải lên file âm thanh thành công. Quá trình xử lý có thể mất một chút thời gian.', 'success');
        setIsAudioModalOpen(false);
      }
    } catch (err) {
      console.error('Error uploading audio file:', err);
      handleErrorNotification(err);
    }
  };

  // Refresh meeting data
  const refreshMeetingData = async () => {
    try {
      const updatedMeeting = await meetingApi.getMeetingContent(meetingId);
      setMeetingDetail(updatedMeeting);
      
      if (updatedMeeting.data?.transcript_content) {
        const type = detectTranscriptType(updatedMeeting.data.transcript_content);
        setTranscriptType(type);
        
        const formattedTranscript = formatTranscriptForDisplay(updatedMeeting.data.transcript_content);
        setFormattedTranscript(formattedTranscript);
        
        const data = getTranscriptData(updatedMeeting.data.transcript_content);
        setTranscriptData(data);
      }
      
      if (updatedMeeting.data?.meeting_note_content) {
        const formatted = formatMeetingNoteForDisplay(updatedMeeting.data.meeting_note_content);
        setFormattedNote(formatted);
        
        const info = extractMeetingInfo(updatedMeeting.data.meeting_note_content);
        setMeetingInfo(info);
      }
    } catch (err) {
      console.error('Error refreshing meeting data:', err);
    }
  };

  // Handle error notifications
  const handleErrorNotification = (err: unknown) => {
    let message = 'Đã xảy ra lỗi. Vui lòng thử lại sau.';
    
    if (typeof err === 'object' && err !== null && 'response' in err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = err.response as any;
      
      if (response?.data?.detail) {
        message = `Lỗi: ${response.data.detail}`;
      } else if (response?.status) {
        const statusMessages: Record<number, string> = {
          400: 'Dữ liệu không hợp lệ',
          404: 'Không tìm thấy dữ liệu',
          413: 'File quá lớn',
          415: 'Định dạng không được hỗ trợ',
          500: 'Lỗi máy chủ'
        };
        
        message = statusMessages[response.status] || message;
      }
    }
    
    handleNotification(message, 'error');
  };

  // Validate audio file
  const validateAudioFile = (file: File) => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      throw new Error('Kích thước file vượt quá giới hạn cho phép (100MB)');
    }
    
    if (!file.type.startsWith('audio/')) {
      throw new Error('Chỉ chấp nhận file âm thanh');
    }
  };

  // Toggle modals
  const openTextModal = () => setIsTextModalOpen(true);
  const closeTextModal = () => setIsTextModalOpen(false);
  const openAudioModal = () => setIsAudioModalOpen(true);
  const closeAudioModal = () => setIsAudioModalOpen(false);

  return {
    // Data
    meetingDetail,
    formattedNote,
    formattedTranscript,
    meetingInfo,
    transcriptData,
    transcriptType,
    
    // Meeting ID for API calls
    meetingId: getActualMeetingId(),
    
    // UI state
    isLoading,
    error,
    isProcessingTranscript,
    isGeneratingNote,
    isTextModalOpen,
    isAudioModalOpen,
    notification,
    
    // Methods
    handleProcessTranscript,
    handleGenerateNote,
    handleDownloadTranscript,
    handleDownloadNote,
    handleTextUpload,
    handleAudioUpload,
    handleNotification,
    openTextModal,
    closeTextModal,
    openAudioModal,
    closeAudioModal
  };
}

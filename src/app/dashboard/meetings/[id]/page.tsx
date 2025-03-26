'use client';

import { useParams } from 'next/navigation';
import { faUsers, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Button from '@/components/atomic/button';
import Alert from '@/components/molecules/alert';

// Components
import MeetingHeader from '@/components/organisms/MeetingHeader';
import MeetingContent from '@/components/organisms/MeetingContent';
import MeetingInfoPanel from '@/components/organisms/MeetingInfoPanel';
import TextUploadModal from '@/components/organisms/TextUploadModal';
import AudioUploadModal from '@/components/organisms/AudioUploadModal';
import NotificationToast from '@/components/organisms/NotificationToast';

// Custom hook
import { useMeeting } from '@/hooks/use-meeting';

export default function MeetingDetailsPage() {
    const params = useParams();
    const routeId = params.id as string;
    
    const {
        // Data
        meetingDetail,
        formattedNote,
        formattedTranscript,
        meetingInfo,
        transcriptData,
        transcriptType,
        
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
        closeAudioModal,
        
        // Get the actual meeting_id from API response
        meetingId
    } = useMeeting(routeId);

    // Loading and error states
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Alert
                    variant="error"
                    message={error}
                    action={
                        <Link href="/dashboard">
                            <Button variant="outline">Quay lại Dashboard</Button>
                        </Link>
                    }
                />
            </div>
        );
    }

    if (!meetingDetail?.data || !meetingDetail.data.meeting) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Alert
                    variant="warning"
                    message="Không tìm thấy thông tin cuộc họp"
                    action={
                        <Link href="/dashboard">
                            <Button variant="outline">Quay lại Dashboard</Button>
                        </Link>
                    }
                />
            </div>
        );
    }

    const { meeting, transcript_content, meeting_note_content, participants } = meetingDetail.data;

    // Extract the actual meeting_id to pass to modals
    const actualMeetingId = meetingId;

    const actionItems = [
        { key: 'export', label: 'Xuất báo cáo', icon: faFileAlt },
        { key: 'share', label: 'Chia sẻ', icon: faUsers },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {notification && <NotificationToast message={notification.message} type={notification.type} />}

            <TextUploadModal 
                isOpen={isTextModalOpen} 
                onClose={closeTextModal}
                onUpload={handleTextUpload}
                onNotification={handleNotification}
                meetingId={actualMeetingId}
            />
            
            <AudioUploadModal
                isOpen={isAudioModalOpen}
                onClose={closeAudioModal}
                onUpload={handleAudioUpload}
                onNotification={handleNotification}
                meetingId={actualMeetingId}
            />

            <MeetingHeader 
                title={meeting?.meeting_id || "Chi tiết cuộc họp"} 
                actionItems={actionItems} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <MeetingContent 
                        transcript_content={transcript_content}
                        formattedTranscript={formattedTranscript}
                        meeting_note_content={meeting_note_content}
                        formattedNote={formattedNote}
                        isProcessingTranscript={isProcessingTranscript}
                        isGeneratingNote={isGeneratingNote}
                        onTextUploadClick={openTextModal}
                        onAudioUploadClick={openAudioModal}
                        onProcessTranscript={handleProcessTranscript}
                        onGenerateNote={handleGenerateNote}
                        onDownloadTranscript={handleDownloadTranscript}
                        onDownloadNote={handleDownloadNote}
                    />
                </div>

                <div className="lg:col-span-1">
                    <MeetingInfoPanel
                        meeting={meeting}
                        meetingInfo={meetingInfo}
                        transcriptData={transcriptData}
                        transcriptType={transcriptType}
                        participants={participants}
                    />
                </div>
            </div>
        </div>
    );
}

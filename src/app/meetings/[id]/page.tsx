'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { faUsers, faFileAlt, faMicrophone, faNoteSticky, faEllipsisV, faCalendarAlt, faClock, faChartPie } from '@fortawesome/free-solid-svg-icons';
import meetingApi from '@/apis/meetingApi';
import { MeetingDetailResponse } from '@/types/meeting.type';
import { CommonResponse } from '@/types/common.type';
import Link from 'next/link';
import Card from '@/components/atomic/card';
import Button from '@/components/atomic/button';
import Alert from '@/components/molecules/alert';
import DropdownMenu from '@/components/molecules/dropdown';
import TabNavigation from '@/components/molecules/tabNavigation';
import Typography from '@/components/atomic/typo';
import Badge from '@/components/atomic/badge';
import Avatar from '@/components/atomic/avatar';
import Icon from '@/components/atomic/icon';
import { formatMeetingNoteForDisplay, extractMeetingInfo } from '@/utils/meetingNoteUtils';
import { formatTranscriptForDisplay, getTranscriptData, detectTranscriptType, TranscriptType } from '@/utils/transcriptUtils';

export default function MeetingDetailsPage() {
    const params = useParams();
    const meetingId = params.id as string;
    
    const [meetingDetail, setMeetingDetail] = useState<CommonResponse<MeetingDetailResponse>>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formattedNote, setFormattedNote] = useState<string>('');
    const [formattedTranscript, setFormattedTranscript] = useState<string>('');
    const [meetingInfo, setMeetingInfo] = useState<{
        title: string;
        date: string;
        attendees: string;
        agenda: string;
        goals: string;
    } | null>(null);
    const [transcriptData, setTranscriptData] = useState<any>(null);
    const [transcriptType, setTranscriptType] = useState<string>('standard');

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
                    
                    // Extract key meeting info
                    const info = extractMeetingInfo(response.data.meeting_note_content);
                    setMeetingInfo(info);
                }
                
                // Format transcript if available
                if (response.data?.transcript_content) {
                    // Detect transcript type first
                    const type = detectTranscriptType(response.data.transcript_content);
                    setTranscriptType(type);
                    
                    const formattedTranscript = formatTranscriptForDisplay(response.data.transcript_content);
                    setFormattedTranscript(formattedTranscript);
                    
                    // Get transcript data for React components
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

    const tabs = [
        {
            key: 'transcript',
            label: 'Nội dung ghi âm',
            icon: faMicrophone,
            content: (
                <Card variant="outlined" className="mt-4" withShadow shadowSize="sm">
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
            ),
        },
        {
            key: 'notes',
            label: 'Ghi chú cuộc họp',
            icon: faNoteSticky,
            content: (
                <Card variant="outlined" className="mt-4" withShadow shadowSize="sm">
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
            ),
        },
    ];

    // Add sentiment summary card if transcript has sentiment analysis
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
                        <Icon icon={faMicrophone} size="sm" variant="primary" />
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

    const actionItems = [
        { key: 'export', label: 'Xuất báo cáo', icon: faFileAlt },
        { key: 'share', label: 'Chia sẻ', icon: faUsers },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <Typography.Heading level="h1" size="3xl">
                    {meetingInfo?.title || "Chi tiết cuộc họp"}
                </Typography.Heading>
                <div className="flex gap-3">
                    <DropdownMenu
                        items={actionItems}
                        trigger={
                            <Button variant="ghost" rightIcon={faEllipsisV}>
                                Thao tác
                            </Button>
                        }
                    />
                    <Link href="/dashboard">
                        <Button variant="outline" leftIcon={faFileAlt}>
                            Quay lại Dashboard
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left side column with meeting content */}
                <div className="lg:col-span-2">
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
                </div>

                {/* Right side column with meeting info and participants */}
                <div className="lg:col-span-1 space-y-6">
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
            </div>
        </div>
    );
}

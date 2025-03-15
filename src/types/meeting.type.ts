// Meeting Models
export interface MeetingSearchParameters {
    id?: string;
    created_date?: string;
    updated_date?: string;
    meeting_id?: string;
    platform?: string;
    status?: string;
    start_time_from?: string;
    start_time_to?: string;
}

export interface MeetingCreateRequest {
    meeting_id: string;
    platform: string;
    start_time: string;
    end_time: string;
    status: string;
}

export interface MeetingUpdateRequest {
    id: string;
    meeting_id?: string;
    platform?: string;
    start_time?: string;
    end_time?: string;
    status?: string;
}

export interface MeetingResponse {
    id: string;
    meeting_id?: string;
    platform?: string;
    start_time?: string;
    end_time?: string;
    status?: string;
    [key: string]: string | undefined;
}

export interface Meeting {
    id: number;
    title: string;
    date: string;
    duration: string;
    attendees: number;
    status: 'scheduled' | 'completed' | 'cancelled';
}

export interface MeetingAnalytics {
    totalMeetings: number;
    completedMeetings: number;
    cancelledMeetings: number;
    totalMeetingHours: number;
    averageDuration: number;
    totalParticipants: number;
}

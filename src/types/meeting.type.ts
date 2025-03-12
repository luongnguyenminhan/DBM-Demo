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
    id?: string;
    meeting_id?: string;
    platform?: string;
    start_time?: string;
    end_time?: string;
    status?: string;
}

import { PaginationParameter } from './common.type';

export interface MeetingNoteSearchParameters extends PaginationParameter {
    id?: string;
    created_date?: string;
    updated_date?: string;
    meeting_id?: string;
    transcript_id?: string;
    file_path?: string;
    created_by?: string;
    is_encrypted?: boolean;
    start_date?: string;
    end_date?: string;
}

export interface MeetingNoteCreateRequest {
    meeting_id: string;
    transcript_id?: string;
    file_path?: string;
    meeting_note_content?: string;
    is_encrypted?: boolean;
    created_by: string;
}

export interface MeetingNoteUpdateRequest {
    id: string;
    file_path?: string;
    meeting_note_content?: string;
    is_encrypted?: boolean;
}

export interface MeetingNoteResponse {
    id: string;
    file_path?: string;
    meeting_note_content?: string;
    is_encrypted: boolean;
    created_by: string;
}

export interface MeetingNoteGenerationRequest {
    prompt: string;
    meeting_id: string;
}

export interface MeetingNoteGenerationResponse {
    meeting_note_id: string;
    summary: string;
    token_usage: number;
}

export interface SimpleMessageRequest {
    prompt: string;
    email?: string;
}

export interface SimpleMessageResponse {
    meeting_id: string;
    meeting_note_id: string;
    summary: string;
    token_usage: Record<string, never>;
}

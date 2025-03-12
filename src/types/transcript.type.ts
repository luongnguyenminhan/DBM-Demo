// Transcript Models
export interface TranscriptSearchParameters {
    id?: string;
    created_date?: string;
    updated_date?: string;
    transcript_content?: string;
    transcript_processed?: boolean;
    meeting_id?: string;
    meeting_note_id?: string;
}

export interface TranscriptCreateRequest {
    transcript_content?: string;
    meeting_id: string;
    meeting_note_id?: string;
}

export interface TranscriptUpdateRequest {
    id: string;
    transcript_content?: string;
    transcript_processed?: boolean;
    meeting_note_id?: string;
}

export interface TranscriptResponse {
    id?: string;
    meeting_id?: string;
    transcript_content?: string;
    transcript_processed?: boolean;
    meeting_note_id?: string;
    created_by?: string;
    file_type?: string;
    file_location?: string;
    uploaded_at?: string;
}

export interface TranscriptAnalysisResponse {
    transcript_id: string;
    processed_content: string;
    original_content: string;
    summary: {
        total_sentences: number;
        positive_sentences: number;
        neutral_sentences: number;
        negative_sentences: number;
        positive_percentage: number;
        neutral_percentage: number;
        negative_percentage: number;
    }
}

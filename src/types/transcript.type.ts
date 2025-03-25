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

// New interfaces for audio transcription
export interface AudioTranscriptionRequest {
    audio: File;
    meeting_id?: string;
    num_speakers?: number;
}

export interface AudioTranscriptionResponse {
    id?: string;
    meeting_id?: string;
    transcript_content?: string;
    transcript_processed?: boolean;
    processing_status?: 'queued' | 'processing' | 'completed' | 'failed';
    file_type?: string;
    file_location?: string;
    uploaded_at?: string;
}

// Interface for sentiment analysis metadata
export interface TranscriptAnalysisMetadata {
    sentiment_summary: {
        total_sentences: number;
        positive_sentences: number;
        neutral_sentences: number;
        negative_sentences: number;
        positive_percentage: number;
        neutral_percentage: number;
        negative_percentage: number;
    };
    [key: string]: unknown;
}

// Interface for sentiment analysis common response
export interface TranscriptAnalysisCommonResponse {
    status: number;
    error_code?: string | null;
    message: string;
    data?: TranscriptAnalysisResponse;
    metadata?: TranscriptAnalysisMetadata;
}

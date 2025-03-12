import axiosInstance from './axiosInstance';
import { CommonResponse, Pagination, PaginationParameter } from '../types/common.type';
import {
    TranscriptSearchParameters, 
    TranscriptCreateRequest, 
    TranscriptUpdateRequest,
    TranscriptResponse,
    TranscriptAnalysisResponse
} from '../types/transcript.type';

const transcriptApi = {
    /**
     * Search transcripts with filters and pagination
     */
    searchTranscripts: async (
        searchParams: TranscriptSearchParameters,
        paginationParams: PaginationParameter
    ): Promise<CommonResponse<Pagination<TranscriptResponse>>> => {
        console.log('API Call: searchTranscripts', { searchParams, paginationParams });
        const params = { ...searchParams, ...paginationParams };
        const response = await axiosInstance.get('/transcripts/', { params });
        console.log('API Response: searchTranscripts', response.data);
        return response.data;
    },

    /**
     * Create a new transcript
     */
    createTranscript: async (data: TranscriptCreateRequest): Promise<CommonResponse<TranscriptResponse>> => {
        const response = await axiosInstance.post('/transcripts/', data);
        return response.data;
    },

    /**
     * Update an existing transcript
     */
    updateTranscript: async (data: TranscriptUpdateRequest): Promise<CommonResponse<TranscriptResponse>> => {
        const response = await axiosInstance.put('/transcripts/', data);
        return response.data;
    },

    /**
     * Delete a transcript by ID
     */
    deleteTranscript: async (transcriptId: string): Promise<CommonResponse<null>> => {
        const response = await axiosInstance.delete('/transcripts/', { 
            params: { transcript_id: transcriptId }
        });
        return response.data;
    },

    /**
     * Create multiple transcripts in bulk
     */
    createTranscriptsBulk: async (transcripts: TranscriptCreateRequest[]): Promise<CommonResponse<TranscriptResponse[]>> => {
        const response = await axiosInstance.post('/transcripts/bulk', transcripts);
        return response.data;
    },

    /**
     * Get transcript by meeting ID
     */
    getTranscriptByMeetingId: async (meetingId: string): Promise<CommonResponse<TranscriptResponse>> => {
        const response = await axiosInstance.get('/transcripts/meeting', {
            params: { meeting_id: meetingId }
        });
        return response.data;
    },

    /**
     * Upload an audio file for transcription
     */
    uploadAudioForTranscription: async (
        audioFile: File, 
        meeting_id?: string,
        numSpeakers?: number
    ): Promise<CommonResponse<null>> => {
        const formData = new FormData();
        formData.append('audio', audioFile);
        
        let url = '/transcripts/audio';
        if (numSpeakers !== undefined) {
            url += `?num_speakers=${numSpeakers}`;
        }
        if (meeting_id) {
            url += `${numSpeakers ? '&' : '?'}meeting_id=${meeting_id}`;
        }
        
        const response = await axiosInstance.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        return response.data;
    },

    /**
     * Upload transcript content directly
     */
    uploadTranscript: async (data: TranscriptCreateRequest): Promise<CommonResponse<TranscriptResponse>> => {
        const response = await axiosInstance.post('/transcripts/upload-transcript', data);
        return response.data;
    },

    /**
     * Analyze a transcript (sentiment analysis)
     */
    analyzeTranscript: async (transcriptId: string): Promise<CommonResponse<TranscriptAnalysisResponse>> => {
        const response = await axiosInstance.get('/transcripts/analyze', {
            params: { transcript_id: transcriptId }
        });
        return response.data;
    }
};

export default transcriptApi;

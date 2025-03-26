import axiosInstance from './axiosInstance';
import { CommonResponse, Pagination, PaginationParameter } from '../types/common.type';
import {
    TranscriptSearchParameters, 
    TranscriptCreateRequest, 
    TranscriptUpdateRequest,
    TranscriptResponse,
    TranscriptAnalysisCommonResponse
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
        console.log('API Call: getTranscriptByMeetingId', { meetingId });
        const response = await axiosInstance.get('/transcripts/meeting', {
            params: { meeting_id: meetingId }
        });
        console.log('API Response: getTranscriptByMeetingId', response.data);
        return response.data;
    },

    /**
     * Upload an audio file for transcription
     * @param audioFile - The audio file to transcribe
     * @param meetingId - The ID of the meeting (using meeting_id field)
     * @param numSpeakers - Optional number of speakers to help improve transcription accuracy
     */
    uploadAudioForTranscription: async (
        audioFile: File, 
        meetingId?: string,
        numSpeakers?: number
    ): Promise<CommonResponse<null>> => {
        console.log('API Call: uploadAudioForTranscription', { 
            fileName: audioFile.name, 
            fileSize: audioFile.size, 
            fileType: audioFile.type,
            meetingId,
            numSpeakers
        });

        const formData = new FormData();
        formData.append('audio', audioFile);
        
        // Build query params
        const params: Record<string, string | number> = {};
        if (numSpeakers !== undefined) {
            params.num_speakers = numSpeakers;
        }
        if (meetingId) {
            params.meeting_id = meetingId;
        }
        
        const response = await axiosInstance.post('/transcripts/audio', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params
        });
        
        console.log('API Response: uploadAudioForTranscription', response.data);
        return response.data;
    },

    /**
     * Upload transcript content directly
     * @param data - Object containing transcript_content and meeting_id
     * @returns Response with the created transcript
     */
    uploadTranscript: async (data: TranscriptCreateRequest): Promise<CommonResponse<TranscriptResponse>> => {
        console.log('API Call: uploadTranscript', {
            contentLength: data.transcript_content?.length,
            meetingId: data.meeting_id
        });

        if (!data.meeting_id) {
            throw new Error('Meeting ID is required for uploading transcripts');
        }
        
        if (!data.transcript_content || data.transcript_content.trim() === '') {
            throw new Error('Transcript content cannot be empty');
        }
        
        const response = await axiosInstance.post('/transcripts/upload-transcript', data);
        console.log('API Response: uploadTranscript', response.data);
        return response.data;
    },

    /**
     * Analyze a transcript (sentiment analysis)
     * @param meetingId - The ID of the meeting (using meeting_id field)
     * @returns Analysis results with sentiment data
     */
    analyzeTranscript: async (meetingId: string): Promise<TranscriptAnalysisCommonResponse> => {
        console.log('API Call: analyzeTranscript', { meetingId });
        
        if (!meetingId) {
            throw new Error('Meeting ID is required for transcript analysis');
        }
        
        const response = await axiosInstance.get('/transcripts/analyze', {
            params: { meeting_id: meetingId }
        });
        
        console.log('API Response: analyzeTranscript', response.data);
        return response.data;
    }
};

export default transcriptApi;

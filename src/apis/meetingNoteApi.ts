import axiosInstance from './axiosInstance';
import type { CommonResponse, Pagination } from '../types/common.type';
import { 
    MeetingNoteCreateRequest,
    MeetingNoteGenerationRequest,
    MeetingNoteGenerationResponse,
    MeetingNoteResponse,
    MeetingNoteSearchParameters,
    MeetingNoteUpdateRequest,
    SimpleMessageRequest,
    SimpleMessageResponse
} from '../types/meetingNote.type';

const meetingNoteApi = {
    searchMeetingNotes: async (
        searchParams: MeetingNoteSearchParameters
    ): Promise<CommonResponse<Pagination<MeetingNoteResponse>>> => {
        console.log('API Call: searchMeetingNotes', { searchParams });
        const response = await axiosInstance.get('/meeting-notes/', { params: searchParams });
        console.log('API Response: searchMeetingNotes', response.data);
        return response.data;
    },

    createMeetingNote: async (data: MeetingNoteCreateRequest): Promise<CommonResponse<MeetingNoteResponse>> => {
        console.log('API Call: createMeetingNote', { data });
        const response = await axiosInstance.post('/meeting-notes/', data);
        console.log('API Response: createMeetingNote', response.data);
        return response.data;
    },

    updateMeetingNote: async (data: MeetingNoteUpdateRequest): Promise<CommonResponse<MeetingNoteResponse>> => {
        console.log('API Call: updateMeetingNote', { data });
        const response = await axiosInstance.put('/meeting-notes/', data);
        console.log('API Response: updateMeetingNote', response.data);
        return response.data;
    },

    deleteMeetingNote: async (noteId: string): Promise<CommonResponse<null>> => {
        console.log('API Call: deleteMeetingNote', { noteId });
        const response = await axiosInstance.delete('/meeting-notes/', { 
            params: { note_id: noteId }
        });
        console.log('API Response: deleteMeetingNote', response.data);
        return response.data;
    },

    getNoteByTranscriptId: async (transcriptId: string): Promise<CommonResponse<MeetingNoteResponse>> => {
        console.log('API Call: getNoteByTranscriptId', { transcriptId });
        const response = await axiosInstance.get('/meeting-notes/search/transcript', { 
            params: { transcript_id: transcriptId }
        });
        console.log('API Response: getNoteByTranscriptId', response.data);
        return response.data;
    },

    getNoteByMeetingId: async (meetingId: string): Promise<CommonResponse<MeetingNoteResponse>> => {
        console.log('API Call: getNoteByMeetingId', { meetingId });
        const response = await axiosInstance.get('/meeting-notes/search/meeting-id', { 
            params: { meeting_id: meetingId }
        });
        console.log('API Response: getNoteByMeetingId', response.data);
        return response.data;
    },

    generateMeetingNote: async (
        data: MeetingNoteGenerationRequest
    ): Promise<CommonResponse<MeetingNoteGenerationResponse>> => {
        console.log('API Call: generateMeetingNote', { data });
        const response = await axiosInstance.post('/meeting-notes/generate', data);
        console.log('API Response: generateMeetingNote', response.data);
        return response.data;
    },

    postSimpleMessage: async (
        data: SimpleMessageRequest
    ): Promise<CommonResponse<SimpleMessageResponse>> => {
        console.log('API Call: postSimpleMessage', { data });
        const response = await axiosInstance.post('/meeting-notes/post-message-simple', data);
        console.log('API Response: postSimpleMessage', response.data);
        return response.data;
    },

    createMeetingNotesBulk: async (
        notes: MeetingNoteCreateRequest[]
    ): Promise<CommonResponse<MeetingNoteResponse[]>> => {
        console.log('API Call: createMeetingNotesBulk', { notes });
        const response = await axiosInstance.post('/meeting-notes/bulk', notes);
        console.log('API Response: createMeetingNotesBulk', response.data);
        return response.data;
    }
};

export default meetingNoteApi;

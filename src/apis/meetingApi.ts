import axiosInstance from './axiosInstance';
import type { CommonResponse, Pagination, PaginationParameter } from '../types/common.type';
import { MeetingCreateRequest, MeetingResponse, MeetingSearchParameters, MeetingUpdateRequest } from '../types/meeting.type';

const meetingApi = {
    searchMeetings: async (
        searchParams: MeetingSearchParameters,
        paginationParams: PaginationParameter
    ): Promise<CommonResponse<Pagination<MeetingResponse>>> => {
        console.log('API Call: searchMeetings', { searchParams, paginationParams });
        const params = { ...searchParams, ...paginationParams };
        const response = await axiosInstance.get('/meetings/', { params });
        console.log('API Response: searchMeetings', response.data);
        return response.data;
    },

    createMeeting: async (data: MeetingCreateRequest): Promise<CommonResponse<MeetingResponse>> => {
        const response = await axiosInstance.post('/meetings/', data);
        return response.data;
    },

    updateMeeting: async (data: MeetingUpdateRequest): Promise<CommonResponse<MeetingResponse>> => {
        const response = await axiosInstance.put('/meetings/', data);
        return response.data;
    },

    deleteMeeting: async (meetingId: string): Promise<CommonResponse<boolean>> => {
        const response = await axiosInstance.delete('/meetings/', { 
            params: { meeting_id: meetingId }
        });
        return response.data;
    },

    createMeetingsBulk: async (meetings: MeetingCreateRequest[]): Promise<CommonResponse<MeetingResponse[]>> => {
        const response = await axiosInstance.post('/meetings/bulk', meetings);
        return response.data;
    }
};

export default meetingApi;
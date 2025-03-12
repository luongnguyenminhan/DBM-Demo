import axiosInstance from './axiosInstance';
import type {
  ServiceUsageSearchParameters,
  ServiceUsageCreateRequest,
  ServiceUsageUpdateRequest,
  ServiceUsageResponseModel,
  ServiceUsagePaginationResponseModel,
  ServiceUsageAnalyticsResponseModel,
  ServiceUsageDeleteResponseModel
} from '../types/serviceUsage.type';

const serviceUsageApi = {

  getServiceUsages: async (
    searchParams: ServiceUsageSearchParameters, 
    pageIndex: number = 1, 
    pageSize: number = 10
  ): Promise<ServiceUsagePaginationResponseModel> => {
    const params = {
      ...searchParams,
      page_index: pageIndex,
      page_size: pageSize
    };
    const response = await axiosInstance.get('/service-usage', { params });
    return response.data;
  },

  createServiceUsage: async (data: ServiceUsageCreateRequest): Promise<ServiceUsageResponseModel> => {
    const response = await axiosInstance.post('/service-usage', data);
    return response.data;
  },

  updateServiceUsage: async (data: ServiceUsageUpdateRequest): Promise<ServiceUsageResponseModel> => {
    const response = await axiosInstance.put('/service-usage', data);
    return response.data;
  },

  /**
   * Delete a service usage record by ID
   */
  deleteServiceUsage: async (usageId: string): Promise<ServiceUsageDeleteResponseModel> => {
    const response = await axiosInstance.delete('/service-usage', { params: { usage_id: usageId } });
    return response.data;
  },

  /**
   * Get service usage records for a specific user
   */
  getUserServiceUsage: async (userId: string, pageIndex: number = 1, pageSize: number = 10): Promise<ServiceUsagePaginationResponseModel> => {
    const params = {
      user_id: userId,
      page_index: pageIndex,
      page_size: pageSize
    };
    const response = await axiosInstance.get('/service-usage/user', { params });
    return response.data;
  },

  /**
   * Get detailed service usage analytics with search parameters
   */
  getServiceUsageAnalytics: async (
    searchParams: ServiceUsageSearchParameters, 
    pageIndex: number = 1, 
    pageSize: number = 10
  ): Promise<ServiceUsagePaginationResponseModel> => {
    const params = {
      ...searchParams,
      page_index: pageIndex,
      page_size: pageSize
    };
    const response = await axiosInstance.get('/service-usage/analytics', { params });
    return response.data;
  },

  /**
   * Get service usage analysis grouped by service type
   */
  getServiceUsageAnalysisByType: async (): Promise<ServiceUsageAnalyticsResponseModel> => {
    const response = await axiosInstance.get('/service-usage/analysis');
    return response.data;
  }
};

export default serviceUsageApi;

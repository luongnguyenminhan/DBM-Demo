import { CommonResponse, Pagination } from './common.type';

// Request Models
export interface ServiceUsageSearchParameters {
  user_id?: string;
  service_type?: string;
  token_usage?: number;
  timestamp?: string;
  created_date?: string;
  updated_date?: string;
}

export interface ServiceUsageCreateRequest {
  user_id: string;
  service_type: string;
  token_usage: number;
}

export interface ServiceUsageUpdateRequest {
  id: string;
  user_id?: string;
  service_type?: string;
  token_usage?: number;
}

// Response Models
export interface ServiceUsageResponse {
  id: string;
  user_id: string;
  service_type: string;
  token_usage: number;
  timestamp: string;
}

export interface ServiceUsageAnalyticsResponse {
  service_type: string;
  total_usage: number;
  usage_count: number;
  average_usage: number;
}

// Wrapped Response Models
export type ServiceUsageResponseModel = CommonResponse<ServiceUsageResponse>;
export type ServiceUsagePaginationResponseModel = CommonResponse<Pagination<ServiceUsageResponse>>;
export type ServiceUsageAnalyticsResponseModel = CommonResponse<ServiceUsageAnalyticsResponse[]>;
export type ServiceUsageDeleteResponseModel = CommonResponse<null>;

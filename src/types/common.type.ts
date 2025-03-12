export interface CommonResponse<T = unknown> {
  status: number;
  error_code?: number | null;
  message?: string | null;
  data?: T | null;
  metadata?: Record<string, unknown> | null;
}

export interface PaginationParameter {
  page_index: number;
  page_size: number;
}

export interface Pagination<T = unknown> {
  items: T[];
  total_count: number;
  page_index: number;
  page_size: number;
  total_pages: number;
  has_previous: boolean;
  has_next: boolean;
}
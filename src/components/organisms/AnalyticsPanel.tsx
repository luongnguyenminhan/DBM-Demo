'use client';

import React, { useState, useEffect } from 'react';
import { faChartLine, faCode } from '@fortawesome/free-solid-svg-icons';
// import { faFileAlt } from '@fortawesome/free-regular-svg-icons';
import Typography from '@/components/atomic/typo';
// import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import StatCard from '@/components/molecules/statCard';
import Badge from '@/components/atomic/badge';
import serviceUsageApi from '@/apis/serviceUsageApi';
import meetingApi from '@/apis/meetingApi';
import { ServiceUsageAnalyticsResponse } from '@/types/serviceUsage.type';
import { MeetingSearchParameters } from '@/types/meeting.type';

const { Text } = Typography;

interface AnalyticsPanelProps {
  scheduledCount: number;
  completedCount: number;
  cancelledCount: number;
  onViewFullReport?: () => void;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({
  scheduledCount,
  completedCount,
  cancelledCount,
  // onViewFullReport
}) => {
  const [serviceUsageData, setServiceUsageData] = useState<ServiceUsageAnalyticsResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meetingDistribution, setMeetingDistribution] = useState<{[key: string]: number}>({});
  const [isLoadingDistribution, setIsLoadingDistribution] = useState(true);

  useEffect(() => {
    const fetchServiceUsageData = async () => {
      setIsLoading(true);
      try {
        const response = await serviceUsageApi.getServiceUsageAnalysisByType();
        if (response.status === 200 && response.data) {
          setServiceUsageData(response.data);
        }
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu sử dụng dịch vụ:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMeetingDistribution = async () => {
      setIsLoadingDistribution(true);
      try {
        // Lấy ngày hiện tại và ngày đầu tuần
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Thứ 2
        
        // Format dates as YYYY-MM-DD
        const formatDate = (date: Date) => {
          return date.toISOString().split('T')[0];
        };

        // Lấy dữ liệu cho từng ngày trong tuần
        const days = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
        const distribution: {[key: string]: number} = {};
        
        // Khởi tạo với giá trị 0 cho tất cả các ngày
        days.forEach(day => {
          distribution[day] = 0;
        });

        // Lấy dữ liệu cho từng ngày
        for (let i = 0; i < 7; i++) {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + i);
          
          const searchParams: MeetingSearchParameters = {
            start_time_from: formatDate(date),
            start_time_to: formatDate(new Date(date.getTime() + 24 * 60 * 60 * 1000 - 1)), // Đến cuối ngày
          };
          
          try {
            const response = await meetingApi.searchMeetings(
              searchParams,
              { page_index: 1, page_size: 1 }
            );
            
            // Đảm bảo response.metadata?.total_count là số
            if (response.status === 200 && response.metadata && 
                typeof response.metadata.total_count === 'number') {
              distribution[days[i]] = response.metadata.total_count;
            }
            if (response.status === 404) {
              distribution[days[i]] = 0;
            }
          } catch (error) {
            console.log('Lỗi khi tải dữ liệu cuộc họp:', error);
           
          }
        }
        
        setMeetingDistribution(distribution);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu phân bổ cuộc họp:', error);
      } finally {
        setIsLoadingDistribution(false);
      }
    };

    fetchServiceUsageData();
    fetchMeetingDistribution();
  }, []);

  // Tạo định dạng số có phân tách hàng nghìn
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('vi-VN').format(num);
  };

  // Map dịch service_type sang tiếng Việt
  const translateServiceType = (type: string): string => {
    const translations: {[key: string]: string} = {
      'transcription': 'Ghi âm',
      'Meeting Note Generation': 'Tạo ghi chú cuộc họp',
      // Thêm các loại dịch vụ khác tại đây
    };
    
    return translations[type] || type;
  };

  // Lấy hai ngày có số lượng cuộc họp cao nhất để hiển thị
  const getTopMeetingDays = (): [string, number][] => {
    return Object.entries(meetingDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);
  };

  const topDays = getTopMeetingDays();

  return (
    <Card 
      title="Phân tích cuộc họp"
      headerIcon={faChartLine}
      variant="default"
      withShadow
    >
      <div className="space-y-5">
        <div>
          <Text size="sm" variant="muted" weight="medium">Trạng thái cuộc họp</Text>
          <div className="mt-2 grid grid-cols-3 gap-2">
            <StatCard 
              metric="Đã lên lịch"
              value={scheduledCount}
              variant="primary"
              size="small"
              withShadow={false}
              withBorder
            />
            <StatCard 
              metric="Hoàn thành"
              value={completedCount}
              variant="success"
              size="small"
              withShadow={false}
              withBorder
            />
            <StatCard 
              metric="Đã hủy"
              value={cancelledCount}
              variant="error"
              size="small"
              withShadow={false}
              withBorder
            />
          </div>
        </div>

        {/* Sử Dụng Dịch Vụ - Thay thế phần "Người tham gia tích cực nhất" */}
        <div>
          <Text size="sm" variant="muted" weight="medium">Sử dụng dịch vụ</Text>
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <Text variant="muted">Đang tải dữ liệu sử dụng...</Text>
            </div>
          ) : serviceUsageData.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <Text variant="muted">Không có dữ liệu sử dụng dịch vụ</Text>
            </div>
          ) : (
            <div className="mt-2 space-y-3">
              {serviceUsageData.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <Text size="sm" weight="medium" variant="default">{translateServiceType(item.service_type)}</Text>
                    <Badge 
                      content={`${formatNumber(item.usage_count)} lần`}
                      variant="primary"
                      size="sm"
                      shape="pill"
                      leftIcon={faCode}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Text size="xs" variant="muted">Tổng token:</Text>
                      <Text size="sm" weight="medium">{formatNumber(item.total_usage)}</Text>
                    </div>
                    <div>
                      <Text size="xs" variant="muted">Trung bình:</Text>
                      <Text size="sm" weight="medium">{formatNumber(Math.round(item.average_usage))}</Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="pt-2">
          <Text size="sm" variant="muted" weight="medium">Phân bổ cuộc họp</Text>
          {isLoadingDistribution ? (
            <div className="flex items-center justify-center h-20">
              <Text variant="muted">Đang tải dữ liệu phân bổ...</Text>
            </div>
          ) : (
            <div className="mt-2 grid grid-cols-2 gap-3">
              {topDays.length > 0 && (
                <StatCard 
                  metric={topDays[0][0]}
                  value={topDays[0][1]}
                  variant="primary"
                  size="small"
                  withShadow={false}
                  withBorder
                />
              )}
              {topDays.length > 1 && (
                <StatCard 
                  metric={topDays[1][0]}
                  value={topDays[1][1]}
                  variant="secondary"
                  size="small"
                  withShadow={false}
                  withBorder
                />
              )}
            </div>
          )}
        </div>
      </div>
      {/* <div className="mt-6">
        <Button 
          variant="primary"
          size="medium"
          rightIcon={faFileAlt}
          isFullWidth
          withRipple
          rounded
          onClick={onViewFullReport}
        >
          Xem báo cáo đầy đủ
        </Button>
      </div> */}
    </Card>
  );
};

export default AnalyticsPanel;

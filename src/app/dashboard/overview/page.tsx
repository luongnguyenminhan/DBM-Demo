'use client';

import React from 'react';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import StatCard from '@/components/molecules/statCard';
import Icon from '@/components/atomic/icon';
import { faChartLine, faList, faUser, faCalendarCheck, faEye, faFileAlt } from '@fortawesome/free-solid-svg-icons';

const { Heading, Text } = Typography;

export default function DashboardOverview() {
  return (
    <div className="p-6 h-full space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <Heading level="h1" size="2xl">Tổng quan</Heading>
          <Text variant="muted" size="lg" className="mt-1">
            Xem tổng quan về tiến trình của bạn
          </Text>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="primary"
            size="medium"
            leftIcon={faFileAlt}
            rounded
          >
            Tải CV lên
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          metric="Đánh giá CV"
          value="85"
          change="+5"
          icon={faChartLine}
          variant="default"
          withAnimation
        />
        <StatCard
          metric="Phỏng vấn hoàn thành"
          value="3"
          change="+1"
          icon={faCalendarCheck}
          variant="default"
          withAnimation
        />
        <StatCard
          metric="Kỹ năng đã học"
          value="12"
          change="+2"
          icon={faList}
          variant="default"
          withAnimation
        />
        <StatCard
          metric="Chứng chỉ"
          value="2"
          change="New"
          icon={faUser}
          variant="default"
          withAnimation
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CV Assessment */}
        <div className="lg:col-span-2 space-y-4">
          <Card title="Đánh giá CV" headerIcon={faEye} withShadow>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <Text weight="bold" size="lg">Đánh giá gần nhất</Text>
                  <Text variant="muted">Cập nhật 2 ngày trước</Text>
                </div>
                <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <Text size="2xl" weight="bold" className="text-white">85</Text>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <Text size="sm">Nội dung</Text>
                    <Text size="sm" variant="primary">80%</Text>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Text size="sm">Định dạng</Text>
                    <Text size="sm" variant="success">90%</Text>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <Text size="sm">Từ khóa</Text>
                    <Text size="sm" variant="warning">70%</Text>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="primary" isFullWidth>Xem chi tiết</Button>
              </div>
            </div>
          </Card>
          
          <Card title="Lịch sử phỏng vấn" withShadow>
            <div className="p-4">
              <div className="divide-y divide-gray-100">
                {[
                  { date: '15/05/2023', position: 'Frontend Developer', score: 82 },
                  { date: '28/04/2023', position: 'React Developer', score: 75 },
                  { date: '10/04/2023', position: 'Web Developer', score: 68 },
                ].map((interview, index) => (
                  <div key={index} className="py-4 flex justify-between items-center">
                    <div>
                      <Text weight="medium">{interview.position}</Text>
                      <Text size="sm" variant="muted">{interview.date}</Text>
                    </div>
                    <div className="flex items-center">
                      <div className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full flex items-center">
                        <Icon icon={faChartLine} size="sm" className="mr-1" />
                        <Text weight="medium">{interview.score}%</Text>
                      </div>
                      <Button 
                        variant="outline"
                        size="small"
                        className="ml-3"
                      >
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
        
        {/* Side Column */}
        <div className="lg:col-span-1 space-y-4">
          <Card title="Lộ trình đề xuất" withShadow>
            <div className="p-4">
              <div className="space-y-4">
                <div className="border border-green-200 rounded-md p-3 bg-green-50">
                  <Text weight="medium" className="text-green-700">Hoàn thành CV</Text>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <Text size="sm" className="text-green-700 ml-2">100%</Text>
                  </div>
                </div>
                
                <div className="border border-yellow-200 rounded-md p-3 bg-yellow-50">
                  <Text weight="medium" className="text-yellow-700">Phỏng vấn thử</Text>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-yellow-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <Text size="sm" className="text-yellow-700 ml-2">60%</Text>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-md p-3">
                  <Text weight="medium" className="text-gray-700">Kỹ năng nâng cao</Text>
                  <div className="flex items-center mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gray-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <Text size="sm" className="text-gray-700 ml-2">30%</Text>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button variant="outline" size="small" isFullWidth>Xem lộ trình đầy đủ</Button>
              </div>
            </div>
          </Card>
          
          <Card title="Gợi ý công việc phù hợp" withShadow>
            <div className="p-4">
              <div className="space-y-3">
                {[
                  { position: 'Frontend Developer', company: 'Tech Solutions', match: '95%' },
                  { position: 'React Developer', company: 'Digital Innovations', match: '87%' },
                  { position: 'UI Developer', company: 'Creative Agency', match: '80%' },
                ].map((job, index) => (
                  <div key={index} className="border rounded-md p-3 hover:bg-gray-50">
                    <Text weight="medium">{job.position}</Text>
                    <div className="flex justify-between mt-1">
                      <Text size="sm" variant="muted">{job.company}</Text>
                      <Text size="sm" variant="success">{job.match} phù hợp</Text>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Button variant="primary" size="small" isFullWidth>Xem thêm việc làm</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant="primary"
          size="large"
          leftIcon={faFileAlt}
          isFullWidth
          withRipple
        >
          Tải CV lên để đánh giá
        </Button>
        <Button
          variant="outline"
          size="large"
          leftIcon={faUser}
          isFullWidth
          withRipple
        >
          Bắt đầu phỏng vấn ảo
        </Button>
      </div>
    </div>
  );
}

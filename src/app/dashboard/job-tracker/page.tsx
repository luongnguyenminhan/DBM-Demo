'use client';

import React, { useState } from 'react';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import Breadcrumb from '@/components/molecules/breadcrumb';
import { faBriefcase, faPlus, faBuilding, faCheck, faUser, faCalendarAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Badge from '@/components/atomic/badge';
import Icon from '@/components/atomic/icon';
import Image from 'next/image';

const { Heading, Text } = Typography;

interface JobApplication {
  id: number;
  company: string;
  position: string;
  status: 'applied' | 'interviewing' | 'offer' | 'rejected';
  appliedDate: string;
  nextStep?: string;
  nextStepDate?: string;
  logo?: string;
}

export default function JobApplicationTracker() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: 1,
      company: 'Tech Solutions Inc',
      position: 'Frontend Developer',
      status: 'interviewing',
      appliedDate: '2023-05-10',
      nextStep: 'Technical Interview',
      nextStepDate: '2023-05-25'
    },
    {
      id: 2,
      company: 'Digital Innovations',
      position: 'React Developer',
      status: 'applied',
      appliedDate: '2023-05-15'
    },
    {
      id: 3,
      company: 'WebSphere',
      position: 'UI/UX Developer',
      status: 'offer',
      appliedDate: '2023-04-20',
      nextStep: 'Offer Negotiation',
      nextStepDate: '2023-05-30'
    },
    {
      id: 4,
      company: 'Creative Tech',
      position: 'Frontend Engineer',
      status: 'rejected',
      appliedDate: '2023-04-10'
    }
  ]);

  const stats = {
    total: applications.length,
    active: applications.filter(app => app.status !== 'rejected').length,
    interviews: applications.filter(app => app.status === 'interviewing').length,
    offers: applications.filter(app => app.status === 'offer').length
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'applied': return 'primary';
      case 'interviewing': return 'warning';
      case 'offer': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'applied': return 'Applied';
      case 'interviewing': return 'Interviewing';
      case 'offer': return 'Offer Received';
      case 'rejected': return 'Rejected';
      default: return status;
    }
  };

  return (
    <div className="p-6 h-full space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumb 
          items={[
            { key: 'home', label: 'Trang chủ', href: '/' },
            { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
            { key: 'job-tracker', label: 'Quản lý ứng tuyển' }
          ]}
          withHomeIcon
          variant="default"
          size="medium"
        />
      </div>
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <Heading level="h1" size="2xl">Quản lý ứng tuyển</Heading>
          <Text variant="muted" size="lg" className="mt-1">
            Theo dõi các công việc bạn đã ứng tuyển
          </Text>
        </div>
        
        <div>
          <Button 
            variant="primary"
            size="medium"
            leftIcon={faPlus}
            rounded
          >
            Thêm ứng tuyển mới
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card withShadow className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <Text variant="muted" size="sm">Tổng ứng tuyển</Text>
              <Text size="2xl" weight="bold">{stats.total}</Text>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Icon icon={faBriefcase} variant="primary" size="md" />
            </div>
          </div>
        </Card>
        
        <Card withShadow className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <Text variant="muted" size="sm">Đang xử lý</Text>
              <Text size="2xl" weight="bold">{stats.active}</Text>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Icon icon={faBuilding} variant="success" size="md" />
            </div>
          </div>
        </Card>
        
        <Card withShadow className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <Text variant="muted" size="sm">Phỏng vấn</Text>
              <Text size="2xl" weight="bold">{stats.interviews}</Text>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Icon icon={faUser} variant="warning" size="md" />
            </div>
          </div>
        </Card>
        
        <Card withShadow className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <Text variant="muted" size="sm">Offer</Text>
              <Text size="2xl" weight="bold">{stats.offers}</Text>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <Icon icon={faCheck} variant="error" size="md" />
            </div>
          </div>
        </Card>
      </div>

      {/* Applications List */}
      <Card title="Danh sách ứng tuyển" withShadow>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Công ty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vị trí
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày ứng tuyển
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bước tiếp theo
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center relative">
                        {job.logo ? (
                          <Image 
                            src={job.logo} 
                            alt={job.company} 
                            fill
                            sizes="40px"
                            className="rounded-full"
                          />
                        ) : (
                          <Text size="sm">{job.company.charAt(0)}</Text>
                        )}
                      </div>
                      <div className="ml-4">
                        <Text weight="medium">{job.company}</Text>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Text>{job.position}</Text>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Icon icon={faCalendarAlt} size="xs" className="mr-2" />
                      <Text size="sm">{job.appliedDate}</Text>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge 
                      content={getStatusLabel(job.status)} 
                      variant={getStatusColor(job.status)} 
                      shape="pill" 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.nextStep ? (
                      <div>
                        <Text size="sm">{job.nextStep}</Text>
                        {job.nextStepDate && (
                          <Text size="xs" variant="muted">{job.nextStepDate}</Text>
                        )}
                      </div>
                    ) : (
                      <Text size="sm" variant="muted">-</Text>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button
                      variant="outline"
                      size="small"
                      rightIcon={faChevronRight}
                      rounded
                    >
                      Chi tiết
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Application Timeline for Selected Job */}
      <div className="mt-8">
        <Card title="Tiến trình phỏng vấn" subtitle="Tech Solutions Inc - Frontend Developer" withShadow>
          <div className="p-6">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-8">
                <div className="relative pl-10">
                  <div className="absolute left-2.5 -translate-x-1/2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Icon icon={faCheck} size="xs" className="text-white" />
                  </div>
                  <div>
                    <Text weight="medium">Đã gửi CV</Text>
                    <Text size="sm" variant="muted">10 tháng 5, 2023</Text>
                  </div>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-2.5 -translate-x-1/2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Icon icon={faCheck} size="xs" className="text-white" />
                  </div>
                  <div>
                    <Text weight="medium">Phỏng vấn vòng 1</Text>
                    <Text size="sm" variant="muted">18 tháng 5, 2023</Text>
                    <Text size="sm" className="mt-1">Phỏng vấn với HR và đánh giá ban đầu</Text>
                  </div>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-2.5 -translate-x-1/2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Icon icon={faUser} size="xs" className="text-white" />
                  </div>
                  <div>
                    <Text weight="medium">Phỏng vấn kỹ thuật</Text>
                    <Text size="sm" variant="muted">25 tháng 5, 2023</Text>
                    <Text size="sm" className="mt-1">Phỏng vấn với lead developer</Text>
                  </div>
                </div>
                
                <div className="relative pl-10">
                  <div className="absolute left-2.5 -translate-x-1/2 w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                    <Icon icon={faBuilding} size="xs" className="text-white" />
                  </div>
                  <div>
                    <Text weight="medium">Phỏng vấn với CTO</Text>
                    <Text size="sm" variant="muted">Đang chờ</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
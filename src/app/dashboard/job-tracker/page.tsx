'use client';

import React, { useState } from 'react';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import { faBriefcase, faPlus, faBuilding, faCheck, faUser, faCalendarAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Badge from '@/components/atomic/badge';
import Icon from '@/components/atomic/icon';
import Image from 'next/image';
import StatCard from '@/components/molecules/statCard';

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
            position: 'Lập Trình Viên Frontend',
            status: 'interviewing',
            appliedDate: '2023-05-10',
            nextStep: 'Phỏng Vấn Kỹ Thuật',
            nextStepDate: '2023-05-25'
        },
        {
            id: 2,
            company: 'Digital Innovations',
            position: 'Lập Trình Viên React',
            status: 'applied',
            appliedDate: '2023-05-15'
        },
        {
            id: 3,
            company: 'WebSphere',
            position: 'Lập Trình Viên UI/UX',
            status: 'offer',
            appliedDate: '2023-04-20',
            nextStep: 'Đàm Phán Lương',
            nextStepDate: '2023-05-30'
        },
        {
            id: 4,
            company: 'Creative Tech',
            position: 'Kỹ Sư Frontend',
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
            case 'applied': return 'Đã Nộp';
            case 'interviewing': return 'Nhà tuyển dụng đã xem';
            case 'offer': return 'Đã Nhận Offer';
            case 'rejected': return 'Bị Từ Chối';
            default: return status;
        }
    };

    return (
        <div className="p-6 h-full space-y-6">
            {/* Breadcrumb Navigation */}
            
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
                <StatCard
                    metric="Tổng ứng tuyển"
                    value={stats.total}
                    icon={faBriefcase}
                    variant="default"
                />
                
                <StatCard
                    metric="Đang xử lý"
                    value={stats.active}
                    icon={faBuilding}
                    variant="default"
                />
                
                <StatCard
                    metric="Phỏng vấn"
                    value={stats.interviews}
                    icon={faUser}
                    variant="default"
                />
                
                <StatCard
                    metric="Offer"
                    value={stats.offers}
                    icon={faCheck}
                    variant="default"
                />
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                                                    <Text size="sm" className='m-2'>{job.company.charAt(0)}</Text>
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
                <Card title="Quy trình ứng tuyển" subtitle="Trạng thái hiện tại của quá trình ứng tuyển" withShadow>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Icon 
                                    icon={faCheck} 
                                    className="w-5 h-5 text-green-600" 
                                />
                                <span className="ml-3 text-sm font-medium">
                                    <Text weight="medium">Đã nộp hồ sơ ứng tuyển</Text>
                                </span>
                            </div>
                            
                            <div className="flex items-center">
                                <Icon 
                                    icon={faCheck} 
                                    className="w-5 h-5 text-green-600" 
                                />
                                <span className="ml-3 text-sm font-medium">
                                    <Text weight="medium">Nhà tuyển dụng đã xem hồ sơ</Text>
                                </span>
                            </div>
                            
                            <div className="flex items-center opacity-50">
                                <Icon 
                                    icon={faChevronRight} 
                                    className="w-5 h-5 text-gray-600" 
                                />
                                <span className="ml-3 text-sm font-medium">
                                    <Text weight="medium">Đã liên hệ sơ bộ</Text>
                                </span>
                            </div>
                            
                            <div className="flex items-center opacity-50">
                                <Icon 
                                    icon={faChevronRight} 
                                    className="w-5 h-5 text-gray-600" 
                                />
                                <span className="ml-3 text-sm font-medium">
                                    <Text weight="medium">Đã xác nhận lịch phỏng vấn</Text>
                                </span>
                            </div>
                            
                            <div className="flex items-center opacity-50">
                                <Icon 
                                    icon={faChevronRight} 
                                    className="w-5 h-5 text-gray-600" 
                                />
                                <span className="ml-3 text-sm font-medium">
                                    <Text weight="medium">Đã hoàn thành phỏng vấn</Text>
                                </span>
                            </div>

                            <div className="flex items-center opacity-50">
                                <Icon 
                                    icon={faChevronRight} 
                                    className="w-5 h-5 text-gray-600" 
                                />
                                <span className="ml-3 text-sm font-medium">
                                    <Text weight="medium">Đã nhận phản hồi sau phỏng vấn</Text>
                                </span>
                            </div>

                            <div className="flex items-center opacity-50">
                                <Icon 
                                    icon={faChevronRight} 
                                    className="w-5 h-5 text-gray-600" 
                                />
                                <span className="ml-3 text-sm font-medium">
                                    <Text weight="medium">Đã nhận offer</Text>
                                </span>
                            </div>

                            <div className="flex items-center opacity-50">
                                <Icon 
                                    icon={faChevronRight} 
                                    className="w-5 h-5 text-gray-600" 
                                />
                                <span className="ml-3 text-sm font-medium">
                                    <Text weight="medium">Đã đàm phán & chốt offer</Text>
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
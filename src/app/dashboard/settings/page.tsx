'use client';

import React, { useState } from 'react';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import Input from '@/components/atomic/input';
import Avatar from '@/components/atomic/avatar';
import Badge from '@/components/atomic/badge';
import { 
    faUser, 
    faBell, 
    faTrash, 
    faCamera, 
    faSave, 
    faEnvelope, 
    faFilePdf, 
    faEye, 
    faDownload, 
    faUpload, 
    faPencil 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Heading, Text } = Typography;

export default function UserProfile() {
    // User information state
    const [name, setName] = useState('Nguyễn Văn A');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [email, setEmail] = useState('example@mail.com');
    const [phoneNumber, setPhoneNumber] = useState('+84 123 456 789');
    const [bio, setBio] = useState('Lập trình viên front-end với 3 năm kinh nghiệm');
    
    // CV management state
    const [cvList, setCvList] = useState([
        { 
            id: '1', 
            name: 'CV Lập trình viên Frontend', 
            date: '15/01/2025',
            format: 'PDF',
            size: '1.2 MB',
            status: 'active',
            matchScore: 85
        },
        { 
            id: '2', 
            name: 'CV Thiết kế UI/UX', 
            date: '20/02/2025',
            format: 'PDF',
            size: '2.1 MB',
            status: 'inactive',
            matchScore: 72
        },
        { 
            id: '3', 
            name: 'CV Lập trình viên Full Stack', 
            date: '05/03/2025',
            format: 'PDF',
            size: '1.8 MB',
            status: 'active',
            matchScore: 91
        }
    ]);
    
    // Delete CV handler
    const handleDeleteCV = (id: string) => {
        setCvList(cvList.filter(cv => cv.id !== id));
    };
    
    // Get match score badge variant based on score
    const getMatchBadgeVariant = (score: number) => {
        if (score >= 90) return 'success';
        if (score >= 70) return 'primary';
        if (score >= 50) return 'warning';
        return 'error';
    };

    return (
        <div className="p-6 h-full space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <Heading level="h1" size="2xl">Quản lý tài khoản</Heading>
                    <Text variant="muted" size="lg" className="mt-1">
                        Quản lý thông tin cá nhân và CV của bạn
                    </Text>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* User Settings Card */}
                <Card withShadow className='col-span-2'>
                    <div className="p-6">
                        <Heading level="h2" size="xl" className="mb-4">Thông tin cá nhân</Heading>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                            <div className="relative">
                                <Avatar 
                                    src="https://i.pravatar.cc/300" 
                                    size="2xl"
                                    withBorder
                                    borderColor="var(--border-primary)"
                                />
                                <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                                    <Button
                                        variant="primary"
                                        size="small"
                                        leftIcon={faCamera}
                                        rounded
                                        withRipple
                                    >
                                    </Button>
                                </div>
                            </div>
                            
                            <div className="space-y-2 text-center sm:text-left">
                                <Text size="lg" weight="bold">{name}</Text>
                                <Text variant="muted">{email}</Text>
                                <Text size="sm">Tham gia: 10 tháng 5, 2023</Text>
                                <Badge content="Đã xác thực" variant="success" size="sm" />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <Text weight="medium" className="mb-1">Họ và tên</Text>
                                <Input 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nhập tên của bạn"
                                />
                            </div>
                            
                            <div>
                                <Text weight="medium" className="mb-1">Email (Không thể chỉnh sửa)</Text>
                                <Input 
                                    value={email}
                                    placeholder="Email của bạn"
                                    leftIcon={faEnvelope}
                                    disabled
                                />
                            </div>
                            
                            <div>
                                <Text weight="medium" className="mb-1">Số điện thoại</Text>
                                <Input 
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="Nhập số điện thoại của bạn"
                                />
                            </div>
                            
                            <div>
                                <Text weight="medium" className="mb-1">Giới thiệu</Text>
                                <Input 
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Giới thiệu ngắn về bản thân"
                                    asTextArea
                                    rows={3}
                                />
                            </div>
                            
                            <div>
                                <Text weight="medium" className="mb-1">Kỹ năng</Text>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    <Badge content="React" variant="primary" shape="rounded" />
                                    <Badge content="TypeScript" variant="primary" shape="rounded" />
                                    <Badge content="NextJS" variant="primary" shape="rounded" />
                                    <Badge content="Tailwind CSS" variant="primary" shape="rounded" />
                                    <Badge content="UX Design" variant="secondary" shape="rounded" />
                                    <Badge content="+ Thêm kỹ năng" variant="default" shape="rounded" leftIcon={faUser} onClick={() => {}} />
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-end mt-4">
                            <Button
                                variant="primary"
                                leftIcon={faSave}
                            >
                                Lưu thay đổi
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* CV Management Card */}
                <Card withShadow className='col-span-3'>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <Heading level="h2" size="xl">Quản lý CV</Heading>
                            <Button
                                variant="primary"
                                leftIcon={faUpload}
                            >
                                Tải lên CV mới
                            </Button>
                        </div>
                        
                        <div className="overflow-hidden rounded-lg border border-gray-200 mb-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tên CV
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ngày tạo
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Độ phù hợp
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Trạng thái
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Hành động
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {cvList.map((cv) => (
                                        <tr key={cv.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <FontAwesomeIcon icon={faFilePdf} className="text-red-500" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{cv.name}</div>
                                                        <div className="text-xs text-gray-500">{cv.format} · {cv.size}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {cv.date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge 
                                                    content={`${cv.matchScore}%`} 
                                                    variant={getMatchBadgeVariant(cv.matchScore)} 
                                                    size="sm"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge 
                                                    content={cv.status === 'active' ? 'Đang dùng' : 'Không dùng'} 
                                                    variant={cv.status === 'active' ? 'success' : 'default'} 
                                                    size="sm"
                                                />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="small"
                                                        leftIcon={faEye}
                                                        customClassName="text-blue-600"
                                                        title="Xem CV"
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        size="small"
                                                        leftIcon={faDownload}
                                                        customClassName="text-green-600"
                                                        title="Tải xuống"
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        size="small"
                                                        leftIcon={faPencil}
                                                        customClassName="text-amber-600"
                                                        title="Chỉnh sửa"
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        size="small"
                                                        leftIcon={faTrash}
                                                        customClassName="text-red-600"
                                                        title="Xóa CV"
                                                        onClick={() => handleDeleteCV(cv.id)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 text-blue-500">
                                    <FontAwesomeIcon icon={faBell} />
                                </div>
                                <div className="ml-3">
                                    <Text weight="medium" className="text-blue-800">Gợi ý việc làm phù hợp</Text>
                                    <Text size="sm" className="text-blue-600 mt-1">
                                        Dựa trên CV &quot;Lập trình viên Full Stack&quot; của bạn, chúng tôi đã tìm thấy 12 việc làm phù hợp. 
                                        <span className="underline ml-1 cursor-pointer">Xem ngay</span>
                                    </Text>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            <Text weight="medium" className="mb-2">CV tốt nhất cho vị trí</Text>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="border rounded-lg p-3 hover:border-blue-500 cursor-pointer">
                                    <Text size="sm" weight="medium">Senior Frontend Developer</Text>
                                    <div className="flex justify-between items-center mt-1">
                                        <Text size="xs" variant="muted">FPT Software</Text>
                                        <Badge content="91% phù hợp" variant="success" size="xs" />
                                    </div>
                                </div>
                                <div className="border rounded-lg p-3 hover:border-blue-500 cursor-pointer">
                                    <Text size="sm" weight="medium">Lập trình viên React Native</Text>
                                    <div className="flex justify-between items-center mt-1">
                                        <Text size="xs" variant="muted">VNG Corporation</Text>
                                        <Badge content="78% phù hợp" variant="primary" size="xs" />
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
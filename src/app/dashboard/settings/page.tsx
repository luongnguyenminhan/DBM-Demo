'use client';

import React, { useState } from 'react';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import Input from '@/components/atomic/input';
import Avatar from '@/components/atomic/avatar';
import { faUser, faBell, faTrash, faCamera, faSave, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import TabNavigation from '@/components/molecules/tabNavigation';

const { Heading, Text } = Typography;

export default function UserSettings() {
  const [name, setName] = useState('Nguyen Van A');
  const [email, setEmail] = useState('example@mail.com');
  const [notifications, setNotifications] = useState({
    email: true,
    application: true,
    marketing: false,
  });
  
  const toggleNotification = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="p-6 h-full space-y-6">
      {/* Breadcrumb Navigation */}
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <Heading level="h1" size="2xl">Cài đặt tài khoản</Heading>
          <Text variant="muted" size="lg" className="mt-1">
            Quản lý thông tin cá nhân và tùy chọn tài khoản
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar Navigation */}
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          <TabNavigation
            tabs={[
              {
                key: 'personal',
                label: 'Thông tin cá nhân',
                icon: faUser,
                content: (
                  <Card withShadow>
                    <div className="p-6 space-y-6">
                      <div className="flex flex-col sm:flex-row items-center gap-6">
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
                          <Text weight="medium" className="mb-1">Email</Text>
                          <Input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                            leftIcon={faEnvelope}
                          />
                        </div>
                        
                        <div>
                          <Text weight="medium" className="mb-1">Số điện thoại</Text>
                          <Input 
                            placeholder="Nhập số điện thoại của bạn"
                          />
                        </div>
                        
                        <div>
                          <Text weight="medium" className="mb-1">Bio</Text>
                          <Input 
                            placeholder="Giới thiệu ngắn về bản thân"
                            asTextArea
                            rows={3}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button
                          variant="primary"
                          leftIcon={faSave}
                        >
                          Lưu thay đổi
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              },
              {
                key: 'integrations',
                label: 'Tích hợp',
                icon: faCamera,
                content: (
                  <Card withShadow>
                    <div className="p-6 space-y-6">
                      <div className="flex items-start justify-between p-4 border rounded-md">
                        <div>
                          <Text weight="medium">LinkedIn</Text>
                          <Text size="sm" variant="muted" className="mt-1">Kết nối tài khoản LinkedIn để đồng bộ CV và kinh nghiệm</Text>
                        </div>
                        <Button variant="primary" size="small">Kết nối</Button>
                      </div>
                      
                      <div className="flex items-start justify-between p-4 border rounded-md">
                        <div>
                          <Text weight="medium">Google Drive</Text>
                          <Text size="sm" variant="muted" className="mt-1">Lưu trữ và đồng bộ CV của bạn trên Google Drive</Text>
                        </div>
                        <Button variant="outline" size="small">Kết nối</Button>
                      </div>
                    </div>
                  </Card>
                )
              },
              {
                key: 'notifications',
                label: 'Thông báo',
                icon: faBell,
                content: (
                  <Card withShadow>
                    <div className="p-6 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Text weight="medium">Thông báo qua email</Text>
                            <Text size="sm" variant="muted">Nhận thông báo qua email</Text>
                          </div>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input 
                              type="checkbox" 
                              id="toggle-email" 
                              className="sr-only"
                              checked={notifications.email}
                              onChange={() => toggleNotification('email')}
                            />
                            <label 
                              className={`block overflow-hidden h-6 rounded-full cursor-pointer ${notifications.email ? 'bg-primary-500' : 'bg-gray-300'}`}
                              htmlFor="toggle-email"
                            >
                              <span className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${notifications.email ? 'translate-x-4' : ''}`}></span>
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Text weight="medium">Thông báo về đơn ứng tuyển</Text>
                            <Text size="sm" variant="muted">Nhận thông báo khi có cập nhật về đơn ứng tuyển</Text>
                          </div>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input 
                              type="checkbox" 
                              id="toggle-application" 
                              className="sr-only"
                              checked={notifications.application}
                              onChange={() => toggleNotification('application')}
                            />
                            <label 
                              className={`block overflow-hidden h-6 rounded-full cursor-pointer ${notifications.application ? 'bg-primary-500' : 'bg-gray-300'}`}
                              htmlFor="toggle-application"
                            >
                              <span className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${notifications.application ? 'translate-x-4' : ''}`}></span>
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Text weight="medium">Thông báo marketing</Text>
                            <Text size="sm" variant="muted">Nhận thông tin khuyến mãi và tin tức từ chúng tôi</Text>
                          </div>
                          <div className="relative inline-block w-10 mr-2 align-middle select-none">
                            <input 
                              type="checkbox" 
                              id="toggle-marketing" 
                              className="sr-only"
                              checked={notifications.marketing}
                              onChange={() => toggleNotification('marketing')}
                            />
                            <label 
                              className={`block overflow-hidden h-6 rounded-full cursor-pointer ${notifications.marketing ? 'bg-primary-500' : 'bg-gray-300'}`}
                              htmlFor="toggle-marketing"
                            >
                              <span className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${notifications.marketing ? 'translate-x-4' : ''}`}></span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              },
              {
                key: 'account',
                label: 'Quản lý tài khoản',
                icon: faTrash,
                content: (
                  <Card withShadow>
                    <div className="p-6 space-y-6">
                      <div>
                        <Heading level="h3" size="lg" className="mb-2">Đổi mật khẩu</Heading>
                        <div className="space-y-3">
                          <Input 
                            type="password"
                            placeholder="Mật khẩu hiện tại"
                            leftIcon={faLock}
                          />
                          <Input 
                            type="password"
                            placeholder="Mật khẩu mới"
                            leftIcon={faLock}
                          />
                          <Input 
                            type="password"
                            placeholder="Nhập lại mật khẩu mới"
                            leftIcon={faLock}
                          />
                          <Button variant="primary">Cập nhật mật khẩu</Button>
                        </div>
                      </div>
                      
                      <div className="border-t pt-6">
                        <Heading level="h3" size="lg" className="mb-2 text-error-600">Xóa tài khoản</Heading>
                        <Text variant="muted">Khi xóa tài khoản, tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.</Text>
                        <div className="flex my-2">
                          <Button 
                            variant="outline" 
                            leftIcon={faTrash}
                            customClassName="text-error-600 hover:bg-error-50 border-error-600"
                          >
                            Delete my account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import Breadcrumb from '@/components/molecules/breadcrumb';
import Input from '@/components/atomic/input';
import { faRocket, faGraduationCap, faRoute, faStar } from '@fortawesome/free-solid-svg-icons';
import DropdownMenu from '@/components/molecules/dropdown';

const { Heading, Text } = Typography;

export default function CareerPathAdvisor() {
  const [careerGoal, setCareerGoal] = useState('');
  const [pathGenerated, setPathGenerated] = useState(false);
  
  const handleGeneratePath = () => {
    setPathGenerated(true);
  };

  return (
    <div className="p-6 h-full space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumb 
          items={[
            { key: 'home', label: 'Trang chủ', href: '/' },
            { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
            { key: 'career-advisor', label: 'Tư vấn lộ trình' }
          ]}
          withHomeIcon
          variant="default"
          size="medium"
        />
      </div>
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <Heading level="h1" size="2xl">Tư vấn lộ trình nghề nghiệp</Heading>
          <Text variant="muted" size="lg" className="mt-1">
            Xây dựng lộ trình phát triển sự nghiệp phù hợp với mục tiêu của bạn
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Career Goals Input */}
        <div className="lg:col-span-2">
          <Card title="Thiết lập mục tiêu nghề nghiệp" headerIcon={faRocket} withShadow>
            <div className="p-6 space-y-6">
              <div>
                <Text weight="medium" className="mb-2">Mục tiêu nghề nghiệp của bạn</Text>
                <Input
                  placeholder="Ví dụ: Trở thành Senior Frontend Developer trong 2 năm tới"
                  variant="outlined"
                  size="large"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Text weight="medium" className="mb-2">Lĩnh vực quan tâm</Text>
                  <DropdownMenu
                    items={[
                      { key: 'frontend', label: 'Frontend Development' },
                      { key: 'backend', label: 'Backend Development' },
                      { key: 'fullstack', label: 'Full Stack Development' },
                      { key: 'data', label: 'Data Science' }
                    ]}
                    label="Chọn lĩnh vực"
                    variant="outline"
                    size="medium"
                    isFullWidth
                  />
                </div>
                
                <div>
                  <Text weight="medium" className="mb-2">Cấp độ kinh nghiệm hiện tại</Text>
                  <DropdownMenu
                    items={[
                      { key: 'beginner', label: 'Beginner' },
                      { key: 'intermediate', label: 'Intermediate' },
                      { key: 'advanced', label: 'Advanced' }
                    ]}
                    label="Chọn cấp độ"
                    variant="outline"
                    size="medium"
                    isFullWidth
                  />
                </div>
              </div>
              
              <div>
                <Text weight="medium" className="mb-2">Kỹ năng hiện có</Text>
                <div className="flex flex-wrap gap-2">
                  {['HTML', 'CSS', 'JavaScript', 'React', 'Git'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
                      {skill} ✓
                    </span>
                  ))}
                  <span className="px-3 py-1 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm cursor-pointer">
                    + Thêm kỹ năng
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="primary"
                  size="large"
                  leftIcon={faRoute}
                  onClick={handleGeneratePath}
                  isFullWidth
                  withRipple
                >
                  Tạo lộ trình
                </Button>
              </div>
            </div>
          </Card>
          
          {pathGenerated && (
            <Card title="Lộ trình phát triển" headerIcon={faRoute} className="mt-6" withShadow>
              <div className="p-6">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  <div className="space-y-8">
                    {/* Timeline items */}
                    <div className="relative pl-10">
                      <div className="absolute left-2.5 -translate-x-1/2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                        <Text className="text-white font-bold">1</Text>
                      </div>
                      <div className="border rounded-lg p-4">
                        <Text weight="medium" className="flex items-center gap-2">
                          <i className="fas fa-calendar-alt text-primary-500"></i>
                          0-3 tháng: Củng cố nền tảng JavaScript
                        </Text>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-start gap-2">
                            <span className="text-primary-500">•</span>
                            <Text size="sm">Hoàn thành khóa học JavaScript nâng cao</Text>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-primary-500">•</span>
                            <Text size="sm">Thực hành với 2-3 dự án nhỏ</Text>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative pl-10">
                      <div className="absolute left-2.5 -translate-x-1/2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                        <Text className="text-white font-bold">2</Text>
                      </div>
                      <div className="border rounded-lg p-4">
                        <Text weight="medium" className="flex items-center gap-2">
                          <i className="fas fa-calendar-alt text-primary-500"></i>
                          3-9 tháng: Chuyên sâu về React
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
        
        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card title="Khóa học đề xuất" headerIcon={faGraduationCap} withShadow>
            <div className="p-4">
              <ul className="divide-y divide-gray-100">
                <li className="py-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded">
                      <i className="fas fa-code text-blue-500"></i>
                    </div>
                    <div>
                      <Text weight="medium" size="sm">Advanced JavaScript Course</Text>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-yellow-400">
                          <i className="fas fa-star text-xs"></i>
                          <i className="fas fa-star text-xs"></i>
                          <i className="fas fa-star text-xs"></i>
                          <i className="fas fa-star text-xs"></i>
                          <i className="fas fa-star-half-alt text-xs"></i>
                        </div>
                        <Text size="xs" variant="muted" className="ml-2">4.8</Text>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 p-2 rounded">
                      <i className="fas fa-react text-green-500"></i>
                    </div>
                    <div>
                      <Text weight="medium" size="sm">React Performance Optimization</Text>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center text-yellow-400">
                          <i className="fas fa-star text-xs"></i>
                          <i className="fas fa-star text-xs"></i>
                          <i className="fas fa-star text-xs"></i>
                          <i className="fas fa-star text-xs"></i>
                          <i className="fas fa-star text-xs"></i>
                        </div>
                        <Text size="xs" variant="muted" className="ml-2">5.0</Text>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </Card>
          
          <Card title="Kỹ năng cần phát triển" headerIcon={faStar} withShadow>
            <div className="p-4">
              <ul className="space-y-3">
                {[
                  { skill: 'TypeScript', level: 75 },
                  { skill: 'React Hooks', level: 60 },
                  { skill: 'Redux', level: 45 }
                ].map((item, index) => (
                  <li key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <Text size="sm">{item.skill}</Text>
                      <Text size="sm" variant="muted">{item.level}%</Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-500 h-2 rounded-full" 
                        style={{ width: `${item.level}%` }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
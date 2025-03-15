'use client';

import React, { useState } from 'react';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import Breadcrumb from '@/components/molecules/breadcrumb';
import { faVideo, faMicrophone, faRedo, faPlay, faStop, faChartBar } from '@fortawesome/free-solid-svg-icons';
import DropdownMenu from '@/components/molecules/dropdown';

const { Heading, Text } = Typography;

export default function MockInterview() {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  
  const jobRoles = [
    { key: 'frontend', label: 'Frontend Developer' },
    { key: 'backend', label: 'Backend Developer' },
    { key: 'fullstack', label: 'Full Stack Developer' },
    { key: 'data', label: 'Data Scientist' },
    { key: 'devops', label: 'DevOps Engineer' }
  ];

  const experienceLevels = [
    { key: 'entry', label: 'Entry Level' },
    { key: 'junior', label: 'Junior (1-2 years)' },
    { key: 'mid', label: 'Mid-level (3-5 years)' },
    { key: 'senior', label: 'Senior (5+ years)' }
  ];

  const handleStartInterview = () => {
    setInterviewStarted(true);
    // In a real app, this would start the interview session
  };

  const handleFinishInterview = () => {
    setInterviewStarted(false);
    setInterviewCompleted(true);
    // In a real app, this would end the interview and show analysis
  };

  const handlePracticeAgain = () => {
    setInterviewStarted(false);
    setInterviewCompleted(false);
    // Reset the interview flow
  };

  return (
    <div className="p-6 h-full space-y-6">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <Heading level="h1" size="2xl">Phỏng vấn ảo</Heading>
          <Text variant="muted" size="lg" className="mt-1">
            Luyện tập phỏng vấn với AI và nhận phản hồi ngay lập tức
          </Text>
        </div>
      </div>

      {!interviewStarted && !interviewCompleted ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Job Selection Card */}
          <div className="lg:col-span-2">
            <Card title="Thiết lập phỏng vấn" withShadow>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Text weight="medium" className="mb-2">Chọn vị trí ứng tuyển</Text>
                    <DropdownMenu
                      items={jobRoles}
                      label="Chọn vị trí"
                      variant="outline"
                      size="medium"
                      isFullWidth
                    />
                  </div>
                  
                  <div>
                    <Text weight="medium" className="mb-2">Cấp độ kinh nghiệm</Text>
                    <DropdownMenu
                      items={experienceLevels}
                      label="Chọn cấp độ"
                      variant="outline"
                      size="medium"
                      isFullWidth
                    />
                  </div>
                </div>
                
                <div>
                  <Text weight="medium" className="mb-2">Kỹ năng cần đánh giá</Text>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'React', 'Node.js', 'REST API', 'GraphQL', 'SQL'].map(skill => (
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
                    leftIcon={faPlay}
                    onClick={handleStartInterview}
                    isFullWidth
                    withRipple
                  >
                    Bắt đầu phỏng vấn
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Tips Card */}
          <div className="lg:col-span-1">
            <Card title="Mẹo phỏng vấn thành công" withShadow>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <Text size="sm">Chuẩn bị một không gian yên tĩnh và có ánh sáng tốt</Text>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <Text size="sm">Ăn mặc chỉn chu như một buổi phỏng vấn thực tế</Text>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <Text size="sm">Trả lời rõ ràng và súc tích, tập trung vào những điểm chính</Text>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <Text size="sm">Sử dụng phương pháp STAR (Situation, Task, Action, Result) khi trả lời</Text>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <Text size="sm">Giữ giao tiếp bằng mắt với camera</Text>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      ) : interviewStarted ? (
        /* Interview in progress */
        <div className="grid grid-cols-1 gap-6">
          <Card withShadow>
            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative mb-4">
                  <div className="w-full h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <i className="fas fa-video text-4xl mb-2"></i>
                      <Text variant="default" size="lg" className="text-white">Camera Feed</Text>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm flex items-center">
                    <i className="fas fa-circle mr-1 text-xs"></i> REC
                  </div>
                </div>
                
                <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-sm mb-6">
                  <Text size="lg" weight="medium" className="mb-2">Câu hỏi hiện tại:</Text>
                  <Text size="lg">&quot;Hãy mô tả một dự án khó khăn bạn đã từng tham gia và cách bạn giải quyết các thử thách?&quot;</Text>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button variant="outline" leftIcon={faMicrophone} size="medium">Mic: Bật</Button>
                  <Button variant="outline" leftIcon={faVideo} size="medium">Camera: Bật</Button>
                  <div className="border px-4 py-2 rounded-full flex items-center gap-2 bg-primary-50">
                    <i className="fas fa-clock text-primary-600"></i>
                    <Text variant="primary" weight="medium">1:45 / 2:00</Text>
                  </div>
                  <Button 
                    variant="outline" 
                    leftIcon={faStop} 
                    size="medium"
                    onClick={handleFinishInterview}
                  >
                    Kết thúc
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        /* Interview completed - show results */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card title="Phân tích phỏng vấn" headerIcon={faChartBar} withShadow>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <Text size="lg" weight="bold">Điểm số tổng quan</Text>
                    <Text variant="muted">Dựa trên phỏng vấn cho vị trí Frontend Developer</Text>
                  </div>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                    <Text size="xl" weight="bold" className="text-white">82%</Text>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="border rounded-lg p-4">
                    <Text weight="medium" className="mb-2">Nội dung trả lời</Text>
                    <div className="flex justify-between mb-1">
                      <Text size="sm">Độ phù hợp</Text>
                      <Text size="sm" variant="primary">85%</Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                      <Text size="sm">Cấu trúc câu trả lời</Text>
                      <Text size="sm" variant="success">90%</Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <Text weight="medium" className="mb-2">Phong cách trình bày</Text>
                    <div className="flex justify-between mb-1">
                      <Text size="sm">Ngôn ngữ cơ thể</Text>
                      <Text size="sm" variant="warning">75%</Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                      <Text size="sm">Âm lượng & Tốc độ nói</Text>
                      <Text size="sm" variant="primary">80%</Text>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <Text weight="medium" className="mb-2">Phản hồi chi tiết</Text>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-success-500 mr-2">✓</span>
                      <Text size="sm">Bạn đã trình bày rõ ràng về kinh nghiệm làm việc với React.</Text>
                    </li>
                    <li className="flex items-start">
                      <span className="text-success-500 mr-2">✓</span>
                      <Text size="sm">Cách giải quyết vấn đề được mô tả khá chi tiết và logic.</Text>
                    </li>
                    <li className="flex items-start">
                      <span className="text-error-500 mr-2">✗</span>
                      <Text size="sm">Cần tránh sử dụng quá nhiều từ lặp lại như &quot;thực sự&quot; và &quot;vâng&quot;.</Text>
                    </li>
                    <li className="flex items-start">
                      <span className="text-warning-500 mr-2">⚠</span>
                      <Text size="sm">Nên nhìn vào camera nhiều hơn để tạo kết nối với người phỏng vấn.</Text>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            
            <div className="flex justify-center">
              <Button 
                variant="primary" 
                size="large" 
                leftIcon={faRedo} 
                onClick={handlePracticeAgain}
              >
                Thực hành lại
              </Button>
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <Card title="Gợi ý cải thiện" withShadow>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2 pt-1">•</span>
                    <Text size="sm">Sử dụng cấu trúc STAR (Situation, Task, Action, Result) khi trả lời câu hỏi về kinh nghiệm.</Text>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2 pt-1">•</span>
                    <Text size="sm">Cải thiện ngôn ngữ cơ thể bằng cách ngồi thẳng và duy trì giao tiếp bằng mắt.</Text>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2 pt-1">•</span>
                    <Text size="sm">Giảm tốc độ nói khi trình bày các điểm kỹ thuật phức tạp.</Text>
                  </li>
                </ul>
              </div>
            </Card>
            
            <Card title="Câu hỏi phỏng vấn tiếp theo" withShadow>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="p-2 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer">
                    <Text size="sm">&quot;Giải thích về lifecycle methods trong React?&quot;</Text>
                  </li>
                  <li className="p-2 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer">
                    <Text size="sm">&quot;Sự khác biệt giữa Flexbox và Grid trong CSS?&quot;</Text>
                  </li>
                  <li className="p-2 rounded bg-gray-50 hover:bg-gray-100 cursor-pointer">
                    <Text size="sm">&quot;Làm thế nào để tối ưu hiệu suất của một ứng dụng React?&quot;</Text>
                  </li>
                </ul>
                <div className="mt-4">
                  <Button variant="outline" size="small" isFullWidth>Xem tất cả câu hỏi</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
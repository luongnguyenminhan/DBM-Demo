'use client';

import React, { useState } from 'react';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import Breadcrumb from '@/components/molecules/breadcrumb';
import { faCloudUploadAlt, faFileAlt, faChartLine, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const { Heading, Text } = Typography;

export default function AIScoringSystem() {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  // Placeholder functions for drag and drop functionality
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle the files
      setIsFileUploaded(true);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // Handle the files
      setIsFileUploaded(true);
    }
  };

  return (
    <div className="p-6 h-full space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumb 
          items={[
            { key: 'home', label: 'Home', href: '/' },
            { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
            { key: 'ai-scoring', label: 'Chấm điểm CV' }
          ]}
          withHomeIcon
          variant="default"
          size="medium"
        />
      </div>
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <Heading level="h1" size="2xl">Chấm Điểm CV</Heading>
          <Text variant="muted" size="lg" className="mt-1">
            Đánh giá CV của bạn bằng công nghệ AI
          </Text>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {!isFileUploaded ? (
            <Card withShadow>
              <div 
                className={`flex flex-col items-center justify-center p-12 border-2 border-dashed ${dragActive ? "border-primary-500 bg-primary-50" : "border-gray-300"} rounded-lg transition-colors duration-300`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  <div className="bg-primary-50 p-4 rounded-full mb-4 inline-block">
                    <Button 
                      variant="outline" 
                      size="large" 
                      leftIcon={faCloudUploadAlt} 
                      rounded
                      withRipple
                    >
                      Chọn File
                    </Button>
                  </div>
                  <input 
                    type="file" 
                    id="cv-upload" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleChange}
                  />
                  <Heading level="h3" size="lg" className="mb-2">Kéo và thả CV của bạn vào đây</Heading>
                  <Text variant="muted">hoặc nhấn vào nút để chọn từ máy tính</Text>
                  <Text variant="muted" size="sm" className="mt-4">Hỗ trợ định dạng PDF, DOC, DOCX. Dung lượng tối đa: 5MB</Text>
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Overall Score Card */}
              <Card title="Điểm Đánh Giá Tổng Thể" withShadow>
                <div className="flex flex-col items-center p-6">
                  <div className="relative mb-6">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-r from-primary-100 to-primary-50 flex items-center justify-center">
                      <Text size="4xl" weight="bold" variant="primary">85</Text>
                    </div>
                    <div className="absolute bottom-0 right-0 transform translate-x-1/4">
                      <Text size="lg" weight="bold" variant="success" className="bg-white p-1 rounded-full">A</Text>
                    </div>
                  </div>
                  <Text variant="muted" className="text-center">
                    CV của bạn có chất lượng tốt! Có một số điểm có thể cải thiện để tối ưu hơn.
                  </Text>
                </div>
              </Card>
              
              {/* Detailed Scores */}
              <Card title="Đánh Giá Chi Tiết" withShadow>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                  {[
                    { title: "Kỹ năng", score: 82, feedback: "Kỹ năng đa dạng và phù hợp với ngành" },
                    { title: "Kinh nghiệm", score: 88, feedback: "Mô tả kinh nghiệm rõ ràng, có số liệu cụ thể" },
                    { title: "Từ khóa", score: 76, feedback: "Cần thêm từ khóa chuyên ngành" },
                    { title: "Độ phù hợp", score: 91, feedback: "Rất phù hợp với vị trí mục tiêu" },
                  ].map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Text weight="bold">{item.title}</Text>
                        <Text weight="bold" variant={item.score >= 80 ? "success" : item.score >= 60 ? "warning" : "error"}>
                          {item.score}/100
                        </Text>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full ${item.score >= 80 ? "bg-green-500" : item.score >= 60 ? "bg-yellow-500" : "bg-red-500"}`}
                          style={{ width: `${item.score}%` }}
                        ></div>
                      </div>
                      <Text size="sm" variant="muted">{item.feedback}</Text>
                    </div>
                  ))}
                </div>
              </Card>
              
              {/* Improvement Suggestions */}
              <Card title="Gợi Ý Cải Thiện" withShadow>
                <div className="p-6">
                  <ul className="space-y-4">
                    {[
                      "Thêm các từ khóa liên quan đến công nghệ AI và machine learning",
                      "Bổ sung thành tích định lượng cho các dự án đã tham gia",
                      "Cấu trúc lại phần tóm tắt để truyền tải rõ hơn kinh nghiệm chính",
                      "Thêm chứng chỉ chuyên môn trong lĩnh vực"
                    ].map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-500 mr-2 pt-1"><i className="fas fa-check-circle"></i></span>
                        <Text>{suggestion}</Text>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1 space-y-4">
          <Card title="Các Bước Tối Ưu CV" headerIcon={faChartLine} withShadow>
            <div className="p-4 space-y-4">
              <div className="flex items-center p-3 bg-primary-50 rounded-lg">
                <div className="bg-primary-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</div>
                <Text>Tải CV của bạn lên</Text>
              </div>
              <div className="flex items-center p-3 rounded-lg">
                <div className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center mr-3">2</div>
                <Text>Nhận đánh giá chi tiết</Text>
              </div>
              <div className="flex items-center p-3 rounded-lg">
                <div className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center mr-3">3</div>
                <Text>Tối ưu theo gợi ý</Text>
              </div>
              <div className="flex items-center p-3 rounded-lg">
                <div className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center mr-3">4</div>
                <Text>Tạo CV nổi bật</Text>
              </div>
            </div>
          </Card>
          
          <Card title="Những Điểm Cần Lưu Ý" headerIcon={faExclamationTriangle} withShadow>
            <div className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-warning-500 mr-2 pt-1"><i className="fas fa-exclamation-circle"></i></span>
                  <Text size="sm">CV nên được tùy chỉnh cho từng vị trí ứng tuyển</Text>
                </li>
                <li className="flex items-start">
                  <span className="text-warning-500 mr-2 pt-1"><i className="fas fa-exclamation-circle"></i></span>
                  <Text size="sm">Sử dụng từ khóa từ mô tả công việc</Text>
                </li>
                <li className="flex items-start">
                  <span className="text-warning-500 mr-2 pt-1"><i className="fas fa-exclamation-circle"></i></span>
                  <Text size="sm">Định lượng thành tựu bằng số liệu cụ thể</Text>
                </li>
                <li className="flex items-start">
                  <span className="text-warning-500 mr-2 pt-1"><i className="fas fa-exclamation-circle"></i></span>
                  <Text size="sm">Đảm bảo CV không quá 1-2 trang</Text>
                </li>
              </ul>
            </div>
          </Card>
          
          <div className="mt-6">
            <Button 
              variant="primary"
              size="medium"
              rightIcon={isFileUploaded ? faFileAlt : faChartLine}
              isFullWidth
              withRipple
              rounded
            >
              {isFileUploaded ? "Tối ưu hóa CV ngay" : "Xem mẫu CV đạt điểm cao"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
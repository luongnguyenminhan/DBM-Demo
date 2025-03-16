'use client';

import React, { useState } from 'react';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import Alert, { Toast } from '@/components/molecules/alert';
import BadgeItem, { BadgeItemLevel } from '@/components/molecules/badgeItem';
import SkillCard from '@/components/molecules/skillCard';

import { 
  faCloudUploadAlt, 
  faChartLine, 
  faExclamationTriangle,
  faCode,
  faBriefcase,
  faGraduationCap,
  faLanguage,
  faLightbulb,
  faRocket,
  faRobot,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '@/components/atomic/modal';
import Icon from '@/components/atomic/icon';
import Badge from '@/components/atomic/badge';

const { Heading, Text } = Typography;

export default function AIScoringSystem() {
  const [isFileUploaded, setIsFileUploaded] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [scoringInProgress, setScoringInProgress] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [cvScoreData, ] = useState({
    overallScore: 85,
    category: "A",
    skills: 82,
    experience: 88,
    keywords: 76,
    relevance: 91,
    feedback: "CV của bạn có chất lượng tốt! Có một số điểm có thể cải thiện để tối ưu hơn."
  });
  
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
      handleFileUpload();
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFileUpload();
    }
  };

  const handleFileUpload = () => {
    setScoringInProgress(true);
    // Simulate API call delay
    setTimeout(() => {
      setScoringInProgress(false);
      setIsFileUploaded(true);
    }, 2000);
  };

  const handleOptimizeCV = () => {
    // Placeholder for CV optimization functionality
    Toast.success("Đã gửi yêu cầu tối ưu hóa CV. Kết quả sẽ được gửi qua email của bạn.", {
      duration: 5000,
      position: 'top-right'
    });
  };
  
  const toggleAISuggestions = () => {
    setShowAISuggestions(!showAISuggestions);
  };

  // Improvement suggestions
  const suggestions = [
    "Thêm các từ khóa liên quan đến công nghệ AI và machine learning",
    "Bổ sung thành tích định lượng cho các dự án đã tham gia",
    "Cấu trúc lại phần tóm tắt để truyền tải rõ hơn kinh nghiệm chính",
    "Thêm chứng chỉ chuyên môn trong lĩnh vực"
  ];

  // AI suggestions (hardcoded)
  const aiSuggestions = [
    {
      section: "Tóm tắt chuyên môn",
      original: "Kỹ sư phần mềm với 5 năm kinh nghiệm phát triển ứng dụng web và mobile.",
      improved: "Kỹ sư phần mềm Full-stack với 5+ năm kinh nghiệm xây dựng ứng dụng web và mobile hiệu suất cao, chuyên về React, Node.js và giải pháp AI. Đã tăng 40% hiệu quả vận hành và giảm 30% thời gian phát triển tại 3 công ty công nghệ hàng đầu.",
      reason: "Bổ sung thông tin định lượng và kỹ năng chuyên biệt để nổi bật hơn.",
    },
    {
      section: "Kinh nghiệm",
      original: "Senior Developer tại ABC Tech (2020-hiện tại): Phát triển ứng dụng web sử dụng React.",
      improved: "Senior Developer tại ABC Tech (2020-hiện tại): Lãnh đạo đội phát triển frontend 5 người, xây dựng ứng dụng SaaS với React và TypeScript, tối ưu hiệu suất trang web giảm 60% thời gian tải và tăng 35% tỷ lệ chuyển đổi.",
      reason: "Thêm chi tiết về vai trò lãnh đạo và kết quả cụ thể bằng số liệu.",
    },
    {
      section: "Kỹ năng",
      original: "JavaScript, React, Node.js, CSS",
      improved: "JavaScript (ES6+), React & Redux, Node.js/Express, GraphQL, MongoDB, AWS, CI/CD, Docker, Testing (Jest, Cypress), Performance Optimization",
      reason: "Mở rộng danh sách kỹ năng với công nghệ cụ thể và hiện đại hơn.",
    },
    {
      section: "Học vấn",
      original: "Đại học ABC, ngành Khoa học máy tính",
      improved: "Đại học ABC, Cử nhân Khoa học máy tính, chuyên ngành Phát triển phần mềm, GPA: 3.8/4.0, Đề tài tốt nghiệp: 'Ứng dụng AI trong Phân tích dữ liệu người dùng'",
      reason: "Thêm thông tin về chuyên ngành, điểm số và dự án nghiên cứu liên quan.",
    }
  ];

  // Progress step indicators
  const steps = [
    { number: 1, text: "Tải CV của bạn lên", isActive: true },
    { number: 2, text: "Nhận đánh giá chi tiết", isActive: isFileUploaded },
    { number: 3, text: "Tối ưu theo gợi ý", isActive: false },
    { number: 4, text: "Tạo CV nổi bật", isActive: false },
  ];

  // AI suggestion window component
const AISuggestionsWindow = () => {
    return (
        <Modal
            isOpen={showAISuggestions}
            onClose={toggleAISuggestions}
            title="AI Cải Thiện CV"
            size="xxl"
            headerIcon={faRobot}
            animationType="scale"
            footer={
            <div className="flex justify-end gap-4">
                <Button 
                variant="outline"
                size="medium"
                leftIcon={faRobot}
                onClick={toggleAISuggestions}
                withRipple
                rounded
                >
                Đóng
                </Button>
                <Button 
                variant="primary"
                size="large"
                leftIcon={faRocket}
                onClick={toggleAISuggestions}
                withRipple
                rounded
                >
                Áp dụng tất cả cải thiện
                </Button>
            </div>
            }
        >
            <div className="p-6 max-h-[80vh] overflow-y-auto">
            <Text variant="muted" className="mb-6">
                Dưới đây là những đề xuất cải thiện CV của bạn dựa trên phân tích AI. So sánh phiên bản gốc và phiên bản được cải thiện.
            </Text>
            
            <div className="space-y-6">
                {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <Text weight="semibold">{suggestion.section}</Text>
                    </div>
                    <div className="p-4 space-y-4">
                    <div>
                        <div className="flex items-center text-gray-600 mb-1">
                        <div className="w-20 shrink-0">Gốc:</div>
                        <div className="italic">{suggestion.original}</div>
                        </div>
                        
                        <div className="flex items-center text-green-600 font-medium">
                        <div className="w-20 shrink-0 flex items-center">
                            <Icon icon={faCheckCircle} className="mr-1" />
                            Gợi ý:
                        </div>
                        <div className="bg-green-50 p-2 rounded-md w-full">
                            {suggestion.improved}
                        </div>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-md text-sm">
                        <Text weight="medium" className="text-blue-700 mb-1">Lý do cải thiện:</Text>
                        <Text variant="muted" size="sm">{suggestion.reason}</Text>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </Modal>
    );
};

  return (
    <div className="p-4 md:p-6 h-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <Heading level="h1" size="2xl">Chấm Điểm CV</Heading>
          <Text variant="muted" size="lg" className="mt-1">
            Đánh giá CV của bạn bằng công nghệ AI
          </Text>
        </div>
        
        {isFileUploaded && (
          <div className="flex gap-2">
            <Button 
              variant="outline"
              size="medium"
              leftIcon={faRobot}
              onClick={toggleAISuggestions}
              withRipple
              rounded
            >
              Xem gợi ý AI
            </Button>
            
            <Button 
              variant="primary"
              size="medium"
              leftIcon={faRocket}
              onClick={handleOptimizeCV}
              withRipple
              rounded
            >
              Tối ưu hóa CV ngay
            </Button>
          </div>
        )}
      </div>

      {/* Main Content - CSS Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Upload Area - Most important (top-left) */}
        <div className={`md:col-span-2 lg:col-span-2 ${isFileUploaded ? 'order-2 md:order-1' : 'order-1'}`}>
          {!isFileUploaded ? (
            <Card withShadow className="h-full">
              <div 
                className={`flex flex-col items-center justify-center p-6 md:p-12 border-2 border-dashed ${dragActive ? "border-primary-500 bg-primary-50" : "border-gray-300"} rounded-lg transition-colors duration-300 h-full`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                {scoringInProgress ? (
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="w-20 h-20 rounded-full border-4 border-t-primary-500 border-primary-200 animate-spin"></div>
                    </div>
                    <Heading level="h3" size="lg">Đang phân tích CV...</Heading>
                    <Text variant="muted">Vui lòng chờ trong giây lát</Text>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="bg-primary-50 p-4 rounded-full inline-block">
                      <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl text-primary-500" />
                    </div>
                    <Heading level="h3" size="lg" className="!m-2 !text-center">Kéo và thả CV của bạn vào đây</Heading>
                    <Text variant="muted" className="!m-2 !text-center">hoặc</Text>
                    <div className="flex justify-center">
                      <label htmlFor="cv-upload" className="inline-block cursor-pointer my-6">
                        <Button 
                          variant="primary" 
                          size="large" 
                          leftIcon={faCloudUploadAlt} 
                          rounded
                          withRipple
                        >
                          Chọn File
                        </Button>
                      </label>
                    </div>
                    <input 
                      type="file" 
                      id="cv-upload" 
                      className="hidden" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleChange}
                    />
                    <Text variant="muted" size="sm" className="!m-6 !text-center">Hỗ trợ định dạng PDF, DOC, DOCX. Dung lượng tối đa: 5MB</Text>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card title="Điểm Đánh Giá Tổng Thể" withShadow headerIcon={faChartLine}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-36 h-36 rounded-full bg-gradient-to-r from-blue-100 via-primary-50 to-pink-100 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary-600">{cvScoreData.overallScore}</span>
                    </div>
                    <div className="absolute bottom-0 right-0 transform translate-x-1/4">
                      <span className="bg-white text-lg font-bold text-green-500 p-1 px-3 rounded-full shadow-md">
                        {cvScoreData.category}
                      </span>
                    </div>
                  </div>
                  <Text weight="semibold" size="lg" className="text-center mb-2">
                    Điểm chất lượng CV
                  </Text>
                  <Alert 
                    message={cvScoreData.feedback} 
                    variant="success"
                    size="small"
                    showIcon
                    closable={false}
                    withBorder
                    borderRadius="medium"
                    customClassName="w-full mt-2 text-center"
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                  {[
                    { name: "Kỹ năng", score: cvScoreData.skills, icon: faCode },
                    { name: "Kinh nghiệm", score: cvScoreData.experience, icon: faBriefcase },
                    { name: "Từ khóa", score: cvScoreData.keywords, icon: faLanguage },
                    { name: "Độ phù hợp", score: cvScoreData.relevance, icon: faGraduationCap },
                  ].map((item, index) => (
                    <SkillCard
                      key={index}
                      skillName={item.name}
                      skillLevel={item.score}
                      maxLevel={100}
                      icon={item.icon}
                      showLevelText
                      withAnimation
                      withBorder
                      size="sm"
                    />
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Steps & Tips - Secondary importance (top-right) */}
        <div className="order-1 md:order-2 md:col-span-1 lg:col-span-2">
          <div className="space-y-4">
            <Card title="Các Bước Tối Ưu CV" headerIcon={faChartLine} withShadow>
              <div className="p-4 space-y-3">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center p-3 rounded-lg transition-colors duration-300 ${
                      step.isActive ? 'bg-primary-50 border border-primary-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <Badge
                      variant={step.isActive ? 'primary' : 'light'}
                      size="md"
                      shape="pill"
                      content={step.number}
                      customClassName="mr-3 min-w-[24px] h-[24px] font-semibold"
                      withShadow={step.isActive}
                    />
                    <Text 
                      weight={step.isActive ? "medium" : "regular"}
                      variant={step.isActive ? "default" : "muted"}
                    >
                      {step.text}
                    </Text>
                    {step.isActive && (
                      <Icon 
                        icon={faCheckCircle} 
                        variant="primary" 
                        size="sm" 
                        className="ml-auto" 
                        withAnimation={step.isActive}
                        animationVariant="pulse"
                      />
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Những Điểm Cần Lưu Ý" headerIcon={faExclamationTriangle} withShadow>
              <div className="p-4">
                <ul className="space-y-3">
                  {[
                    "CV nên được tùy chỉnh cho từng vị trí ứng tuyển",
                    "Sử dụng từ khóa từ mô tả công việc",
                    "Định lượng thành tựu bằng số liệu cụ thể",
                    "Đảm bảo CV không quá 1-2 trang"
                  ].map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-warning-500 mr-2 pt-1">⚠️</span>
                      <Text size="sm">{tip}</Text>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>

        {/* Detailed Scores - Important secondary information (bottom-left) */}
        {isFileUploaded && (
          <div className="order-3 md:col-span-2 lg:col-span-4">
            <div className="space-y-4">
              {/* Improvement Suggestions */}
              <Card title="Gợi Ý Cải Thiện" withShadow headerIcon={faLightbulb}>
                <div className="p-6">
                  <ul className="space-y-4">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start p-3 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
                        <span className="text-primary-500 mr-2 pt-1">✓</span>
                        <Text>{suggestion}</Text>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-center mt-6">
                    <Button 
                      variant="outline"
                      size="medium"
                      leftIcon={faRobot}
                      onClick={toggleAISuggestions}
                      withRipple
                      rounded
                      className="mx-auto"
                    >
                      Xem gợi ý cải thiện từ AI
                    </Button>
                  </div>
                </div>
              </Card>
              
              {/* Skill Improvement Badges */}
              <Card title="Kỹ Năng Cần Bổ Sung" withShadow>
                <div className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { name: "Machine Learning", icon: faRocket, level: "silver" },
                      { name: "Data Analysis", icon: faChartLine, level: "bronze" },
                      { name: "Cloud Services", icon: faCloudUploadAlt, level: "gold" },
                    ].map((badge, index) => (
                      <BadgeItem
                        key={index}
                        name={badge.name}
                        icon={badge.icon}
                        level={badge.level as BadgeItemLevel}
                        size="sm"
                        withAnimation
                      />
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
      
      {/* AI Suggestions Popup Window */}
      {showAISuggestions && <AISuggestionsWindow />}
    </div>
  );
}
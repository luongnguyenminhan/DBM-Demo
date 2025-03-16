'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import atomic components
import Typography from '@/components/atomic/typo';

// Import organism components
import DashboardMetrics from '@/components/organisms/DashboardMetrics';
import SkillsContainer from '@/components/organisms/SkillsContainer';
import JobsList from '@/components/organisms/JobsList';
import ChatSection from '@/components/organisms/ChatSection';
import CVPreview from '@/components/organisms/CVPreview';
import BadgesContainer from '@/components/organisms/BadgesContainer';
import { MessageSender } from '@/components/atomic/message';

// Mock data for CV preview
const mockCVData = {
  fullName: 'Alex Johnson',
  title: 'Lập trình viên Full Stack',
  summary: 'Kỹ sư phần mềm có kinh nghiệm với hơn 5 năm trong phát triển web, chuyên về React, Node.js và công nghệ đám mây.',
  avatar: 'https://i.pravatar.cc/150?img=32',
  contact: {
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    website: 'alexjohnson.dev',
    location: 'San Francisco, CA'
  },
  experience: [
    {
      title: 'Lập trình viên Frontend cấp cao',
      company: 'TechSolutions Inc.',
      location: 'San Francisco, CA',
      startDate: 'Tháng 1, 2020',
      endDate: '',
      isCurrent: true,
      description: 'Lãnh đạo phát triển các ứng dụng hướng khách hàng sử dụng React, TypeScript và GraphQL.',
      achievements: [
        'Cải thiện hiệu suất ứng dụng lên 40%',
        'Triển khai đường ống CI/CD giảm thời gian triển khai 60%',
        'Dẫn dắt đội ngũ 5 lập trình viên cho dự án thiết kế lại sản phẩm lớn'
      ]
    },
    {
      title: 'Kỹ sư phần mềm',
      company: 'WebDev Innovations',
      location: 'Austin, TX',
      startDate: 'Tháng 5, 2018',
      endDate: 'Tháng 12, 2019',
      description: 'Phát triển và bảo trì các ứng dụng web sử dụng JavaScript, React và Node.js.'
    }
  ],
  education: [
    {
      degree: 'Thạc sĩ Khoa học máy tính',
      institution: 'Đại học California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2016',
      endDate: '2018'
    },
    {
      degree: 'Cử nhân Kỹ thuật phần mềm',
      institution: 'Đại học Texas',
      location: 'Austin, TX',
      startDate: '2012',
      endDate: '2016'
    }
  ],
  skills: [
    { name: 'React', level: 95, ranking: 'Top 5%' },
    { name: 'JavaScript', level: 90, ranking: 'Top 8%' },
    { name: 'Node.js', level: 85, ranking: 'Top 12%' },
    { name: 'TypeScript', level: 85, ranking: 'Top 15%' },
    { name: 'GraphQL', level: 80, ranking: 'Top 20%' },
    { name: 'AWS', level: 75, ranking: 'Top 25%' }
  ],
  languages: [
    { name: 'Tiếng Anh', level: 100, proficiency: 'Bản ngữ' },
    { name: 'Tiếng Tây Ban Nha', level: 70, proficiency: 'Trung cấp' }
  ],
  certifications: [
    {
      name: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      date: 'Tháng 6, 2021',
      id: 'AWS-DEV-12345'
    },
    {
      name: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      date: 'Tháng 3, 2020',
      id: 'PSM-I-98765'
    }
  ],
  achievements: [
    'Diễn giả tại Hội nghị React 2022',
    'Người đóng góp mã nguồn mở với 500+ GitHub stars',
    'Đã xuất bản 15+ bài viết kỹ thuật về phát triển web'
  ]
};

// Mock chat messages
const mockMessages = [
  {
    id: '1',
    content: "Xin chào! Tôi là Trợ lý AI nghề nghiệp. Tôi có thể giúp gì cho hành trình nghề nghiệp của bạn hôm nay?",
    sender: 'bot' as MessageSender,
    timestamp: new Date(Date.now() - 600000), // 10 minutes ago
  },
  {
    id: '2',
    content: "Chào! Tôi muốn cải thiện kỹ năng của mình với tư cách là nhà phát triển. Tôi nên tập trung vào điều gì?",
    sender: 'user' as MessageSender,
    timestamp: new Date(Date.now() - 540000), // 9 minutes ago
  },
  {
    id: '3',
    content: "Dựa trên hồ sơ của bạn và xu hướng thị trường hiện tại, tôi khuyên bạn nên tập trung vào các lĩnh vực sau:\n\n1. **Công nghệ đám mây** - Chứng chỉ AWS hoặc Azure sẽ rất có giá trị\n2. **Frameworks Frontend hiện đại** - Nâng cao kiến thức React hoặc khám phá Next.js\n3. **Phát triển API** - Mở rộng kiến thức về GraphQL\n\nBạn có muốn tôi gợi ý các nguồn học cụ thể cho bất kỳ lĩnh vực nào không?",
    sender: 'bot' as MessageSender,
    timestamp: new Date(Date.now() - 480000), // 8 minutes ago
  }
];

export default function DashboardPage() {
  // State for active content
  const [activeSection, setActiveSection] = useState('overview');
  
  // Handle sending a message in chat
  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    // In a real app, you'd integrate with your chat API here
  };

  // Main content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case 'chat':
        return (
          <div className="h-full w-full">
            <ChatSection
              title="Trợ lý AI nghề nghiệp"
              subtitle="Hãy thảo luận về mục tiêu và kỹ năng nghề nghiệp của bạn"
              messages={mockMessages}
              onSendMessage={handleSendMessage}
              userAvatar={mockCVData.avatar}
              height="calc(100vh - 200px)"
            />
          </div>
        );
      case 'cv':
        return (
          <div className="w-full">
            <CVPreview
              cvData={mockCVData}
              withActions
              onEdit={() => console.log('Edit CV')}
              onDownload={() => console.log('Download CV')}
            />
          </div>
        );
      case 'jobs':
        return (
          <div className="w-full">
            <JobsList
              title="Công việc được đề xuất"
              subtitle="Dựa trên kỹ năng và sở thích của bạn"
              withSearch
              withFilters
              withPagination
            />
          </div>
        );
      case 'skills':
        return (
          <div className="w-full">
            <SkillsContainer
              title="Kỹ năng của tôi"
              subtitle="Theo dõi kỹ năng và xem xếp hạng của bạn so với người khác"
              withSearch
              withFilters
            />
          </div>
        );
      case 'achievements':
        return (
          <div className="w-full">
            <BadgesContainer
              title="Thành tựu của tôi"
              subtitle="Huy hiệu và phần thưởng bạn đã đạt được trong hành trình nghề nghiệp"
              withFilters
              layout="grid"
              columns={4}
            />
          </div>
        );
      case 'settings':
        return (
          <div className="w-full">
            <Typography.Heading level="h2" size="xl" className="mb-4">Cài đặt</Typography.Heading>
            <Typography.Text>Nội dung trang cài đặt sẽ xuất hiện ở đây.</Typography.Text>
          </div>
        );
      default:
        // Overview dashboard using CSS Grid
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dashboard Metrics - Full width */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <DashboardMetrics
                title="Thống kê nghề nghiệp"
                subtitle="Tiến độ và số liệu nghề nghiệp hiện tại của bạn"
                withAnimation
              />
            </div>
            
            {/* Skills Overview - 1/3 width on large screens */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <SkillsContainer
                title="Kỹ năng hàng đầu"
                subtitle="Các kỹ năng xếp hạng cao nhất của bạn"
                visibleSkills={3}
                withFilters={false}
                withSearch={false}
                actionLabel="Xem tất cả kỹ năng"
                onAction={() => setActiveSection('skills')}
              />
            </div>
            
            {/* Job Recommendations - 2/3 width on large screens */}
            <div className="col-span-1 md:col-span-1 lg:col-span-2">
              <JobsList
                title="Công việc phù hợp gần đây"
                subtitle="Các công việc phù hợp với hồ sơ của bạn"
                visibleJobs={2}
                withFilters={false}
                withSearch={false}
                actionLabel="Xem tất cả công việc"
                onAction={() => setActiveSection('jobs')}
              />
            </div>
            
            {/* Achievements Showcase - 1/3 width on large screens */}
            <div className="col-span-1">
              <BadgesContainer
                title="Thành tựu mới nhất"
                subtitle="Huy hiệu gần đây bạn đã đạt được"
                visibleBadges={4}
                layout="flex"
                withFilters={false}
                actionLabel="Xem tất cả"
                onAction={() => setActiveSection('achievements')}
              />
            </div>
            
            {/* Quick Chat Prompt - 2/3 width on large screens */}
            <div className="col-span-1 md:col-span-1 lg:col-span-2">
              <ChatSection
                title="Trợ lý AI nghề nghiệp"
                subtitle="Hãy hỏi tôi bất cứ điều gì về nghề nghiệp của bạn"
                height="300px"
                withHeader
                withAttachments={false}
                withVoiceInput={false}
              />
            </div>
          </div>
        );
    }
  };

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.main 
      className="flex-1 overflow-y-auto p-6"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        variants={contentVariants}
        className="w-full"
      >
        {renderContent()}
      </motion.div>
    </motion.main>
  );
}
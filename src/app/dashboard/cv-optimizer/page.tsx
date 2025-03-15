'use client';

import React, { useState } from 'react';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import { faEdit, faDownload, faFileAlt, faPlus, faMagic, faCheck, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Heading, Text } = Typography;

export default function CVOptimizer() {
    const [cvContent, setCvContent] = useState('');
    const [optimizedContent, setOptimizedContent] = useState('');

    const handleOptimize = () => {
        // In a real app, this would call an API to optimize the CV
        // For this example, we'll just simulate a response
        setOptimizedContent(`Nguyễn Văn A
Frontend Software Engineer

SUMMARY
Results-driven Frontend Engineer with over 5 years of experience building responsive and user-friendly web applications. Specialized in React, TypeScript, and modern JavaScript frameworks. Passionate about creating accessible, high-performance user interfaces that deliver exceptional user experiences.

SKILLS
• Frontend: React, Vue.js, Angular, TypeScript, JavaScript (ES6+), HTML5, CSS3, SCSS
• State Management: Redux, Context API, Vuex
• Testing: Jest, React Testing Library, Cypress
• Build Tools: Webpack, Babel, Vite
• UI/UX: Figma, Adobe XD, responsive design, accessibility standards
• Performance Optimization: Lazy loading, code splitting, bundle optimization
• Version Control: Git, GitHub, GitLab

EXPERIENCE
Senior Frontend Engineer | TechVision Solutions
January 2021 - Present
• Spearheaded the development of a dashboard application that increased user engagement by 40%
• Implemented performance optimizations that reduced load time by 60%
• Mentored junior developers and conducted code reviews to ensure high code quality and standards
• Collaborated with UX designers to implement responsive designs that work across all devices

Frontend Developer | WebSphere Applications
March 2018 - December 2020
• Developed and maintained multiple client-facing applications using React and TypeScript
• Reduced application bundle size by 35% through code splitting and lazy loading
• Implemented end-to-end testing with Cypress, increasing test coverage by 70%

EDUCATION
Bachelor of Science in Computer Science
Vietnam National University - 2017

CERTIFICATIONS
• AWS Certified Developer - Associate
• Google Professional Web Developer`);
    };

    const handleClearContent = () => {
        setCvContent('');
    };
    
    // Fixed type for event parameter
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const result = event.target?.result;
                if (typeof result === 'string') {
                    setCvContent(result);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="p-6 h-full space-y-6">
            {/* Breadcrumb Navigation */}
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <Heading level="h1" size="2xl">Tối Ưu Hóa CV</Heading>
                    <Text variant="muted" size="lg" className="mt-1">
                        Cải thiện CV của bạn với gợi ý từ AI
                    </Text>
                </div>
                
                <div className="flex gap-3">
                    <Button 
                        variant="primary"
                        size="medium"
                        leftIcon={faMagic}
                        onClick={handleOptimize}
                        rounded
                    >
                        Tối ưu hóa ngay
                    </Button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - CV Editor */}
                <div className="lg:col-span-1">
                    <Card title="CV của bạn" headerIcon={faFileAlt} withShadow>
                        <div className="p-4">
                            <textarea 
                                className="w-full h-[500px] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Nhập nội dung CV của bạn hoặc tải file lên..."
                                value={cvContent}
                                onChange={(e) => setCvContent(e.target.value)}
                            ></textarea>
                            <div className="mt-4 flex justify-between">
                                <label className="cursor-pointer">
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept=".txt,.pdf,.doc,.docx"
                                        onChange={handleFileUpload}
                                    />
                                    <Button 
                                        variant="outline"
                                        size="small"
                                        leftIcon={faPlus}
                                        htmlType="button"
                                    >
                                        Tải CV lên
                                    </Button>
                                </label>
                                <Button 
                                    variant="outline"
                                    size="small"
                                    leftIcon={faEdit}
                                    onClick={handleClearContent}
                                >
                                    Xóa nội dung
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
                
                {/* Middle Column - Optimized CV */}
                <div className="lg:col-span-1">
                    <Card title="CV đã tối ưu hóa" headerIcon={faMagic} withShadow>
                        <div className="p-4">
                            <div className="w-full h-[500px] p-4 border rounded-md bg-gray-50 overflow-auto whitespace-pre-line">
                                {optimizedContent || "CV đã tối ưu sẽ hiển thị ở đây sau khi bạn nhấn nút 'Tối ưu hóa ngay'..."}
                            </div>
                            <div className="mt-4 flex justify-end">
                                {optimizedContent && (
                                    <Button 
                                        variant="primary"
                                        size="small"
                                        leftIcon={faDownload}
                                    >
                                        Tải xuống CV
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
                
                {/* Right Column - Optimization Suggestions */}
                <div className="lg:col-span-1">
                    <Card title="Gợi ý tối ưu" headerIcon={faLightbulb} withShadow>
                        <div className="p-4">
                            <div className="space-y-4 h-[500px] overflow-auto">
                                <div className="border border-green-200 rounded-md p-4 bg-green-50">
                                    <div className="flex items-center gap-2 text-green-700 mb-2">
                                        <FontAwesomeIcon icon={faLightbulb} />
                                        <Text weight="bold">Cải thiện từ khóa</Text>
                                    </div>
                                    <Text size="sm">Thêm các từ khóa kỹ thuật như &quot;React&quot;, &quot;TypeScript&quot; và &quot;Frontend Development&quot; để tăng tính phù hợp với vị trí.</Text>
                                </div>
                                
                                <div className="border border-blue-200 rounded-md p-4 bg-blue-50">
                                    <div className="flex items-center gap-2 text-blue-700 mb-2">
                                        <FontAwesomeIcon icon={faCheck} />
                                        <Text weight="bold">Định lượng thành tích</Text>
                                    </div>
                                    <Text size="sm">Bổ sung số liệu cụ thể cho các dự án đã tham gia, ví dụ: &quot;Tăng 30% hiệu suất&quot;, &quot;Giảm 20% chi phí&quot;.</Text>
                                </div>
                                
                                <div className="border border-yellow-200 rounded-md p-4 bg-yellow-50">
                                    <div className="flex items-center gap-2 text-yellow-700 mb-2">
                                        <FontAwesomeIcon icon={faFileAlt} />
                                        <Text weight="bold">Cấu trúc lại phần tóm tắt</Text>
                                    </div>
                                    <Text size="sm">Tập trung vào những thành tích và kỹ năng quan trọng nhất trong phần tóm tắt để thu hút người đọc ngay từ đầu.</Text>
                                </div>
                                
                                <div className="border border-purple-200 rounded-md p-4 bg-purple-50">
                                    <div className="flex items-center gap-2 text-purple-700 mb-2">
                                        <FontAwesomeIcon icon={faMagic} />
                                        <Text weight="bold">Tối ưu định dạng</Text>
                                    </div>
                                    <Text size="sm">Sử dụng định dạng nhất quán cho tiêu đề, gạch đầu dòng, và không gian trắng để tạo CV dễ đọc hơn.</Text>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
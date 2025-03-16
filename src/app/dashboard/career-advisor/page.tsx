'use client';

import React, { useState } from 'react';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import Input from '@/components/atomic/input';
import { faRocket, faRoute, faStar, faLaptopCode, faDownload } from '@fortawesome/free-solid-svg-icons';
import DropdownMenu from '@/components/molecules/dropdown';
import CourseCard from '@/components/molecules/courseCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Heading, Text } = Typography;

type CourseType = {
  title: string;
  provider: string;
  rating: number;
  duration: string;
  link: string;
  description: string;
};

type LevelType = {
  beginner: CourseType[];
  intermediate: CourseType[];
  advanced: CourseType[];
};

type CourseRecommendationsType = {
  frontend: LevelType;
  backend: LevelType;
  fullstack: LevelType;
  data: LevelType;
};

export default function CareerPathAdvisor() {
  const [careerGoal, setCareerGoal] = useState('');
  const [pathGenerated, setPathGenerated] = useState(false);
  const [selectedField, setSelectedField] = useState<keyof CourseRecommendationsType | ''>('');
  const [selectedLevel, setSelectedLevel] = useState<keyof LevelType | ''>('');
  
  // Course recommendations based on field and level
  const courseRecommendations: CourseRecommendationsType = {
    frontend: {
      beginner: [
        { 
          title: "MindX - Web Fundamentals", 
          provider: "MindX",
          rating: 4.8,
          duration: "8 tuần",
          link: "#",
          description: "Học HTML, CSS và JavaScript cơ bản để xây dựng website đầu tiên."
        },
        { 
          title: "FUNiX - Front End cơ bản", 
          provider: "FUNiX",
          rating: 4.7,
          duration: "10 tuần",
          link: "#",
          description: "Nắm vững nền tảng lập trình front-end với HTML5, CSS3 và JavaScript."
        }
      ],
      intermediate: [
        { 
          title: "MindX - React JS Intensive", 
          provider: "MindX",
          rating: 4.9,
          duration: "12 tuần",
          link: "#",
          description: "Xây dựng ứng dụng web hiện đại với React và Redux."
        },
        { 
          title: "FUNiX - Phát triển ứng dụng web với React", 
          provider: "FUNiX",
          rating: 4.6,
          duration: "16 tuần",
          link: "#",
          description: "Học cách phát triển single-page applications với React và TypeScript."
        }
      ],
      advanced: [
        { 
          title: "MindX - Frontend Architect", 
          provider: "MindX",
          rating: 5.0,
          duration: "16 tuần",
          link: "#",
          description: "Nâng cao với Next.js, GraphQL và Testing Automation."
        },
        { 
          title: "FUNiX - Performance Optimization", 
          provider: "FUNiX",
          rating: 4.8,
          duration: "12 tuần",
          link: "#",
          description: "Tối ưu hóa hiệu suất ứng dụng web với kỹ thuật chuyên sâu."
        }
      ]
    },
    backend: {
      beginner: [
        { 
          title: "MindX - Node.js cơ bản", 
          provider: "MindX",
          rating: 4.7,
          duration: "10 tuần",
          link: "#",
          description: "Làm quen với phát triển server-side sử dụng Node.js và Express."
        },
        { 
          title: "FUNiX - Lập trình Backend với Java", 
          provider: "FUNiX",
          rating: 4.8,
          duration: "16 tuần",
          link: "#",
          description: "Học Spring Boot và phát triển RESTful API từ cơ bản đến nâng cao."
        }
      ],
      intermediate: [
        { 
          title: "MindX - API Development with Node.js", 
          provider: "MindX",
          rating: 4.9,
          duration: "12 tuần",
          link: "#",
          description: "Xây dựng REST API và GraphQL với Node.js, Express và MongoDB."
        },
        { 
          title: "FUNiX - Phát triển ứng dụng với .NET Core", 
          provider: "FUNiX",
          rating: 4.6,
          duration: "14 tuần",
          link: "#",
          description: "Xây dựng ứng dụng web với ASP.NET Core và Entity Framework."
        }
      ],
      advanced: [
        { 
          title: "MindX - Microservices Architecture", 
          provider: "MindX",
          rating: 5.0,
          duration: "16 tuần",
          link: "#",
          description: "Thiết kế và triển khai hệ thống dựa trên microservices với Docker và Kubernetes."
        },
        { 
          title: "FUNiX - Cloud Development với AWS", 
          provider: "FUNiX",
          rating: 4.8,
          duration: "16 tuần",
          link: "#",
          description: "Phát triển và triển khai ứng dụng trên AWS với serverless architecture."
        }
      ]
    },
    fullstack: {
      beginner: [
        { 
          title: "MindX - Fullstack Web Developer", 
          provider: "MindX",
          rating: 4.8,
          duration: "16 tuần",
          link: "#",
          description: "Từ HTML/CSS đến Node.js và MongoDB - đầy đủ kiến thức để trở thành fullstack developer."
        },
        { 
          title: "FUNiX - MERN Stack cơ bản", 
          provider: "FUNiX",
          rating: 4.7,
          duration: "20 tuần",
          link: "#",
          description: "Làm quen với MongoDB, Express, React và Node.js để xây dựng ứng dụng web hoàn chỉnh."
        }
      ],
      intermediate: [
        { 
          title: "MindX - Modern Fullstack Development", 
          provider: "MindX",
          rating: 4.9,
          duration: "20 tuần",
          link: "#",
          description: "Phát triển ứng dụng với React, Node.js và PostgreSQL theo mô hình Agile."
        },
        { 
          title: "FUNiX - Java Fullstack Developer", 
          provider: "FUNiX",
          rating: 4.8,
          duration: "24 tuần",
          link: "#",
          description: "Kết hợp Spring Boot và Angular để xây dựng ứng dụng enterprise."
        }
      ],
      advanced: [
        { 
          title: "MindX - Advanced Software Architecture", 
          provider: "MindX",
          rating: 5.0,
          duration: "24 tuần",
          link: "#",
          description: "Thiết kế và triển khai hệ thống phân tán với Docker, Kubernetes và CI/CD."
        },
        { 
          title: "FUNiX - Fullstack Developer Pro", 
          provider: "FUNiX",
          rating: 4.9,
          duration: "28 tuần",
          link: "#",
          description: "Làm chủ công nghệ fullstack và phương pháp phát triển phần mềm hiện đại."
        }
      ]
    },
    data: {
      beginner: [
        { 
          title: "MindX - Data Science Fundamentals", 
          provider: "MindX",
          rating: 4.7,
          duration: "12 tuần",
          link: "#",
          description: "Nền tảng về Python và các thư viện phân tích dữ liệu như Pandas và NumPy."
        },
        { 
          title: "FUNiX - Phân tích dữ liệu với Python", 
          provider: "FUNiX",
          rating: 4.8,
          duration: "16 tuần",
          link: "#",
          description: "Học cách thu thập, xử lý và trực quan hóa dữ liệu với Python."
        }
      ],
      intermediate: [
        { 
          title: "MindX - Machine Learning Essentials", 
          provider: "MindX",
          rating: 4.9,
          duration: "16 tuần",
          link: "#",
          description: "Các thuật toán machine learning cơ bản và ứng dụng thực tế với scikit-learn."
        },
        { 
          title: "FUNiX - Data Analysis and Visualization", 
          provider: "FUNiX",
          rating: 4.7,
          duration: "14 tuần",
          link: "#",
          description: "Phân tích dữ liệu nâng cao và tạo dashboard với Power BI và Tableau."
        }
      ],
      advanced: [
        { 
          title: "MindX - Deep Learning Specialist", 
          provider: "MindX",
          rating: 5.0,
          duration: "20 tuần",
          link: "#",
          description: "Học sâu về neural networks và xây dựng mô hình AI với TensorFlow và PyTorch."
        },
        { 
          title: "FUNiX - Big Data Analytics", 
          provider: "FUNiX",
          rating: 4.8,
          duration: "24 tuần",
          link: "#",
          description: "Phân tích dữ liệu lớn với Hadoop, Spark và các công nghệ liên quan."
        }
      ]
    }
  };

  // Get recommended courses based on selected field and level
  const getRecommendedCourses = () => {
    if (selectedField && selectedLevel && courseRecommendations[selectedField] && courseRecommendations[selectedField][selectedLevel]) {
      return courseRecommendations[selectedField][selectedLevel];
    }
    // Default courses if no field/level selected
    return courseRecommendations.frontend.beginner;
  };
  
  const handleGeneratePath = () => {
    setPathGenerated(true);
  };

  return (
    <div className="p-6 h-full space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <Heading level="h1" size="2xl">Tư vấn lộ trình nghề nghiệp</Heading>
          <Text variant="muted" size="lg" className="mt-1">
            Xây dựng lộ trình phát triển sự nghiệp phù hợp với mục tiêu của bạn
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-3 lg:grid-cols-3 gap-6">
        {/* Career Goals Input */}
        <div className="lg:col-span-2">
            <div>
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
                        onSelect={(value) => setSelectedField(value as keyof CourseRecommendationsType)}
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
                        onSelect={(value) => setSelectedLevel(value as keyof LevelType)}
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
            </div>
          
            <Card title="Lộ trình phát triển" headerIcon={faRoute} className="mt-6" withShadow>
              <div className="grid grid-fixed-height">
                {pathGenerated ? (
                  <div className="p-6 custom-scrollbar">
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                      
                      <div className="space-y-8">
                        {/* Timeline Phase 1 */}
                        <div className="relative pl-10">
                          <div className="absolute left-2.5 -translate-x-1/2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                            <Text className="text-white font-bold">1</Text>
                          </div>
                          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <Text weight="medium" className="flex items-center gap-2 text-primary-700">
                              <i className="fas fa-calendar-alt text-primary-500"></i>
                              0-3 tháng: Xây dựng nền tảng
                            </Text>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                <Text size="sm">Hoàn thành khoá học {selectedField === 'frontend' ? 'HTML, CSS và JavaScript cơ bản' : 
                                  selectedField === 'backend' ? 'phát triển server-side với Node.js hoặc Java' : 
                                  selectedField === 'fullstack' ? 'web development nền tảng' : 'Python và thư viện phân tích dữ liệu'}</Text>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                <Text size="sm">Thực hành với 2-3 dự án nhỏ để củng cố kiến thức</Text>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                <Text size="sm">Làm quen với các công cụ phát triển: Git, npm, Docker</Text>
                              </div>
                            </div>
                            <div className="mt-3 p-2 bg-primary-50 rounded-md">
                              <Text size="sm" weight="medium" className="text-primary-700">Khóa học đề xuất:</Text>
                              <Text size="sm">{selectedField === 'frontend' ? 'MindX - Web Fundamentals' : 
                                selectedField === 'backend' ? 'MindX - Node.js cơ bản' : 
                                selectedField === 'fullstack' ? 'MindX - Fullstack Web Developer' :
                                'MindX - Data Science Fundamentals'}</Text>
                            </div>
                          </div>
                        </div>
                        
                        {/* Timeline Phase 2 */}
                        <div className="relative pl-10">
                          <div className="absolute left-2.5 -translate-x-1/2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                            <Text className="text-white font-bold">2</Text>
                          </div>
                          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <Text weight="medium" className="flex items-center gap-2 text-primary-700">
                              <i className="fas fa-calendar-alt text-primary-500"></i>
                              3-9 tháng: Phát triển kỹ năng chuyên sâu
                            </Text>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                <Text size="sm">{selectedField === 'frontend' ? 'Nắm vững React, Redux và quản lý state' : 
                                  selectedField === 'backend' ? 'Phát triển REST API và GraphQL với Node.js hoặc Spring Boot' : 
                                  selectedField === 'fullstack' ? 'Kết hợp React, Node.js và MongoDB trong dự án hoàn chỉnh' :
                                  'Học các thuật toán machine learning cơ bản và ứng dụng'}</Text>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                <Text size="sm">Xây dựng portfolio với 2-3 dự án thực tế</Text>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                <Text size="sm">Tham gia cộng đồng để mở rộng network</Text>
                              </div>
                            </div>
                            <div className="mt-3 p-2 bg-primary-50 rounded-md">
                              <Text size="sm" weight="medium" className="text-primary-700">Khóa học đề xuất:</Text>
                              <Text size="sm">{selectedField === 'frontend' ? 'MindX - React JS Intensive' : 
                                selectedField === 'backend' ? 'MindX - API Development with Node.js' : 
                                selectedField === 'fullstack' ? 'MindX - Modern Fullstack Development' :
                                'MindX - Machine Learning Essentials'}</Text>
                            </div>
                          </div>
                        </div>

                        {/* Timeline Phase 3 */}
                        <div className="relative pl-10">
                          <div className="absolute left-2.5 -translate-x-1/2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                            <Text className="text-white font-bold">3</Text>
                          </div>
                          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <Text weight="medium" className="flex items-center gap-2 text-primary-700">
                              <i className="fas fa-calendar-alt text-primary-500"></i>
                              9-12 tháng: Áp dụng vào dự án thực tế
                            </Text>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                <Text size="sm">{selectedField === 'frontend' ? 'Chuyển đổi dự án sang TypeScript' : 
                                  selectedField === 'backend' ? 'Xây dựng CI/CD pipeline và cải thiện performance' : 
                                  selectedField === 'fullstack' ? 'Phát triển ứng dụng fullstack với authentication' :
                                  'Sử dụng scikit-learn và pandas cho dự án phân tích dữ liệu'}</Text>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                <Text size="sm">Làm quen với testing và best practices</Text>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                <Text size="sm">Tham gia các dự án collaborative hoặc open-source</Text>
                              </div>
                            </div>
                            <div className="mt-3 p-2 bg-primary-50 rounded-md">
                              <Text size="sm" weight="medium" className="text-primary-700">Dự án đề xuất:</Text>
                              <Text size="sm">{selectedField === 'frontend' ? 'Xây dựng ứng dụng React với TypeScript và testing' : 
                                selectedField === 'backend' ? 'API Gateway với microservices' : 
                                selectedField === 'fullstack' ? 'E-commerce platform với MERN stack' :
                                'Dự án phân tích dữ liệu thực tế với visualizations'}</Text>
                            </div>
                          </div>
                        </div>

                        {/* Timeline Phase 4 */}
                        <div className="relative pl-10">
                          <div className="absolute left-2.5 -translate-x-1/2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                            <Text className="text-white font-bold">4</Text>
                          </div>
                          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <Text weight="medium" className="flex items-center gap-2 text-primary-700">
                              <i className="fas fa-calendar-alt text-primary-500"></i>
                              12-18 tháng: Nâng cao kỹ năng và chuyên môn hoá
                            </Text>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                <Text size="sm">{selectedField === 'frontend' ? 'Học Next.js và Server-side Rendering' : 
                                  selectedField === 'backend' ? 'Thiết kế hệ thống phân tán và cloud architecture' : 
                                  selectedField === 'fullstack' ? 'Học về DevOps và container orchestration' :
                                  'Xây dựng mô hình deep learning với TensorFlow'}</Text>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                <Text size="sm">Tham gia các dự án thương mại hoặc freelance</Text>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                <Text size="sm">Đóng góp cho cộng đồng developer</Text>
                              </div>
                            </div>
                            <div className="mt-3 p-2 bg-primary-50 rounded-md">
                              <Text size="sm" weight="medium" className="text-primary-700">Khoá học đề xuất:</Text>
                              <Text size="sm">{selectedField === 'frontend' ? 'FUNiX - Performance Optimization' : 
                                selectedField === 'backend' ? 'MindX - Microservices Architecture' : 
                                selectedField === 'fullstack' ? 'MindX - Advanced Software Architecture' :
                                'MindX - Deep Learning Specialist'}</Text>
                            </div>
                          </div>
                        </div>

                        {/* Timeline Phase 5 */}
                        <div className="relative pl-10">
                          <div className="absolute left-2.5 -translate-x-1/2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                            <Text className="text-white font-bold">5</Text>
                          </div>
                          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <Text weight="medium" className="flex items-center gap-2 text-primary-700">
                              <i className="fas fa-calendar-alt text-primary-500"></i>
                              18-24 tháng: Đạt đến cấp độ Senior
                            </Text>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                <Text size="sm">{selectedField === 'frontend' ? 'Xây dựng và duy trì design systems' : 
                                  selectedField === 'backend' ? 'Thiết kế và tối ưu hóa systems cho high availability' : 
                                  selectedField === 'fullstack' ? 'Làm chủ các design patterns và architecture' :
                                  'Phát triển các giải pháp AI/ML phức tạp'}</Text>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                <Text size="sm">Phát triển kỹ năng mentoring và leadership</Text>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-primary-500">•</span>
                                <Text size="sm">Xây dựng personal brand trong lĩnh vực chuyên môn</Text>
                              </div>
                            </div>
                            <div className="mt-3 p-2 bg-primary-50 rounded-md">
                              <Text size="sm" weight="medium" className="text-primary-700">Mục tiêu cuối cùng:</Text>
                              <Text size="sm">{`Đạt vị trí Senior ${
                                selectedField === 'frontend' ? 'Frontend Developer' : 
                                selectedField === 'backend' ? 'Backend Developer' : 
                                selectedField === 'fullstack' ? 'Fullstack Developer' :
                                'Data Scientist'
                              }`}</Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <Text weight="medium" size="lg">Trình độ hiện tại</Text>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2 mb-1">
                            <div className="bg-primary-500 h-2 rounded-full w-1/4"></div>
                          </div>
                          <Text size="sm" variant="muted">25% hoàn thành lộ trình</Text>
                        </div>
                        <Button variant="outline" leftIcon={faDownload}>Tải lộ trình PDF</Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <div className="text-gray-400 mb-4">
                      <FontAwesomeIcon icon={faRoute} className="w-12 h-12" />
                    </div>
                    <Text size="lg" weight="medium" className="mb-2">
                      Chưa có lộ trình
                    </Text>
                    <Text variant="muted">
                      Vui lòng điền thông tin và nhấn &quot;Tạo lộ trình&quot; để xem lộ trình phát triển phù hợp với bạn
                    </Text>
                  </div>
                )}
              </div>
            </Card>
        </div>
        
        {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
          {/* MindX Course Recommendations */}
          <div>
          <Card title="Khóa học đề xuất" headerIcon={faLaptopCode} withShadow>
            <div className="p-4 space-y-4">
              {getRecommendedCourses().map((course, index) => {
                return (
                  <CourseCard
                    key={index}
                    title={course.title}
                    provider={course.provider}
                    rating={course.rating}
                    duration={course.duration}
                    description={course.description}
                    link={course.link}
                    level={selectedLevel || 'beginner'}
                    tags={['JavaScript', 'React', 'Web Development']}
                    isPopular={course.rating >= 4.8}
                    instructors={[
                      {
                        name: 'John Doe',
                        avatar: 'https://i.pravatar.cc/150?img=1'
                      },
                      {
                        name: 'Jane Smith',
                        avatar: 'https://i.pravatar.cc/150?img=2'
                      }
                    ]}
                    students={1234}
                    price="2,499,000 VND"
                  />
                );
              })}
            </div>
          </Card>
          </div>
          <div>
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
    </div>
  );
}
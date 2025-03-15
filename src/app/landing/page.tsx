'use client';

import React from 'react';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Input from '@/components/atomic/input';
import Card from '@/components/atomic/card';
import { faArrowRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const { Heading, Text } = Typography;

export default function LandingPage() {
  return (
    <div className="landing-page min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">ENTERVIU</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Trang chủ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Tính năng</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Bảng giá</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Hỗ trợ</a></li>
              <li><a href="/auth/login" className="text-primary-600 hover:text-primary-800">Đăng nhập</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero section */}
      <section className="hero bg-gradient-to-r from-primary-50 to-secondary-50 py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <Heading level="h1" size="4xl" className="mb-6">Tối ưu hóa CV và phỏng vấn<br />với <span className="text-primary-600">AI</span></Heading>
            <Text size="lg" variant="muted" className="mb-8">
              ENTERVIU giúp bạn tăng khả năng được nhà tuyển dụng chú ý với công nghệ AI đánh giá và cải thiện CV cùng kỹ năng phỏng vấn.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="large" rightIcon={faArrowRight} withRipple>
                Bắt đầu ngay
              </Button>
              <Button variant="outline" size="large">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full h-[400px]">
              <Image 
                src="/images/hero-image.svg" 
                alt="ENTERVIU AI Resume Analyzer" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Giới thiệu về ENTERVIU */}
      <section className="about py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Heading level="h2" size="2xl" className="mb-4">Tại sao chọn ENTERVIU?</Heading>
          <Text size="lg" variant="muted" className="max-w-3xl mx-auto mb-8">
            Chúng tôi kết hợp công nghệ AI tiên tiến để phân tích CV và kỹ năng phỏng vấn, 
            giúp bạn tối ưu hóa hồ sơ và chuẩn bị tốt nhất cho các buổi phỏng vấn.
          </Text>
        </div>
      </section>

      {/* Tính năng chính */}
      <section className="features py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Heading level="h2" size="2xl" className="mb-4">Tính năng nổi bật</Heading>
            <Text variant="muted" size="lg">Khám phá các công cụ hỗ trợ tìm việc hiệu quả</Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Chấm điểm ứng viên AI",
                description: "AI phân tích và đánh giá CV của bạn dựa trên các tiêu chuẩn ngành",
                icon: "/icons/score.svg"
              },
              {
                title: "Tối ưu hóa CV",
                description: "Gợi ý cụ thể để cải thiện từng phần trong CV của bạn",
                icon: "/icons/optimize.svg"
              },
              {
                title: "Phản hồi AI về phỏng vấn",
                description: "Đánh giá thái độ, cách trả lời và phong cách nói chuyện",
                icon: "/icons/feedback.svg"
              },
              {
                title: "Tư vấn lộ trình phát triển",
                description: "Xây dựng lộ trình phát triển sự nghiệp phù hợp với mục tiêu",
                icon: "/icons/career.svg"
              }
            ].map((feature, index) => (
              <Card key={index} withShadow withAnimation className="h-full">
                <div className="p-6 flex flex-col items-center text-center">
                  <div className="bg-primary-100 p-4 rounded-full mb-4 relative w-12 h-12">
                    <Image 
                      src={feature.icon} 
                      alt={feature.title}
                      fill
                      sizes="48px"
                      className="object-contain"
                    />
                  </div>
                  <Heading level="h3" size="lg" className="mb-2">{feature.title}</Heading>
                  <Text variant="muted">{feature.description}</Text>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA cuối trang */}
      <section className="cta py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Heading level="h2" size="2xl" className="mb-6">Sẵn sàng nâng cao cơ hội nghề nghiệp?</Heading>
          <Text size="lg" className="mb-8 max-w-2xl mx-auto">
            Đăng ký ngay hôm nay và khám phá cách ENTERVIU có thể giúp bạn đạt được mục tiêu nghề nghiệp.
          </Text>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input 
                placeholder="Nhập email của bạn" 
                variant="outlined" 
                leftIcon={faEnvelope} 
                rounded 
                className="bg-white" 
                size="large"
              />
              <Button variant="primary" size="large" leftIcon={faArrowRight} withRipple>
                Dùng thử
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ENTERVIU</h3>
              <p className="text-gray-300">Công nghệ AI hỗ trợ phát triển sự nghiệp toàn diện.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Công ty</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Về chúng tôi</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Tuyển dụng</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Câu hỏi thường gặp</a></li>
                <li><a href="#" className="hover:text-white">Liên hệ</a></li>
                <li><a href="#" className="hover:text-white">Chính sách bảo mật</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kết nối</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-primary-400">Facebook</a>
                <a href="#" className="hover:text-primary-400">Twitter</a>
                <a href="#" className="hover:text-primary-400">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-gray-400 text-sm text-center">
            <p>© {new Date().getFullYear()} ENTERVIU. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

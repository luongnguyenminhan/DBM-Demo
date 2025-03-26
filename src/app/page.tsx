'use client';

import React from 'react';
import Image from 'next/image';
import Button from '@/components/atomic/button';
import Typography from '@/components/atomic/typo';
import Card from '@/components/atomic/card';
import Icon from '@/components/atomic/icon';
import { 
  faArrowRight, 
  faComments, 
  faChartLine, 
  faLightbulb, 
  faUsers,
  faCheckCircle,
  faCalendarAlt,
  faRocket
} from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  // const navItems = [
  //   { label: 'Home', href: '/', isActive: true },
  //   { label: 'Features', href: '/features' },
  //   { label: 'Pricing', href: '/pricing' },
  //   { label: 'Dashboard', href: '/dashboard' },
  // ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header
      <Header
        logoText="Meobeo.ai"
        navItems={navItems}
        position="sticky"
        variant="transparent"
      /> */}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <Typography.Heading level="h1" size="5xl" className="mb-6">
              Biến cuộc họp thành <span className="text-yellow-300">lợi thế</span> của bạn
            </Typography.Heading>
            <Typography.Text size="xl" className="mb-8 text-white/90">
              Phân tích cuộc họp thông minh bằng AI để nâng cao năng suất và kết quả kinh doanh
            </Typography.Text>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                size="large"
                rightIcon={faArrowRight}
                href="/auth/login"
                customClassName="!text-black"
                withRipple
              >
                Bắt đầu ngay
              </Button>
              <Button
                variant="outline"
                size="large"
                href="/demo"
                customClassName="border-white text-white hover:bg-white/10"
              >
                Xem demo
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <Image
              src="/hero-image.png"
              alt="Meeting Analytics"
              width={550}
              height={400}
              className="rounded-lg shadow-xl"
              priority
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,146.53,111.31,216.6,92.83,271.52,77.19,328.27,64.76,387,54.47Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* Trusted By Section
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <Typography.Text variant="muted" size="lg" className="uppercase font-semibold tracking-wider">
              Được tin dùng bởi
            </Typography.Text>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-70">
            {['Google', 'Microsoft', 'Amazon', 'IBM', 'Samsung'].map((brand) => (
              <div key={brand} className="text-2xl font-bold text-gray-400">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Typography.Text className="text-[var(--color-primary)] uppercase font-semibold tracking-wider">
              TÍNH NĂNG
            </Typography.Text>
            <Typography.Heading level="h2" size="3xl" className="mt-2">
              Giải pháp toàn diện cho quản lý cuộc họp
            </Typography.Heading>
            <Typography.Text size="lg" className="mt-4 max-w-2xl mx-auto text-gray-600">
              Tối ưu hóa quá trình họp với đầy đủ công cụ để ghi chép, phân tích và biến thông tin thành hành động
            </Typography.Text>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: faComments,
                title: "Ghi chép tự động",
                description: "Chuyển đổi cuộc họp thành văn bản chính xác với AI tiên tiến"
              },
              {
                icon: faChartLine,
                title: "Phân tích chuyên sâu",
                description: "Hiểu rõ xu hướng, cảm xúc và ý kiến quan trọng từ các cuộc họp"
              },
              {
                icon: faLightbulb,
                title: "Tóm tắt thông minh",
                description: "Nhận tóm tắt ngắn gọn và những điểm chính của mỗi cuộc họp"
              },
              {
                icon: faUsers,
                title: "Cộng tác hiệu quả",
                description: "Chia sẻ kết quả và ghi chú với đồng nghiệp một cách dễ dàng"
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                withAnimation
                withHover
                rounded
                roundedSize="lg"
                padding="lg"
              >
                <div className="w-14 h-14 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center mb-4">
                  <Icon icon={feature.icon} size="lg" variant="primary" />
                </div>
                <Typography.Heading level="h3" className="text-xl mb-2">
                  {feature.title}
                </Typography.Heading>
                <Typography.Text className="text-gray-600">
                  {feature.description}
                </Typography.Text>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Typography.Text className="text-[var(--color-primary)] !mr-0 uppercase font-semibold tracking-wider">
              QUY TRÌNH
            </Typography.Text>
            <Typography.Heading level="h2" size="3xl" className="mt-2">
              Làm việc thông minh hơn với Meobeo.ai
            </Typography.Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
              step: "1",
              icon: faCalendarAlt,
              title: "Tải lên bản ghi",
              description: "Tải lên âm thanh hoặc văn bản từ cuộc họp của bạn"
              },
              {
              step: "2",
              icon: faRocket,
              title: "AI phân tích",
              description: "Hệ thống phân tích nội dung và trích xuất thông tin chi tiết"
              },
              {
              step: "3",
              icon: faCheckCircle,
              title: "Truy cập kết quả",
              description: "Xem báo cáo, tóm tắt và điểm chính để hành động"
              }
            ].map((step, index) => (
              <div key={index} className="h-full flex flex-col items-center justify-center text-center relative">
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-full border-t-2 border-dashed border-gray-200 z-0"></div>
              <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-2xl font-bold mb-6 z-10 relative">
                {step.step}
              </div>
              <Icon icon={step.icon} size="2xl" variant="primary" className="mb-4" />
              <Typography.Heading level="h3" size="xl" className="mb-2 text-center">
                {step.title}
              </Typography.Heading>
              <Typography.Text className="text-gray-600 !text-center">
                {step.description}
              </Typography.Text>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Typography.Text className="text-[var(--color-primary)] uppercase font-semibold tracking-wider">
                LỢI ÍCH
              </Typography.Text>
              <Typography.Heading level="h2" size="3xl" className="mt-2 mb-6">
                Tại sao nên chọn Meobeo.ai?
              </Typography.Heading>
              {[
                "Tiết kiệm thời gian với ghi chép tự động",
                "Không bỏ lỡ thông tin quan trọng từ cuộc họp",
                "Phân tích cảm xúc và xu hướng trong nội dung",
                "Phát hiện vấn đề và cơ hội từ dữ liệu cuộc họp"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start mb-4">
                  <div className="text-[var(--color-primary)] mt-1 mr-3">
                    <Icon icon={faCheckCircle} />
                  </div>
                  <Typography.Text size="lg">{benefit}</Typography.Text>
                </div>
              ))}
              <Button
                variant="gradient"
                size="large"
                rightIcon={faArrowRight}
                className="mt-6"
                withRipple
              >
                Khám phá thêm
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="/dashboard-preview.jpg" 
                alt="Dashboard Preview" 
                width={600} 
                height={400}
                className="object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Typography.Heading level="h2" size="3xl" className="mt-2">
              Khách hàng nói gì về chúng tôi
            </Typography.Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Meobeo.ai đã giúp chúng tôi tiết kiệm hàng giờ ghi chép mỗi tuần và cải thiện hiệu quả cuộc họp.",
                author: "Nguyễn Văn A",
                position: "Giám đốc công nghệ, Tech Corp"
              },
              {
                quote: "Phân tích nội dung trong cuộc họp giúp chúng tôi xác định các vấn đề và giải quyết chúng.",
                author: "Trần Thị B",
                position: "Quản lý dự án, Inno Inc"
              },
              {
                quote: "Tính năng tóm tắt tự động giúp tôi không bỏ lỡ thông tin khi không thể tham dự cuộc họp.",
                author: "Lê Văn C",
                position: "Chuyên viên Marketing, Brand Co"
              }
            ].map((testimonial, index) => (
              <Card 
                key={index} 
                withAnimation 
                variant="default" 
                withBorder 
                withShadow
                padding="lg"
                rounded
              >
                <div className="text-4xl text-[var(--color-primary)] mb-4"></div>
                <Typography.Text size="lg" className="italic mb-6">
                  {testimonial.quote}
                </Typography.Text>
                <div>
                  <Typography.Text weight="bold">{testimonial.author}</Typography.Text>
                  <Typography.Text variant="muted" size="sm">{testimonial.position}</Typography.Text>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white">
        <div className="container mx-auto px-4 text-center">
          <Typography.Heading level="h2" size="3xl" className="text-white mb-6">
            Sẵn sàng tối ưu hóa cuộc họp của bạn?
          </Typography.Heading>
          <div className="mb-6">
          <Typography.Text size="xl" className="max-w-2xl mx-auto">
            Đăng ký ngay hôm nay và trải nghiệm cách Meobeo.ai chuyển đổi cuộc họp thành hành động cụ thể.
          </Typography.Text>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="large"
              rightIcon={faArrowRight}
              href="/auth/login" // Thay đổi từ /register thành /auth/login
              customClassName="bg-white !text-[var(--color-primary)] hover:bg-gray-100"
              withRipple
            >
              Bắt đầu miễn phí
            </Button>
            <Button
              variant="outline"
              size="large"
              href="/contact"
              customClassName="border-white text-white hover:bg-white/10"
            >
              Liên hệ với chúng tôi
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">Meobeo.ai</div>
              <Typography.Text className="mb-4 max-w-xs text-gray-400">
                Nền tảng AI giúp bạn tối ưu hóa cuộc họp và biến thông tin thành hành động.
              </Typography.Text>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <Typography.Text weight="bold" className="text-white mb-4 block text-lg">Sản phẩm</Typography.Text>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Tính năng</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Giá cả</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Doanh nghiệp</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Demo</a></li>
              </ul>
            </div>
            <div>
              <Typography.Text weight="bold" className="text-white mb-4 block text-lg">Công ty</Typography.Text>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Về chúng tôi</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Tuyển dụng</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Liên hệ</a></li>
              </ul>
            </div>
            <div>
              <Typography.Text weight="bold" className="text-white mb-4 block text-lg">Pháp lý</Typography.Text>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Điều khoản</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Quyền riêng tư</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Bảo mật</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <Typography.Text className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Meobeo.ai. Bảo lưu mọi quyền.
            </Typography.Text>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Trung tâm trợ giúp</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Trạng thái hệ thống</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Hỗ trợ</a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
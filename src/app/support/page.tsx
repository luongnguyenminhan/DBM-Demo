'use client';

import React, { useState } from 'react';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import Input from '@/components/atomic/input';
import Breadcrumb from '@/components/molecules/breadcrumb';
import { faEnvelope, faUser, faPaperPlane, faHeadset, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const { Heading, Text } = Typography;

export default function Support() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Mock FAQ data
  const faqItems = [
    {
      question: 'Làm thế nào để tải CV của tôi lên hệ thống?',
      answer: 'Bạn có thể tải lên CV của mình bằng cách vào trang "AI Scoring", sau đó nhấp vào nút "Chọn File" hoặc kéo và thả file CV của bạn vào khu vực được chỉ định. Hệ thống hỗ trợ các định dạng file PDF, DOC và DOCX.'
    },
    {
      question: 'Phỏng vấn ảo hoạt động như thế nào?',
      answer: 'Phỏng vấn ảo sử dụng công nghệ AI để mô phỏng một buổi phỏng vấn thực tế. Hệ thống sẽ đặt câu hỏi phù hợp với vị trí bạn chọn, ghi lại câu trả lời của bạn và sau đó cung cấp phản hồi chi tiết về nội dung, cách trình bày và ngôn ngữ cơ thể của bạn.'
    },
    {
      question: 'Dữ liệu của tôi có được bảo mật không?',
      answer: 'Có, chúng tôi coi trọng việc bảo mật thông tin cá nhân của người dùng. Tất cả dữ liệu được mã hóa và chỉ được sử dụng để cung cấp các dịch vụ bạn yêu cầu. Chúng tôi không chia sẻ thông tin của bạn với bên thứ ba mà không có sự đồng ý.'
    },
    {
      question: 'Làm thế nào để nâng cấp tài khoản?',
      answer: 'Bạn có thể nâng cấp tài khoản bằng cách vào mục "Cài đặt" > "Quản lý tài khoản" > "Gói dịch vụ". Tại đây, bạn có thể xem các gói dịch vụ và chọn gói phù hợp với nhu cầu của mình.'
    },
    {
      question: 'Tôi có thể sử dụng dịch vụ trên thiết bị di động không?',
      answer: 'Có, ứng dụng của chúng tôi được tối ưu hóa cho cả máy tính và thiết bị di động. Bạn có thể truy cập tất cả các tính năng thông qua trình duyệt trên điện thoại hoặc máy tính bảng của mình.'
    }
  ];

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would send this data to an API
    console.log('Form data submitted:', formData);
    setMessageSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 500);
  };

  // Toggle FAQ item expansion
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="p-6 h-full space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <Heading level="h1" size="2xl">Trung tâm hỗ trợ</Heading>
          <Text variant="muted" size="lg" className="mt-1">
            Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn
          </Text>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card withShadow withAnimation className="text-center p-6">
          <div className="bg-primary-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-headset text-primary-600 text-2xl"></i>
          </div>
          <Heading level="h3" size="lg" className="mb-2">Hỗ trợ trực tuyến</Heading>
          <Text variant="muted" className="mb-4">Chatbot của chúng tôi có thể giải đáp các câu hỏi cơ bản 24/7</Text>
          <Button variant="outline" leftIcon={faHeadset}>
            Bắt đầu chat
          </Button>
        </Card>

        <Card withShadow withAnimation className="text-center p-6">
          <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-envelope text-blue-600 text-2xl"></i>
          </div>
          <Heading level="h3" size="lg" className="mb-2">Email hỗ trợ</Heading>
          <Text variant="muted" className="mb-4">Gửi email cho chúng tôi và nhận phản hồi trong vòng 24 giờ</Text>
          <Button variant="outline" leftIcon={faEnvelope}>
            support@recuvision.com
          </Button>
        </Card>

        <Card withShadow withAnimation className="text-center p-6">
          <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
            <i className="fas fa-question-circle text-green-600 text-2xl"></i>
          </div>
          <Heading level="h3" size="lg" className="mb-2">Câu hỏi thường gặp</Heading>
          <Text variant="muted" className="mb-4">Tìm câu trả lời nhanh cho các câu hỏi phổ biến</Text>
          <Button variant="outline" leftIcon={faQuestionCircle}>
            Xem FAQ
          </Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* FAQ Section */}
        <div>
          <Card title="Câu hỏi thường gặp" headerIcon={faQuestionCircle} withShadow>
            <div className="p-4">
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border rounded-lg overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => toggleFaq(index)}
                    >
                      <Text weight="medium">{item.question}</Text>
                      <i className={`fas fa-chevron-${expandedFaq === index ? 'up' : 'down'} text-gray-500`}></i>
                    </button>
                    
                    {expandedFaq === index && (
                      <div className="p-4 bg-white border-t">
                        <Text variant="muted">{item.answer}</Text>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div>
          <Card title="Gửi yêu cầu hỗ trợ" headerIcon={faEnvelope} withShadow>
            <div className="p-6">
              {messageSubmitted ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-check text-green-600 text-2xl"></i>
                  </div>
                  <Heading level="h3" size="lg" className="mb-2">Cảm ơn bạn!</Heading>
                  <Text variant="muted">
                    Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.
                  </Text>
                  <Button 
                    variant="primary" 
                    className="mt-6"
                    onClick={() => setMessageSubmitted(false)}
                  >
                    Gửi yêu cầu khác
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Text weight="medium" className="mb-1">Họ và tên</Text>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nhập họ tên của bạn"
                      leftIcon={faUser}
                      isRequired
                    />
                  </div>
                  
                  <div>
                    <Text weight="medium" className="mb-1">Email</Text>
                    <Input 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Nhập email của bạn"
                      leftIcon={faEnvelope}
                      isRequired
                    />
                  </div>
                  
                  <div>
                    <Text weight="medium" className="mb-1">Tiêu đề</Text>
                    <Input 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Tiêu đề yêu cầu hỗ trợ"
                      isRequired
                    />
                  </div>
                  
                  <div>
                    <Text weight="medium" className="mb-1">Nội dung</Text>
                    <Input 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Chi tiết vấn đề bạn đang gặp phải..."
                      asTextArea
                      rows={5}
                      isRequired
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      htmltype="submit"
                      variant="primary"
                      size="large"
                      leftIcon={faPaperPlane}
                      isFullWidth
                      withRipple
                    >
                      Gửi yêu cầu
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Live Chat Section */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors">
          <i className="fas fa-comments text-2xl"></i>
        </button>
      </div>
    </div>
  );
}

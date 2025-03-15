'use client';

import React, { useState } from 'react';
import Typography from '@/components/atomic/typo';
import Button from '@/components/atomic/button';
import Card from '@/components/atomic/card';
import Input from '@/components/atomic/input';
import Breadcrumb from '@/components/molecules/breadcrumb';
import { faSearch, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

const { Heading, Text } = Typography;

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  count: number;
}

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Cách viết CV thu hút nhà tuyển dụng",
      excerpt: "Những lời khuyên để tạo CV nổi bật và thu hút sự chú ý của nhà tuyển dụng trong lĩnh vực IT.",
      image: "https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      date: "15/06/2023",
      author: "Nguyễn Văn A",
      category: "cv-tips"
    },
    {
      id: 2,
      title: "5 câu hỏi phỏng vấn thường gặp và cách trả lời",
      excerpt: "Chuẩn bị tốt cho buổi phỏng vấn với những câu hỏi thường gặp và gợi ý cách trả lời hiệu quả.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      date: "10/06/2023",
      author: "Trần Thị B",
      category: "interview"
    },
    {
      id: 3,
      title: "Lộ trình trở thành Frontend Developer",
      excerpt: "Hướng dẫn chi tiết cho người mới bắt đầu muốn theo đuổi sự nghiệp Frontend Developer.",
      image: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      date: "05/06/2023",
      author: "Lê Văn C",
      category: "career-path"
    },
    {
      id: 4,
      title: "AI và tương lai của ngành tuyển dụng",
      excerpt: "Công nghệ AI đang thay đổi cách các công ty tìm kiếm và đánh giá ứng viên như thế nào?",
      image: "https://images.unsplash.com/photo-1550432163-9cb326104944?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      date: "01/06/2023",
      author: "Phạm Thị D",
      category: "tech-trends"
    }
  ];

  const categories: Category[] = [
    { id: 'all', name: 'Tất cả', count: blogPosts.length },
    { id: 'cv-tips', name: 'Tips Viết CV', count: blogPosts.filter(post => post.category === 'cv-tips').length },
    { id: 'interview', name: 'Phỏng Vấn', count: blogPosts.filter(post => post.category === 'interview').length },
    { id: 'career-path', name: 'Lộ Trình Nghề Nghiệp', count: blogPosts.filter(post => post.category === 'career-path').length },
    { id: 'tech-trends', name: 'Xu Hướng Công Nghệ', count: blogPosts.filter(post => post.category === 'tech-trends').length }
  ];

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : blogPosts.filter(post => post.category === activeCategory && post.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="p-6 h-full space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumb 
          items={[
            { key: 'home', label: 'Trang chủ', href: '/' },
            { key: 'blog', label: 'Blog' }
          ]}
          withHomeIcon
          variant="default"
          size="medium"
        />
      </div>
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <Heading level="h1" size="2xl">Blog</Heading>
          <Text variant="muted" size="lg" className="mt-1">
            Bài viết, kinh nghiệm và tin tức mới nhất về phát triển sự nghiệp
          </Text>
        </div>
        
        <div className="w-full md:w-auto">
          <Input 
            placeholder="Tìm kiếm bài viết..."
            variant="outlined"
            size="medium"
            leftIcon={faSearch}
            rounded
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with Categories */}
        <div className="lg:col-span-1">
          <Card title="Danh mục" withShadow>
            <div className="p-4">
              <ul className="space-y-2">
                {categories.map(category => (
                  <li key={category.id}>
                    <button 
                      className={`w-full text-left px-3 py-2 rounded flex justify-between items-center ${
                        activeCategory === category.id 
                          ? 'bg-primary-50 text-primary-600' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <span>{category.name}</span>
                      <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          <Card title="Bài viết nổi bật" className="mt-6" withShadow>
            <div className="p-4">
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map(post => (
                  <div key={`featured-${post.id}`} className="flex gap-3 items-start">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 relative">
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Text size="sm" weight="medium" className="line-clamp-2 hover:text-primary-600">
                        <a href={`/blog/${post.id}`}>{post.title}</a>
                      </Text>
                      <Text size="xs" variant="muted" className="mt-1 flex items-center">
                        <i className="fas fa-calendar-alt mr-1"></i> {post.date}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content with Blog Posts */}
        <div className="lg:col-span-3">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map(post => (
                <Card key={post.id} className="group" withAnimation withShadow>
                  <div className="aspect-w-16 aspect-h-9 overflow-hidden relative">
                    <Image 
                      src={post.image} 
                      alt={post.title} 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                        {categories.find(c => c.id === post.category)?.name || post.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <i className="fas fa-calendar-alt mr-1"></i> {post.date}
                      </span>
                    </div>
                    
                    <Heading level="h3" size="lg" className="mb-2 group-hover:text-primary-600 transition-colors">
                      <a href={`/blog/${post.id}`}>{post.title}</a>
                    </Heading>
                    
                    <Text variant="muted" size="sm" className="mb-3 line-clamp-2">
                      {post.excerpt}
                    </Text>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden mr-2 relative">
                          <Image 
                            src={`https://ui-avatars.com/api/?name=${post.author.replace(/\s/g, '+')}&background=random`} 
                            alt={post.author}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        </div>
                        <Text size="sm" variant="muted">{post.author}</Text>
                      </div>
                      <Button 
                        variant="outline"
                        size="small"
                        rightIcon={faArrowRight}
                        href={`/blog/${post.id}`}
                        rounded
                      >
                        Đọc thêm
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <Text size="lg" variant="muted">Không tìm thấy bài viết nào phù hợp</Text>
                <Button
                  variant="primary"
                  size="small"
                  className="mt-4"
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                >
                  Xem tất cả bài viết
                </Button>
              </div>
            </div>
          )}
        </div>






      </div>
    </div>
  );
}

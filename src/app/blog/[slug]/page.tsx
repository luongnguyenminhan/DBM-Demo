// 'use client';

// import React from 'react';
// import Typography from '@/components/atomic/typo';
// import Button from '@/components/atomic/button';
// import Card from '@/components/atomic/card';
// import { faCalendarAlt, faUser, faTag, faArrowLeft, faShare, faComment } from '@fortawesome/free-solid-svg-icons';
// import Avatar from '@/components/atomic/avatar';
// import Icon from '@/components/atomic/icon';
// import Image from 'next/image';

// const { Heading, Text } = Typography;

// // Mock data - in a real app, this would come from an API or CMS
// const blogData = {
//     id: 1,
//     title: "Cách viết CV thu hút nhà tuyển dụng",
//     content: `
//         <p class="mb-4">Xây dựng một CV nổi bật là bước đầu tiên và quan trọng để gây ấn tượng với nhà tuyển dụng. Bài viết này sẽ hướng dẫn bạn cách tạo một CV chuyên nghiệp, thu hút và hiệu quả.</p><p class="mb-4">Xây dựng một CV nổi bật là bước đầu tiên và quan trọng để gây ấn tượng với nhà tuyển dụng. Bài viết này sẽ hướng dẫn bạn cách tạo một CV chuyên nghiệp, thu hút và hiệu quả.</p>
        
//         <h2 class="text-xl font-bold mt-6 mb-3">1. Cấu trúc CV rõ ràng và dễ đọc</h2>
//         <p class="mb-4">Một CV cần có cấu trúc logic, dễ theo dõi. Hãy đảm bảo sử dụng font chữ đơn giản, kích thước phù hợp và định dạng nhất quán. Phân chia các mục rõ ràng như Thông tin cá nhân, Học vấn, Kinh nghiệm làm việc, Kỹ năng và Chứng chỉ.</p><p class="mb-4">Một CV cần có cấu trúc logic, dễ theo dõi. Hãy đảm bảo sử dụng font chữ đơn giản, kích thước phù hợp và định dạng nhất quán. Phân chia các mục rõ ràng như Thông tin cá nhân, Học vấn, Kinh nghiệm làm việc, Kỹ năng và Chứng chỉ.</p>
        
//         <h2 class="text-xl font-bold mt-6 mb-3">2. Tùy chỉnh CV theo vị trí ứng tuyển</h2>
//         <p class="mb-4">Điều chỉnh CV của bạn để phù hợp với từng vị trí cụ thể. Nghiên cứu kỹ mô tả công việc và công ty để hiểu họ đang tìm kiếm những kỹ năng và kinh nghiệm gì.</p><p class="mb-4">Điều chỉnh CV của bạn để phù hợp với từng vị trí cụ thể. Nghiên cứu kỹ mô tả công việc và công ty để hiểu họ đang tìm kiếm những kỹ năng và kinh nghiệm gì.</p>
        
//         <h2 class="text-xl font-bold mt-6 mb-3">3. Sử dụng từ khóa phù hợp</h2>
//         <p class="mb-4">Nhiều công ty sử dụng phần mềm ATS (Applicant Tracking System) để sàng lọc CV. Đảm bảo CV của bạn chứa các từ khóa liên quan đến vị trí ứng tuyển để vượt qua bước sàng lọc này.</p><p class="mb-4">Nhiều công ty sử dụng phần mềm ATS (Applicant Tracking System) để sàng lọc CV. Đảm bảo CV của bạn chứa các từ khóa liên quan đến vị trí ứng tuyển để vượt qua bước sàng lọc này.</p>
        
//         <h2 class="text-xl font-bold mt-6 mb-3">4. Định lượng thành tích</h2>
//         <p class="mb-4">Thay vì chỉ liệt kê nhiệm vụ, hãy đề cập đến thành tích với số liệu cụ thể. Ví dụ: "Tăng 30% lượng truy cập website thông qua chiến dịch SEO" thay vì "Phụ trách SEO cho website công ty".</p><p class="mb-4">Thay vì chỉ liệt kê nhiệm vụ, hãy đề cập đến thành tích với số liệu cụ thể. Ví dụ: "Tăng 30% lượng truy cập website thông qua chiến dịch SEO" thay vì "Phụ trách SEO cho website công ty".</p>
        
//         <h2 class="text-xl font-bold mt-6 mb-3">5. Giới hạn độ dài</h2>
//         <p class="mb-4">CV lý tưởng nên dài 1-2 trang. Tập trung vào những thông tin quan trọng nhất và liên quan nhất đến vị trí ứng tuyển.</p><p class="mb-4">CV lý tưởng nên dài 1-2 trang. Tập trung vào những thông tin quan trọng nhất và liên quan nhất đến vị trí ứng tuyển.</p>
        
//         <h2 class="text-xl font-bold mt-6 mb-3">Kết luận</h2>
//         <p class="mb-4">Viết CV hiệu quả đòi hỏi thời gian và sự chú ý đến chi tiết. Hãy xem CV như cơ hội để kể câu chuyện sự nghiệp của bạn và thể hiện giá trị mà bạn có thể mang lại cho nhà tuyển dụng.</p><p class="mb-4">Viết CV hiệu quả đòi hỏi thời gian và sự chú ý đến chi tiết. Hãy xem CV như cơ hội để kể câu chuyện sự nghiệp của bạn và thể hiện giá trị mà bạn có thể mang lại cho nhà tuyển dụng.</p>
//     `,
//     image: "https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     date: "15/06/2023",
//     author: "Nguyễn Văn A",
//     authorAvatar: "https://i.pravatar.cc/150?img=32",
//     category: "cv-tips",
//     readTime: "5 min read",
//     tags: ["CV", "Resume", "Job Application", "Career Tips"]
// };

// // Related posts
// const relatedPosts = [
//     {
//         id: 2,
//         title: "5 câu hỏi phỏng vấn thường gặp và cách trả lời",
//         excerpt: "Chuẩn bị tốt cho buổi phỏng vấn với những câu hỏi thường gặp và gợi ý cách trả lời hiệu quả.",
//         image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//         date: "10/06/2023"
//     },
//     {
//         id: 3,
//         title: "Lộ trình trở thành Frontend Developer",
//         excerpt: "Hướng dẫn chi tiết cho người mới bắt đầu muốn theo đuổi sự nghiệp Frontend Developer.",
//         image: "https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//         date: "05/06/2023"
//     }
// ];

// interface BlogPostParams {
//   params: {
//     slug: string;
//   };
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// export default function BlogPost({ params }: BlogPostParams) {
//     // In a real app, you would fetch the blog post by slug
//     const post = blogData;

//     return (
//         <div className="p-6 h-full space-y-6">
            
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//                 {/* Main Content */}
//                 <div className="lg:col-span-3 space-y-6">
//                     {/* Back button */}
//                     <div>
//                         <Button 
//                             variant="outline"
//                             size="small" 
//                             leftIcon={faArrowLeft}
//                             href="/blog"
//                         >
//                             Quay lại Blog
//                         </Button>
//                     </div>

//                     <Card withShadow>
//                         {/* Featured Image */}
//                         <div className="aspect-w-16 aspect-h-9 w-full relative" style={{ height: '24rem' }}>
//                             <Image 
//                                 src={post.image} 
//                                 alt={post.title} 
//                                 fill
//                                 sizes="(max-width: 768px) 100vw, 75vw"
//                                 className="object-cover"
//                                 priority
//                             />
//                         </div>
                        
//                         {/* Post Content */}
//                         <div className="p-6"></div>
//                             {/* Category and Date */}
//                             <div className="flex flex-wrap items-center gap-3 mb-4">
//                                 <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm flex items-center">
//                                     <Icon icon={faTag} size="xs" className="mr-1" />
//                                     {post.category}
//                                 </span>
//                                 <span className="text-gray-500 text-sm flex items-center">
//                                     <Icon icon={faCalendarAlt} size="xs" className="mr-1" />
//                                     {post.date}
//                                 </span>
//                                 <span className="text-gray-500 text-sm flex items-center">
//                                     <Icon icon={faUser} size="xs" className="mr-1" />
//                                     {post.readTime}
//                                 </span>
//                             </div>
                            
//                             {/* Title */}
//                             <Heading level="h1" size="3xl" className="mb-6">
//                                 {post.title}
//                             </Heading>
                            
//                             {/* Author */}
//                             <div className="flex items-center mb-6">
//                                 <Avatar 
//                                     src={post.authorAvatar}
//                                     name={post.author}
//                                     size="md"
//                                     withBorder
//                                     borderColor="var(--border-primary)"
//                                 />
//                                 <div className="ml-3">
//                                     <Text weight="medium">{post.author}</Text>
//                                     <Text variant="muted" size="sm">Content Writer</Text>
//                                 </div>
//                             </div>
                            
//                             {/* Post Content */}
//                             <div 
//                                 className="prose prose-lg max-w-none"
//                                 dangerouslySetInnerHTML={{ __html: post.content }}
//                                 >
                                
//                                 {/* Tags */}
//                                 <div className="mt-8 pt-4 border-t">
//                                     <Text weight="medium" className="mb-3">Tags:</Text>
//                                     <div className="flex flex-wrap gap-2">
//                                         {post.tags.map((tag, index) => (
//                                             <span 
//                                                 key={index}
//                                                 className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm cursor-pointer"
//                                             >
//                                                 #{tag}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
                                
//                                 {/* Share and Comment */}
//                                 <div className="mt-8 flex justify-between">
//                                     <Button
//                                         variant="outline"
//                                         size="small"
//                                         leftIcon={faShare}
//                                     >
//                                         Chia sẻ
//                                     </Button>
//                                     <Button
//                                         variant="outline"
//                                         size="small"
//                                         leftIcon={faComment}
//                                     >
//                                         Bình luận
//                                     </Button>
//                                 </div>
//                             </div>
//                     </Card>
                    
//                     {/* Related Posts */}
//                     <div>
//                         <Heading level="h2" size="xl" className="mb-4">Bài viết liên quan</Heading>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             {relatedPosts.map(relatedPost => (
//                                 <Card key={relatedPost.id} withAnimation withShadow>
//                                     <div className="h-40 overflow-hidden relative">
//                                         <Image
//                                             src={relatedPost.image} 
//                                             alt={relatedPost.title} 
//                                             fill
//                                             sizes="(max-width: 768px) 100vw, 33vw"
//                                             className="object-cover"
//                                         />
//                                     </div>
//                                     <div className="p-4">
//                                         <Heading level="h3" size="base" className="mb-2 hover:text-primary-600 transition-colors">
//                                             <a href={`/blog/${relatedPost.id}`}>{relatedPost.title}</a>
//                                         </Heading>
//                                         <Text variant="muted" size="sm" className="line-clamp-2">
//                                             {relatedPost.excerpt}
//                                         </Text>
//                                         <Text variant="muted" size="xs" className="mt-2">
//                                             <Icon icon={faCalendarAlt} size="xs" className="mr-1" />
//                                             {relatedPost.date}
//                                         </Text>
//                                     </div>
//                                 </Card>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
                
//                 {/* Sidebar */}
//                 <div className="lg:col-span-1 space-y-6">
//                     {/* Author Card */}
//                     <Card title="Về tác giả" withShadow>
//                         <div className="p-4 flex flex-col items-center">
//                             <Avatar
//                                 src={post.authorAvatar}
//                                 name={post.author}
//                                 size="xl"
//                                 withBorder
//                                 borderColor="var(--border-primary)"
//                             />
//                             <Text weight="bold" className="mt-4">{post.author}</Text>
//                             <Text variant="muted" size="sm" className="mt-1">Content Writer</Text>
//                             <Text variant="muted" size="sm" className="text-center mt-3">
//                                 Chuyên gia về viết nội dung tuyển dụng và phát triển sự nghiệp trong lĩnh vực IT.
//                             </Text>
//                             <Button
//                                 variant="outline"
//                                 size="small"
//                                 className="mt-4"
//                                 isFullWidth
//                             >
//                                 Xem tất cả bài viết
//                             </Button>
//                         </div>
//                     </Card>
                    
//                     {/* Recent Posts */}
//                     <Card title="Bài viết gần đây" withShadow>
//                         <div className="p-4">
//                             <div className="space-y-4">
//                                 {relatedPosts.map(post => (
//                                     <div key={post.id} className="flex gap-3 items-start">
//                                         <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 relative">
//                                             <Image 
//                                                 src={post.image} 
//                                                 alt={post.title} 
//                                                 fill
//                                                 sizes="64px"
//                                                 className="object-cover"
//                                             />
//                                         </div>
//                                         <div>
//                                             <Text size="sm" weight="medium" className="line-clamp-2 hover:text-primary-600">
//                                                 <a href={`/blog/${post.id}`}>{post.title}</a>
//                                             </Text>
//                                             <Text size="xs" variant="muted" className="mt-1">
//                                                 <Icon icon={faCalendarAlt} size="xs" className="mr-1" />
//                                                 {post.date}
//                                             </Text>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </Card>
                    
//                     {/* Newsletter Sign-up */}
//                     <Card title="Đăng ký nhận bài viết mới" withShadow>
//                         <div className="p-4">
//                             <Text variant="muted" size="sm" className="mb-3">
//                                 Nhận thông báo khi có bài viết mới về phát triển sự nghiệp và tìm việc.
//                             </Text>
//                             <div className="space-y-3">
//                                 <input 
//                                     type="email" 
//                                     placeholder="Email của bạn" 
//                                     className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
//                                 />
//                                 <Button variant="primary" size="small" isFullWidth>
//                                     Đăng ký
//                                 </Button>
//                             </div>
//                         </div>
//                     </Card>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from 'react'

function page() {
  return (
    <div>page</div>
  )
}

export default page
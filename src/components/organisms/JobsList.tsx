'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import JobCard from '@/components/molecules/JobCard';
import SectionHeader from '@/components/molecules/SectionHeader';
import Card from '@/components/atomic/card';
import DropdownMenu from '@/components/molecules/dropdown';
import SearchBar from '@/components/molecules/SearchBar';
import PaginationControl from '@/components/molecules/paginationControl';
import Typography from '@/components/atomic/typo';
import Alert from '@/components/molecules/alert';

export interface JobListingType {
    id: string;
    title: string;
    company: string;
    location?: string;
    salary?: string;
    description?: string;
    matchPercentage?: number;
    logo?: string;
    tags?: string[];
    postedAt?: string;
    isRemote?: boolean;
    isFullTime?: boolean;
    isContract?: boolean;
    isNew?: boolean;
    isHot?: boolean;
    isFeatured?: boolean;
    isSaved?: boolean;
    isApplied?: boolean;
}

export interface JobsListProps {
    jobs?: JobListingType[];
    title?: string;
    subtitle?: string;
    withAnimation?: boolean;
    staggerDelay?: number;
    className?: string;
    customClassName?: string;
    withCard?: boolean;
    withHeader?: boolean;
    withSearch?: boolean;
    withFilters?: boolean;
    withPagination?: boolean;
    actionLabel?: string;
    onAction?: () => void;
    onJobClick?: (job: JobListingType) => void;
    onJobApply?: (job: JobListingType) => void;
    onJobSave?: (job: JobListingType) => void;
    loading?: boolean;
    visibleJobs?: number;
    emptyStateMessage?: string;
    filterLocationOptions?: string[];
    filterJobTypeOptions?: string[];
    onFilterChange?: (filterType: string, value: string) => void;
    onSortChange?: (sortBy: string) => void;
    onSearchChange?: (query: string) => void;
    totalJobs?: number;
    itemsPerPage?: number;
}

const JobsList: React.FC<JobsListProps> = ({
    jobs = [],
    title = 'Việc Làm Phù Hợp',
    subtitle = 'Việc làm phù hợp với kỹ năng và sở thích của bạn',
    withAnimation = true,
    staggerDelay = 0.1,
    className,
    customClassName,
    withCard = true,
    withHeader = true,
    withSearch = true,
    withFilters = true,
    withPagination = true,
    actionLabel = 'Xem Tất Cả Việc Làm',
    onAction,
    onJobClick,
    onJobApply,
    onJobSave,
    loading = false,
    visibleJobs,
    emptyStateMessage = 'Không tìm thấy việc làm phù hợp với tiêu chí của bạn. Hãy thử điều chỉnh tìm kiếm hoặc bộ lọc.',
    filterLocationOptions = ['Tất cả địa điểm', 'Từ xa', 'Kết hợp', 'Tại văn phòng', 'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng'],
    filterJobTypeOptions = ['Tất cả loại hình', 'Toàn thời gian', 'Bán thời gian', 'Hợp đồng', 'Thực tập', 'Tự do'],
    onFilterChange,
    onSortChange,
    onSearchChange,
    totalJobs = 0,
    itemsPerPage = 10,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showApplyAlert, setShowApplyAlert] = useState(false);
    const [showSaveAlert, setShowSaveAlert] = useState(false);

    // Default jobs if none provided with Vietnamese context
    const defaultJobs: JobListingType[] = [
        {
            id: 'job1',
            title: 'Lập Trình Viên Frontend',
            company: 'VNG Corporation',
            location: 'Thành phố Hồ Chí Minh',
            salary: '25.000.000đ - 35.000.000đ',
            description: 'Chúng tôi đang tìm kiếm Lập Trình Viên Frontend thành thạo React, TypeScript, và các công nghệ web hiện đại để tham gia vào đội ngũ năng động của chúng tôi.',
            matchPercentage: 95,
            logo: 'https://i.pravatar.cc/300?img=1',
            tags: ['React', 'TypeScript', 'CSS', 'UI/UX'],
            postedAt: '2 ngày trước',
            isRemote: true,
            isFullTime: true,
            isNew: true,
            isHot: true
        },
        {
            id: 'job2',
            title: 'Chuyên Gia Phân Tích Dữ Liệu',
            company: 'FPT Software',
            location: 'Hà Nội',
            salary: '30.000.000đ - 40.000.000đ',
            description: 'Tìm kiếm Chuyên Gia Phân Tích Dữ Liệu có kinh nghiệm để phát triển mô hình học máy và phân tích các bộ dữ liệu phức tạp để thúc đẩy quyết định kinh doanh.',
            matchPercentage: 88,
            tags: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
            postedAt: '1 tuần trước',
            isRemote: false,
            isFullTime: true
        },
        {
            id: 'job3',
            title: 'Nhà Thiết Kế UX/UI',
            company: 'Momo',
            location: 'Làm từ xa',
            salary: '20.000.000đ - 28.000.000đ',
            description: 'Momo đang tìm kiếm Nhà Thiết Kế UX/UI tài năng để tạo ra trải nghiệm người dùng trực quan và hấp dẫn cho các ứng dụng web và di động.',
            matchPercentage: 78,
            logo: 'https://i.pravatar.cc/300?img=2',
            tags: ['Figma', 'Nghiên cứu người dùng', 'Wireframing', 'Prototyping'],
            postedAt: '3 ngày trước',
            isRemote: true,
            isFullTime: true,
            isNew: true
        }
    ];

    const displayJobs = jobs.length > 0 ? jobs : defaultJobs;
    const limitedJobs = visibleJobs ? displayJobs.slice(0, visibleJobs) : displayJobs;

    // Animation variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerDelay,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.4
            }
        }
    };

    // Sort options
    const sortOptions = [
        { key: 'relevance', label: 'Phù hợp nhất' },
        { key: 'date-desc', label: 'Mới nhất' },
        { key: 'date-asc', label: 'Cũ nhất' },
        { key: 'salary-desc', label: 'Lương cao nhất' },
        { key: 'salary-asc', label: 'Lương thấp nhất' },
        { key: 'match-desc', label: 'Phù hợp nhất' },
    ];

    // Filter location options
    const locationFilterOptions = filterLocationOptions.map(option => ({
        key: option.toLowerCase().replace(/\s+/g, '-'),
        label: option
    }));

    // Filter job type options
    const jobTypeFilterOptions = filterJobTypeOptions.map(option => ({
        key: option.toLowerCase().replace(/\s+/g, '-'),
        label: option
    }));

    // Render toolbar with search and filters
    const renderToolbar = () => {
        if (!withSearch && !withFilters) return null;

        return (
            <div className="flex flex-wrap items-center gap-3 mb-4">
                {withSearch && (
                    <div className="flex-1 min-w-[200px]">
                        <SearchBar 
                            placeholder="Tìm kiếm việc làm..." 
                            onSearch={onSearchChange}
                            size="small"
                            rounded
                        />
                    </div>
                )}
                
                {withFilters && (
                    <div className="flex items-center gap-2 flex-wrap">
                        <DropdownMenu
                            label="Địa điểm"
                            items={locationFilterOptions}
                            variant="outline"
                            size="small"
                            onSelect={key => onFilterChange && onFilterChange('location', key)}
                        />
                        
                        <DropdownMenu
                            label="Loại công việc"
                            items={jobTypeFilterOptions}
                            variant="outline"
                            size="small"
                            onSelect={key => onFilterChange && onFilterChange('type', key)}
                        />

                        <DropdownMenu
                            label="Sắp xếp"
                            items={sortOptions}
                            variant="outline"
                            size="small"
                            onSelect={key => onSortChange && onSortChange(key)}
                        />
                    </div>
                )}
            </div>
        );
    };

    // Handle job actions
    const handleJobClick = (job: JobListingType) => {
        if (onJobClick) onJobClick(job);
    };

    const handleJobApply = (job: JobListingType) => {
        if (onJobApply) onJobApply(job);
    setShowApplyAlert(true);
    setTimeout(() => setShowApplyAlert(false), 3000);
  };

  const handleJobSave = (job: JobListingType) => {
    if (onJobSave) onJobSave(job);
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  // Render job cards
  const renderJobs = () => {
    if (loading) {
      return Array(visibleJobs || 3).fill(0).map((_, index) => (
        <div key={index} className="animate-pulse bg-gray-100 h-40 rounded-md mb-4"></div>
      ));
    }

    if (limitedJobs.length === 0) {
      return (
        <div className="p-8 text-center border border-gray-200 rounded-md">
          <Typography.Text variant="muted" size="base">
            {emptyStateMessage}
          </Typography.Text>
        </div>
      );
    }

    return (
      <motion.div
        variants={withAnimation ? containerVariants : undefined}
        initial={withAnimation ? "hidden" : undefined}
        animate={withAnimation ? "visible" : undefined}
      >
        {limitedJobs.map((job) => (
          <motion.div 
            key={job.id} 
            className="mb-4"
            variants={withAnimation ? itemVariants : undefined}
          >
            <JobCard
              id={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
              description={job.description}
              matchPercentage={job.matchPercentage}
              logo={job.logo}
              tags={job.tags}
              postedAt={job.postedAt}
              isRemote={job.isRemote}
              isFullTime={job.isFullTime}
              isContract={job.isContract}
              isNew={job.isNew}
              isHot={job.isHot}
              variant={job.isFeatured ? 'featured' : 'default'}
              withActions={true}
              onClick={() => handleJobClick(job)}
              onApply={() => handleJobApply(job)}
              onSave={() => handleJobSave(job)}
              isApplied={job.isApplied}
              isSaved={job.isSaved}
              withAnimation={false}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  };

  // Render pagination
  const renderPagination = () => {
    if (!withPagination || limitedJobs.length === 0) return null;

    // Full pagination for complete job listings
    if (totalJobs > itemsPerPage) {
      return (
        <div className="mt-6">
          <PaginationControl
            currentPage={currentPage}
            totalPages={Math.ceil(totalJobs / itemsPerPage)}
            onChange={(page) => setCurrentPage(page)}
            showQuickJump
            showTotal
            totalItems={totalJobs}
            pageSize={itemsPerPage}
            withAnimation
          />
        </div>
      );
    }

    return null;
  };

  // Main content
  const content = (
    <>
      {/* Notification alerts */}
      {showApplyAlert && (
        <div className="mb-4">
          <Alert
            message="Job application submitted successfully!"
            variant="success"
            withAnimation
            autoClose
          />
        </div>
      )}

      {showSaveAlert && (
        <div className="mb-4">
          <Alert
            message="Job saved to your favorites!"
            variant="info"
            withAnimation
            autoClose
          />
        </div>
      )}

      {withHeader && (
        <SectionHeader
          title={title}
          subtitle={subtitle}
          actionLabel={actionLabel}
          onAction={onAction}
          className="mb-4"
        />
      )}
      
      {renderToolbar()}
      {renderJobs()}
      {renderPagination()}
    </>
  );

  // Wrap with card if required
  if (withCard) {
    return (
      <Card
        variant="default"
        withShadow
        padding="lg"
        className={classNames("w-full", className)}
        customClassName={customClassName}
      >
        {content}
      </Card>
    );
  }

  return (
    <div className={classNames("w-full", className, customClassName)}>
      {content}
    </div>
  );
};

export default JobsList;

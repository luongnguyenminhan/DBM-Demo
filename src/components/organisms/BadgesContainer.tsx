'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { 
  faTrophy, 
  faLock,
  faChartLine,
  faCode,
  faPuzzlePiece,
  faBolt,
  faGraduationCap,
  faLaptopCode,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';

import BadgeItem, { BadgeItemLevel } from '@/components/molecules/BadgeItem';
import SectionHeader from '@/components/molecules/SectionHeader';
import Card from '@/components/atomic/card';
import Button from '@/components/atomic/button';
import Typography from '@/components/atomic/typo';

export interface Badge {
    id: string;
    name: string;
    icon: IconDefinition;
    description?: string;
    level: BadgeItemLevel;
    isLocked?: boolean;
    lockMessage?: string;
    earnedAt?: Date;
    progress?: number;
    maxProgress?: number;
}

export interface BadgesContainerProps {
    badges?: Badge[];
    title?: string;
    subtitle?: string;
    withAnimation?: boolean;
    staggerDelay?: number;
    className?: string;
    customClassName?: string;
    withCard?: boolean;
    withHeader?: boolean;
    actionLabel?: string;
    onAction?: () => void;
    onBadgeClick?: (badge: Badge) => void;
    loading?: boolean;
    visibleBadges?: number;
    emptyStateMessage?: string;
    layout?: 'grid' | 'flex';
    columns?: number;
    withFilters?: boolean;
    showLocked?: boolean;
    showLevelFilters?: boolean;
}

const BadgesContainer: React.FC<BadgesContainerProps> = ({
    badges = [],
    title = 'Thành tựu',
    subtitle = 'Mở khóa huy hiệu bằng cách cải thiện kỹ năng và hoàn thành nhiệm vụ',
    withAnimation = true,
    staggerDelay = 0.1,
    className,
    customClassName,
    withCard = true,
    withHeader = true,
    actionLabel = 'Xem tất cả',
    onAction,
    onBadgeClick,
    loading = false,
    visibleBadges,
    emptyStateMessage = 'Chưa đạt được huy hiệu nào. Tiếp tục cải thiện kỹ năng để mở khóa thành tựu!',
    layout = 'grid',
    columns = 4,
    withFilters = false,
    showLocked = true,
    showLevelFilters = true,
}) => {
    // Huy hiệu mặc định nếu không có
    const defaultBadges: Badge[] = [
        {
            id: 'badge1',
            name: 'Bậc thầy CV',
            icon: faGraduationCap,
            description: 'Đã tạo CV hoàn chỉnh',
            level: 'bronze',
            earnedAt: new Date(2023, 5, 15)
        },
        {
            id: 'badge2',
            name: 'Theo dõi kỹ năng',
            icon: faChartLine,
            description: 'Đã thêm 10 kỹ năng vào hồ sơ',
            level: 'silver',
            earnedAt: new Date(2023, 6, 22)
        },
        {
            id: 'badge3',
            name: 'Chuyên gia lập trình',
            icon: faCode,
            description: 'Đã xác minh kỹ năng trong 5 ngôn ngữ lập trình',
            level: 'gold',
            earnedAt: new Date(2023, 7, 3)
        },
        {
            id: 'badge4',
            name: 'Top 10% Lập trình viên',
            icon: faLaptopCode,
            description: 'Xếp hạng trong top 10% về kỹ năng phát triển',
            level: 'platinum',
            earnedAt: new Date(2023, 8, 10)
        },
        {
            id: 'badge5',
            name: 'Người giải quyết vấn đề',
            icon: faPuzzlePiece,
            description: 'Đã thể hiện khả năng giải quyết vấn đề xuất sắc',
            level: 'gold',
            earnedAt: new Date(2023, 9, 5)
        },
        {
            id: 'badge6',
            name: 'Người học nhanh',
            icon: faBolt,
            description: 'Đã cải thiện mức độ kỹ năng 20% trong một tháng',
            level: 'silver',
            earnedAt: new Date(2023, 10, 12)
        },
        {
            id: 'badge7',
            name: 'Người đạt kim cương',
            icon: faTrophy,
            description: 'Hoàn thành tất cả thành tựu cơ bản',
            level: 'diamond',
            isLocked: true,
            lockMessage: 'Hoàn thành tất cả huy hiệu cấp độ vàng',
            progress: 4,
            maxProgress: 10
        },
        {
            id: 'badge8',
            name: 'Chuyên gia phỏng vấn',
            icon: faLock,
            description: 'Vượt qua 10 buổi phỏng vấn thử với điểm 90%',
            level: 'gold',
            isLocked: true,
            lockMessage: 'Hoàn thành 10 cuộc phỏng vấn thử',
            progress: 5,
            maxProgress: 10
        }
    ];

    // Trạng thái cho bộ lọc
    const [activeFilter, setActiveFilter] = React.useState<string>('all');
    const [showLockedBadges, setShowLockedBadges] = React.useState(showLocked);

    // Chọn huy hiệu để hiển thị
    const displayBadges = badges.length > 0 ? badges : defaultBadges;
    
    // Áp dụng bộ lọc
    const filteredBadges = displayBadges
        .filter(badge => showLockedBadges || !badge.isLocked)
        .filter(badge => activeFilter === 'all' || badge.level === activeFilter);
    
    // Áp dụng giới hạn hiển thị
    const limitedBadges = visibleBadges ? filteredBadges.slice(0, visibleBadges) : filteredBadges;

    // Lớp container dựa trên bố cục
    const containerClasses = classNames(
        {
            'justify-center': layout === 'flex',
            'grid gap-4': layout === 'grid',
            [`grid-cols-2 sm:grid-cols-3 lg:grid-cols-${Math.min(columns, 6)}`]: layout === 'grid',
            'flex flex-wrap gap-4': layout === 'flex',
        },
        className,
        customClassName
    );

    // Biến thể hoạt ảnh
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
                duration: 0.5
            }
        }
    };

    // Xử lý khi nhấp vào huy hiệu
    const handleBadgeClick = (badge: Badge) => {
        if (!badge.isLocked && onBadgeClick) {
            onBadgeClick(badge);
        }
    };

    // Hiển thị nút bộ lọc
    const renderFilters = () => {
        if (!withFilters) return null;

        return (
            <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={activeFilter === 'all' ? 'primary' : 'outline'}
                        size="small"
                        onClick={() => setActiveFilter('all')}
                    >
                        Tất cả
                    </Button>
                    
                    {showLevelFilters && (
                        <>
                            <Button
                                variant={activeFilter === 'bronze' ? 'primary' : 'outline'}
                                size="small"
                                onClick={() => setActiveFilter('bronze')}
                            >
                                Đồng
                            </Button>
                            <Button
                                variant={activeFilter === 'silver' ? 'primary' : 'outline'}
                                size="small"
                                onClick={() => setActiveFilter('silver')}
                            >
                                Bạc
                            </Button>
                            <Button
                                variant={activeFilter === 'gold' ? 'primary' : 'outline'}
                                size="small"
                                onClick={() => setActiveFilter('gold')}
                            >
                                Vàng
                            </Button>
                            <Button
                                variant={activeFilter === 'platinum' ? 'primary' : 'outline'}
                                size="small"
                                onClick={() => setActiveFilter('platinum')}
                            >
                                Bạch kim
                            </Button>
                            <Button
                                variant={activeFilter === 'diamond' ? 'primary' : 'outline'}
                                size="small"
                                onClick={() => setActiveFilter('diamond')}
                            >
                                Kim cương
                            </Button>
                        </>
                    )}
                    
                    <Button
                        variant="outline"
                        size="small"
                        onClick={() => setShowLockedBadges(!showLockedBadges)}
                    >
                        {showLockedBadges ? 'Ẩn đã khóa' : 'Hiển thị đã khóa'}
                    </Button>
                </div>
            </div>
        );
    };

    // Hiển thị lưới huy hiệu
    const renderBadges = () => {
        if (loading) {
            return Array(visibleBadges || 4).fill(0).map((_, index) => (
                <div key={index} className="h-48 bg-gray-100 rounded-lg animate-pulse"></div>
            ));
        }

        if (limitedBadges.length === 0) {
            return (
                <div className="col-span-full p-8 text-center">
                    <Typography.Text variant="muted">
                        {emptyStateMessage}
                    </Typography.Text>
                </div>
            );
        }

        return limitedBadges.map((badge) => (
            <motion.div 
                key={badge.id} 
                variants={withAnimation ? itemVariants : undefined}
                className="h-[full] w-[45%]" // Đảm bảo kích thước bằng nhau cho tất cả thẻ
            >
                <BadgeItem
                    name={badge.name}
                    icon={badge.icon}
                    description={badge.description}
                    level={badge.level}
                    withAnimation={false} // Đã xử lý hoạt ảnh với container
                    withShadow
                    withHover
                    onClick={() => handleBadgeClick(badge)}
                    isLocked={badge.isLocked}
                    lockMessage={badge.lockMessage}
                    earnedAt={badge.earnedAt}
                    progress={badge.progress}
                    maxProgress={badge.maxProgress}
                    size="md"
                    className="h-full" // Đảm bảo BadgeItem chiếm toàn bộ chiều cao của container
                />
            </motion.div>
        ));
    };

    // Nội dung chính
    const badgesContent = withAnimation ? (
        <motion.div
            className={containerClasses}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {renderBadges()}
        </motion.div>
    ) : (
        <div className={containerClasses}>
            {renderBadges()}
        </div>
    );

    // Bọc bằng thẻ nếu cần thiết
    const content = (
        <>
            {withHeader && (
                <SectionHeader
                    title={title}
                    subtitle={subtitle}
                    actionLabel={actionLabel}
                    onAction={onAction}
                    icon={faTrophy}
                    className="mb-4"
                />
            )}
            {renderFilters()}
            {badgesContent}
        </>
    );

    if (withCard) {
        return (
            <Card
                variant="default"
                withShadow
                padding="lg"
                className="w-full"
            >
                {content}
            </Card>
        );
    }

    return <div className="w-full">{content}</div>;
};

export default BadgesContainer;

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { 
    faChartLine, 
    faBriefcase, 
    faTrophy, 
    faComment, 
    faCheckCircle, 
    faRocket,
    faGraduationCap,
    faHandshake,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';

import MetricCard from '@/components/molecules/metricCard';
import SectionHeader from '@/components/molecules/sectionHeader';
import Card from '@/components/atomic/card';

export interface Metric {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: IconDefinition;
    trend?: {
        value: number;
        isPositive: boolean;
        label?: string;
    };
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
    onClick?: () => void;
}

export interface DashboardMetricsProps {
    metrics?: Metric[];
    title?: string;
    subtitle?: string;
    layout?: 'grid' | 'flex';
    columns?: number;
    withAnimation?: boolean;
    staggerDelay?: number;
    className?: string;
    customClassName?: string;
    withCard?: boolean;
    withHeader?: boolean;
    actionLabel?: string;
    onAction?: () => void;
    loading?: boolean;
    visibleMetrics?: number;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({
    metrics = [],
    title = 'Số liệu thống kê bảng điều khiển',
    subtitle = 'Chỉ số hiệu suất và thống kê quan trọng',
    layout = 'grid',
    columns = 4,
    withAnimation = true,
    staggerDelay = 0.1,
    className,
    customClassName,
    withCard = false,
    withHeader = true,
    actionLabel,
    onAction,
    loading = false,
    visibleMetrics,
}) => {
    // Default metrics if none provided
    const defaultMetrics: Metric[] = [
        {
            title: 'Tỷ lệ khớp hồ sơ',
            value: '87%',
            subtitle: 'Phần trăm khớp công việc trung bình',
            icon: faChartLine,
            trend: { value: 12, isPositive: true, label: 'so với tháng trước' },
            variant: 'info'
        },
        {
            title: 'Đơn ứng tuyển',
            value: 24,
            subtitle: '8 đơn đang hoạt động',
            icon: faBriefcase,
            trend: { value: 33, isPositive: true, label: 'so với tháng trước' },
            variant: 'info'
        },
        {
            title: 'Kỹ năng đã xác minh',
            value: 12,
            subtitle: '3 kỹ năng đang chờ xác minh',
            icon: faCheckCircle,
            trend: { value: 5, isPositive: true },
            variant: 'success'
        },
        {
            title: 'Tương tác AI',
            value: 156,
            subtitle: 'Phiên gần nhất: Hôm nay',
            icon: faComment,
            variant: 'warning'
        },
        {
            title: 'Thành tích',
            value: 8,
            subtitle: '2 thành tích mới trong tháng',
            icon: faTrophy,
            trend: { value: 2, isPositive: true, label: 'mới' },
            variant: 'warning'
        },
        {
            title: 'Tiến độ sự nghiệp',
            value: '65%',
            subtitle: 'Hướng đến cột mốc tiếp theo',
            icon: faRocket,
            trend: { value: 5, isPositive: true },
            variant: 'default'
        },
        {
            title: 'Khóa học hoàn thành',
            value: 15,
            subtitle: '3 khóa học đang học',
            icon: faGraduationCap,
            trend: { value: 4, isPositive: true, label: 'tháng này' },
            variant: 'default'
        },
        {
            title: 'Kết nối mạng lưới',
            value: 78,
            subtitle: '12 kết nối mới',
            icon: faHandshake,
            trend: { value: 7, isPositive: true, label: 'tuần này' },
            variant: 'error'
        }
    ];

    const displayMetrics = metrics.length > 0 ? metrics : defaultMetrics;
    const limitedMetrics = visibleMetrics ? displayMetrics.slice(0, visibleMetrics) : displayMetrics;

    // Container classes based on layout
    const containerClasses = classNames(
        {
            'grid gap-4': layout === 'grid',
            [`grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(columns, 4)}`]: layout === 'grid',
            'flex flex-wrap gap-4': layout === 'flex',
        },
        className,
        customClassName
    );

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
                duration: 0.5
            }
        }
    };

    // Render metric cards
    const renderMetrics = () => {
        if (loading) {
            return Array(visibleMetrics || 4).fill(0).map((_, index) => (
                <Card key={index} withShadow withBorder className="h-32 animate-pulse">
                    <div className="h-full bg-gray-100 rounded"></div>
                </Card>
            ));
        }

        return limitedMetrics.map((metric, index) => (
            <motion.div 
                key={index} 
                variants={withAnimation ? itemVariants : undefined}
                className={layout === 'flex' ? 'w-full sm:w-auto flex-1 min-w-[240px]' : ''}
            >
                <MetricCard
                    title={metric.title}
                    value={metric.value}
                    subtitle={metric.subtitle}
                    icon={metric.icon}
                    trend={metric.trend}
                    variant={metric.variant || 'default'}
                    withAnimation={false} // Already handling animation with container
                    withShadow
                    withHover={!!metric.onClick}
                    onClick={metric.onClick}
                    size="md"
                />
            </motion.div>
        ));
    };

    // Main content
    const metricsContent = withAnimation ? (
        <motion.div
            className={containerClasses}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {renderMetrics()}
        </motion.div>
    ) : (
        <div className={containerClasses}>
            {renderMetrics()}
        </div>
    );

    // Wrap with card if required
    if (withCard) {
        return (
            <Card
                variant="default"
                withShadow
                padding="lg"
                className="w-full"
            >
                {withHeader && (
                    <SectionHeader
                        title={title}
                        subtitle={subtitle}
                        actionLabel={actionLabel}
                        onAction={onAction}
                        className="mb-6"
                    />
                )}
                {metricsContent}
            </Card>
        );
    }

    return (
        <div className="w-full">
            {withHeader && (
                <SectionHeader
                    title={title}
                    subtitle={subtitle}
                    actionLabel={actionLabel}
                    onAction={onAction}
                    className="mb-6"
                />
            )}
            {metricsContent}
        </div>
    );
};

export default DashboardMetrics;

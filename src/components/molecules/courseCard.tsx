'use client';

import React from 'react';
import Card from '../atomic/card';
import Badge from '../atomic/badge';
import Button from '../atomic/button';
import Typography from '../atomic/typo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { AvatarGroup } from '../atomic/avatar';
import { motion } from 'framer-motion';
import Image from 'next/image';

export interface CourseCardProps {
    title: string;
    provider: string;
    rating: number;
    duration: string;
    description: string;
    link: string;
    thumbnail?: string;
    instructors?: Array<{
        name: string;
        avatar: string;
    }>;
    level?: string;
    tags?: string[];
    students?: number;
    price?: string;
    isPopular?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
    title,
    provider,
    rating,
    duration,
    description,
    thumbnail,
    instructors,
    level = 'Beginner',
    tags = [],
    students,
    price,
    isPopular,
}) => {
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        hover: {
            scale: 1.02,
            transition: { duration: 0.3 }
        }
    };
    
    const childVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
        >
            <Card
                withShadow
                withHover
                className="h-full"
            >
                <div className="relative">
                    {/* Course thumbnail */}
                    <motion.div 
                        className="relative h-48 rounded-t-lg overflow-hidden"
                        variants={childVariants}
                    >
                        {thumbnail ? (
                            <Image src={thumbnail} alt={title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center">
                                <FontAwesomeIcon icon={faGraduationCap} className="text-4xl text-primary-500" />
                            </div>
                        )}
                        {isPopular && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="absolute top-2 right-2"
                            >
                                <Badge
                                    content="Popular"
                                    variant="primary"
                                    size="sm"
                                    withAnimation
                                />
                            </motion.div>
                        )}
                    </motion.div>

                    <div className="p-4 space-y-4">
                        {/* Provider and rating */}
                        <motion.div 
                            className="flex items-center justify-between"
                            variants={childVariants}
                        >
                            <Badge content={provider} variant="secondary" size="sm" />
                            <div className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                                <Typography.Text size="sm" weight="medium">
                                    {rating.toFixed(1)}
                                </Typography.Text>
                            </div>
                        </motion.div>

                        {/* Title and description */}
                        <motion.div variants={childVariants}>
                            <Typography.Heading level="h3" size="lg" className="mb-2">
                                {title}
                            </Typography.Heading>
                            <Typography.Text variant="muted" size="sm">
                                {description}
                            </Typography.Text>
                        </motion.div>

                        {/* Course details */}
                        <motion.div 
                            className="flex items-center gap-4"
                            variants={childVariants}
                        >
                            <div className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faClock} className="text-gray-400" />
                                <Typography.Text size="sm" variant="muted">
                                    {duration}
                                </Typography.Text>
                            </div>
                            <Badge content={level} variant="light" size="sm" />
                        </motion.div>

                        {/* Tags */}
                        {tags.length > 0 && (
                            <motion.div 
                                className="flex flex-wrap gap-2"
                                variants={childVariants}
                            >
                                {tags.map((tag, index) => (
                                    <Badge key={index} content={tag} variant="default" size="xs" />
                                ))}
                            </motion.div>
                        )}

                        {/* Instructors */}
                        {instructors && instructors.length > 0 && (
                            <motion.div 
                                className="flex items-center justify-between"
                                variants={childVariants}
                            >
                                <AvatarGroup
                                    avatars={instructors.map((instructor) => ({
                                        src: instructor.avatar,
                                        name: instructor.name,
                                        withAnimation: true,
                                    }))}
                                    size="sm"
                                    max={3}
                                    withBorder={true}
                                    borderColor="white"
                                    spacing={-8}
                                />
                                {students && (
                                    <Typography.Text size="sm" variant="muted">
                                        {students.toLocaleString()} students
                                    </Typography.Text>
                                )}
                            </motion.div>
                        )}

                        {/* Action buttons */}
                        <motion.div 
                            className="flex items-center justify-between pt-2"
                            variants={childVariants}
                        >
                            {price && (
                                <Typography.Text size="lg" weight="bold" className="text-primary-600">
                                    {price}
                                </Typography.Text>
                            )}
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="primary"
                                    size="medium"
                                    rightIcon={faGraduationCap}
                                    withRipple
                                >
                                    Xem khóa học
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default CourseCard;

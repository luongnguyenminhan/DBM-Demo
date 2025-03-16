'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { faPlus, faChartLine, faCode, faDatabase, faLaptopCode, faPuzzlePiece, faMicrochip, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import SkillCard from '@/components/molecules/SkillCard';
import SectionHeader from '@/components/molecules/SectionHeader';
import Card from '@/components/atomic/card';
import Button from '@/components/atomic/button';
import DropdownMenu from '@/components/molecules/dropdown';
import SearchBar from '@/components/molecules/SearchBar';
import Typography from '@/components/atomic/typo';

export interface Skill {
  id: string;
  name: string;
  level: number;
  ranking?: string;
  category?: string;
  icon?: IconDefinition;
  verified?: boolean;
  stats?: {
    label: string;
    value: string | number;
  }[];
  trend?: {
    value: number;
    isPositive: boolean;
    text?: string;
  };
}

export interface SkillsContainerProps {
  skills?: Skill[];
  title?: string;
  subtitle?: string;
  columns?: number;
  withAnimation?: boolean;
  staggerDelay?: number;
  className?: string;
  customClassName?: string;
  withCard?: boolean;
  withHeader?: boolean;
  withSearch?: boolean;
  withFilters?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  onAddSkill?: () => void;
  onSkillClick?: (skill: Skill) => void;
  loading?: boolean;
  visibleSkills?: number;
  withStats?: boolean;
  emptyStateMessage?: string;
  filterCategories?: string[];
  onFilterChange?: (category: string) => void;
  onSortChange?: (sortBy: string) => void;
  onSearchChange?: (query: string) => void;
}

const SkillsContainer: React.FC<SkillsContainerProps> = ({
  skills = [],
  title = 'My Skills',
  subtitle = 'Your verified skills and competencies',
  columns = 3,
  withAnimation = true,
  staggerDelay = 0.1,
  className,
  customClassName,
  withCard = true,
  withHeader = true,
  withSearch = true,
  withFilters = true,
  actionLabel = 'View All',
  onAction,
  onAddSkill,
  onSkillClick,
  loading = false,
  visibleSkills,
  withStats = true,
  emptyStateMessage = 'No skills found. Add skills to your profile to see them here.',
  filterCategories = ['All Categories', 'Technical', 'Soft Skills', 'Languages', 'Tools'],
  onFilterChange,
  onSortChange,
  onSearchChange,
}) => {
  // Default skills if none provided
  const defaultSkills: Skill[] = [
    {
      id: 'skill1',
      name: 'JavaScript',
      level: 85,
      ranking: 'Top 15%',
      category: 'Programming',
      icon: faCode,
      verified: true,
      stats: [
        { label: 'Projects', value: 12 },
        { label: 'Experience', value: '4 years' }
      ],
      trend: { value: 5, isPositive: true, text: 'improvement' }
    },
    {
      id: 'skill2',
      name: 'React',
      level: 78,
      ranking: 'Top 22%',
      category: 'Frontend',
      icon: faLaptopCode,
      verified: true,
      stats: [
        { label: 'Projects', value: 8 },
        { label: 'Experience', value: '3 years' }
      ],
      trend: { value: 8, isPositive: true, text: 'improvement' }
    },
    {
      id: 'skill3',
      name: 'SQL',
      level: 92,
      ranking: 'Top 8%',
      category: 'Database',
      icon: faDatabase,
      verified: true,
      stats: [
        { label: 'Projects', value: 15 },
        { label: 'Experience', value: '5 years' }
      ],
      trend: { value: 3, isPositive: true, text: 'improvement' }
    },
    {
      id: 'skill4',
      name: 'Data Analysis',
      level: 88,
      ranking: 'Top 12%',
      category: 'Analytics',
      icon: faChartLine,
      verified: true,
      stats: [
        { label: 'Projects', value: 10 },
        { label: 'Experience', value: '4 years' }
      ],
      trend: { value: 6, isPositive: true, text: 'improvement' }
    },
    {
      id: 'skill5',
      name: 'Problem Solving',
      level: 90,
      ranking: 'Top 10%',
      category: 'Soft Skills',
      icon: faPuzzlePiece,
      verified: false,
      stats: [
        { label: 'Projects', value: 'Many' },
        { label: 'Experience', value: '7 years' }
      ]
    },
    {
      id: 'skill6',
      name: 'Machine Learning',
      level: 65,
      ranking: 'Top 35%',
      category: 'AI',
      icon: faMicrochip,
      verified: false,
      stats: [
        { label: 'Projects', value: 4 },
        { label: 'Experience', value: '2 years' }
      ],
      trend: { value: 12, isPositive: true, text: 'improvement' }
    }
  ];

  const displaySkills = skills.length > 0 ? skills : defaultSkills;
  const limitedSkills = visibleSkills ? displaySkills.slice(0, visibleSkills) : displaySkills;

  // Container classes based on layout
  const containerClasses = classNames(
    'grid gap-4',
    {
      [`grid-cols-1 sm:grid-cols-2 lg:grid-cols-${Math.min(columns, 4)}`]: true,
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

  // Sort options
  const sortOptions = [
    { key: 'level-desc', label: 'Level: High to Low' },
    { key: 'level-asc', label: 'Level: Low to High' },
    { key: 'name-asc', label: 'Name: A-Z' },
    { key: 'name-desc', label: 'Name: Z-A' },
    { key: 'ranking', label: 'Best Ranking' },
    { key: 'recently-added', label: 'Recently Added' },
  ];

  // Filter options
  const filterOptions = filterCategories.map(category => ({
    key: category.toLowerCase().replace(/\s+/g, '-'),
    label: category
  }));

  // Render toolbar with search and filters
  const renderToolbar = () => {
    if (!withSearch && !withFilters) return null;

    return (
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {withSearch && (
          <div className="flex-1 min-w-[200px]">
            <SearchBar 
              placeholder="Search skills..." 
              onSearch={onSearchChange}
              size="small"
            />
          </div>
        )}
        
        {withFilters && (
          <div className="flex items-center gap-2">
            <DropdownMenu
              label="Filter"
              items={filterOptions}
              variant="outline"
              size="small"
              onSelect={key => onFilterChange && onFilterChange(key)}
            />
            
            <DropdownMenu
              label="Sort"
              items={sortOptions}
              variant="outline"
              size="small"
              onSelect={key => onSortChange && onSortChange(key)}
            />
          </div>
        )}

        <Button
          size="small"
          leftIcon={faPlus}
          onClick={onAddSkill}
          variant="primary"
        >
          Add Skill
        </Button>
      </div>
    );
  };

  // Render skills grid
  const renderSkills = () => {
    if (loading) {
      return Array(visibleSkills || 6).fill(0).map((_, index) => (
        <Card key={index} withShadow withBorder className="h-48 animate-pulse">
          <div className="h-full bg-gray-100 rounded"></div>
        </Card>
      ));
    }

    if (limitedSkills.length === 0) {
      return (
        <div className="col-span-full p-8 text-center">
          <Typography.Text variant="muted">
            {emptyStateMessage}
          </Typography.Text>
          <div className="mt-4">
            <Button
              size="medium"
              leftIcon={faPlus}
              onClick={onAddSkill}
              variant="primary"
            >
              Add Your First Skill
            </Button>
          </div>
        </div>
      );
    }

    return limitedSkills.map((skill) => (
      <motion.div 
        key={skill.id} 
        variants={withAnimation ? itemVariants : undefined}
      >
        <SkillCard
          skillName={skill.name}
          skillLevel={skill.level}
          skillRanking={skill.ranking}
          skillCategory={skill.category}
          icon={skill.icon}
          verified={skill.verified}
          withAnimation={false} // Already handling animation with container
          withShadow
          withHover
          onClick={() => onSkillClick && onSkillClick(skill)}
          showStats={withStats}
          stats={skill.stats}
          trend={skill.trend}
        />
      </motion.div>
    ));
  };

  // Main content
  const skillsContent = withAnimation ? (
    <motion.div
      className={containerClasses}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {renderSkills()}
    </motion.div>
  ) : (
    <div className={containerClasses}>
      {renderSkills()}
    </div>
  );

  // Wrap with card if required
  const content = (
    <>
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
      {skillsContent}
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

export default SkillsContainer;

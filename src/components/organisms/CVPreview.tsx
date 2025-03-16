'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { 
  faDownload, 
  faEdit, 
  faUser, 
  faPhone, 
  faEnvelope, 
  faGlobe, 
  faMapMarkerAlt,
  faGraduationCap,
  faBriefcase,
  faCode,
  faLanguage,
  faAward,
  faCertificate
} from '@fortawesome/free-solid-svg-icons';

import SectionHeader from '@/components/molecules/sectionHeader';
import Card from '@/components/atomic/card';
import Button from '@/components/atomic/button';
import Typography from '@/components/atomic/typo';
import Icon from '@/components/atomic/icon';
import Avatar from '@/components/atomic/avatar';
import ProgressBar from '@/components/atomic/progressBar';
import Badge from '@/components/atomic/badge';

interface CVEducation {
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  isCurrent?: boolean;
}

interface CVExperience {
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  isCurrent?: boolean;
  achievements?: string[];
}

interface CVSkill {
  name: string;
  level: number;
  category?: string;
  ranking?: string;
}

interface CVLanguage {
  name: string;
  level: number;
  proficiency?: string;
}

interface CVCertification {
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  id?: string;
}

interface CVContact {
  email: string;
  phone?: string;
  website?: string;
  location?: string;
}

export interface CVData {
  fullName: string;
  title: string;
  summary?: string;
  avatar?: string;
  contact: CVContact;
  education?: CVEducation[];
  experience?: CVExperience[];
  skills?: CVSkill[];
  languages?: CVLanguage[];
  certifications?: CVCertification[];
  achievements?: string[];
}

export interface CVPreviewProps {
  cvData: CVData;
  withAnimation?: boolean;
  className?: string;
  customClassName?: string;
  withCard?: boolean;
  withHeader?: boolean;
  withActions?: boolean;
  onEdit?: () => void;
  onDownload?: () => void;
  variant?: 'default' | 'compact' | 'detailed';
  withSectionDividers?: boolean;
  withShadow?: boolean;
  loading?: boolean;
}

const CVPreview: React.FC<CVPreviewProps> = ({
  cvData,
  withAnimation = true,
  className,
  customClassName,
  withCard = true,
  withHeader = true,
  withActions = true,
  onEdit,
  onDownload,
  withSectionDividers = true,
  withShadow = true,
  loading = false,
}) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  // Render personal info section
  const renderPersonalInfo = () => {
    return (
      <motion.div
        variants={withAnimation ? sectionVariants : undefined}
        className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 mb-6"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <Avatar
            src={cvData.avatar}
            name={cvData.fullName}
            size="xl"
            shape="circle"
            withShadow
            withBorder
          />

          <div className="text-center md:text-left">
            <Typography.Heading level="h1" size="xl" className="mb-1">
              {cvData.fullName}
            </Typography.Heading>
            <Typography.Text size="lg" variant="primary" className="mb-2">
              {cvData.title}
            </Typography.Text>

            {cvData.summary && (
              <Typography.Text variant="muted" className="max-w-2xl">
                {cvData.summary}
              </Typography.Text>
            )}
          </div>
        </div>

        {withActions && (
          <div className="flex flex-col md:flex-row gap-2">
            <Button
              variant="primary"
              leftIcon={faEdit}
              onClick={onEdit}
            >
              Edit
            </Button>
            <Button
              variant="outline"
              leftIcon={faDownload}
              onClick={onDownload}
            >
              Download
            </Button>
          </div>
        )}
      </motion.div>
    );
  };

  // Render contact information
  const renderContactInfo = () => {
    return (
      <motion.div
        variants={withAnimation ? sectionVariants : undefined}
        className="flex flex-wrap gap-4 bg-gray-50 rounded-lg p-4 mb-6"
      >
        {cvData.contact.email && (
          <div className="flex items-center">
            <Icon icon={faEnvelope} size="sm" className="text-gray-500 mr-2" />
            <Typography.Text>{cvData.contact.email}</Typography.Text>
          </div>
        )}

        {cvData.contact.phone && (
          <div className="flex items-center">
            <Icon icon={faPhone} size="sm" className="text-gray-500 mr-2" />
            <Typography.Text>{cvData.contact.phone}</Typography.Text>
          </div>
        )}

        {cvData.contact.website && (
          <div className="flex items-center">
            <Icon icon={faGlobe} size="sm" className="text-gray-500 mr-2" />
            <Typography.Text>{cvData.contact.website}</Typography.Text>
          </div>
        )}

        {cvData.contact.location && (
          <div className="flex items-center">
            <Icon icon={faMapMarkerAlt} size="sm" className="text-gray-500 mr-2" />
            <Typography.Text>{cvData.contact.location}</Typography.Text>
          </div>
        )}
      </motion.div>
    );
  };

  // Render experience section
  const renderExperience = () => {
    if (!cvData.experience || cvData.experience.length === 0) return null;

    return (
      <motion.div
        variants={withAnimation ? sectionVariants : undefined}
        className={classNames('mb-6', { 'pb-6 border-b': withSectionDividers })}
      >
        <SectionHeader
          title="Experience"
          icon={faBriefcase}
          variant="primary"
          size="md"
          className="mb-4"
          withIcon
        />

        <div className="space-y-5">
          {cvData.experience.map((exp, index) => (
            <div key={index} className="relative pl-6 border-l-2 border-gray-200 pb-5">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-[var(--color-primary)]"></div>
              
              <Typography.Text weight="semibold" size="base" className="flex justify-between">
                {exp.title}
                <Badge content={exp.isCurrent ? 'Current' : exp.endDate || 'Completed'} variant="primary" shape="pill" size="xs" />
              </Typography.Text>
              
              <Typography.Text weight="medium">
                {exp.company}
              </Typography.Text>
              
              <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                {exp.location && (
                  <span className="flex items-center">
                    <Icon icon={faMapMarkerAlt} size="xs" className="mr-1" />
                    {exp.location}
                  </span>
                )}
                <span>
                  {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                </span>
              </div>
              
              {exp.description && (
                <Typography.Text variant="muted" size="sm" className="mt-2">
                  {exp.description}
                </Typography.Text>
              )}
              
              {exp.achievements && exp.achievements.length > 0 && (
                <div className="mt-2">
                  <Typography.Text weight="medium" size="sm">Achievements:</Typography.Text>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  // Render education section
  const renderEducation = () => {
    if (!cvData.education || cvData.education.length === 0) return null;

    return (
      <motion.div
        variants={withAnimation ? sectionVariants : undefined}
        className={classNames('mb-6', { 'pb-6 border-b': withSectionDividers })}
      >
        <SectionHeader
          title="Education"
          icon={faGraduationCap}
          variant="primary"
          size="md"
          className="mb-4"
          withIcon
        />

        <div className="space-y-5">
          {cvData.education.map((edu, index) => (
            <div key={index} className="relative pl-6 border-l-2 border-gray-200 pb-5">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-[var(--color-primary)]"></div>
              
              <Typography.Text weight="semibold" size="base">
                {edu.degree}
              </Typography.Text>
              
              <Typography.Text weight="medium">
                {edu.institution}
              </Typography.Text>
              
              <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                {edu.location && (
                  <span className="flex items-center">
                    <Icon icon={faMapMarkerAlt} size="xs" className="mr-1" />
                    {edu.location}
                  </span>
                )}
                <span>
                  {edu.startDate} - {edu.isCurrent ? 'Present' : edu.endDate}
                </span>
              </div>
              
              {edu.description && (
                <Typography.Text variant="muted" size="sm" className="mt-2">
                  {edu.description}
                </Typography.Text>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  // Render skills section
  const renderSkills = () => {
    if (!cvData.skills || cvData.skills.length === 0) return null;

    return (
      <motion.div
        variants={withAnimation ? sectionVariants : undefined}
        className={classNames('mb-6', { 'pb-6 border-b': withSectionDividers })}
      >
        <SectionHeader
          title="Skills"
          icon={faCode}
          variant="primary"
          size="md"
          className="mb-4"
          withIcon
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cvData.skills.map((skill, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <Typography.Text weight="medium" size="sm">
                  {skill.name}
                </Typography.Text>
                {skill.ranking && (
                  <Badge content={skill.ranking} variant="primary" size="xs" shape="pill" />
                )}
              </div>
              <ProgressBar
                value={skill.level}
                maxValue={100}
                size="sm"
                withAnimation
              />
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  // Render languages section
  const renderLanguages = () => {
    if (!cvData.languages || cvData.languages.length === 0) return null;

    return (
      <motion.div
        variants={withAnimation ? sectionVariants : undefined}
        className={classNames('mb-6', { 'pb-6 border-b': withSectionDividers })}
      >
        <SectionHeader
          title="Languages"
          icon={faLanguage}
          variant="primary"
          size="md"
          className="mb-4"
          withIcon
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cvData.languages.map((language, index) => (
            <div key={index} className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <Typography.Text weight="medium" size="sm">
                  {language.name}
                </Typography.Text>
                {language.proficiency && (
                  <Typography.Text size="xs" variant="muted">
                    {language.proficiency}
                  </Typography.Text>
                )}
              </div>
              <ProgressBar
                value={language.level}
                maxValue={100}
                size="sm"
                withAnimation
              />
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  // Render certifications section
  const renderCertifications = () => {
    if (!cvData.certifications || cvData.certifications.length === 0) return null;

    return (
      <motion.div
        variants={withAnimation ? sectionVariants : undefined}
        className={classNames('mb-6', { 'pb-6 border-b': withSectionDividers })}
      >
        <SectionHeader
          title="Certifications"
          icon={faCertificate}
          variant="primary"
          size="md"
          className="mb-4"
          withIcon
        />

        <div className="space-y-3">
          {cvData.certifications.map((cert, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-gray-100 rounded-lg">
              <div>
                <Typography.Text weight="medium">
                  {cert.name}
                </Typography.Text>
                <Typography.Text size="sm" variant="muted">
                  {cert.issuer}
                </Typography.Text>
              </div>
              <div>
                <Typography.Text size="xs" className="text-gray-600">
                  {cert.date}
                  {cert.expiryDate && ` - ${cert.expiryDate}`}
                </Typography.Text>
                {cert.id && (
                  <Typography.Text size="xs" variant="muted">
                    ID: {cert.id}
                  </Typography.Text>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  // Render achievements section
  const renderAchievements = () => {
    if (!cvData.achievements || cvData.achievements.length === 0) return null;

    return (
      <motion.div
        variants={withAnimation ? sectionVariants : undefined}
        className="mb-6"
      >
        <SectionHeader
          title="Achievements"
          icon={faAward}
          variant="primary"
          size="md"
          className="mb-4"
          withIcon
        />

        <div className="grid grid-cols-1 gap-2">
          {cvData.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 h-4 w-4 bg-[var(--color-primary)] rounded-full mr-3"></div>
              <Typography.Text>{achievement}</Typography.Text>
            </div>
          ))}
        </div>
      </motion.div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <Card
        variant="default"
        withShadow={withShadow}
        className={classNames("w-full animate-pulse", className, customClassName)}
        padding="lg"
      >
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200"></div>
          <div className="w-full">
            <div className="h-8 bg-gray-200 rounded mb-2 w-2/3"></div>
            <div className="h-6 bg-gray-200 rounded mb-2 w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
        <div className="space-y-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  // Main content
  const cvContent = (
    <>
      {withHeader && (
        <SectionHeader
          title="Curriculum Vitae"
          subtitle="Your professional profile and career history"
          icon={faUser}
          actionLabel={withActions ? "Edit CV" : undefined}
          onAction={withActions ? onEdit : undefined}
          className="mb-6"
        />
      )}
      
      {renderPersonalInfo()}
      {renderContactInfo()}
      {renderExperience()}
      {renderEducation()}
      {renderSkills()}
      {renderLanguages()}
      {renderCertifications()}
      {renderAchievements()}
    </>
  );

  // Wrap with card if required
  if (withCard) {
    return (
      <Card
        variant="default"
        withShadow={withShadow}
        className={classNames("w-full", className, customClassName)}
        padding="lg"
      >
        {withAnimation ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cvContent}
          </motion.div>
        ) : (
          cvContent
        )}
      </Card>
    );
  }

  return (
    <div className={classNames("w-full", className, customClassName)}>
      {withAnimation ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {cvContent}
        </motion.div>
      ) : (
        cvContent
      )}
    </div>
  );
};

export default CVPreview;

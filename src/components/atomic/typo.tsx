'use client';

import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
export type TextWeight = 'light' | 'regular' | 'medium' | 'semibold' | 'bold' | 'extrabold';
export type TextVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

export interface TypographyBaseProps {
  children: React.ReactNode;
  size?: TextSize;
  weight?: TextWeight;
  variant?: TextVariant;
  align?: TextAlign;
  transform?: TextTransform;
  italic?: boolean;
  underline?: boolean;
  lineThrough?: boolean;
  truncate?: boolean | number;
  withGradient?: boolean;
  withAnimation?: boolean;
  animationType?: 'fade' | 'slide' | 'scale' | 'highlight';
  customClassName?: string;
  className?: string;
  asElement?: React.ElementType;
  id?: string;
}

export interface HeadingProps extends Omit<TypographyBaseProps, 'asElement'> {
  level?: HeadingLevel;
  useCustomFont?: boolean;
}

export interface TextProps extends TypographyBaseProps {
  paragraph?: boolean;
  isCaption?: boolean;
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

const sizeClasses: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
};

const weightClasses: Record<TextWeight, string> = {
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

const variantClasses: Record<TextVariant, string> = {
  default: 'text-[var(--text-primary)]',
  primary: 'text-[var(--color-primary)]',
  secondary: 'text-[var(--color-secondary)]',
  success: 'text-[var(--color-success)]',
  warning: 'text-[var(--color-warning)]',
  error: 'text-[var(--color-error)]',
  info: 'text-[var(--color-info)]',
  muted: 'text-[var(--text-secondary)]',
};

const alignClasses: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

const transformClasses: Record<TextTransform, string> = {
  none: 'normal-case',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
};

// Default sizes for heading levels
const headingDefaultSizes: Record<HeadingLevel, TextSize> = {
  h1: '4xl',
  h2: '3xl',
  h3: '2xl',
  h4: 'xl',
  h5: 'lg',
  h6: 'base',
};

// Animation variants
const animationVariants = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slide: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  highlight: {
    hidden: { opacity: 0, backgroundColor: 'rgba(253, 43, 123, 0.2)' },
    visible: { opacity: 1, backgroundColor: 'rgba(253, 43, 123, 0)' },
  },
};

// Create a base function for shared typography logic
const createTypographyElement = (
  props: TypographyBaseProps,
  defaultSize: TextSize = 'base',
  defaultElement: React.ElementType = 'span'
) => {
  const {
    children,
    size = defaultSize,
    weight = 'regular',
    variant = 'default',
    align = 'left',
    transform = 'none',
    italic = false,
    underline = false,
    lineThrough = false,
    truncate = false,
    withGradient = false,
    withAnimation = false,
    animationType = 'fade',
    customClassName = '',
    className = '',
    asElement,
    id,
    ...rest
  } = props;

  const Element = asElement || defaultElement;

  const classes = classNames(
    sizeClasses[size],
    weightClasses[weight],
    variantClasses[variant],
    alignClasses[align],
    transformClasses[transform],
    {
      'italic': italic,
      'underline': underline,
      'line-through': lineThrough,
      'truncate': truncate === true,
      'text-gradient': withGradient,
      [`line-clamp-${truncate}`]: typeof truncate === 'number',
    },
    customClassName,
    className
  );

  const content = (
    <Element className={classes} id={id} {...rest}>
      {children}
    </Element>
  );

  if (withAnimation) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animationVariants[animationType]}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export const Heading: React.FC<HeadingProps> = ({ level = 'h2', useCustomFont = true, ...props }) => {
  const defaultSize = headingDefaultSizes[level];
  return createTypographyElement(
    {
      ...props,
      size: props.size || defaultSize,
      weight: props.weight || 'bold',
      customClassName: classNames(props.customClassName, { 'font-svn-hemi': useCustomFont }),
    },
    defaultSize,
    level
  );
};

export const Text: React.FC<TextProps> = ({
  paragraph = false,
  isCaption = false,
  asLink = false,
  href,
  target,
  rel,
  onClick,
  ...props
}) => {
  let elementType: React.ElementType = 'span';
  if (paragraph) elementType = 'p';
  if (isCaption) elementType = 'figcaption';
  if (asLink) elementType = 'a';

  const linkProps = asLink
    ? {
        href,
        target,
        rel: rel || (target === '_blank' ? 'noopener noreferrer' : undefined),
        onClick,
      }
    : {};

  return createTypographyElement(
    {
      ...props,
      ...linkProps,
      asElement: elementType,
      customClassName: classNames(props.customClassName, {
        'cursor-pointer hover:underline': asLink,
        'mb-4': paragraph,
      }),
    },
    isCaption ? 'sm' : 'base',
    elementType
  );
};

// Typography context for global theme settings
export const TypographyContext = React.createContext({
  defaultVariant: 'default' as TextVariant,
  defaultSize: 'base' as TextSize,
  defaultWeight: 'regular' as TextWeight,
});

export const TypographyProvider: React.FC<{
  children: React.ReactNode;
  defaultVariant?: TextVariant;
  defaultSize?: TextSize;
  defaultWeight?: TextWeight;
}> = ({
  children,
  defaultVariant = 'default',
  defaultSize = 'base',
  defaultWeight = 'regular',
}) => {
  return (
    <TypographyContext.Provider value={{ defaultVariant, defaultSize, defaultWeight }}>
      {children}
    </TypographyContext.Provider>
  );
};

// Convenience component for displaying a rich text block
export const RichText: React.FC<{ content: string; className?: string }> = ({
  content,
  className,
}) => {
  return (
    <div
      className={classNames('prose max-w-none', className)}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

// Create a Typography container that exports all typography components
const Typography = {
  Heading,
  Text,
  Provider: TypographyProvider,
  RichText,
};

export default Typography;

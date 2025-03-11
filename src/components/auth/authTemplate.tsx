'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import Card from '../atomic/card';
import Typography from '../atomic/typo';
import { motion } from 'framer-motion';

const { Heading, Text } = Typography;

interface authTemplateProps {
  children: ReactNode;
  sideTitle: string;
  sideDescription: string;
  logoSize?: number;
  mobileLogo?: boolean;
  sideTag?: string;
}

const authTemplate: React.FC<authTemplateProps> = ({
  children,
  sideTitle,
  sideDescription,
  sideTag = 'EnterViu',
  logoSize = 160,
  mobileLogo = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="md:flex md:items-stretch md:max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:block md:w-1/2"
      >
        <Card
          withGradient
          withBorder={false}
          withShadow
          shadowSize="lg"
          rounded
          roundedSize="lg"
          padding="xl"
          className="h-full rounded-r-none flex flex-col justify-center relative overflow-hidden"
        >
          <div className="text-center relative z-10">
            <Image 
              src="/logo.png" 
              alt="EnterViu Logo" 
              width={logoSize} 
              height={logoSize}
              className="mx-auto mb-6 drop-shadow-lg"
              priority
            />
            
            <div className="space-y-6">
              <div>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-white text-sm font-bold tracking-wider uppercase">{sideTag}</span>
                <Heading level="h2" size="2xl" className="text-white !text-center mt-2 drop-shadow-md">
                  {sideTitle}
                </Heading>
              </div>
              
              <Text size="lg" className="text-white/90 max-w-md mx-auto leading-relaxed">
                {sideDescription}
              </Text>
              
              <div className="pt-4 flex justify-center">
                <div className="w-16 h-1 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <Card
        variant="default"
        withShadow
        shadowSize="lg"
        rounded
        roundedSize="lg"
        padding="xl"
        className="backdrop-blur-sm bg-white/90 md:w-1/2 md:rounded-l-none"
      >
        {mobileLogo && (
          <div className="md:hidden flex justify-center mb-6">
            <Image 
              src="/logo.png" 
              alt="Company Logo" 
              width={100} 
              height={100}
              priority
            />
          </div>
        )}
        {children}
      </Card>
    </motion.div>
  );
};

export default authTemplate;

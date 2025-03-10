'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../atomic/button';
import Input from '../atomic/input';
import Typography from '../atomic/typo';
import { Toast } from '../molecules/alert';
import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import Card from '../atomic/card';
import useLoginForm from '../../hooks/use_loginForm';
import { motion } from 'framer-motion';
import { getClientConfig } from '../../utils/config-loader';
const { Heading, Text } = Typography;

interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  isLoading?: boolean;
  locale?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit, 
  isLoading = false, 
  locale = 'vi' 
}) => {
  // Instead of loading in useEffect, directly get the config
  // This ensures server and client render the same initial state
  const config = getClientConfig(locale);
  
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    handleSubmit,
    emailError,
    passwordError,
    validateEmail,
    validatePassword,
    isSubmitting,
    setIsSubmitting
  } = useLoginForm({ onSubmit });

  const [rememberMe, setRememberMe] = useState(false);

  // Show toast when error changes
  useEffect(() => {
    if (error) {
      Toast.error(error, {
        position: "top-right",
        autoCloseDuration: 5000,
        withAnimation: true,
        withShadow: true
      });
      
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  const isProcessing = isLoading || isSubmitting;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    await handleSubmit(e);
    setIsSubmitting(false);
  };

  const { login } = config;

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
          className="h-full rounded-r-none flex flex-col justify-center"
        >
          <div className="text-center">
            <Image 
              src="/logo.png" 
              alt="Company Logo" 
              width={160} 
              height={160}
              className="mx-auto mb-8"
              priority
            />
            <div className="space-y-6">
              <Heading level="h2" size="2xl" className="text-white">
                {login.sidebar.title}
              </Heading>
              <Text size="lg" className="text-white/90 max-w-md mx-auto">
                {login.sidebar.description}
              </Text>
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
        <div className="md:hidden flex justify-center mb-6">
          <Image 
            src="/logo.png" 
            alt="Company Logo" 
            width={100} 
            height={100}
            priority
          />
        </div>

        <div className="text-center mb-6">
          <Heading level="h1" size="2xl" withGradient className="mb-2">
            {login.heading}
          </Heading>
          <Text variant="secondary" size="base">
            {login.subheading}
          </Text>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <Input
            label={login.form.email.label}
            type="email"
            placeholder={login.form.email.placeholder}
            value={email}
            onChange={handleEmailChange}
            onBlur={() => validateEmail(email)}
            leftIcon={faEnvelope}
            isRequired
            variant="outlined"
            withFloatingLabel
            isError={!!emailError}
            errorMessage={emailError}
            isFullWidth
            isDisabled={isProcessing}
          />

          <Input
            label={login.form.password.label}
            type="password"
            placeholder={login.form.password.placeholder}
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => validatePassword(password)}
            leftIcon={faLock}
            isRequired
            variant="outlined"
            withFloatingLabel
            isError={!!passwordError}
            errorMessage={passwordError}
            isFullWidth
            isDisabled={isProcessing}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                {login.form.remember}
              </label>
            </div>
            <Text
              asLink
              href="/forgot-password"
              variant="primary"
              size="sm"
              customClassName="hover:underline"
            >
              {login.form.forgot_password}
            </Text>
          </div>

          <div className="pt-2">
            <Button
              htmltype="submit"
              variant="gradient"
              isFullWidth
              isLoading={isProcessing}
              size="large"
              rightIcon={!isProcessing ? faSignInAlt : undefined}
              rounded
              disabled={isProcessing}
            >
              <div className="flex items-center justify-center">
                {isProcessing ? null : login.form.submit}
              </div>
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">{login.divider}</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              isFullWidth 
              size="medium"
              className="border-gray-300"
            >
              <div className="flex items-center justify-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.545 10.239v3.821h5.445c-0.643 2.508-2.608 4.112-5.445 4.112-3.332 0-6.033-2.701-6.033-6.033s2.701-6.032 6.033-6.032c1.542 0 2.939 0.583 3.999 1.541l2.999-2.999c-1.996-1.888-4.662-3.046-7.598-3.046-6.048 0-10.941 4.893-10.941 10.941s4.893 10.94 10.941 10.94c6.305 0 10.498-4.463 10.498-10.726 0-0.636-0.073-1.265-0.211-1.889h-10.687z"/>
                </svg>
                {login.social.google}
              </div>
            </Button>
            <Button 
              variant="outline" 
              isFullWidth 
              size="medium"
              className="border-gray-300"
            >
              <div className="flex items-center justify-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21.959 12c0 -5.498 -4.461 -9.959 -9.959 -9.959 -5.498 0 -9.959 4.461 -9.959 9.959 0 4.972 3.647 9.089 8.4 9.828v-6.959h-2.528v-2.869h2.528v-2.183c0 -2.496 1.488 -3.869 3.756 -3.869 1.087 0 2.224 0.195 2.224 0.195v2.442h-1.251c-1.233 0 -1.617 0.765 -1.617 1.548v1.867h2.752l-0.44 2.869h-2.312v6.959c4.753 -0.739 8.4 -4.856 8.4 -9.828z"/>
                </svg>
                {login.social.facebook}
              </div>
            </Button>
          </div>
        </div>

        <div className="text-center mt-6">
          <Text variant="secondary" size="sm">
            {login.signup.text}{' '}
            <Text
              asLink
              href="/register"
              variant="primary"
              size="sm"
              customClassName="hover:underline font-medium"
            >
              {login.signup.link}
            </Text>
          </Text>
        </div>
      </Card>
    </motion.div>
  );
};

export default LoginForm;
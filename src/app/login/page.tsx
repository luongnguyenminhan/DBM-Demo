'use client';

import { useState } from 'react';
import { Form, Input, Card, message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Button from '@/components/atomic/button';
import { motion } from 'framer-motion';

export default function Login() {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: { username: string; password: string }) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (values.username === 'admin' && values.password === 'password') {
        message.success('Login successful!');
        window.location.href = '/';
      } else {
        message.error('Invalid username or password');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card title="Login" className="shadow-lg">
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input 
                prefix={<FontAwesomeIcon icon={faUser} className="text-gray-400 mr-2" />} 
                placeholder="Username" 
                size="large" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<FontAwesomeIcon icon={faLock} className="text-gray-400 mr-2" />}
                placeholder="Password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button 
                variant="primary" 
                htmlType="submit" 
                loading={loading} 
                block
                className="bg-blue-600 hover:bg-blue-700"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}
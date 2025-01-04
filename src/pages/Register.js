import React, { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

const { Option } = Select;

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [api, contextHolder] = message.useMessage();

  const handleRegister = async (values) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await register(values);
      api.success('Registration successful!');
      navigate('/Login');
    } catch (err) {
      api.error(err.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {contextHolder}
      <Form
        name="register"
        layout="vertical"
        onFinish={handleRegister}
        style={{ width: 300, padding: 24, border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}
      >
        <h2 style={{ textAlign: 'center' }}>Register</h2>
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select a role!' }]}
        >
          <Select placeholder="Select a role">
            <Option value="CLIENT">CLIENT</Option>
            <Option value="DIETITIAN">DIETITIAN</Option>
            <Option value="TRAINER">TRAINER</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Register
          </Button>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <a href="/Login">Already have an account? Login</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;

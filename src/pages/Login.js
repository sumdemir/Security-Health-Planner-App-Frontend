import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { authenticate } from '../api/auth';
import { Link } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [api, contextHolder] = message.useMessage();

  const handleLogin = async (values) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await authenticate(values);
      if (response.error) {
        throw new Error(response.error);
      }
      localStorage.setItem('authToken', response.token);
      api.success('Login successful!');
      navigate('/Home');
    } catch (err) {
      api.error('Wrong password or email !');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {contextHolder}
      <Form
        name="login"
        layout="vertical"
        onFinish={handleLogin}
        style={{ width: 300, padding: 24, border: '1px solid #ddd', borderRadius: '8px', background: '#fff' }}
      >
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
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
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
          
          <div className="d-flex justify-content-center w-100 mt-3 center"
          style={{ marginTop: '16px' }}>
            <Link to={'/ForgotPassword'} style={{fontSize:'14px', fontWeight:'500'}}>Forgot your password?</Link>
          </div>

        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

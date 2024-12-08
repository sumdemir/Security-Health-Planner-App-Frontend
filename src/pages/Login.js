import React, { useState } from 'react';
import { Form, Input, Button, Alert, Space, Card } from 'antd';
import { authenticate } from '../api/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault(); // Sayfa yenilenmesini engelle

        setLoading(true);
        try {
            const response = await authenticate({ email, password });
            // Token'ı localStorage'a kaydet
            localStorage.setItem('authToken', response.token);
            alert('Login successful!');
            // Giriş başarılı, yönlendirme yapılabilir
        } catch (err) {
            setError('Authentication failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f2f5',
            }}
        >
            <Card
                style={{ width: '400px', padding: '20px', borderRadius: '8px' }}
                title="Login"
                bordered={false}
            >
                <Form onSubmitCapture={handleLogin}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </Form.Item>

                    {error && (
                        <Form.Item>
                            <Alert message={error} type="error" showIcon />
                        </Form.Item>
                    )}

                    <Form.Item>
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                loading={loading}
                                style={{ backgroundColor: '#007BFF', borderColor: '#007BFF' }}
                            >
                                Login
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;

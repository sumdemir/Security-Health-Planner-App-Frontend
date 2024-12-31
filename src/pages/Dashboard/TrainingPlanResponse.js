import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Card, Spin, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [programText, setProgramText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // API'den veriyi çek
    const fetchProgram = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8080/api/v1/trainingplan/getTrainingPlanChat'); // API endpoint
        if (!response.ok) {
          throw new Error('Veri alınırken bir hata oluştu!');
        }
        const data = await response.json();
        setProgramText(data.candidates[0]?.content?.parts[0]?.text || 'Program bulunamadı.');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgram();
  }, []);

  const showLogoutConfirm = () => {
    // Logout işlemi burada yapılabilir
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ color: 'white', textAlign: 'center', padding: '16px', fontSize: '18px' }}>
          Health Planner
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" onClick={() => navigate('/Home')}>
            Home
          </Menu.Item>
          <Menu.Item key="2" onClick={() => navigate('/DietPlans')}>
            Last Diet Lists
          </Menu.Item>
          <Menu.Item key="3" onClick={() => navigate('/Dietitians')}>
            Dietitians
          </Menu.Item>
          <Menu.Item key="4" onClick={() => navigate('/Trainers')}>
            Trainers
          </Menu.Item>
          <Menu.Item key="5" onClick={showLogoutConfirm}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Header style={{ background: '#fff', padding: 0, textAlign: 'center', fontSize: '24px' }}>
              CREATED SPORT PROGRAM
            </Header>
            {isLoading ? (
              <Spin tip="Loading..." style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} />
            ) : error ? (
              <Alert
                message="Hata"
                description={error}
                type="error"
                showIcon
                style={{ marginTop: '20px' }}
              />
            ) : (
              <Card title="Your Personalized Program" bordered={false} style={{ marginTop: '20px' }}>
                <p style={{ whiteSpace: 'pre-line' }}>{programText}</p>
              </Card>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>My Dashboard ©2024 Created with Ant Design</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

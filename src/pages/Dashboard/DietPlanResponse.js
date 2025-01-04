import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Card, Spin, Alert, Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getDietPlanChat } from '../../api/dietPlan';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dietPlan, setDietPlan] = useState(null);  // Gelen veriyi burada saklayacağız
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // localStorage'dan verileri alıyoruz
  const bitirmeuserid = parseInt(localStorage.getItem('bitirmeuserid'), 10);
  const dietitianId = parseInt(localStorage.getItem('dietitianId'), 10);

  const handleLogout = () => {
    setIsModalVisible(false);
    navigate('/login');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchDietProgram = async () => {
    try {
      if (!bitirmeuserid || !dietitianId) {
        console.log('Bitirmeuserid:', bitirmeuserid);
        console.log('DietitanId:', dietitianId);
        throw new Error('Eksik ID\'ler!');
      }
      const data = await getDietPlanChat(bitirmeuserid, dietitianId);
      console.log('Fetched Plan:', data);
      setDietPlan(data);
      setIsLoading(false); 
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDietProgram(); 
  }, []);

  const showLogoutConfirm = () => {
    setIsModalVisible(true);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ color: 'white', textAlign: 'center', padding: '16px', fontSize: '18px' }}>
          Health Planner
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" onClick={() => navigate('/Home')}>Home</Menu.Item>
                    <Menu.Item key="2" onClick={() => navigate('/DietPlans')}>Recent Diet Lists</Menu.Item>
                    <Menu.Item key="3" onClick={() => navigate('/DietPlans')}>Recent Sport Plan Lists</Menu.Item>
                    <Menu.Item key="4" onClick={() => navigate('/Dietitians')}>Dietitians</Menu.Item>
                    <Menu.Item key="5" onClick={() => navigate('/Trainers')}>Trainers</Menu.Item>
                    <Menu.Item key="6" onClick={showLogoutConfirm}>Logout</Menu.Item>
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
              YOUR DIET PROGRAM CREATED!
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
              <div style={{ marginTop: '20px' }}>
                {/* Gelen Spor Planı buraya yazdırıyoruz */}
                <Card title="Your Personalized Diet Program" bordered={false}>
                  <div style={{ whiteSpace: 'pre-line' }}>
                    <h3>Program Details:</h3>
                    <p>{dietPlan?.planDetails}</p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>My Dashboard ©2024 Created with Ant Design</Footer>
        <Modal
          title="Confirmation"
          visible={isModalVisible}
          onOk={handleLogout}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <p>Are you sure you want to log out?</p>
        </Modal>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

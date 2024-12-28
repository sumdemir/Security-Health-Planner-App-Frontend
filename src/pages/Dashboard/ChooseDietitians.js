import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import diyetisyen1Image from '../../assets/images/diyetisyen1.jpg';
import diyetisyen2Image from '../../assets/images/diyetisyen2.jpg';
import diyetisyen3Image from '../../assets/images/diyetisyen3.jpg';
import { getAllDietitians } from '../../api/dietitian';
import { getDietPlanChat } from '../../api/dietPlan';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [dietitians, setDietitians] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDietitians = async () => {
      try {
        const data = await getAllDietitians();
        setDietitians(data);
        console.log('Dietitians:', data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDietitians();
  }, []);

  const showLogoutConfirm = () => {
    setIsModalVisible(true);
  };

  const handleLogout = () => {
    setIsModalVisible(false);
    navigate('/login');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSelect = async (dietitianId) => {
    try {
      const bitirmeuserid = localStorage.getItem('bitirmeuserid');
      if (!bitirmeuserid) {
        throw new Error('Kullanıcı ID\'si (bitirmeuserid) bulunamadı.');
      }
      console.log(`Seçilen diyetisyen idsi: ${dietitianId}`);
      const response = await getDietPlanChat(bitirmeuserid, dietitianId);
  
      console.log('Diet Plan Response:', response);
    } catch (error) {
      console.error('Error fetching diet plan:', error.message);
    }
  };

  const dietitianImages = [diyetisyen1Image, diyetisyen2Image, diyetisyen3Image];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ color: 'white', textAlign: 'center', padding: '16px', fontSize: '18px' }}>
          Health Planner
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" onClick={() => navigate('/Home')}>Home</Menu.Item>
          <Menu.Item key="2" onClick={() => navigate('/DietPlans')}>Last Diet Lists</Menu.Item>
          <Menu.Item key="3" onClick={() => navigate('/Dietitians')}>Dietitians</Menu.Item>
          <Menu.Item key="4" onClick={() => navigate('/Trainers')}>Trainers</Menu.Item>
          <Menu.Item key="5" onClick={showLogoutConfirm}>Logout</Menu.Item>
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
              SECOND STEP: CHOOSE YOUR DIETITIAN
            </Header>
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                {dietitians.map((dietitian, index) => (
                  <div key={dietitian.id} style={{ textAlign: 'center', width: '200px' }}>
                    <img
                      src={dietitianImages[index % dietitianImages.length]}
                      alt={`Dietitian ${index + 1}`}
                      style={{ width: '200px', height: '200px', borderRadius: '50%' }}
                    />
                    <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                      {dietitian.firstName} {dietitian.lastName}
                    </div>
                    <div style={{ color: 'gray', fontSize: '14px' }}>
                      {dietitian.specialization}
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <Button type="primary" onClick={() => handleSelect(dietitian.id)}>
                        Select
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>My Dashboard ©2024 Created with Ant Design</Footer>
      </Layout>

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
  );
};

export default Dashboard;

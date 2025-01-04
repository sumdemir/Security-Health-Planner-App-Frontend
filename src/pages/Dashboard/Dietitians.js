import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

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
              CREATE YOUR PLANS
            </Header>
            <div> DİETİTİANS </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>My Dashboard ©2024 Created with Ant Design</Footer>
      </Layout>

      {/* Logout Confirmation Modal */}
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

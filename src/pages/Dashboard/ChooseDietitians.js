import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import diyetisyen1Image from '../../assets/images/diyetisyen1.jpg';
import diyetisyen2Image from '../../assets/images/diyetisyen2.jpg';
import diyetisyen3Image from '../../assets/images/diyetisyen3.jpg';

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
          <Menu.Item key="1" onClick={() => navigate('/Home')}> Home</Menu.Item>
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
  {/* Diyetisyen 1 */}
  <div style={{ textAlign: 'center', width: '200px' }}>
    <img
      src={diyetisyen1Image}
      alt="Dietitian 1"
      style={{ width: '200px', height: '200px', borderRadius: '50%' }}
    />
    <div style={{ marginTop: '10px' }}>
      <Button type="primary">Select</Button>
    </div>
  </div>
  {/* Diyetisyen 2 */}
  <div style={{ textAlign: 'center', width: '200px' }}>
    <img
      src={diyetisyen2Image}
      alt="Dietitian 2"
      style={{ width: '200px', height: '200px', borderRadius: '50%' }}
    />
    <div style={{ marginTop: '10px' }}>
      <Button type="primary">Select</Button>
    </div>
  </div>
  {/* Diyetisyen 3 */}
  <div style={{ textAlign: 'center', width: '200px' }}>
    <img
      src={diyetisyen3Image}
      alt="Dietitian 3"
      style={{ width: '200px', height: '200px', borderRadius: '50%' }}
    />
    <div style={{ marginTop: '10px' }}>
      <Button type="primary">Select</Button>
    </div>
  </div>
</div>


            </div>
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

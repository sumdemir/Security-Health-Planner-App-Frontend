import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AntDesignOutlined } from '@ant-design/icons';
import { createStyles } from 'antd-style';
import { ConfigProvider } from 'antd';
import dietImage from '../../assets/images/diet.jpeg';
import gymImage from '../../assets/images/gym.jpeg';

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

  const useStyle = createStyles(({ prefixCls, css }) => ({
    linearGradientButton: css`
      &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
        border-width: 0;

        > span {
          position: relative;
        }

        &::before {
          content: '';
          background: linear-gradient(135deg, #6253e1, #04befe);
          position: absolute;
          inset: 0;
          opacity: 1;
          transition: all 0.3s;
          border-radius: inherit;
        }

        &:hover::before {
          opacity: 0;
        }
      }
    `,
  }));

  const { styles } = useStyle();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ color: 'white', textAlign: 'center', padding: '16px', fontSize: '18px' }}>
          Health Planner
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2" onClick={() => navigate('/DietPlans')}>Last Diet Lists</Menu.Item>
          <Menu.Item key="3">Dietitians</Menu.Item>
          <Menu.Item key="4">Trainers</Menu.Item>
          <Menu.Item key="5" onClick={showLogoutConfirm}>Logout</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: '16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              background: '#fff',
              minHeight: 360,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'nowrap',
            }}
          >
            <div>
              <Header
                style={{
                  background: '#fff',
                  padding: 0,
                  textAlign: 'center',
                  fontSize: '24px',
                  marginBottom: '20px',
                }}
              >
                CREATE YOUR PLANS
              </Header>
            </div>
            {/* Diet Plan Resmi */}
            <img
              src={dietImage}
              alt="Diet Plan"
              style={{
                width: '200px',
                height: '260px',
                marginBottom: '20px',
              }}
            />

            {/* Butonlar */}
            <ConfigProvider
              theme={{
                token: { buttonRadius: '8px' }, // Buton stili teması
              }}
            >
              <Button
                type="primary"
                size="large"
                icon={<AntDesignOutlined />}
                style={{ marginBottom: '20px', fontSize: '16px' }}
                onClick={() => navigate('/DietPlanning')}
              >
                Create Diet Plan
              </Button>

              {/* Gym Plan Resmi */}
              <img
                src={gymImage}
                alt="Gym Plan"
                style={{
                  width: '200px',
                  height: '260px',
                  marginBottom: '20px',
                }}
              />

              <Button
                type="primary"
                size="large"
                icon={<AntDesignOutlined />}
                style={{ marginBottom: '20px', fontSize: '16px'  }}
                onClick={() => navigate('/TrainingPlanning')}
              
              >
                Create Train Plan
              </Button>
            </ConfigProvider>
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

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
              display: 'flex',
              flexDirection: 'row', // Yatay düzen
              gap: '40px', // Elemanlar arasında boşluk
              justifyContent: 'center',
            }}
          >
            {/* Diet Plan Bölgesi */}
            <div
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column', // Dikey düzen
                alignItems: 'center',
              }}
            >
              <Header
                style={{
                  background: '#fff',
                  padding: 0,
                  fontSize: '24px',
                  marginBottom: '20px',
                }}
              >
                CREATE DIET PLAN
              </Header>
              <img
                src={dietImage}
                alt="Diet Plan"
                style={{
                  width: '200px',
                  height: '260px',
                  marginBottom: '20px',
                }}
              />
              <ConfigProvider
                theme={{
                  token: { buttonRadius: '8px' },
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  icon={<AntDesignOutlined />}
                  style={{ fontSize: '16px' }}
                  onClick={() => navigate('/Dashboard/DietPlanning')}
                >
                  Create Diet Plan
                </Button>
              </ConfigProvider>
            </div>

            {/* Gym Plan Bölgesi */}
            <div
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column', // Dikey düzen
                alignItems: 'center',
              }}
            >
              <Header
                style={{
                  background: '#fff',
                  padding: 0,
                  fontSize: '24px',
                  marginBottom: '20px',
                }}
              >
                CREATE TRAIN PLAN
              </Header>
              <img
                src={gymImage}
                alt="Gym Plan"
                style={{
                  width: '200px',
                  height: '260px',
                  marginBottom: '20px',
                }}
              />
              <ConfigProvider
                theme={{
                  token: { buttonRadius: '8px' },
                }}
              >
                <Button
                  type="primary"
                  size="large"
                  icon={<AntDesignOutlined />}
                  style={{ fontSize: '16px' }}
                  onClick={() => navigate('/Dashboard/TrainingPlanning')}
                >
                  Create Train Plan
                </Button>
              </ConfigProvider>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          My Dashboard ©2024 Created with Ant Design
        </Footer>
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

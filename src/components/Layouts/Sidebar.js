import React, { useState, useEffect } from 'react';
import { Layout, Avatar, Typography, Menu, Modal } from 'antd';
import {
  UserOutlined,
  HomeOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;
const { Title, Text } = Typography;

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // LocalStorage'dan kullanıcı bilgilerini al
    const userFirstName = localStorage.getItem('userFirstName');
    const userLastName = localStorage.getItem('userLastName');

    if (userFirstName && userLastName) {
      setUser({
        firstname: userFirstName,
        lastname: userLastName,
      });
    }

    // LocalStorage değişikliklerini dinle
    const handleStorageChange = () => {
      const updatedFirstName = localStorage.getItem('userFirstName');
      const updatedLastName = localStorage.getItem('userLastName');
      if (updatedFirstName && updatedLastName) {
        setUser({
          firstname: updatedFirstName,
          lastname: updatedLastName,
        });
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const showLogoutConfirm = () => {
    setIsModalVisible(true);
  };

  const handleLogout = () => {
    // Kullanıcı bilgilerini sıfırla
    localStorage.removeItem('authToken');
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userLastName');
    setUser(null);
    setIsModalVisible(false);
    navigate('/login');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Sider
      width={250}
      style={{
        background: '#001529',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 0',
        justifyContent: 'space-between',
      }}
    >
      {/* Başlık */}
      <Title
        level={2}
        style={{ color: '#fff', marginBottom: '32px', textAlign: 'center' }}
      >
        Health Planner
      </Title>

      {/* Avatar ve Kullanıcı Bilgisi */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <Avatar
          size={100}
          icon={<UserOutlined />}
          style={{
            marginBottom: '16px',
            backgroundColor: '#87d068',
          }}
        />
        <Text
          style={{
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold',
            display: 'block',
          }}
        >
          {user?.firstname || 'Firstname'} {user?.lastname || 'Lastname'}
        </Text>
      </div>

      {/* Menü */}
      <Menu
        mode="inline"
        theme="dark"
        style={{
          marginTop: '24px',
          width: '100%',
          background: 'transparent',
          border: 'none',
        }}
      >
        <Menu.Item
          key="1"
          icon={<HomeOutlined />}
          style={{ fontSize: '16px' }}
          onClick={() => navigate('/Dashboard/Home')}
        >
          Home
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<UserOutlined />}
          style={{ fontSize: '16px' }}
          onClick={() => navigate('/Dashboard/DietPlans')}
        >
          Recent Diet Lists
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<UserOutlined />}
          style={{ fontSize: '16px' }}
          onClick={() => navigate('/Dashboard/TrainingPlans')}
        >
          Recent Sport Plan Lists
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<SettingOutlined />}
          style={{ fontSize: '16px' }}
          onClick={() => navigate('/Dashboard/Dietitians')}
        >
          Dietitians
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<SettingOutlined />}
          style={{ fontSize: '16px' }}
          onClick={() => navigate('/Dashboard/Trainers')}
        >
          Trainers
        </Menu.Item>
        <Menu.Item
          key="6"
          icon={<ProfileOutlined />}
          style={{ fontSize: '16px' }}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          key="7"
          icon={<LogoutOutlined />}
          style={{ fontSize: '16px' }}
          onClick={showLogoutConfirm}
        >
          Logout
        </Menu.Item>
      </Menu>

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
    </Sider>
  );
};

export default Sidebar;

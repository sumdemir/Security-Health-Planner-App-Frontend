import React, { useState } from 'react';
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

const Sidebar = ({ user }) => {
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
    <Sider
      width={300}
      style={{
        background: '#001529',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px 0',
        justifyContent: 'space-between', // İçeriği dikeyde dağıtmak için
      }}
    >
      {/* Başlık */}
      <Title level={2} 
      style={{ color: '#fff', marginBottom: '32px' , textAlign: 'center'}}>
        Health Planner
      </Title>

      {/* Avatar ve Kullanıcı Bilgisi */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <Avatar
          size={120}
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
            display: 'block', // Text'in alt satıra geçmesini sağlar
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
          onClick={() => navigate('/Dashboard/DietPlans')}
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

import React, { useState } from 'react';
import { Layout, Breadcrumb, Modal, Input, Button, Table, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [nutritionData, setNutritionData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const capitalizeWords = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };


  const fetchNutritionData = async () => {
    const apiKey = 'wIWQgdqWfkRMt3sDnDNDWQ==vGskbxy7UAIND2F4';
    const apiUrl = `https://api.api-ninjas.com/v1/nutrition?query=${query}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          'X-Api-Key': apiKey,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((item) => ({
          ...item,
          name: capitalizeWords(item.name), // Baş harf düzenlemesi
        }));
        const updatedData = [...nutritionData, ...formattedData];
        setNutritionData(updatedData);
        localStorage.setItem('nutritionData', JSON.stringify(updatedData)); // LocalStorage'a kaydet
        notification.success({ message: 'Nutrition data fetched successfully!' });
      } else {
        throw new Error('Failed to fetch nutrition data.');
      }
    } catch (error) {
      notification.error({ message: error.message });
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    
    {
      title: 'Fat (g)',
      dataIndex: 'fat_total_g',
      key: 'fat_total_g',
    },
    {
      title: 'Carbohydrates (g)',
      dataIndex: 'carbohydrates_total_g',
      key: 'carbohydrates_total_g',
    },
    {
      title: 'Sodium (mg)',
      dataIndex: 'sodium_mg',
      key: 'sodium_mg',
    },
    {
      title: 'Potassium (mg)',
      dataIndex: 'potassium_mg',
      key: 'potassium_mg',
    },
    {
      title: 'Cholesterol (mg)',
      dataIndex: 'cholesterol_mg',
      key: 'cholesterol_mg',
    },
    {
      title: 'Fiber (g)',
      dataIndex: 'fiber_g',
      key: 'fiber_g',
    },
    {
      title: 'Sugar (g)',
      dataIndex: 'sugar_g',
      key: 'sugar_g',
    },
  ];

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
      <Layout>
        <Content style={{ margin: '16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>

          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Header
              style={{
                background: '#fff',
                padding: 0,
                textAlign: 'center',
                fontSize: '24px',
              }}
            >
              CALORIE CALCULATOR
            </Header>

            <div style={{ margin: '20px 0' }}>
              <Input
                placeholder="Enter food item (e.g., 1lb brisket and fries)"
                value={query}
                onChange={handleInputChange}
                style={{ width: '70%', marginRight: '10px' }}
              />
              <Button type="primary" onClick={fetchNutritionData}>
                Calculate
              </Button>
            </div>

            {nutritionData.length > 0 && (
              <Table
                dataSource={nutritionData}
                columns={columns}
                rowKey="name"
                pagination={false}
                style={{ marginTop: '20px' }}
              />
            )}
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

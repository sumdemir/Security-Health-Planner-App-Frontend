import React, { useState } from 'react';
import { Layout, Breadcrumb, Modal, Input, Button, Table, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { saveMealCalorie } from '../../api/calculator';

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

  // Helper function to convert snake_case to camelCase
  const toCamelCase = (str) => {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
  };

  // Function to transform entire data to camelCase
  const transformToCamelCase = (data) => {
    const transformedData = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const camelCaseKey = toCamelCase(key);
        transformedData[camelCaseKey] = data[key];
      }
    }
    return transformedData;
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
        console.log('Fetched Nutrition Data:', data);

        // Transforming fetched data into camelCase format
        const formattedData = data.map((item) => ({
          ...transformToCamelCase(item), // Transform each item to camelCase
          name: capitalizeWords(item.name), // Baş harf düzenlemesi
        }));

        const updatedData = [...nutritionData, ...formattedData];
        setNutritionData(updatedData);
        await saveAllNutritionData(formattedData);  // Veriyi kaydet
        localStorage.setItem('nutritionData', JSON.stringify(updatedData)); // LocalStorage'a kaydet
        notification.success({ message: 'Nutrition data fetched successfully!' });
      } else {
        throw new Error('Failed to fetch nutrition data.');
      }
    } catch (error) {
      notification.error({ message: error.message });
    }
  };

  const saveAllNutritionData = async (data) => {
    try {
      for (const item of data) {
        console.log('Saving meal calorie:', item); // Konsola meal verisi yazdır
        await saveMealCalorie(item);  // clientId'yi localStorage'dan alarak veriyi kaydediyor
      }
    } catch (error) {
      notification.error({ message: 'Failed to save data to the database.', description: error.message });
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
      dataIndex: 'fatTotalG',
      key: 'fatTotalG',
    },
    {
      title: 'Fat Saturated(g)',
      dataIndex: 'fatSaturatedG',
      key: 'fatSaturatedG',
    },
    {
      title: 'Carbohydrates (g)',
      dataIndex: 'carbohydratesTotalG',
      key: 'carbohydratesTotalG',
    },
    {
      title: 'Sodium (mg)',
      dataIndex: 'sodiumMg',
      key: 'sodiumMg',
    },
    {
      title: 'Potassium (mg)',
      dataIndex: 'potassiumMg',
      key: 'potassiumMg',
    },
    {
      title: 'Cholesterol (mg)',
      dataIndex: 'cholesterolMg',
      key: 'cholesterolMg',
    },
    {
      title: 'Fiber (g)',
      dataIndex: 'fiberG',
      key: 'fiberG',
    },
    {
      title: 'Sugar (g)',
      dataIndex: 'sugarG',
      key: 'sugarG',
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

            <div style={{ margin: '20px 0', textAlign: 'center' }}>
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

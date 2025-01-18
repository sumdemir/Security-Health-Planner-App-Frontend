import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Modal, Input, Button, Table, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { saveMealCalorie, getMealById } from '../../api/calculator';
import { Alert } from 'antd';

const { Header, Content, Footer } = Layout;

const Dashboard = () => {
  const [mealLists, setMealLists] = useState([]); // Mevcut tüm mealler
  const [query, setQuery] = useState('');
  const [nutritionData, setNutritionData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  // Sayfa yüklendiğinde mevcut mealleri al
  useEffect(() => {
    const fetchMealLists = async () => {
      try {
        const data = await getMealById(); // Veritabanındaki tüm mealleri getir
        setMealLists(data); // Tabloda göstermek için state'e ata
        console.log('Mevcut Mealler:', data);
      } catch (err) {
        console.error('Hata oluştu:', err.message);
        notification.error({ message: 'Mevcut mealler alınırken bir hata oluştu.' });
      }
    };

    fetchMealLists();
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const capitalizeWords = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const transformToCamelCase = (data) => {
    const transformedData = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const camelCaseKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
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

        const formattedData = data.map((item) => ({
          ...transformToCamelCase(item),
          name: capitalizeWords(item.name),
        }));

        // Yeni mealleri kaydet ve tabloya ekle
        await saveAllNutritionData(formattedData);
        setMealLists((prev) => [...prev, ...formattedData]); // Tabloda güncelle

        notification.success({ message: 'Yeni mealler başarıyla eklendi!' });
      } else {
        throw new Error('Besin bilgisi alınamadı.');
      }
    } catch (error) {
      notification.error({ message: error.message });
    }
  };

  const saveAllNutritionData = async (data) => {
    try {
      for (const item of data) {
        await saveMealCalorie(item);
      }
    } catch (error) {
      notification.error({ message: 'Veritabanına kaydedilirken bir hata oluştu.', description: error.message });
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

            {/* Tüm mealleri gösteren tablo */}
            {mealLists.length > 0 && (
              <Table
                dataSource={mealLists}
                columns={columns}
                rowKey="name"
                pagination={false}
                style={{ marginTop: '20px' }}
              />
            )}

            <Alert
              message="Supporting You on Your Diet Journey!"
              description="Healthy eating habits are the foundation of a healthy life. This tool helps you understand the nutritional values of the food you consume, enabling you to make more informed choices. By tracking calories, protein, fat, and carbohydrate intake, you can achieve your goals more effectively. Every small step is the start of a big change!"
              type="warning"
              showIcon
              style={{ margin: '20px auto', maxWidth: '50%' }}
            />
          </div>

         

        </Content>
        <Footer style={{ textAlign: 'center' }}>
          My Dashboard ©2024 Created with Ant Design
        </Footer>
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

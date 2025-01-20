import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Modal, Button, Card, Row, Col, Typography } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import diyetisyen1Image from '../../assets/images/diyetisyen1.jpg';
import diyetisyen2Image from '../../assets/images/diyetisyen2.jpg';
import diyetisyen3Image from '../../assets/images/diyetisyen3.jpg';
import { getAllDietitians } from '../../api/dietitian';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

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

  const dietitianImages = [diyetisyen1Image, diyetisyen2Image, diyetisyen3Image];

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Content style={{ margin: '16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ padding: 24, background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <Header style={{ background: 'transparent', textAlign: 'center' }}>
            <Title level={2} style={{ color: '#000' }}>DIETITIANS CONTACT PAGE</Title>
          </Header>
          <Row gutter={[16, 16]} justify="center">
            {dietitians.map((dietitian, index) => (
              <Col key={dietitian.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  cover={<img src={dietitianImages[index % dietitianImages.length]} alt={dietitian.firstName} style={{ borderRadius: '12px' }} />}
                  bordered={false}
                  style={{ borderRadius: '12px', textAlign: 'center' }}
                >
                  <Title level={4}>{dietitian.firstName} {dietitian.lastName}</Title>
                  <p style={{ color: 'gray', fontSize: '14px' }}>{dietitian.specialization}</p>
                  <Button type="primary" icon={<PhoneOutlined />}>
                    <a href={`mailto:${dietitian.email}?subject=HEALTH PLANNER&body=Hi, ${dietitian.firstName}`} style={{ color: 'white', textDecoration: 'none' }}>
                      Contact
                    </a>
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>My Dashboard ©2024 Created with Ant Design</Footer>

      <Modal title="Confirmation" visible={isModalVisible} onOk={handleLogout} onCancel={() => setIsModalVisible(false)} okText="Yes" cancelText="No">
        <p>Are you sure you want to log out?</p>
      </Modal>
    </Layout>
  );
};

export default Dashboard;

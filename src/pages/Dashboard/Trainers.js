import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Modal, Button, Card, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import antrenor1Image from '../../assets/images/antrenor1.jpg';
import antrenor2Image from '../../assets/images/antrenor2.jpg';
import antrenor3Image from '../../assets/images/antrenor3.jpg';
import { getAllTrainers } from '../../api/trainer';
import { PhoneOutlined } from '@ant-design/icons';



const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const data = await getAllTrainers();
        setTrainers(data);
        console.log('Trainers:', data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTrainers();
  }, []);

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

  const antrenorImages = [antrenor1Image, antrenor2Image, antrenor3Image];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ margin: '16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
  
        <div style={{ padding: 24, background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <Header style={{ background: 'transparent', textAlign: 'center' }}>
            <Title level={2} style={{ color: '#000' }}>TRAINERS CONTACT PAGE</Title>
          </Header>
          <Row gutter={[16, 16]} justify="center">
            {trainers.map((trainer, index) => (
              <Col key={trainer.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  cover={<img src={antrenorImages[index % antrenorImages.length]} alt={`Trainer ${index + 1}`} style={{ borderRadius: '12px' }} />}
                  bordered={false}
                  style={{ borderRadius: '12px', textAlign: 'center' }}
                >
                  <Title level={4}>{trainer.firstName} {trainer.lastName}</Title>
                  <p style={{ color: 'gray', fontSize: '14px' }}>{trainer.specialization}</p>
                  <Button type="primary" icon={<PhoneOutlined />}>
                    <a href={`mailto:${trainer.email}?subject=HEALTH PLANNER&body=Hi, ${trainer.firstName}`} style={{ color: 'white', textDecoration: 'none' }}>
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

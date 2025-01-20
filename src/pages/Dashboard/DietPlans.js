import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Modal, Card, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAllDietPlansForUser } from '../../api/dietPlan';
import { FileTextOutlined, CalendarOutlined, HeartTwoTone } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const [dietLists, setDietLists] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDietLists = async () => {
      try {
        const bitirmeuserid = parseInt(localStorage.getItem('bitirmeuserid'), 10);
        if (!bitirmeuserid) {
          throw new Error('Client ID eksik.');
        }

        const data = await getAllDietPlansForUser(bitirmeuserid);
        setDietLists(data);
        console.log('All Diet Lists:', data);
      } catch (err) {
        console.error('Hata oluştu:', err.message);
        setError(err.message);
      }
    };

    fetchDietLists();
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
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <Header style={{ background: 'transparent', textAlign: 'center' }}>
              <Title level={2} style={{ color: '#000' }}>
                <HeartTwoTone twoToneColor="#eb2f96" /> RECENT DIET PLANS
              </Title>
            </Header>
            <div
              style={{
                marginTop: 20,
                textAlign: 'center',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              }}
            >
              <Row
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {dietLists.map((dietPlan, index) => (
                  <Col key={dietPlan.id} flex="0 0 auto">
                    <Card
                      title={
                        <div style={{ textAlign: 'center', whiteSpace: 'normal' }}>
                          <CalendarOutlined style={{ marginRight: 8, color: '#52c41a' }} />
                          {dietPlan.planName}
                          <div style={{ fontSize: '12px', color: 'gray' }}>
                            {new Date(dietPlan.createdAt).toLocaleDateString()} -{' '}
                            {new Date(dietPlan.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                      }
                      bordered={true}
                      hoverable
                      style={{
                        width: '100%',
                        maxWidth: '100%',
                        textAlign: 'left',
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                      }}
                    >
                      <div
                        style={{
                          maxHeight: dietLists.length === 1 ? 'none' : '150px', // Tek öğe varsa sınırsız yükseklik
                          overflowY: dietLists.length === 1 ? 'visible' : 'auto', // Tek öğe varsa scroll bar olmasın
                          paddingRight: dietLists.length === 1 ? '0' : '10px',
                        }}
                      >
                        <p
                          style={{
                            color: 'gray',
                            fontSize: '14px',
                            wordWrap: 'break-word',
                            margin: 0,
                          }}
                        >
                          {dietPlan.planDetails}
                        </p>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
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

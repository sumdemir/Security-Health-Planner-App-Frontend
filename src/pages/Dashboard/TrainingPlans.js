import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Modal, Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAllTrainingPlansForUser } from '../../api/trainingPlan';

const { Header, Content, Footer } = Layout;

const Dashboard = () => {
  const [trainingLists, setTrainingLists] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrainingLists = async () => {
      try {
        const bitirmeuserid = parseInt(localStorage.getItem('bitirmeuserid'), 10);
        if (!bitirmeuserid) {
          throw new Error('Client ID eksik.');
        }

        const data = await getAllTrainingPlansForUser(bitirmeuserid);
        setTrainingLists(data);
        console.log('All Diet Lists:', data);
      } catch (err) {
        console.error('Hata oluştu:', err.message);
        setError(err.message);
      }
    };

    fetchTrainingLists();
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

          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Header style={{ background: '#fff', padding: 0, textAlign: 'center', fontSize: '24px' }}>
              RECENT SPORT PROGRAMS
            </Header>
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <Row gutter={[16, 16]} justify="center">
                {trainingLists.map((trainingPlan) => (
                  <Col key={trainingPlan.id} xs={24} sm={12} md={8} lg={6}>
                    <Card
                      title={trainingPlan.planName}
                      bordered={true}
                      hoverable
                      style={{
                        width: 300,
                        textAlign: 'left',
                      }}
                    >
                      <p style={{ color: 'gray', fontSize: '14px' }}>{trainingPlan.planDetails}</p>
                      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Created At: {new Date(trainingPlan.createdAt).toLocaleString()}</p>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
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

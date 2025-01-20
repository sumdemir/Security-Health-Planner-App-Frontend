import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Modal, Card, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAllTrainingPlansForUser } from '../../api/trainingPlan';
import { FileTextOutlined, CalendarOutlined, SmileTwoTone} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

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
      } catch (err) {
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

  return (
    <Layout style={{ minHeight: '100vh'}}>
      <Content style={{ margin: '16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>

        <div style={{ padding: 24, background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <Header style={{ background: 'transparent', textAlign: 'center' }}>
            <Title level={2} style={{ color: '#000' }}>
            <SmileTwoTone /> RECENT SPORT PROGRAMS
            </Title>
          </Header>
          <div style={{ marginTop: 20, textAlign: 'center', overflowX: 'auto', whiteSpace: 'nowrap' }}>

            <Row style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {trainingLists.map((trainingPlan) => (
                <Col key={trainingPlan.id} flex="0 0 auto">
                  <Card
                    title={
                      <div style={{ textAlign: 'center' }}>
                        <CalendarOutlined style={{ marginRight: 8, color: '#52c41a' }} />
                        {trainingPlan.planName}
                        <div style={{ fontSize: '12px', color: 'gray' }}>
                          {new Date(trainingPlan.createdAt).toLocaleDateString()} - {new Date(trainingPlan.createdAt).toLocaleTimeString()}
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

                        maxHeight: '150px',  // Maksimum yükseklik ayarlandı
                        overflowY: 'auto',   // Dikey scroll bar eklendi
                        paddingRight: '10px', // Kaydırma çubuğundan dolayı içeriği sıkıştırmamak için padding eklendi
                      }}
                    >
                      <p style={{ color: 'gray', fontSize: '14px', textAlign: 'justify' }}>{trainingPlan.planDetails}</p>
                    </div>


                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>My Dashboard ©2024 Created with Ant Design</Footer>

      <Modal
        title={<><FileTextOutlined /> Confirmation</>}
        visible={isModalVisible}
        onOk={handleLogout}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </Layout>
  );
};

export default Dashboard;

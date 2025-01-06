import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Modal, Button, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import antrenor1Image from '../../assets/images/antrenor1.jpg';
import antrenor2Image from '../../assets/images/antrenor2.jpg';
import antrenor3Image from '../../assets/images/antrenor3.jpg';
import {getAllTrainers} from '../../api/trainer';
import { PhoneOutlined } from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;

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
     
      <Layout>
        <Content style={{ margin: '16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>

          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Header style={{ background: '#fff', padding: 0, textAlign: 'center', fontSize: '24px' }}>
              OUR TRAINERS
            </Header>
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                {trainers.map((trainer, index) => (
                  <div key={trainer.id} style={{ textAlign: 'center', width: '200px' }}>
                    <img
                      src={antrenorImages[index % antrenorImages.length]}
                      alt={`Trainer ${index + 1}`}
                      style={{ width: '200px', height: '200px', borderRadius: '50%' }}
                    />
                    <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                      {trainer.firstName} {trainer.lastName}
                    </div>
                    <div style={{ color: 'gray', fontSize: '14px' }}>
                      {trainer.specialization}
                    </div>
                    <div style={{ marginTop: '10px' }}>
                    <Button
                      type="primary"
                      icon={<PhoneOutlined />}
                      style={{ marginTop: '10px' }}
                      onClick={() => alert(`Contacting ${trainer.firstName} ${trainer.lastName}`)}
                    >
                      Contact
                    </Button>
                    </div>
                  </div>
                ))}
              </div>
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

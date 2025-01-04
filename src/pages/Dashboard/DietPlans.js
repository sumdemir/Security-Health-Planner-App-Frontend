import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAllDietPlansForUser } from '../../api/dietPlan';
import { useEffect } from 'react';

const { Header, Content, Footer, Sider } = Layout;

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
  
        // Diğer kodlar...
        const data = await getAllDietPlansForUser(bitirmeuserid); // clientId olarak bitirmeuserid gönder
        setDietLists(data); // Veriyi burada set ediyoruz
        console.log('All Diet Lists:', data);
      } catch (err) {
        // Hata mesajını logla
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

          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Header style={{ background: '#fff', padding: 0, textAlign: 'center', fontSize: '24px' }}>
              CREATE YOUR PLANS
            </Header>
            <div style={{ marginTop: 20, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
                {dietLists.map((dietPlan, index) => (
                  <div key={dietPlan.id} style={{ textAlign: 'center', width: '200px' }}>
                    <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
                      {dietPlan.planName}
                    </div>
                    <div style={{ color: 'gray', fontSize: '14px' }}>
                      {dietPlan.planDetails}
                    </div>
                    <div style={{ marginTop: '10px' }}>
                      <h3> {dietPlan.createdAt}</h3> {/* Tarih bilgisi */}
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

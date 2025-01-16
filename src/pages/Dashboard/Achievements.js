import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Modal, Card, Row, Col, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAllDietPlansForUser } from '../../api/dietPlan';

const { Header, Content, Footer } = Layout;

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

  // Kilo verilerini tablo formatında hazırlamak
  const columns = [
    {
      title: 'Plan Name',
      dataIndex: 'planName',
      key: 'planName',
    },
    {
      title: 'Start Weight',
      dataIndex: 'startWeight',
      key: 'startWeight',
    },
    {
      title: 'Target Weight',
      dataIndex: 'targetWeight',
      key: 'targetWeight',
    },
    {
      title: 'Weight Change',
      dataIndex: 'weightChange',
      key: 'weightChange',
      render: (text, record) => (
        <span>{record.targetWeight - record.startWeight} kg</span>
      ),
    },
    {
      title: 'Plan Details',
      dataIndex: 'planDetails',
      key: 'planDetails',
      render: (text) => (
        <p style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {text}
        </p>
      ),
    },
  ];

  const dataSource = dietLists.map((dietPlan) => ({
    key: dietPlan.id,
    planName: dietPlan.planName,
    startWeight: dietPlan.startWeight,
    targetWeight: dietPlan.targetWeight,
    planDetails: dietPlan.planDetails, // planDetails burada kullanılıyor
  }));

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
              ACHIEVEMENTS
            </Header>
            <div style={{ marginTop: 20 }}>
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                bordered
                title={() => 'Achievements Table'}
              />
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

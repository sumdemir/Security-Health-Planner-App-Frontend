import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div style={{ color: 'white', textAlign: 'center', padding: '16px', fontSize: '18px' }}>
          My Dashboard
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="3">Dietitians</Menu.Item>
          <Menu.Item key="4">Trainers</Menu.Item>
          <Menu.Item key="5">Logout</Menu.Item>
        </Menu>
      </Sider>
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

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>My Dashboard ©2024 Created with Ant Design</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

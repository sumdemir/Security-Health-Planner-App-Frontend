import React, { useState, useEffect } from 'react';
import { Avatar, Card, Descriptions, Button, Modal, Input, Form, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../api/auth';

const Profile = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    // LocalStorage'dan kullanıcı bilgilerini al
    const userFirstName = localStorage.getItem('userFirstName') || 'Firstname';
    const userLastName = localStorage.getItem('userLastName') || 'Lastname';
    const userEmail = localStorage.getItem('userEmail') || 'UserEmail';
    setUser({
      firstname: userFirstName,
      lastname: userLastName,
      email: userEmail,
    });
  }, []);

  // Şifre güncelleme işlemi
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      api.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await updatePassword(user.email, newPassword);  // Email burada direkt kullanıcıdan alınıyor
      if (response === "Password has been successfully updated.") {
        api.success("Your password has been successfully updated. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        api.error("Password update failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err.message);
      api.error("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Şifre değiştirme modalını aç
  const showPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };

  // Modalı kapat
  const handleCancel = () => {
    setIsPasswordModalVisible(false);
  };

  return (
    <Card
      style={{
        maxWidth: 700,
        margin: '20px auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
      }}
      title="Profile"
      actions={[
        <Button type="primary" onClick={showPasswordModal}>
          Change Password
        </Button>,
      ]}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Avatar
          size={100}
          icon={<UserOutlined />}
          style={{
            marginBottom: 20,
          }}
        />
        <Descriptions bordered column={1} style={{ textAlign: 'center' }}>
          <Descriptions.Item label="Name">
            {user.firstname} {user.lastname}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        </Descriptions>
      </div>

      {/* Şifre değiştirme modalı */}
      <Modal
        title="Update Password"
        visible={isPasswordModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {contextHolder}

        <Form onSubmit={handleUpdatePassword}>
          <Form.Item label="New Password">
            <Input.Password
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </Form.Item>
          <Form.Item label="Confirm Password">
            <Input.Password
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Item>
          <Button
            type="primary"
            onClick={handleUpdatePassword}
            loading={loading}
            style={{ width: '100%' }}
          >
            Update Password
          </Button>
        </Form>
      </Modal>
    </Card>
  );
};

export default Profile;

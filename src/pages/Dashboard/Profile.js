import React, { useState, useEffect } from 'react';
import { Avatar, Card, Descriptions, Button, Modal, Input, Form, message, Layout } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../../api/auth';

const { Footer } = Layout;

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
  const [avatar, setAvatar] = useState(null);
  const [api, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  useEffect(() => {
    const userFirstName = localStorage.getItem('userFirstName') || 'Firstname';
    const userLastName = localStorage.getItem('userLastName') || 'Lastname';
    const userEmail = localStorage.getItem('userEmail') || 'UserEmail';
    const userAvatar = localStorage.getItem('userAvatar');

    setUser({
      firstname: userFirstName,
      lastname: userLastName,
      email: userEmail,
    });

    if (userAvatar) {
      setAvatar(userAvatar);
    }
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      api.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await updatePassword(user.email, newPassword);
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

  const showPasswordModal = () => {
    setIsPasswordModalVisible(true);
  };

  const handleCancel = () => {
    setIsPasswordModalVisible(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarUrl = reader.result;
        setAvatar(avatarUrl);
        localStorage.setItem('userAvatar', avatarUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ paddingBottom: '50px', backgroundColor: '#ffffff' }}>
      <Card
        style={{
          minHeight: '80vh',
          maxWidth: 700,
          margin: '20px auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
        title="PROFILE"
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
            src={avatar || null}
            icon={!avatar && <UserOutlined />}
            style={{
              marginBottom: 20,
            }}
          />
          <Button
            type="default"
            onClick={() => document.getElementById('fileInput').click()}
            style={{
              marginBottom: 20,
            }}
          >
            Upload Photo
          </Button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
          <Descriptions
            bordered
            column={1}
            style={{
              backgroundColor: '#ffffff',
              textAlign: 'center',
              width: '100%',
            }}
          >
            <Descriptions.Item label="Name">
              {user.firstname} {user.lastname}
            </Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          </Descriptions>
        </div>

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

      <Footer style={{ textAlign: 'center', backgroundColor: '#ffffff' }}>
        My Dashboard ©2024 Created with Ant Design
      </Footer>
    </div>
  );
};

export default Profile;

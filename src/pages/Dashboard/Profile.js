import React from 'react';
import { Avatar, Card, Descriptions, Button } from 'antd';

const Profile = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+123456789',
    bio: 'Experienced dietitian specializing in sports nutrition and weight management.',
    specialization: 'Sports Nutrition, Weight Management',
    profilePicture: 'https://via.placeholder.com/150',
  };

  return (
    <Card
      style={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}
      title="Profile"
      actions={[
        <Button type="primary">Edit Profile</Button>,
        <Button danger>Delete Account</Button>,
      ]}
    >
      <Avatar size={100} src={user.profilePicture} style={{ marginBottom: 20 }} />
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
        <Descriptions.Item label="Bio">{user.bio}</Descriptions.Item>
        <Descriptions.Item label="Specialization">{user.specialization}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Profile;

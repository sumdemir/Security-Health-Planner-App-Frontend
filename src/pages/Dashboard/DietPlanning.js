import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Modal, Select, InputNumber, Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

const Dashboard = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

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

    const handleFormSubmit = (values) => {
        console.log('Form Values:', values);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div style={{ color: 'white', textAlign: 'center', padding: '16px', fontSize: '18px' }}>
                    Health Planner
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" onClick={() => navigate('/Home')}>Home</Menu.Item>
                    <Menu.Item key="2" onClick={() => navigate('/DietPlans')}>Diet Lists</Menu.Item>
                    <Menu.Item key="3" onClick={() => navigate('/Dietitians')}>Dietitians</Menu.Item>
                    <Menu.Item key="4" onClick={() => navigate('/Trainers')}>Trainers</Menu.Item>
                    <Menu.Item key="5" onClick={showLogoutConfirm}>Logout</Menu.Item>
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
                           PROFILE INFORMATION
                        </Header>

                        <Form
                            form={form}
                            onFinish={handleFormSubmit}
                            layout="vertical"
                            style={{ marginTop: 20 }}
                        >
                            <Form.Item
                                label="Age"
                                name="age"
                                rules={[{ required: true, message: 'Please enter your age!' }]}
                            >
                                <InputNumber min={1} max={120} placeholder="Enter your age" style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                label="Height (cm)"
                                name="height"
                                rules={[{ required: true, message: 'Please enter your height!' }]}
                            >
                                <InputNumber min={50} max={250} placeholder="Enter your height" style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                label="Weight (kg)"
                                name="weight"
                                rules={[{ required: true, message: 'Please enter your weight!' }]}
                            >
                                <InputNumber min={10} max={300} placeholder="Enter your weight" style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                label="Medical Conditions"
                                name="medicalConditions"
                            >
                                <Select mode="tags" placeholder="Enter medical conditions (if any)">
                                    <Option value="Diabetes">Diabetes</Option>
                                    <Option value="Hypertension">Hypertension</Option>
                                    <Option value="Hyperlipidemia">Hyperlipidemia</Option>
                                    <Option value="Obesity">Obesity</Option>
                                    <Option value="Underweight">Underweight</Option>
                                    <Option value="Metabolic Syndrome">Metabolic Syndrome</Option>
                                    <Option value="Thyroid Disorder">Thyroid Disorder</Option>
                                    <Option value="PCOS">Polycystic Ovary Syndrome (PCOS)</Option>
                                    <Option value="Insulin Resistance">Insulin Resistance</Option>
                                    <Option value="Celiac Disease">Celiac Disease</Option>
                                    <Option value="IBS">Irritable Bowel Syndrome (IBS)</Option>
                                    <Option value="Crohn's Disease">Crohn's Disease</Option>
                                    <Option value="Ulcerative Colitis">Ulcerative Colitis</Option>
                                    <Option value="Gastritis">Gastritis</Option>
                                    <Option value="GERD">Gastroesophageal Reflux Disease (GERD)</Option>
                                    <Option value="Lactose Intolerance">Lactose Intolerance</Option>
                                    <Option value="Food Allergies">Food Allergies</Option>
                                    <Option value="Gluten Allergy">Gluten Allergy</Option>
                                    <Option value="Nut Allergy">Nut Allergy</Option>
                                    <Option value="Milk Allergy">Milk Allergy</Option>
                                    <Option value="Coronary Artery Disease">Coronary Artery Disease</Option>
                                    <Option value="Heart Failure">Congestive Heart Failure</Option>
                                    <Option value="Atrial Fibrillation">Atrial Fibrillation</Option>
                                    <Option value="Peripheral Arterial Disease">Peripheral Arterial Disease</Option>
                                    <Option value="Chronic Kidney Disease">Chronic Kidney Disease</Option>
                                    <Option value="Kidney Stones">Kidney Stones</Option>
                                    <Option value="Liver Disease">Liver Disease</Option>
                                    <Option value="Hepatitis">Hepatitis</Option>
                                    <Option value="Cirrhosis">Cirrhosis</Option>
                                    <Option value="Gallbladder Disorder">Gallbladder Disorder</Option>
                                    <Option value="Epilepsy">Epilepsy</Option>
                                    <Option value="Multiple Sclerosis">Multiple Sclerosis</Option>
                                    <Option value="Migraine">Migraine</Option>
                                    <Option value="Parkinson's Disease">Parkinson's Disease</Option>
                                    <Option value="Rheumatoid Arthritis">Rheumatoid Arthritis</Option>
                                    <Option value="Lupus">Systemic Lupus Erythematosus (SLE)</Option>
                                    <Option value="Hashimoto's Thyroiditis">Hashimoto's Thyroiditis</Option>
                                    <Option value="Anemia">Anemia</Option>
                                    <Option value="Iron Deficiency Anemia">Iron Deficiency Anemia</Option>
                                    <Option value="B12 Deficiency">B12 Deficiency</Option>
                                    <Option value="Breast Cancer">Breast Cancer</Option>
                                    <Option value="Prostate Cancer">Prostate Cancer</Option>
                                    <Option value="Colorectal Cancer">Colorectal Cancer</Option>
                                    <Option value="Lung Cancer">Lung Cancer</Option>
                                    <Option value="Anxiety">Anxiety Disorders</Option>
                                    <Option value="Anorexia">Anorexia</Option>
                                    <Option value="Bulimia">Bulimia</Option>
                                    <Option value="Stress">Stress-Related Disorders</Option>
                                    <Option value="Gout">Gout</Option>
                                    <Option value="Osteoporosis">Osteoporosis</Option>
                                    <Option value="Arthritis">Arthritis</Option>
                                    <Option value="Pregnancy">Pregnancy</Option>
                                    <Option value="Postpartum">Postpartum Period</Option>
                                    <Option value="Menopause">Menopause</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Target Weight (kg)"
                                name="goal"
                                rules={[{ required: true, message: 'Please enter your target weight!' }]}
                            >
                                <InputNumber min={10} max={300} placeholder="Enter your target weight" style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item
                                label="Activity Level"
                                name="activityLevel"
                                rules={[{ required: true, message: 'Please select your activity level!' }]}
                            >
                                <Select placeholder="Select your activity level">
                                    <Option value="LOW">LOW</Option>
                                    <Option value="MEDIUM">MEDIUM</Option>
                                    <Option value="HIGH">HIGH</Option>

                                </Select>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary"
                                    htmlType="submit"
                                    style={{ width: '100%' }}
                                    onClick={() => handleFormSubmit()}
                                    >
                                    Generate Diet Plan
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>My Dashboard ©2024 Created with Ant Design</Footer>
            </Layout>

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

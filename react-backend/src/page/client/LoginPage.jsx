import { useState } from 'react';
import { 
  Typography, 
  Form, 
  Input, 
  Button, 
  Divider, 
  Card, 
  Row, 
  Col, 
  Breadcrumb,
  message,
  Tabs
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HomeOutlined, 
  UserOutlined, 
  LockOutlined, 
  MailOutlined,
  GoogleOutlined,
  FacebookOutlined
} from '@ant-design/icons';
// import { useAuth } from '../../context/AuthContext'; // Uncomment when auth context is implemented

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const LoginPage = () => {
  const navigate = useNavigate();
  // const { login, register } = useAuth(); // Uncomment when auth context is implemented
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  // Handle login form submission
  const handleLogin = async () => {
    try {
      setLoading(true);
      
      // Simulate API call for login
      // In a real app, you would call your auth service here
      // await login(values.email, values.password);
      
      // For demo purposes, we'll just show a success message and redirect
      setTimeout(() => {
        message.success('Login successful!');
        navigate('/');
        setLoading(false);
      }, 1500);
    } catch (error) {
      message.error('Login failed: ' + (error.message || 'Unknown error'));
      setLoading(false);
    }
  };
  
  // Handle registration form submission
  const handleRegister = async (values) => {
    try {
      setLoading(true);
      
      // Validate password match
      if (values.password !== values.confirmPassword) {
        message.error('Passwords do not match!');
        setLoading(false);
        return;
      }
      
      // Simulate API call for registration
      // In a real app, you would call your auth service here
      // await register(values.name, values.email, values.password);
      
      // For demo purposes, we'll just show a success message and redirect
      setTimeout(() => {
        message.success('Registration successful! Please log in.');
        navigate('/login');
        setLoading(false);
      }, 1500);
    } catch (error) {
      message.error('Registration failed: ' + (error.message || 'Unknown error'));
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <UserOutlined /> Account
        </Breadcrumb.Item>
      </Breadcrumb>

      <Row justify="center" align="middle" style={{ minHeight: '70vh' }}>
        <Col xs={22} sm={20} md={16} lg={12} xl={8}>
          <Card>
            <Tabs defaultActiveKey="login" centered>
              <TabPane tab="Login" key="login">
                <div style={{ padding: '20px 0' }}>
                  <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>
                    Welcome Back
                  </Title>
                  
                  <Form
                    form={loginForm}
                    name="login"
                    layout="vertical"
                    onFinish={handleLogin}
                    initialValues={{ remember: true }}
                  >
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[{ required: true, message: 'Please enter your password' }]}
                    >
                      <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                    </Form.Item>

                    <Form.Item>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Link to="/forgot-password">Forgot password?</Link>
                      </div>
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                        Log in
                      </Button>
                    </Form.Item>
                  </Form>

                  <Divider>or login with</Divider>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                    <Button icon={<GoogleOutlined />} size="large">
                      Google
                    </Button>
                    <Button icon={<FacebookOutlined />} size="large">
                      Facebook
                    </Button>
                  </div>
                </div>
              </TabPane>
              
              <TabPane tab="Register" key="register">
                <div style={{ padding: '20px 0' }}>
                  <Title level={3} style={{ textAlign: 'center', marginBottom: '30px' }}>
                    Create an Account
                  </Title>
                  
                  <Form
                    form={registerForm}
                    name="register"
                    layout="vertical"
                    onFinish={handleRegister}
                  >
                    <Form.Item
                      name="name"
                      label="Full Name"
                      rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                      <Input prefix={<UserOutlined />} placeholder="Full Name" size="large" />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[
                        { required: true, message: 'Please enter your password' },
                        { min: 6, message: 'Password must be at least 6 characters' }
                      ]}
                    >
                      <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                    </Form.Item>

                    <Form.Item
                      name="confirmPassword"
                      label="Confirm Password"
                      rules={[
                        { required: true, message: 'Please confirm your password' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords do not match'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" size="large" />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                        Register
                      </Button>
                    </Form.Item>
                  </Form>

                  <Paragraph style={{ textAlign: 'center', marginTop: '20px' }}>
                    By registering, you agree to our <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>.
                  </Paragraph>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
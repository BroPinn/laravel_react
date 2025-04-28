import { useState } from 'react';
import { Typography, Row, Col, Form, Input, Button, Card, Breadcrumb, message } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ContactPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      // In a real application, you would send this data to your backend API
      console.log('Contact form submitted:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('Your message has been sent. We will contact you soon!');
      form.resetFields();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      message.error('Failed to send message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <PhoneOutlined /> Contact Us
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Hero Section */}
      <div className="hero-section" style={{ 
        textAlign: 'center', 
        padding: '60px 0',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        marginBottom: '40px'
      }}>
        <Title level={1} style={{ color: 'white' }}>Contact Us</Title>
        <Paragraph style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto' }}>
          We are here to help! Reach out to us with any questions, feedback, or concerns.
        </Paragraph>
      </div>

      <Row gutter={[48, 48]}>
        {/* Contact Form */}
        <Col xs={24} md={14}>
          <Card title="Send Us a Message" bordered={false}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="name"
                    label="Your Name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input placeholder="Enter your name" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ required: true, message: 'Please enter a subject' }]}
              >
                <Input placeholder="Enter subject" />
              </Form.Item>
              
              <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea 
                  placeholder="Enter your message here" 
                  rows={6} 
                />
              </Form.Item>
              
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  size="large"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        {/* Contact Information */}
        <Col xs={24} md={10}>
          <Card title="Contact Information" bordered={false}>
            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <EnvironmentOutlined style={{ fontSize: '24px', marginRight: '15px', color: '#1890ff' }} />
                <div>
                  <Title level={5} style={{ margin: 0 }}>Our Location</Title>
                  <p>123 E-Commerce Street, Shopping District, City, 12345</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                <PhoneOutlined style={{ fontSize: '24px', marginRight: '15px', color: '#1890ff' }} />
                <div>
                  <Title level={5} style={{ margin: 0 }}>Phone Number</Title>
                  <p>+1 (234) 567-8900</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MailOutlined style={{ fontSize: '24px', marginRight: '15px', color: '#1890ff' }} />
                <div>
                  <Title level={5} style={{ margin: 0 }}>Email Address</Title>
                  <p>info@eshop.com</p>
                </div>
              </div>
            </div>
            
            <div>
              <Title level={4}>Business Hours</Title>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Monday - Friday:</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Saturday:</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Sunday:</span>
                <span>Closed</span>
              </div>
            </div>
          </Card>
          
          {/* Map */}
          <div style={{ marginTop: '24px' }}>
            <Card title="Our Location" bordered={false}>
              <div style={{ width: '100%', height: '300px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Map will be displayed here</p>
                {/* In a real application, you would integrate Google Maps or another map service here */}
              </div>
            </Card>
          </div>
        </Col>
      </Row>

      {/* FAQ Section */}
      <div style={{ marginTop: '60px', marginBottom: '40px' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>Frequently Asked Questions</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card title="How can I track my order?">
              <Paragraph>
                You can track your order by logging into your account and visiting the Order 
                History section. There, you will find tracking information for all your recent orders.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="What is your return policy?">
              <Paragraph>
                We offer a 30-day return policy for most items. Products must be returned in their original condition and packaging to be eligible for a full refund.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Do you ship internationally?">
              <Paragraph>
                Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination. You can see the shipping options during checkout.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="How can I change or cancel my order?">
              <Paragraph>
                If you need to change or cancel your order, please contact our customer service team as soon as possible. We can usually accommodate changes if the order
                 has npt been shipped yet.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactPage;
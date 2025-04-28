import { Typography, Row, Col, Card, Divider, Avatar, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const AboutPage = () => {
  // Team members data
  const teamMembers = [
    {
      name: 'John Doe',
      position: 'CEO & Founder',
      bio: 'John has over 15 years of experience in retail and e-commerce.',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      name: 'Jane Smith',
      position: 'CTO',
      bio: 'Jane leads our technology team with expertise in web development and UX design.',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      name: 'Michael Johnson',
      position: 'Marketing Director',
      bio: 'Michael specializes in digital marketing strategies and brand development.',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      name: 'Sarah Williams',
      position: 'Customer Service Manager',
      bio: 'Sarah ensures our customers receive the best possible shopping experience.',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    }
  ];

  return (
    <div className="about-page">
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <InfoCircleOutlined /> About Us
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Hero Section */}
      <div className="hero-section" style={{ 
        textAlign: 'center', 
        padding: '60px 0',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        marginBottom: '40px'
      }}>
        <Title level={1} style={{ color: 'white' }}>About Us</Title>
        <Paragraph style={{ fontSize: '18px', maxWidth: '800px', margin: '0 auto' }}>
          We are dedicated to providing the best shopping experience with quality products and exceptional service.
        </Paragraph>
      </div>

      {/* Our Story */}
      <div className="our-story" style={{ padding: '40px 0' }}>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} md={12}>
            <img 
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Our Story" 
              style={{ width: '100%', borderRadius: '8px' }} 
            />
          </Col>
          <Col xs={24} md={12}>
            <Title level={2}>Our Story</Title>
            <Paragraph style={{ fontSize: '16px', marginBottom: '20px' }}>
              Founded in 2010, E-Shop began with a simple mission: to make quality products accessible to everyone. What started as a small online store has grown into a comprehensive e-commerce platform offering thousands of products across multiple categories.
            </Paragraph>
            <Paragraph style={{ fontSize: '16px' }}>
              Over the years, we have remained committed to our core values of customer satisfaction, product quality, and innovation. We continuously strive to improve our services and expand our offerings to meet the evolving needs of our customers.
            </Paragraph>
          </Col>
        </Row>
      </div>

      <Divider />

      {/* Our Mission */}
      <div className="our-mission" style={{ padding: '40px 0' }}>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} md={{ span: 12, order: 2 }}>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Our Mission" 
              style={{ width: '100%', borderRadius: '8px' }} 
            />
          </Col>
          <Col xs={24} md={{ span: 12, order: 1 }}>
            <Title level={2}>Our Mission</Title>
            <Paragraph style={{ fontSize: '16px', marginBottom: '20px' }}>
              Our mission is to provide an exceptional shopping experience by offering high-quality products at competitive prices, backed by outstanding customer service.
            </Paragraph>
            <Paragraph style={{ fontSize: '16px' }}>
              We believe in building lasting relationships with our customers based on trust, transparency, and reliability. Every decision we make is guided by our commitment to enhancing the customer experience and exceeding expectations.
            </Paragraph>
          </Col>
        </Row>
      </div>

      <Divider />

      {/* Our Values */}
      <div className="our-values" style={{ padding: '40px 0', backgroundColor: '#f5f5f5' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>Our Values</Title>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', color: '#1890ff', marginBottom: '20px' }}>🤝</div>
                <Title level={4}>Customer First</Title>
                <Paragraph>
                  We prioritize our customer needs and strive to exceed their expectations in every interaction.
                </Paragraph>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', color: '#1890ff', marginBottom: '20px' }}>✨</div>
                <Title level={4}>Quality</Title>
                <Paragraph>
                  We are committed to offering only the highest quality products that meet our rigorous standards.
                </Paragraph>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', color: '#1890ff', marginBottom: '20px' }}>💡</div>
                <Title level={4}>Innovation</Title>
                <Paragraph>
                  We continuously seek new ways to improve our services and enhance the shopping experience.
                </Paragraph>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Our Team */}
      <div className="our-team" style={{ padding: '60px 0' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>Meet Our Team</Title>
        <Row gutter={[24, 24]}>
          {teamMembers.map((member, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <Avatar 
                    src={member.avatar} 
                    size={100} 
                    style={{ marginBottom: '20px' }} 
                  />
                  <Title level={4}>{member.name}</Title>
                  <p style={{ color: '#1890ff', marginBottom: '15px' }}>{member.position}</p>
                  <Paragraph>{member.bio}</Paragraph>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default AboutPage;
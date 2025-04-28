import { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Carousel } from 'antd';
import { Link } from 'react-router-dom';
import { ShoppingOutlined } from '@ant-design/icons';
import { fetchProducts } from '../../util/clientApi';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchProducts({ featured: true, limit: 4 });
        setFeaturedProducts(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch featured products:', err);
        setError('Failed to load featured products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);

  const carouselItems = [
    {
      title: 'New Arrivals',
      description: 'Check out our latest products with amazing deals',
      image: 'https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      link: '/shop'
    },
    {
      title: 'Summer Collection',
      description: 'Discover our summer collection with up to 30% off',
      image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      link: '/shop'
    },
    {
      title: 'Special Offers',
      description: 'Limited time offers on selected items',
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      link: '/shop'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <Carousel autoplay effect="fade">
        {carouselItems.map((item, index) => (
          <div key={index}>
            <div style={{
              height: '500px',
              color: '#fff',
              lineHeight: '160px',
              textAlign: 'center',
              background: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '0 20px'
              }}>
                <Title level={1} style={{ color: '#fff', marginBottom: '20px' }}>{item.title}</Title>
                <Paragraph style={{ color: '#fff', fontSize: '18px', marginBottom: '30px' }}>
                  {item.description}
                </Paragraph>
                <Link to={item.link}>
                  <Button type="primary" size="large" icon={<ShoppingOutlined />}>
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Featured Categories */}
      <div style={{ padding: '60px 0' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
          Shop by Category
        </Title>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Link to="/shop?category=electronics">
              <Card
                hoverable
                cover={<img alt="Electronics" src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />}
              >
                <Meta title="Electronics" description="Latest gadgets and devices" />
              </Card>
            </Link>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Link to="/shop?category=clothing">
              <Card
                hoverable
                cover={<img alt="Clothing" src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />}
              >
                <Meta title="Clothing" description="Fashion for everyone" />
              </Card>
            </Link>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Link to="/shop?category=home">
              <Card
                hoverable
                cover={<img alt="Home & Living" src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" />}
              >
                <Meta title="Home & Living" description="Make your house a home" />
              </Card>
            </Link>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Link to="/shop?category=beauty">
              <Card
                hoverable
                cover={<img alt="Beauty" src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" />}
              >
                <Meta title="Beauty" description="Look and feel your best" />
              </Card>
            </Link>
          </Col>
        </Row>
      </div>

      {/* Featured Products */}
      <div style={{ padding: '60px 0', backgroundColor: '#f5f5f5' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
          Featured Products
        </Title>
        <Row gutter={[24, 24]}>
          {loading ? (
            // Loading placeholders
            Array(4).fill().map((_, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card loading style={{ width: '100%' }} />
              </Col>
            ))
          ) : error ? (
            <Col span={24}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <p>{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            </Col>
          ) : (
            // Actual products
            featuredProducts.map(product => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <Card
                    hoverable
                    cover={
                      <img 
                        alt={product.name} 
                        src={product.image_url || 'https://via.placeholder.com/300'} 
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    }
                    actions={[
                      <Link to={`/product/${product.id}`} key="details">
                        <Button type="link">View Details</Button>
                      </Link>
                    ]}
                  >
                    <Meta 
                      title={product.name} 
                      description={
                        <div>
                          <p>{product.short_description}</p>
                          <p style={{ fontWeight: 'bold', color: '#1890ff' }}>
                            ${product.price}
                          </p>
                        </div>
                      } 
                    />
                  </Card>
                </Link>
              </Col>
            ))
          )}
        </Row>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/shop">
            <Button type="primary" size="large">
              View All Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Why Choose Us */}
      <div style={{ padding: '60px 0' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: '40px' }}>
          Why Choose Us
        </Title>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', color: '#1890ff', marginBottom: '20px' }}>
                  🚚
                </div>
                <Title level={4}>Free Shipping</Title>
                <Paragraph>Free shipping on all orders over $50</Paragraph>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', color: '#1890ff', marginBottom: '20px' }}>
                  🔄
                </div>
                <Title level={4}>Easy Returns</Title>
                <Paragraph>30-day return policy for all items</Paragraph>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', color: '#1890ff', marginBottom: '20px' }}>
                  🔒
                </div>
                <Title level={4}>Secure Payment</Title>
                <Paragraph>Your payment information is always safe</Paragraph>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Newsletter Subscription */}
      <div style={{ 
        padding: '60px 0', 
        backgroundColor: '#001529', 
        color: 'white',
        textAlign: 'center' 
      }}>
        <Title level={2} style={{ color: 'white', marginBottom: '20px' }}>
          Subscribe to Our Newsletter
        </Title>
        <Paragraph style={{ color: 'white', marginBottom: '30px' }}>
          Get the latest updates on new products and upcoming sales
        </Paragraph>
        <Row justify="center">
          <Col xs={24} sm={16} md={12} lg={8}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="email" 
                placeholder="Your email address" 
                style={{ 
                  flex: 1, 
                  padding: '10px 15px', 
                  borderRadius: '4px',
                  border: 'none'
                }} 
              />
              <Button type="primary" size="large">
                Subscribe
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
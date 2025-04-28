import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Breadcrumb, Card, Button, Typography, Image, Spin, message, Row, Col, Tabs, Divider, InputNumber, Rate } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, ShareAltOutlined, HomeOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { fetchProductById } from '../../util/clientApi';
import { config } from '../../util/config';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        if (!data.product) {
          throw new Error('Product data missing in response');
        }
        setProduct(data.product);
      } catch (error) {
        console.error('Fetch error:', error.message);
        message.error(`Failed to load product: ${error.message}`);
        navigate('/shop');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!user) {
      message.warning('Please login to add items to cart');
      navigate('/login', { state: { from: `/product/${id}` } });
      return;
    }
    if (product) {
      addToCart(product, quantity);
      message.success(`${product.name} added to cart`);
    }
  };

  const breadcrumbItems = [
    { title: <Link to='/'><HomeOutlined /> Home</Link> },
    { title: <Link to='/shop'><ShoppingOutlined /> Shop</Link> },
    { title: product ? product.name : 'Product' },
  ];

  if (loading) return <Spin size='large' style={{ display: 'block', margin: '100px auto' }} />;
  if (!product) return null;

  return (
    <div className='product-detail-page' style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Breadcrumb style={{ marginBottom: '16px' }} items={breadcrumbItems} />
      <Card>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Image
              src={product.image ? `${config.image_path}${product.image}` : config.DEFAULT_IMAGE_PLACEHOLDER}
              alt={product.name}
              style={{ maxWidth: '100%', borderRadius: '8px' }}
              preview
            />
          </Col>
          <Col xs={24} md={12}>
            <Title level={2}>{product.name}</Title>
            <Text strong style={{ fontSize: '24px', color: '#f5222d' }}>
              ${product.price?.toFixed(2)}
            </Text>
            <Rate allowHalf defaultValue={4.5} disabled style={{ margin: '8px 0' }} />
            <div style={{ margin: '16px 0' }}>
              <Text>{product.description || 'No description available.'}</Text>
            </div>
            <InputNumber
              min={1}
              value={quantity}
              onChange={(value) => setQuantity(value)}
              style={{ marginRight: '16px' }}
            />
            <Button
              type='primary'
              icon={<ShoppingCartOutlined />}
              size='large'
              onClick={handleAddToCart}
              style={{ marginRight: '16px' }}
            >
              Add to Cart
            </Button>
            <Button icon={<HeartOutlined />}>Add to Wishlist</Button>
            <Button icon={<ShareAltOutlined />} style={{ marginLeft: '8px' }}>
              Share
            </Button>
          </Col>
        </Row>
        <Divider />
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Description' key='1'>
            <Text>{product.description || 'No additional description available.'}</Text>
          </TabPane>
          <TabPane tab='Reviews' key='2'>
            <Text>No reviews yet.</Text>
          </TabPane>
          <TabPane tab='Specifications' key='3'>
            <Text>{product.specifications || 'No specifications provided.'}</Text>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProductDetail;
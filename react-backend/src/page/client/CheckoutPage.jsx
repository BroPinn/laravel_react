import { useState, useEffect } from 'react';
import { 
  Typography, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form, 
  Input, 
  Select, 
  Divider, 
  Steps, 
  Radio, 
  Table, 
  InputNumber,
  Breadcrumb,
  message
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { 
  HomeOutlined, 
  ShoppingCartOutlined, 
  CreditCardOutlined,
  UserOutlined,
  ShoppingOutlined,
  CheckOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { useCart } from '../../context/CartContext';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Step } = Steps;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  
  // Calculate cart totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping for orders over $100
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  // Check if cart is empty and redirect to shop if it is
  useEffect(() => {
    if (cart.length === 0 && currentStep === 0) {
      message.info('Your cart is empty. Please add some products first.');
      navigate('/shop');
    }
  }, [cart, navigate, currentStep]);

  // Handle quantity change
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) quantity = 1;
    updateQuantity(id, quantity);
  };

  // Handle remove item
  const handleRemoveItem = (id) => {
    removeFromCart(id);
    message.success('Item removed from cart');
  };

  // Handle next step
  const handleNextStep = () => {
    if (currentStep === 0) {
      // Proceed to shipping info
      setCurrentStep(1);
    } else if (currentStep === 1) {
      // Validate shipping form before proceeding
      form.validateFields()
        .then(() => {
          setCurrentStep(2);
        })
        .catch(error => {
          console.error('Validation failed:', error);
        });
    } else if (currentStep === 2) {
      // Process payment and place order
      setLoading(true);
      
      // Simulate API call to process order
      setTimeout(() => {
        setLoading(false);
        setCurrentStep(3);
        clearCart(); // Clear the cart after successful order
      }, 2000);
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(prevStep => Math.max(0, prevStep - 1));
  };

  // Cart table columns
  const cartColumns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={record.image_url || 'https://via.placeholder.com/80'} 
            alt={text} 
            style={{ width: '80px', height: '80px', marginRight: '15px', objectFit: 'cover' }} 
          />
          <div>
            <Link to={`/product/${record.id}`}>{text}</Link>
            {record.attributes && (
              <div style={{ fontSize: '12px', color: '#888' }}>
                {Object.entries(record.attributes).map(([key, value]) => (
                  <div key={key}>{key}: {value}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: price => `$${price.toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <InputNumber 
          min={1} 
          value={quantity} 
          onChange={(value) => handleQuantityChange(record.id, value)} 
        />
      ),
    },
    {
      title: 'Total',
      key: 'total',
      render: record => `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: record => (
        <Button 
          type="text" 
          danger 
          icon={<DeleteOutlined />} 
          onClick={() => handleRemoveItem(record.id)}
        />
      ),
    },
  ];

  // Render cart review step
  const renderCartReview = () => (
    <div className="cart-review">
      <Title level={4}>Review Your Cart</Title>
      
      <Table 
        columns={cartColumns} 
        dataSource={cart.map(item => ({ ...item, key: item.id }))} 
        pagination={false} 
        rowKey="id"
      />
      
      <div className="cart-summary" style={{ marginTop: '30px' }}>
        <Row justify="end">
          <Col xs={24} sm={12} md={8}>
            <Card>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Text>Subtotal:</Text>
                <Text>${subtotal.toFixed(2)}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Text>Shipping:</Text>
                <Text>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Text>Tax (10%):</Text>
                <Text>${tax.toFixed(2)}</Text>
              </div>
              <Divider style={{ margin: '10px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text strong>Total:</Text>
                <Text strong>${total.toFixed(2)}</Text>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );

  // Render shipping information step
  const renderShippingInfo = () => (
    <div className="shipping-info">
      <Title level={4}>Shipping Information</Title>
      
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          country: 'United States',
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input placeholder="Enter your first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input placeholder="Enter your last name" />
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder="Enter your email address" />
        </Form.Item>
        
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter your phone number' }]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>
        
        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: 'Please enter your address' }]}
        >
          <Input placeholder="Enter your street address" />
        </Form.Item>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: 'Please enter your city' }]}
            >
              <Input placeholder="Enter your city" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="state"
              label="State/Province"
              rules={[{ required: true, message: 'Please enter your state/province' }]}
            >
              <Input placeholder="Enter your state/province" />
            </Form.Item>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="zipCode"
              label="ZIP/Postal Code"
              rules={[{ required: true, message: 'Please enter your ZIP/postal code' }]}
            >
              <Input placeholder="Enter your ZIP/postal code" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="country"
              label="Country"
              rules={[{ required: true, message: 'Please select your country' }]}
            >
              <Select placeholder="Select your country">
                <Option value="United States">United States</Option>
                <Option value="Canada">Canada</Option>
                <Option value="United Kingdom">United Kingdom</Option>
                <Option value="Australia">Australia</Option>
                <Option value="Germany">Germany</Option>
                <Option value="France">France</Option>
                <Option value="Japan">Japan</Option>
                <Option value="China">China</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        
        <Form.Item
          name="notes"
          label="Order Notes (Optional)"
        >
          <Input.TextArea 
            placeholder="Notes about your order, e.g. special notes for delivery" 
            rows={4} 
          />
        </Form.Item>
      </Form>
    </div>
  );

  // Render payment method step
  const renderPaymentMethod = () => (
    <div className="payment-method">
      <Title level={4}>Payment Method</Title>
      
      <Radio.Group 
        value={paymentMethod} 
        onChange={(e) => setPaymentMethod(e.target.value)}
        style={{ width: '100%' }}
      >
        <Card style={{ marginBottom: '16px', width: '100%' }}>
          <Radio value="credit_card">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CreditCardOutlined style={{ fontSize: '24px', marginRight: '10px' }} />
              <div>
                <div>Credit/Debit Card</div>
                <div style={{ fontSize: '12px', color: '#888' }}>Pay with Visa, Mastercard, or other major credit cards</div>
              </div>
            </div>
          </Radio>
        </Card>
        
        <Card style={{ marginBottom: '16px', width: '100%' }}>
          <Radio value="paypal">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                alt="PayPal" 
                style={{ height: '24px', marginRight: '10px' }} 
              />
              <div>
                <div>PayPal</div>
                <div style={{ fontSize: '12px', color: '#888' }}>Pay with your PayPal account</div>
              </div>
            </div>
          </Radio>
        </Card>
        
        <Card style={{ width: '100%' }}>
          <Radio value="cash_on_delivery">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ShoppingOutlined style={{ fontSize: '24px', marginRight: '10px' }} />
              <div>
                <div>Cash on Delivery</div>
                <div style={{ fontSize: '12px', color: '#888' }}>Pay when you receive your order</div>
              </div>
            </div>
          </Radio>
        </Card>
      </Radio.Group>
      
      {paymentMethod === 'credit_card' && (
        <div style={{ marginTop: '20px' }}>
          <Form layout="vertical">
            <Form.Item
              label="Card Number"
              name="cardNumber"
              rules={[{ required: true, message: 'Please enter your card number' }]}
            >
              <Input placeholder="1234 5678 9012 3456" />
            </Form.Item>
            
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Expiry Date"
                  name="expiryDate"
                  rules={[{ required: true, message: 'Please enter expiry date' }]}
                >
                  <Input placeholder="MM/YY" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="CVV"
                  name="cvv"
                  rules={[{ required: true, message: 'Please enter CVV' }]}
                >
                  <Input placeholder="123" />
                </Form.Item>
              </Col>
            </Row>
            
            <Form.Item
              label="Name on Card"
              name="nameOnCard"
              rules={[{ required: true, message: 'Please enter name on card' }]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>
          </Form>
        </div>
      )}
      
      <div className="order-summary" style={{ marginTop: '30px' }}>
        <Card title="Order Summary">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Text>Subtotal:</Text>
            <Text>${subtotal.toFixed(2)}</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Text>Shipping:</Text>
            <Text>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Text>Tax (10%):</Text>
            <Text>${tax.toFixed(2)}</Text>
          </div>
          <Divider style={{ margin: '10px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text strong>Total:</Text>
            <Text strong>${total.toFixed(2)}</Text>
          </div>
        </Card>
      </div>
    </div>
  );

  // Render order confirmation step
  const renderOrderConfirmation = () => (
    <div className="order-confirmation" style={{ textAlign: 'center', padding: '40px 0' }}>
      <div style={{ 
        fontSize: '72px', 
        color: '#52c41a', 
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <CheckOutlined />
      </div>
      
      <Title level={2}>Thank You for Your Order!</Title>
      <Paragraph style={{ fontSize: '16px', marginBottom: '30px' }}>
        Your order has been placed successfully. We have sent a confirmation email to your email address.
      </Paragraph>
      
      <div style={{ marginBottom: '30px' }}>
        <Title level={4}>Order Number: #{Math.floor(Math.random() * 1000000)}</Title>
        <Paragraph>Please keep this order number for your reference.</Paragraph>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <Button type="primary" size="large" onClick={() => navigate('/shop')}>
          Continue Shopping
        </Button>
        <Button size="large" onClick={() => navigate('/account/orders')}>
          View My Orders
        </Button>
      </div>
    </div>
  );

  return (
    <div className="checkout-page">
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/shop">
            <ShoppingOutlined /> Shop
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <ShoppingCartOutlined /> Checkout
        </Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2}>Checkout</Title>

      {/* Checkout Steps */}
      <Steps current={currentStep} style={{ marginBottom: '40px' }}>
        <Step title="Cart" icon={<ShoppingCartOutlined />} />
        <Step title="Shipping" icon={<UserOutlined />} />
        <Step title="Payment" icon={<CreditCardOutlined />} />
        <Step title="Confirmation" icon={<CheckOutlined />} />
      </Steps>

      {/* Step Content */}
      <div className="step-content">
        {currentStep === 0 && renderCartReview()}
        {currentStep === 1 && renderShippingInfo()}
        {currentStep === 2 && renderPaymentMethod()}
        {currentStep === 3 && renderOrderConfirmation()}
      </div>

      {/* Navigation Buttons */}
      {currentStep < 3 && (
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            onClick={handlePrevStep} 
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button 
            type="primary" 
            onClick={handleNextStep}
            loading={loading}
          >
            {currentStep === 2 ? 'Place Order' : 'Continue'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
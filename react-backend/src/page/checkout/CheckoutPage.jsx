import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Steps, Divider, List, Avatar, Typography, Card, Radio, message, Result } from 'antd';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { config } from '../../util/config';
import { request } from '../../util/api';

const { Title, Text } = Typography;
const { Step } = Steps;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      message.warning('Please login to proceed with checkout');
      navigate('/login');
    }
  }, [user, navigate]);

  // Redirect to shop if cart is empty
  React.useEffect(() => {
    if (cart.length === 0 && !orderComplete) {
      message.info('Your cart is empty');
      navigate('/shop');
    }
  }, [cart, navigate, orderComplete]);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would send the order to the backend
      // For now, we'll simulate a successful order
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a random order ID
      const newOrderId = Math.floor(100000 + Math.random() * 900000);
      setOrderId(newOrderId);
      
      // Clear the cart after successful order
      clearCart();
      setOrderComplete(true);
      setCurrentStep(3); // Move to confirmation step
    } catch (error) {
      message.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: 'Review Items',
      content: (
        <div>
          <Title level={4}>Review Your Order</Title>
          <List
            itemLayout="horizontal"
            dataSource={cart}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar shape="square" size={64} src={item.image ? `${config.image_path}${item.image}` : config.DEFAULT_IMAGE_PLACEHOLDER} />}
                  title={item.name}
                  description={`Quantity: ${item.quantity}`}
                />
                <div>
                  <Text>${(item.price * item.quantity).toFixed(2)}</Text>
                </div>
              </List.Item>
            )}
          />
          <Divider />
          <div style={{ textAlign: 'right' }}>
            <Text strong>Total: ${getCartTotal().toFixed(2)}</Text>
          </div>
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <Button type="primary" onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: 'Shipping',
      content: (
        <div>
          <Title level={4}>Shipping Information</Title>
          <Form layout="vertical" initialValues={{ 
            name: user?.name || '',
            address: user?.profile?.address || '',
            phone: user?.profile?.phone || ''
          }}>
            <Form.Item
              name="name"
              label="Full Name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Shipping Address"
              rules={[{ required: true, message: 'Please enter your address' }]}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input />
            </Form.Item>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={handlePrev}>Previous</Button>
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            </div>
          </Form>
        </div>
      ),
    },
    {
      title: 'Payment',
      content: (
        <div>
          <Title level={4}>Payment Method</Title>
          <Card>
            <Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod}>
              <Radio value="credit_card">Credit Card</Radio>
              <Radio value="paypal">PayPal</Radio>
              <Radio value="cash_on_delivery">Cash on Delivery</Radio>
            </Radio.Group>

            {paymentMethod === 'credit_card' && (
              <div style={{ marginTop: '20px' }}>
                <Form layout="vertical">
                  <Form.Item
                    name="card_number"
                    label="Card Number"
                    rules={[{ required: true, message: 'Please enter your card number' }]}
                  >
                    <Input placeholder="1234 5678 9012 3456" />
                  </Form.Item>
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <Form.Item
                      name="expiry"
                      label="Expiry Date"
                      rules={[{ required: true, message: 'Please enter expiry date' }]}
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="MM/YY" />
                    </Form.Item>
                    <Form.Item
                      name="cvv"
                      label="CVV"
                      rules={[{ required: true, message: 'Please enter CVV' }]}
                      style={{ flex: 1 }}
                    >
                      <Input placeholder="123" />
                    </Form.Item>
                  </div>
                </Form>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div style={{ marginTop: '20px' }}>
                <p>You will be redirected to PayPal to complete your payment.</p>
              </div>
            )}

            {paymentMethod === 'cash_on_delivery' && (
              <div style={{ marginTop: '20px' }}>
                <p>You will pay when your order is delivered.</p>
              </div>
            )}
          </Card>

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handlePrev}>Previous</Button>
            <Button 
              type="primary" 
              onClick={handlePlaceOrder} 
              loading={loading}
            >
              Place Order
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: 'Confirmation',
      content: (
        <Result
          status="success"
          title="Order Placed Successfully!"
          subTitle={`Order number: ${orderId}. We'll send you a confirmation email with order details.`}
          extra={[
            <Button type="primary" key="shop" onClick={() => navigate('/shop')}>
              Continue Shopping
            </Button>,
            <Button key="home" onClick={() => navigate('/')}>
              Back to Home
            </Button>,
          ]}
        />
      ),
    },
  ];

  return (
    <div className="checkout-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Title level={2}>Checkout</Title>
      <Steps current={currentStep} style={{ marginBottom: '30px' }}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">
        {steps[currentStep].content}
      </div>
    </div>
  );
};

export default CheckoutPage;
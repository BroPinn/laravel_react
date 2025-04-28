import 'react';
import { Button, List, Avatar, InputNumber, Empty, Typography, Divider, message } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { config } from '../../util/config';

const { Title, Text } = Typography;

// eslint-disable-next-line react/prop-types
const ShoppingCart = ({ visible, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (id, value) => {
    updateQuantity(id, value); // Updates item quantity in the cart
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id); // Removes item from the cart
    message.success('Item removed from cart'); // User feedback
  };

  const handleCheckout = () => {
    if (!user) { // Check if user is authenticated
      message.warning('Please login to checkout');
      navigate('/login');
      return;
    }
    message.info('Proceeding to checkout...'); // Placeholder for checkout logic
    // navigate('/checkout'); // Future navigation to checkout page
  };

  if (!visible) return null; // Don't render if not visible

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-auto p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <Title level={4}>
            <ShoppingCartOutlined /> Shopping Cart
          </Title>
          <Button type="text" onClick={onClose}>×</Button>
        </div>
        
        <Divider />
        
        {cart.length === 0 ? (
          <Empty 
            description="Your cart is empty" 
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
            className="my-8"
          />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={cart}
            renderItem={(item) => (
              <List.Item
                actions={[
                  // eslint-disable-next-line react/jsx-key
                  <Button 
                    type="text"
                    icon={<DeleteOutlined />} 
                    onClick={() => handleRemoveItem(item.id)}
                  />
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      shape="square" 
                      size={64} 
                      src={item.image ? `${config.image_path}${item.image}` : config.DEFAULT_IMAGE_PLACEHOLDER} 
                    />
                  }
                  title={item.name}
                  description={
                    <div>
                      <Text type="secondary">${item.price}</Text>
                      <div className="mt-2">
                        <InputNumber 
                          min={1} 
                          value={item.quantity} 
                          onChange={(value) => handleQuantityChange(item.id, value)}
                          size="small"
                        />
                      </div>
                    </div>
                  }
                />
                <div className="text-right">
                  <Text strong>${(item.price * item.quantity).toFixed(2)}</Text>
                </div>
              </List.Item>
            )}
          />
        )}
        
        <div className="mt-auto">
          {cart.length > 0 && (
            <>
              <Divider />
              <div className="flex justify-between mb-4">
                <Text strong>Total:</Text>
                <Text strong>${getCartTotal().toFixed(2)}</Text>
              </div>
              <div className="flex gap-2">
                <Button danger onClick={clearCart}>Clear Cart</Button>
                <Button type="primary" block onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
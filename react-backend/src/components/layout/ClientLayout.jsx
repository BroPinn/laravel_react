import { useState } from 'react';
import { Layout, Menu, Button, Drawer, Badge } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeOutlined, 
  ShoppingOutlined, 
  InfoCircleOutlined, 
  PhoneOutlined, 
  ReadOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { useCart } from '../../context/CartContext';
import Logo from '../../assets/logo/logo.jpg';

const { Header, Content, Footer } = Layout;

const ClientLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const menuItems = [
    { key: '/', label: 'Home', icon: <HomeOutlined /> },
    { key: '/shop', label: 'Shop', icon: <ShoppingOutlined /> },
    { key: '/about', label: 'About', icon: <InfoCircleOutlined /> },
    { key: '/contact', label: 'Contact', icon: <PhoneOutlined /> },
    { key: '/blog', label: 'Blog', icon: <ReadOutlined /> },
  ];

  const handleMenuClick = (e) => {
    navigate(e.key);
    setMobileMenuOpen(false);
  };

  return (
    <Layout className="client-layout">
      <Header style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 1, 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        {/* Logo */}
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1890ff' }}>E-Shop</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-menu" style={{ display: { xs: 'none', md: 'block' } }}>
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            onClick={handleMenuClick}
            items={menuItems}
            style={{ border: 'none', minWidth: '500px' }}
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-menu-button" style={{ display: { md: 'none' } }}>
          <Button 
            type="text" 
            icon={<MenuOutlined />} 
            onClick={() => setMobileMenuOpen(true)}
          />
        </div>

        {/* User and Cart Icons */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/login">
            <Button type="text" icon={<UserOutlined />} />
          </Link>
          <Link to="/checkout">
            <Badge count={cartItemCount} showZero>
              <Button type="text" icon={<ShoppingCartOutlined />} />
            </Badge>
          </Link>
        </div>

        {/* Mobile Menu Drawer */}
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setMobileMenuOpen(false)}
          open={mobileMenuOpen}
          width={250}
        >
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            onClick={handleMenuClick}
            items={menuItems}
            style={{ border: 'none' }}
          />
          <div style={{ marginTop: '20px', padding: '0 10px' }}>
            <Button type="primary" block onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>
              Login / Register
            </Button>
          </div>
        </Drawer>
      </Header>

      <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 64px - 70px)' }}>
        <div className="site-layout-content" style={{ margin: '16px 0' }}>
          <Outlet />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', backgroundColor: '#001529', color: 'white', padding: '24px 50px' }}>
        <div className="footer-content">
          <div className="footer-section">
            <h3>E-Shop</h3>
            <p>Your one-stop shop for all your needs</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@eshop.com</p>
            <p>Phone: +1 234 567 8900</p>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          E-Shop ©{new Date().getFullYear()} Created with Ant Design
        </div>
      </Footer>
    </Layout>
  );
};

export default ClientLayout;
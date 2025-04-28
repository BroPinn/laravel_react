import { useState, useEffect } from 'react';
import { 
  Typography, 
  Row, 
  Col, 
  Card, 
  Button, 
  Input, 
  Select, 
  Pagination, 
  Breadcrumb, 
  Empty, 
  Spin, 
  Slider,
  Checkbox,
  Divider,
  Space,
  message
} from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, ShoppingOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { fetchProducts, fetchCategories, fetchBrands } from '../../util/clientApi';
import { useCart } from '../../context/CartContext';

const { Title } = Typography;
const { Meta } = Card;
const { Option } = Select;

const ShopPage = () => {
  // State for products and pagination
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0
  });

  // State for filters
  const [filters, setFilters] = useState({
    search: '',
    category: undefined,
    brand: undefined,
    minPrice: 0,
    maxPrice: 1000,
    inStock: false,
    sortBy: 'newest'
  });

  // State for filter options
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
  
  const { addToCart } = useCart();

  // Fetch products based on current filters and pagination
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        
        // Prepare query parameters
        const params = {
          page: pagination.current,
          limit: pagination.pageSize,
          ...filters.search && { search: filters.search },
          ...filters.category && { category: filters.category },
          ...filters.brand && { brand: filters.brand },
          ...filters.minPrice > 0 && { min_price: filters.minPrice },
          ...filters.maxPrice < 1000 && { max_price: filters.maxPrice },
          ...filters.inStock && { in_stock: true },
          sort_by: filters.sortBy
        };
        
        const response = await fetchProducts(params);
        
        setProducts(response.data || []);
        setPagination(prev => ({
          ...prev,
          total: response.meta?.total || 0
        }));
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [pagination.current, pagination.pageSize, filters]);

  // Fetch categories and brands for filter options
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [categoriesResponse, brandsResponse] = await Promise.all([
          fetchCategories(),
          fetchBrands()
        ]);
        
        setCategories(categoriesResponse.data || []);
        setBrands(brandsResponse.data || []);
      } catch (err) {
        console.error('Failed to fetch filter options:', err);
        message.error('Failed to load filter options');
      }
    };

    loadFilterOptions();
  }, []);

  // Handle pagination change
  const handlePageChange = (page, pageSize) => {
    setPagination(prev => ({
      ...prev,
      current: page,
      pageSize: pageSize
    }));
    
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Reset to first page when filters change
    setPagination(prev => ({
      ...prev,
      current: 1
    }));
  };

  // Handle price range change
  const handlePriceChange = (value) => {
    setFilters(prev => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1]
    }));
  };

  // Handle add to cart
  const handleAddToCart = (product) => {
    addToCart(product);
    message.success(`${product.name} added to cart`);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: undefined,
      brand: undefined,
      minPrice: 0,
      maxPrice: 1000,
      inStock: false,
      sortBy: 'newest'
    });
  };

  // Render filter sidebar
  const renderFilters = () => (
    <div className="shop-filters">
      <Title level={4}>Filters</Title>
      
      <div className="filter-section">
        <Title level={5}>Search</Title>
        <Input 
          placeholder="Search products" 
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          prefix={<SearchOutlined />}
          allowClear
        />
      </div>
      
      <Divider />
      
      <div className="filter-section">
        <Title level={5}>Categories</Title>
        <Select
          placeholder="Select category"
          style={{ width: '100%' }}
          value={filters.category}
          onChange={(value) => handleFilterChange('category', value)}
          allowClear
        >
          {categories.map(category => (
            <Option key={category.id} value={category.id}>{category.name}</Option>
          ))}
        </Select>
      </div>
      
      <Divider />
      
      <div className="filter-section">
        <Title level={5}>Brands</Title>
        <Select
          placeholder="Select brand"
          style={{ width: '100%' }}
          value={filters.brand}
          onChange={(value) => handleFilterChange('brand', value)}
          allowClear
        >
          {brands.map(brand => (
            <Option key={brand.id} value={brand.id}>{brand.name}</Option>
          ))}
        </Select>
      </div>
      
      <Divider />
      
      <div className="filter-section">
        <Title level={5}>Price Range</Title>
        <Slider 
          range 
          min={0} 
          max={1000} 
          value={[filters.minPrice, filters.maxPrice]}
          onChange={handlePriceChange}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>${filters.minPrice}</span>
          <span>${filters.maxPrice}</span>
        </div>
      </div>
      
      <Divider />
      
      <div className="filter-section">
        <Checkbox 
          checked={filters.inStock}
          onChange={(e) => handleFilterChange('inStock', e.target.checked)}
        >
          In Stock Only
        </Checkbox>
      </div>
      
      <Divider />
      
      <div className="filter-section">
        <Title level={5}>Sort By</Title>
        <Select
          style={{ width: '100%' }}
          value={filters.sortBy}
          onChange={(value) => handleFilterChange('sortBy', value)}
        >
          <Option value="newest">Newest</Option>
          <Option value="price_low">Price: Low to High</Option>
          <Option value="price_high">Price: High to Low</Option>
          <Option value="popularity">Popularity</Option>
        </Select>
      </div>
      
      <Divider />
      
      <Button type="primary" block onClick={handleResetFilters}>
        Reset Filters
      </Button>
    </div>
  );

  return (
    <div className="shop-page">
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <ShoppingOutlined /> Shop
        </Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2}>Shop</Title>
      
      {/* Mobile Filter Button */}
      <div className="mobile-filter-button" style={{ display: { xs: 'block', md: 'none' }, marginBottom: '20px' }}>
        <Button 
          type="primary" 
          icon={<FilterOutlined />}
          onClick={() => setMobileFiltersVisible(!mobileFiltersVisible)}
        >
          Filters
        </Button>
      </div>

      <Row gutter={[24, 24]}>
        {/* Filters - Desktop */}
        <Col xs={0} sm={0} md={6} lg={5} xl={4}>
          {renderFilters()}
        </Col>

        {/* Filters - Mobile (Collapsible) */}
        <Col xs={24} sm={24} md={0} style={{ display: mobileFiltersVisible ? 'block' : 'none' }}>
          {renderFilters()}
        </Col>
        
        {/* Products */}
        <Col xs={24} sm={24} md={18} lg={19} xl={20}>
          {/* Product Count and Sort (Desktop) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              {!loading && <span>{pagination.total} products found</span>}
            </div>
            <div style={{ display: { xs: 'none', sm: 'block' } }}>
              <Space>
                <span>Sort by:</span>
                <Select
                  style={{ width: '180px' }}
                  value={filters.sortBy}
                  onChange={(value) => handleFilterChange('sortBy', value)}
                >
                  <Option value="newest">Newest</Option>
                  <Option value="price_low">Price: Low to High</Option>
                  <Option value="price_high">Price: High to Low</Option>
                  <Option value="popularity">Popularity</Option>
                </Select>
              </Space>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
              <Spin size="large" />
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '50px 0' }}>
              <Empty description={error} />
              <Button onClick={() => window.location.reload()} style={{ marginTop: '20px' }}>
                Try Again
              </Button>
            </div>
          ) : products.length === 0 ? (
            <Empty description="No products found matching your criteria" />
          ) : (
            <Row gutter={[16, 24]}>
              {products.map(product => (
                <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                  <Card
                    hoverable
                    cover={
                      <Link to={`/product/${product.id}`}>
                        <img 
                          alt={product.name} 
                          src={product.image_url || 'https://via.placeholder.com/300'} 
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                      </Link>
                    }
                    actions={[
                      <Button 
                        type="link" 
                        key="add-to-cart"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>,
                      <Link to={`/product/${product.id}`} key="details">
                        <Button type="link">Details</Button>
                      </Link>
                    ]}
                  >
                    <Link to={`/product/${product.id}`}>
                      <Meta 
                        title={product.name} 
                        description={
                          <div>
                            <p>{product.short_description}</p>
                            <p style={{ fontWeight: 'bold', color: '#1890ff' }}>
                              ${product.price}
                            </p>
                            {product.stock_quantity <= 0 && (
                              <p style={{ color: 'red' }}>Out of Stock</p>
                            )}
                          </div>
                        } 
                      />
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {/* Pagination */}
          {!loading && products.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={handlePageChange}
                showSizeChanger
                showQuickJumper
                pageSizeOptions={['12', '24', '36', '48']}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ShopPage;
import { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Avatar, Tag, Pagination, Breadcrumb, Input, Select, Spin, Empty } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import { HomeOutlined, ReadOutlined, CalendarOutlined, UserOutlined, TagOutlined, SearchOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Search } = Input;
const { Meta } = Card;

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [pagination, setPagination] = useState({
    current: parseInt(searchParams.get('page') || '1', 10),
    pageSize: 6,
    total: 0
  });
  
  // Mock categories for filtering
  const categories = [
    { id: 1, name: 'Fashion' },
    { id: 2, name: 'Technology' },
    { id: 3, name: 'Lifestyle' },
    { id: 4, name: 'Home & Decor' },
    { id: 5, name: 'Health & Beauty' }
  ];

  // Mock blog posts data
  // In a real application, this would come from an API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockPosts = [
          {
            id: 1,
            title: 'Top 10 Summer Fashion Trends',
            excerpt: 'Discover the hottest fashion trends for this summer season that will keep you stylish and comfortable.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
            image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            author: 'Jane Smith',
            date: '2023-06-15',
            category: 'Fashion',
            tags: ['summer', 'fashion', 'trends']
          },
          {
            id: 2,
            title: 'The Latest Tech Gadgets You Need',
            excerpt: 'Check out these innovative tech gadgets that are revolutionizing the way we live and work.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            author: 'John Doe',
            date: '2023-06-10',
            category: 'Technology',
            tags: ['tech', 'gadgets', 'innovation']
          },
          {
            id: 3,
            title: 'Home Decor Ideas for Small Spaces',
            excerpt: 'Transform your small living space with these creative and practical home decor ideas.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80',
            author: 'Emily Johnson',
            date: '2023-06-05',
            category: 'Home & Decor',
            tags: ['home decor', 'small spaces', 'interior design']
          },
          {
            id: 4,
            title: 'Essential Skincare Routine for All Skin Types',
            excerpt: 'Learn about the essential skincare steps that work for all skin types and help maintain healthy skin.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
            image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            author: 'Sarah Lee',
            date: '2023-05-28',
            category: 'Health & Beauty',
            tags: ['skincare', 'beauty', 'health']
          },
          {
            id: 5,
            title: 'Sustainable Living: Small Changes with Big Impact',
            excerpt: 'Discover simple ways to live more sustainably and reduce your environmental footprint.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2013&q=80',
            author: 'Michael Green',
            date: '2023-05-20',
            category: 'Lifestyle',
            tags: ['sustainability', 'eco-friendly', 'lifestyle']
          },
          {
            id: 6,
            title: 'The Rise of Smart Home Technology',
            excerpt: 'Explore how smart home technology is transforming our daily lives and making homes more efficient.',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
            image: 'https://images.unsplash.com/photo-1558002038-1055e2e28cd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            author: 'David Chen',
            date: '2023-05-15',
            category: 'Technology',
            tags: ['smart home', 'technology', 'automation']
          }
        ];
        
        // Filter posts based on search parameters
        const category = searchParams.get('category');
        const search = searchParams.get('search');
        
        let filteredPosts = [...mockPosts];
        
        if (category) {
          filteredPosts = filteredPosts.filter(post => post.category === category);
        }
        
        if (search) {
          const searchLower = search.toLowerCase();
          filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(searchLower) || 
            post.excerpt.toLowerCase().includes(searchLower) ||
            post.content.toLowerCase().includes(searchLower)
          );
        }
        
        // Update pagination
        setPagination(prev => ({
          ...prev,
          total: filteredPosts.length
        }));
        
        // Paginate results
        const startIndex = (pagination.current - 1) * pagination.pageSize;
        const endIndex = startIndex + pagination.pageSize;
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
        
        setBlogPosts(paginatedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogPosts();
  }, [searchParams, pagination.current, pagination.pageSize]);

  // Handle page change
  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, current: page }));
    setSearchParams(prev => {
      prev.set('page', page.toString());
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle category filter
  const handleCategoryChange = (value) => {
    setSearchParams(prev => {
      if (value) {
        prev.set('category', value);
      } else {
        prev.delete('category');
      }
      prev.delete('page'); // Reset to first page
      return prev;
    });
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchParams(prev => {
      if (value) {
        prev.set('search', value);
      } else {
        prev.delete('search');
      }
      prev.delete('page'); // Reset to first page
      return prev;
    });
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  return (
    <div className="blog-page">
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <ReadOutlined /> Blog
        </Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2}>Our Blog</Title>
      <Paragraph style={{ marginBottom: '30px' }}>
        Stay updated with the latest trends, tips, and insights in our industry.
      </Paragraph>

      {/* Filters */}
      <div style={{ marginBottom: '30px' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Search 
              placeholder="Search articles" 
              allowClear 
              enterButton={<SearchOutlined />}
              onSearch={handleSearch}
              defaultValue={searchParams.get('search') || ''}
            />
          </Col>
          <Col xs={24} md={8}>
            <Select
              placeholder="Filter by category"
              style={{ width: '100%' }}
              allowClear
              onChange={handleCategoryChange}
              defaultValue={searchParams.get('category') || undefined}
            >
              {categories.map(category => (
                <Option key={category.id} value={category.name}>{category.name}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>

      {/* Blog Posts */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
        </div>
      ) : blogPosts.length === 0 ? (
        <Empty description="No blog posts found matching your criteria" />
      ) : (
        <Row gutter={[24, 32]}>
          {blogPosts.map(post => (
            <Col xs={24} sm={12} lg={8} key={post.id}>
              <Card
                hoverable
                cover={
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img 
                      alt={post.title} 
                      src={post.image} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                }
              >
                <div style={{ marginBottom: '10px' }}>
                  <Tag color="blue">{post.category}</Tag>
                </div>
                <Meta 
                  title={<Link to={`/blog/${post.id}`}>{post.title}</Link>} 
                  description={post.excerpt}
                />
                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} />
                    <Text>{post.author}</Text>
                  </div>
                  <div>
                    <CalendarOutlined style={{ marginRight: '5px' }} />
                    <Text>{post.date}</Text>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination */}
      {!loading && blogPosts.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}

      {/* Featured Posts */}
      <div style={{ marginTop: '60px' }}>
        <Title level={3}>Popular Topics</Title>
        <div style={{ marginTop: '20px' }}>
          <Row gutter={[16, 16]}>
            {categories.map(category => (
              <Col key={category.id}>
                <Link to={`/blog?category=${encodeURIComponent(category.name)}`}>
                  <Tag 
                    color="blue" 
                    style={{ padding: '5px 10px', fontSize: '14px' }}
                    onClick={() => handleCategoryChange(category.name)}
                  >
                    <TagOutlined /> {category.name}
                  </Tag>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
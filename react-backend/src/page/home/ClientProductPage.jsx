import { useState } from "react";
import { Typography, Breadcrumb, Row, Col, Select, Input, Button, Divider } from "antd";
import { HomeOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ProductList from "../components/product/ProductList";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

function ClientProductPage() {
  const [filters, setFilters] = useState({
    category: undefined,
    brand: undefined,
    search: "",
  });

  const handleCategoryChange = (value) => {
    setFilters({ ...filters, category: value });
  };

  const handleBrandChange = (value) => {
    setFilters({ ...filters, brand: value });
  };

  const handleSearch = (value) => {
    setFilters({ ...filters, search: value });
  };

  const handleClearFilters = () => {
    setFilters({
      category: undefined,
      brand: undefined,
      search: "",
    });
  };

  return (
    <div className="client-product-page">
      {/* Breadcrumb Navigation */}
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <ShoppingOutlined /> Products
        </Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2}>Shop Our Products</Title>
      
      {/* Filters Section */}
      <div className="filters-section" style={{ marginBottom: "24px" }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={24} md={6} lg={6}>
            <Search 
              placeholder="Search products" 
              onSearch={handleSearch} 
              style={{ width: "100%" }} 
            />
          </Col>
          <Col xs={24} sm={12} md={6} lg={6}>
            <Select
              placeholder="Filter by Category"
              style={{ width: "100%" }}
              onChange={handleCategoryChange}
              value={filters.category}
              allowClear
            >
              <Option value="1">Electronics</Option>
              <Option value="2">Clothing</Option>
              <Option value="3">Home & Kitchen</Option>
              {/* Add more categories as needed */}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6}>
            <Select
              placeholder="Filter by Brand"
              style={{ width: "100%" }}
              onChange={handleBrandChange}
              value={filters.brand}
              allowClear
            >
              <Option value="1">Apple</Option>
              <Option value="2">Samsung</Option>
              <Option value="3">Nike</Option>
              {/* Add more brands as needed */}
            </Select>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6} style={{ textAlign: "right" }}>
            <Button onClick={handleClearFilters}>Clear Filters</Button>
          </Col>
        </Row>
      </div>

      <Divider />

      {/* Product List Component */}
      <ProductList />
    </div>
  );
}

export default ClientProductPage;
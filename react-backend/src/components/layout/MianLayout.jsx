import { useState, useEffect } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import MainLayoutHeaderTop from "./MainLayoutHeaderTop";

const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "", null),
  getItem("Customer", "customers", null),
  getItem("Employee", "employees", null),
  getItem("Product", "product", null, [
    getItem("Product", "products", null),
    getItem("Category", "categories", null),
    getItem("Brand", "brands", null),
  ]),
  getItem("Purchase", "purchase", null, [
    getItem("Purchase", "purchase"),
    getItem("Supplier", "supplier"),
  ]),
  getItem("Expense", "expense", null, [
    getItem("Expense", "expense"),
    getItem("Expense Type", "expense_type"),
  ]),
  getItem("Report", "report", null, [
    getItem("Expense Summary", "expense_summary"),
    getItem("Order Summary", "order_summary"),
    getItem("Report Employee", "report_employee"),
    getItem("Sale By Customer", "sale_by_customer"),
    getItem("Top Sale", "top_sale"),
  ]),
];
const MainLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // check user login : Protected Route
  const user_id = localStorage.getItem("id");
  useEffect(() => {
    if (!user_id) {
      navigate("/login");
    }
  }, [navigate, user_id]);

  // if user not login return null
  if (!user_id) {
    return null;
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={(event) => {
            navigate(event.key);
          }}
        />
      </Sider>
      <Layout>
        <MainLayoutHeaderTop />
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        /> */}
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayout;

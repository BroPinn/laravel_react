import { Button, Checkbox, Form, Input, Flex, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { request } from "../../util/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    let data = { 
      email: values.email, 
      password: values.password 
    };
    
    const res = await request("auth/login", "post", data);
    if(res && res.user){
      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("id", res.user.id);
      localStorage.setItem("name", res.user.name);
      localStorage.setItem("email", res.user.email);
      
      if(res.user.profile){
        localStorage.setItem("phone", res.user.profile.phone);
        localStorage.setItem("address", res.user.profile.address);
        localStorage.setItem("image", res.user.profile.image);
        localStorage.setItem("type", res.user.profile.type);
        
        // Redirect based on user type
        if(res.user.profile.type === 'admin') {
          navigate("/");
          message.success("Welcome Admin!");
        } else {
          navigate("/products");
          message.success("Login successful!");
        }
      }
    } else {
      message.error(res.message || "Login failed");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center bg-gray-100 min-h-screen">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <h1 className="font-bold text-4xl mb-4">Login</h1>
          <Form
            name="login"
            size="large"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="">Forgot password</a>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              or <a href="/register">Register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Login;

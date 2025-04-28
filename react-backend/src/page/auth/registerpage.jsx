import { Button, Checkbox, Form, Input, Flex, message, Upload } from "antd";
import { UserOutlined, LockOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [imageFile, setImageFile] = useState(null);
  
  const onFinish = async (values) => {
    try {
      if (!imageFile) {
        message.error("Please upload a profile image");
        return;
      }
      
      // Create form data for file upload
      const formData = new FormData();
      formData.append("name", values.fullname);
      formData.append("email", values.username);
      formData.append("password", values.password);
      formData.append("phone", values.phone || "");
      formData.append("address", values.address || "");
      formData.append("image", imageFile);
      formData.append("type", "customer"); // Default type for new registrations
      
      const result = await register(formData);
      if (result) {
        message.success("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      message.error(err.message || "Registration failed. Please try again.");
    }
  };
  
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e && e.fileList) {
      setImageFile(e.file);
      return e.fileList;
    }
    return e;
  };
  return (
    <div>
      <div className="flex items-center justify-center bg-gray-100 min-h-screen">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <h1 className="font-bold text-4xl mb-4">Sigu Up</h1>
          <Form
            name="register"
            size="large"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Please input your full name!",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Full Name" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                  type: "email"
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                {
                  required: false,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input placeholder="Phone Number" />
            </Form.Item>

            <Form.Item
              name="address"
              rules={[
                {
                  required: false,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input.TextArea placeholder="Address" rows={2} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
                {
                  min: 6,
                  message: "Password must be at least 6 characters!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirm-password"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>
            
            <Form.Item
              name="image"
              label="Profile Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "Please upload a profile image!",
                },
              ]}
            >
              <Upload
                name="image"
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Upload Profile Image</Button>
              </Upload>
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
                Sign Up
              </Button>
              or <a href="/login">Login now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;

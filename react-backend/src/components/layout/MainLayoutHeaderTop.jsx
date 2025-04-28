import { Input } from "antd";
import { config } from "../../util/config";
import Logo from "../../assets/logo/logo.jpg";
import { IoNotifications } from "react-icons/io5";
import { Dropdown } from "antd";

const items = [
  {
    key: "profile",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Profile
      </a>
    ),
  },
  {
    key: "change-password",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Change Password
      </a>
    ),
    // disabled: true,
  },
  {
    key: "forget-password",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        Forget Password
      </a>
    ),
    // disabled: true,
  },
  {
    key: "logout",
    danger: true,
    label: "Logout",
  },
];

function MainLayoutHeaderTop() {
  const user_profile = localStorage.getItem("image");
  const user_name = localStorage.getItem("name");
  const user_email = localStorage.getItem("email");
  return (
    <div className="h-[60px] flex items-center justify-between px-4 py-2 bg-white">
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="" className="w-[40px] h-[40px]" />
        <div>
          <h1 className="text-md font-bold">TA.V Store</h1>
          <div>Online Shop</div>
        </div>
        <div>
          <Input.Search placeholder="Search" />
        </div>
      </div>
      <div className="flex items-center  space-x-4">
        <IoNotifications className="text-2xl" />
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              if (key === "logout") {
                localStorage.clear();
                window.location.href = "/login";
              }
            },
          }}
        >
          <a
            onClick={(e) => e.preventDefault()}
            className="flex items-center space-x-2"
          >
            <div>
              <h1 className="text-md font-semibold">{user_name}</h1>
              <div className="text-sm">{user_email}</div>
            </div>
            <img
              src={config.image_path + user_profile}
              alt=""
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
          </a>
        </Dropdown>
      </div>
    </div>
  );
}
export default MainLayoutHeaderTop;

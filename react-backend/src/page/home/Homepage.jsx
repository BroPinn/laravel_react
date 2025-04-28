// import React from "react";
// import { Button } from "antd";
// import { Select, QRCode, Input, Space } from "antd";
function Homepage() {
  // const [text, setText] = React.useState("https://ant.design/");
  const image_path =
    "http://localhost:86/course/myProject/laravel-backend/public/storage/";

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");
  const image = localStorage.getItem("image");

  return (
    <div>
      <h1 style={{ color: "red", paddingLeft: 20, marginBottom: 20 }}>
        Homepage
      </h1>
      <div>
        <div>Name: {name}</div>
        <div>Email: {email}</div>
        <div>Phone: {phone}</div>
        <div>image : {image_path + image}</div>
        <img
          src={image_path + image}
          alt="profile"
          style={{ width: 100, height: 100 }}
        />
      </div>
    </div>
  );
}

export default Homepage;

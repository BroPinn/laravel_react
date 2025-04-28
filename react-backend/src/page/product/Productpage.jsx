import { useEffect, useState } from "react";
import { request } from "../../util/api";
import {
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  // Space,
  Tag,
  Upload,
} from "antd";
import { Button, Table } from "antd";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { config } from "../../util/config";

function ProductPage() {
  const [state, setState] = useState({
    list: [],
    category: [],
    brand: [],
    total: 0,
    loading: false,
    visible: false,
  });

  const [fileList, setFileList] = useState([]);

  const [validate, setValidate] = useState({});

  const [formRef] = Form.useForm();
  const [formSearch] = Form.useForm();

  useEffect(() => {
    getList();
  }, []);

  const getList = async (query_param = "") => {
    // ?category_id=2&brand_id=1&status=1
    setState((pre) => ({
      ...pre,
      loading: true,
    }));
    const res = await request("products?page=1" + query_param, "get");
    if (!res.errors) {
      setState((pre) => ({
        ...pre,
        loading: false,
        list: res.list,
        categories: res.categories,
        brands: res.brands,
        total: res.total,
      }));
    } else {
      message.error(res.message);
      setState((pre) => ({
        ...pre,
        loading: false,
      }));
    }
  };

  const handleBtnNew = () => {
    formRef.setFieldValue("status", 1);
    setState((pre) => ({
      ...pre,
      visible: true,
    }));
  };
  const handleCloseModal = () => {
    formRef.resetFields();
    setState((pre) => ({
      ...pre,
      visible: false,
    }));
    setFileList([]);
    setValidate({});
  };
  const handleBntDelete = async (data) => {
    try {
      const res = await request(`products/${data.id}`, "DELETE");
      if (!res.errors) {
        message.success("Deleted successfully!");
        getList();
      } else {
        message.error(res.message);
      }
    } catch {
      message.error("An error occurred while deleting.");
    }
  };

  const handleEditBtn = (data) => {
    if (data.image) {
      setFileList([
        {
          uid: data.id,
          image: data.image,
          state: "done",
          url: config.image_path + data.image,
        },
      ]);
    }

    formRef.setFieldsValue({
      ...data,
      id: data.id, // using formRef.getFieldValue("id")
    });
    setState((pre) => ({
      ...pre,
      visible: true,
    }));
  };

  const onFinish = async (items) => {
    setState((pre) => ({
      ...pre,
      loading: true,
    }));

    let formData = new FormData();
    formData.append("product_name", items.product_name);
    formData.append("description", items.description);
    formData.append("quantity", items.quantity);
    formData.append("price", items.price);
    formData.append("status", items.status);
    formData.append("categories_id", items.categories_id);
    formData.append("brands_id", items.brands_id);

    if (items.image && items.image.file) {
      if (items.image.file.originFileObj) {
        formData.append("image", items.image.file.originFileObj);
      } else if (items.image.file?.status == "removed") {
        formData.append("remove_image", items.image.file?.name); // edit then remove iamge and submit
      }
    }

    let url = "products",
      method = "post";
    if (formRef.getFieldValue("id")) {
      url = "products/" + formRef.getFieldValue("id");
      formData.append("_method", "put");
      // method = "put";
    }
    const res = await request(url, method, formData);
    console.log(res);
    if (!res.errors) {
      getList();
      setState((pre) => ({
        ...pre,
        loading: false,
        visible: false,
      }));
      message.success(res.message);
    } else {
      message.error(res.message);
      setState((pre) => ({
        ...pre,
        loading: false,
      }));
      setValidate(res.errors);
      // handle validate
    }
  };

  const handleClearFilter = () => {
    formSearch.resetFields();
    getList("");
  };

  const handleFilter = (item) => {
    let query_param = "";
    if (item && Object.keys(item).length > 0) {
      Object.keys(item).map((key) => {
        //body loop
        if (item[key] && item[key] != "") {
          query_param += "&" + key + "=" + item[key];
        }
      });
    }
    getList(query_param);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <Form form={formSearch} onFinish={handleFilter}>
          <div className="flex items-center gap-3">
            <span className="text-md font-bold mb-6">Product</span>
            <Form.Item name={"text_search"}>
              <Input.Search placeholder="Search" className="w-[150px]" />
            </Form.Item>

            <Form.Item className="w-[150px]" name={"categories_id"}>
              <Select
                placeholder="Select Category"
                allowClear
                options={state.categories?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            </Form.Item>

            <Form.Item className="w-[150px]" name={"brands_id"}>
              <Select
                placeholder="Select Brand"
                allowClear
                options={state.brands?.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))}
              />
            </Form.Item>

            <Form.Item className="w-[150px]" name={"status"}>
              <Select
                placeholder="Select Status"
                allowClear
                options={[
                  {
                    label: "Active",
                    value: 1,
                  },
                  {
                    label: "InActive",
                    value: 0,
                  },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Button onClick={handleClearFilter}>Clear</Button>
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" type="primary">
                Filter
              </Button>
            </Form.Item>
          </div>
        </Form>

        <div>
          <Button
            onClick={handleBtnNew}
            type="primary"
            className="flex items-center mb-6"
          >
            New{" "}
          </Button>
        </div>
      </div>
      <Table
        dataSource={state.list}
        columns={[
          {
            title: "Name",
            key: "Name",
            dataIndex: "product_name",
          },
          {
            title: "Description",
            key: "Description",
            dataIndex: "description",
          },
          {
            title: "Category",
            key: "Category",
            dataIndex: "categories",
            render: (categories) => categories.name,
          },
          {
            title: "Brand",
            key: "Brand",
            dataIndex: "brands",
            render: (brands) => brands.name,
          },
          {
            title: "Quantity",
            key: "quantity",
            dataIndex: "quantity",
          },
          {
            title: "Price",
            key: "price",
            dataIndex: "price",
          },
          {
            title: "Image",
            key: "image",
            dataIndex: "image",
            render: (value) =>
              value ? (
                <Image
                  width={100}
                  height={80}
                  src={config.image_path + value}
                  alt="value"
                  className="border-2 border-slate-100 rounded-2xl"
                />
              ) : (
                <div className="w-[60px] h-[60px] bg-slate-200" />
              ),
          },
          {
            title: "Status",
            key: "Status",
            dataIndex: "status",

            render: (value) =>
              value ? (
                <Tag color="green">Actived</Tag>
              ) : (
                <Tag color="red">InActived</Tag>
              ),
          },
          {
            key: "Action",
            title: "Action",
            align: "center",
            render: (value, data) => (
              <div className="flex gap-x-2">
                <Button danger onClick={() => handleBntDelete(data)}>
                  <MdDelete />
                </Button>
                <Button onClick={() => handleEditBtn(data)}>
                  <MdEdit />
                </Button>
              </div>
            ),
          },
        ]}
      />
      <Modal
        open={state.visible}
        title={formRef.getFieldValue("id") ? "Update" : "New"}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={formRef} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Product Name"
            name={"product_name"}
            rules={[
              {
                required: true,
                message: "Product Name required!",
              },
            ]}
            {...validate.product_name}
          >
            <Input placeholder="Product Name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name={"description"}
            {...validate.description}
          >
            <Input.TextArea placeholder="description" />
          </Form.Item>

          <Form.Item
            label="Category"
            name={"categories_id"}
            rules={[
              {
                required: true,
                message: "Category required!",
              },
            ]}
            {...validate.categories_id}
          >
            <Select
              placeholder="Select category"
              options={state.categories?.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Brand"
            name={"brands_id"}
            rules={[
              {
                required: true,
                message: "Brand required!",
              },
            ]}
            {...validate.brands_id}
          >
            <Select
              placeholder="Select Brand"
              options={state.brands?.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Quantity"
            name={"quantity"}
            rules={[
              {
                required: true,
                message: "Quantity required!",
              },
            ]}
            {...validate.quantity}
          >
            <InputNumber placeholder="Quantity" className="w-full" />
          </Form.Item>

          <Form.Item
            label="Price"
            name={"price"}
            rules={[
              {
                required: true,
                message: "Price required!",
              },
            ]}
            {...validate.price}
          >
            <InputNumber placeholder="Price" className="w-full" />
          </Form.Item>

          <Form.Item label="Image" name={"image"} {...validate.image}>
            <Upload
              listType="picture-card"
              maxCount={1}
              customRequest={(e) => {
                e.onSuccess();
              }}
              fileList={fileList}
              onChange={(e) => {
                setFileList(e.fileList);
              }}
            >
              +
            </Upload>
          </Form.Item>
          <Form.Item label="Status" name={"status"} {...validate.status}>
            <Select
              placeholder="Status"
              options={[
                {
                  label: "Active",
                  value: 1,
                },
                {
                  label: "Inactive",
                  value: 0,
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end gap-x-2">
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button htmlType="submit" type="primary">
                {formRef.getFieldValue("id") ? "Update" : "Save"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductPage;

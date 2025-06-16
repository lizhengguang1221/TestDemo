import React from "react";
import {
  Button,
  Modal,
  Popconfirm,
  Space,
  Table,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

import type { TableProps } from "antd";

interface DataType {
  key: any;
  name: string;
  age: number;
  sex: string;
  des: string;
}

const App: React.FC = () => {
  const [data, setData] = React.useState([
    {
      key: 1,
      name: "用户1",
      age: 32,
      sex: "male",
      des: "2345",
    },
    {
      key: 2,
      name: "用户2",
      age: 42,
      sex: "remale",
      des: "3435434",
    },
    {
      key: 3,
      name: "用户3",
      age: 32,
      sex: "male",
      des: "2345",
    },
  ]);
  const [type, setType] = React.useState("add");
  const [currentId, setCurrentId] = React.useState(null);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: "sex",
      render(value) {
        return value === "male" ? "男" : "女";
      },
    },
    {
      title: "简介",
      key: "des",
      dataIndex: "des",
      render(value) {
        return value || "暂无简介";
      },
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              handleEdit(record);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => handleDel(record.key)}
            okText="确定"
            cancelText="取消"
          >
            <Button danger>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [form] = Form.useForm();
  const variant = Form.useWatch("variant", form);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (type === "add") {
        const theObj = {
          key: new Date().getTime(),
          name: values.name,
          age: values.age,
          sex: values.sex,
          des: values.des,
        };
        setData([...data, theObj]);
      } else {
        data.forEach((item) => {
          if (item.key === currentId) {
            item.name = values.name;
            item.age = values.age;
            item.sex = values.sex;
            item.des = values.des;
          }
        });

        setData(data);
      }

      setIsModalOpen(false);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleEdit = (record: any) => {
    showModal();
    setType("edit");
    setCurrentId(record.key);
    form.setFieldsValue({
      name: record.name,
      age: record.age,
      sex: record.sex,
      des: record.des,
    });
  };
  const handleDel = (id: string) => {
    setData(data.filter((item) => item.key !== id));
  };
  const handleAdd = () => {
    showModal();
    form.resetFields();
    setType("add");
  };
  return (
    <div>
      <Table<DataType>
        title={() => {
          return (
            <div
              style={{
                color: "gray",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>用户列表</div>
              <Button type="primary" onClick={handleAdd}>
                新增
              </Button>
            </div>
          );
        }}
        columns={columns}
        dataSource={data}
      />
      <Modal
        title={type === "add" ? "新增" : "编辑"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        okText="确定"
        cancelText="取消"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...formItemLayout}
          form={form}
          variant={variant || "filled"}
          style={{ maxWidth: 600 }}
          initialValues={{ variant: "filled" }}
        >
          <Form.Item
            label="姓名"
            name="name"
            required
            rules={[{ required: true, message: "请输入姓名!" }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            label="年龄"
            name="age"
            rules={[{ required: true, message: "请输入年龄!" }]}
          >
            <InputNumber
              placeholder="请输入年龄"
              style={{ width: "100%" }}
              min={0}
            />
          </Form.Item>

          <Form.Item
            label="性别"
            name="sex"
            rules={[{ required: true, message: "请输入性别!" }]}
          >
            <Select
              placeholder="请选择性别"
              options={[
                { label: "男", value: "male" },
                { label: "女", value: "remale" },
              ]}
            />
          </Form.Item>
          <Form.Item label="简介" name="des">
            <Input.TextArea placeholder="请输入简介" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;

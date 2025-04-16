import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Image, Select, Card } from "antd";
import { useAdminStore } from "../store/useAdminStore";
const { Option } = Select;

const AdminDashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const [currentStatus, setCurrentStatus] = useState("")
    
    const { users, updateStatus, getAllUsers } = useAdminStore();
  
    const handleShow = (record) => {
      setModalContent(record);
      setIsModalOpen(true);
    };
  
    const handleStatusChange = (id, accountStatus) => {
      setCurrentStatus(accountStatus);
      updateStatus({id,accountStatus});
    };
    
    useEffect(() => {
      getAllUsers()
    }, [getAllUsers,currentStatus]);
  
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Profession",
        dataIndex: "prof",
        key: "prof",
      },
      {
        title: "Age",
        dataIndex: "age",
        key: "age",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
      },
      {
        title: "Account Status",
        dataIndex: "accountStatus",
        key: "accountStatus",
        render: (status, record) => (
          <Select
            value={status}
            onChange={(value) => handleStatusChange(record._id, value)}
            style={{ width: 120 }}
          >
            <Option value="pending">Pending</Option>
            <Option value="active">Active</Option>
            <Option value="suspended">Suspended</Option>
          </Select>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => (
          (record.image || record.idcard) && (
            <Button type="primary" onClick={() => handleShow(record)}>
              Show
            </Button>
          )
        ),
      },
    ];
  
    return (
      <div className="p-6">
        <Card title="Admin User Dashboard" bordered={false} className="shadow-xl rounded-2xl">
          <Table
            columns={columns}
            dataSource={users}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
  
          <Modal
            title="User Documents"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            {modalContent.image && (
              <div className="mb-4">
                <h4>Profile Image:</h4>
                <Image width={200} src={modalContent.image} alt="Profile" />
              </div>
            )}
            {modalContent.idcard && (
              <div>
                <h4>ID Card:</h4>
                <Image width={200} src={`http://localhost:5000/uploads/${modalContent.idcard}`} alt="ID Card" />
              </div>
            )}
          </Modal>
        </Card>
      </div>
    );
  };
  
  export default AdminDashboard;
  
  
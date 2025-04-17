import {  Space } from "antd";
import { LockOutlined } from "@ant-design/icons";

const ChatBlockedNotice = ({ youBlockedThem,  }) => {
  return (
    <div
      style={{
        borderTop: "1px solid #f0f0f0",
        padding: "20px",
        background: "#fff",
        textAlign: "center",
      }}
    >
      <Space direction="vertical" size="middle">
        <LockOutlined style={{ fontSize: 28, color: "#ff4d4f" }} />
        <div style={{ fontWeight: 500, color: "#ff4d4f" }}>
          {youBlockedThem
            ? "You have blocked this user."
            : "You cannot message this user."}
        </div>
        <div style={{ color: "#888" }}>
          {youBlockedThem
            ? "Unblock to continue chatting."
            : "This user has blocked you."}
        </div>
      </Space>
    </div>
  );
};

export default ChatBlockedNotice;

import { Button, message, Popconfirm } from 'antd';
import { axiosInstance } from "../lib/axios";
import { useState } from 'react';

const BlockButton = ({ currentUser, user, setIsBlockedUser , currentBlockStatus }) => {
    const [isBlocked, setIsBlocked] = useState(
        currentUser.blockedUsers.includes(user._id)
    );
  
    const handleUnblock = async () => {
      try {
        await axiosInstance.put(`/users/${user._id}/unblock`);
        message.success('User unblocked!');
        setIsBlocked(false);
        setIsBlockedUser(false);
      } catch (err) {
        message.error('Failed to unblock user.');
      }
    };
  
    const handleBlock = async () => {
      try {
        await axiosInstance.put(`/users/${user._id}/block`);
        message.success('User blocked!');
        setIsBlocked(true);
        setIsBlockedUser(true);
      } catch (err) {
        message.error('Failed to block user.');
      }
    };
  
    return isBlocked ? (
      <Popconfirm
        title="Unblock this user?"
        onConfirm={handleUnblock}
        okText="Yes"
        cancelText="No"
      >
        <Button danger type="primary">Unblock</Button>
      </Popconfirm>
    ) : (
      <Popconfirm
        title="Block this user?"
        onConfirm={handleBlock}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary" 
        className='w-2/12 text-lg'
        disabled={currentBlockStatus === true && isBlocked === false}
>
  Block
</Button>
      </Popconfirm>
    );
  };
  
  export default BlockButton;
  
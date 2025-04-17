import { Button, Typography, Space } from 'antd';
import Lottie from 'lottie-react';
import notFoundAnim from '../../public/lotties/notFound.json';

const { Title, Text } = Typography;

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f9f9f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <div style={{ width: 300 }}>
        <Lottie animationData={notFoundAnim} loop={true} />
      </div>

      <Space direction="vertical" size="small">
        <Title level={2} style={{ color: '#333' }}>
          Oops! Page Not Found
        </Title>
        <Text type="secondary">
          The page you’re looking for doesn’t exist or has been moved.
        </Text>
        <Button
          className='text-white bg-pink-500'
          size="large"
          style={{ marginTop: 16 }}
          onClick={() => (window.location.href = '/')}
        >
          Go Back Home
        </Button>
      </Space>
    </div>
  );
};

export default NotFound;

import React from "react";
import { Card, Typography } from "antd";
import Lottie from "lottie-react";
import verificationAnimation from "../../public/lotties/verify.json";

const { Title, Text } = Typography;

const VerificationNotice = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-pink-100 to-white">
      <Card className="w-full max-w-xl p-6 text-center bg-white shadow-2xl rounded-2xl">
        <div className="flex justify-center mb-6">
          <Lottie animationData={verificationAnimation} style={{ height: 250 }} />
        </div>
        <Title level={3} className="text-pink-600">
          Your Account is Under Verification
        </Title>
        <Text type="secondary" className="block mt-3 text-lg">
          Thank you for registering! Our team is currently reviewing your details.
          You will be notified once your account is verified and activated.
        </Text>
        <div className="mt-8">
          <Text className="text-sm text-gray-400">
            Need help? Contact us at <a href="sparkr@2025@gmail.com" className="text-pink-500">support@sparkr.com</a>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default VerificationNotice;

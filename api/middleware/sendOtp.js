// utils/sendOtp.js
import nodemailer from 'nodemailer';

export const sendOtpEmail = async (email, name, otp) => {
	const htmlContent = `
  <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #e5e7eb; border-radius: 8px;">
    <h2 style="color: #ec4899;">Verify Your Email</h2>
    <p style="color: #374151;">Hi <strong>${name || 'there'}</strong>,</p>
    <p>Your One-Time Password (OTP) for verifying your email is:</p>
    <div style="font-size: 24px; font-weight: bold; color: #111827; background: #f3f4f6; padding: 12px 20px; text-align: center; letter-spacing: 4px; border-radius: 6px; margin: 20px 0;">
      ${otp}
    </div>
    <p>This code is valid for the next <strong>5 minutes</strong>.</p>
    <p style="color: #6b7280;">If you did not request this, please ignore this email.</p>
    <p style="margin-top: 30px;">Thanks,<br><strong>Team Sparkr App</strong></p>
  </div>
`;
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: 'Your OTP Code for Verification',
		html:htmlContent
		// text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
		
	};

	await transporter.sendMail(mailOptions);
};

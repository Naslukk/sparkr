import User from "../models/User.js";
import jwt from "jsonwebtoken";
import path from "path"
import { saveImage } from "../middleware/saveImage.js";
import { sendOtpEmail } from "../middleware/sendOtp.js";

const otpStore = new Map();
const signToken = (id) => {
	// jwt token
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};



export const signup = async (req, res) => {
	const { name, email, password, prof, gender, age, genderPreference , image } = req.body;

	try {
		if (!name || !email || !password || !prof || !age || !gender || !genderPreference || !image) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		if (age < 18) {
			return res.status(400).json({
				success: false,
				message: "You must at lest 18 years old",
			});
		}

		if (password.length < 6) {
			return res.status(400).json({
				success: false,
				message: "Password must be at least 6 characters",
			});
		}
		
		const users = await User.find({ email });
		if (users.length > 0) {
			return res.status(400).json({
				success: false,
				message: "The email is already registered",
			});
		}

		const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
		const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins

		
		otpStore.set(email, {
			name,
			otp,
			expiresAt
		});

		await sendOtpEmail(email , name, otp);

		return res.status(200).json({
			success: true,
			message: 'OTP sent to email. Please verify to complete registration.',
		});
	} catch (error) {
		console.log("Error in signup controller:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};


export const verifyotp = async (req, res) => {
	const { name, email, password, prof, age, gender, genderPreference, image, otp } = req.body;
	let filePath;
	const stored = otpStore.get(email);

	if (!stored || stored.otp !== otp || Date.now() > stored.expiresAt) {
		return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
	}
	try {
		if(image){
			const fileName = email+"idcard.jpg"
			filePath = await saveImage(image, fileName);
			filePath = path.basename(filePath)
		}

		const newUser = await User.create({
			name,
			email,
			password,
			prof,
			age,
			gender,
			genderPreference,
			idcard:filePath,
		});

		const token = signToken(newUser._id);

		res.cookie("jwt", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
			httpOnly: true, // prevents XSS attacks
			sameSite: "strict", // prevents CSRF attacks
			secure: process.env.NODE_ENV === "production",
		});

		res.status(201).json({
			success: true,
			user: newUser,
		});
	} catch (error) {
		console.log("Error in signup controller:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};
export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		const user = await User.findOne({ email }).select("+password");

		if (!user || !(await user.matchPassword(password))) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		const token = signToken(user._id);

		res.cookie("jwt", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
			httpOnly: true, // prevents XSS attacks
			sameSite: "strict", // prevents CSRF attacks
			secure: process.env.NODE_ENV === "production",
		});

		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		console.log("Error in login controller:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};
export const logout = async (req, res) => {
	res.clearCookie("jwt");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

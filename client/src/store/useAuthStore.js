import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { disconnectSocket, initializeSocket } from "../socket/socket.client";

export const useAuthStore = create((set) => ({
	authUser: null,
	checkingAuth: true,
	loading: false,
	error:false,

	signup: async (signupData) => {
		try {
			set({ loading: true });
			set({ error: false });
			const res = await axiosInstance.post("/auth/signup", signupData);

			toast.success(res.data.message);
		} catch (error) {
			set({ error: true });
			toast.error(error.response.data.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},
	verifyotp: async (signupData) => {
		try {
			set({ loading: true });
			const res = await axiosInstance.post("/auth/verifyotp", signupData);
			set({ authUser: res.data.user });
			initializeSocket(res.data.user._id);

			toast.success("Signed in successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},
	login: async (loginData) => {
		try {
			set({ loading: true });
			const res = await axiosInstance.post("/auth/login", loginData);
			set({ authUser: res.data.user });
			initializeSocket(res.data.user._id);
			toast.success("Logged in successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		} finally {
			set({ loading: false });
		}
	},
	logout: async () => {
		try {
			const res = await axiosInstance.post("/auth/logout");
			disconnectSocket();
			if (res.status === 200) set({ authUser: null });
		} catch (error) {
			toast.error(error.response.data.message || "Something went wrong");
		}
	},
	checkAuth: async () => {
		try {
			const res = await axiosInstance.get("/auth/me");
			initializeSocket(res.data.user._id);
			set({ authUser: res.data.user });
		} catch (error) {
			set({ authUser: null });
			console.log(error);
		} finally {
			set({ checkingAuth: false });
		}
	},

	setAuthUser: (user) => set({ authUser: user }),
}));

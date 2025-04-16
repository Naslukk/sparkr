import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminStore = create((set) => ({
    users: [],
    loading: false,

    updateStatus: async (data) => {
        try {
            set({ loading: true });
            const res = await axiosInstance.put("/admin/update-status", data);
            toast.success("Account status updated successfully");
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        } finally {
            set({ loading: false });
        }
    },

    getAllUsers: async () => {
        try {
            const res = await axiosInstance.get("/admin/users");
            set({users: res.data.users})
        } catch (error) {
            console.log(error);
        }
    }
}));

import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
	const { checkAuth, authUser, checkingAuth } = useAuthStore();

const sampleData = {
  success: true,
  count: 1,
  users: [
    {
      _id: "67ffd35cfc78334630902d63",
      name: "Naslu kk",
      email: "naslukk@gmail.com",
      prof: "Engineer",
      age: 22,
      gender: "male",
      image: "https://res.cloudinary.com/dl0hbs1kc/image/upload/v1744823194/xqcea27rkcx99jjgloso.avif",
      idcard: "naslukk@gmail.comidcard.jpg",
      accountStatus: "active",
    },
  ],
};


	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (checkingAuth) return null;

	return (
		<div className='absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
			<Routes>
				<Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/auth"} />} />
				<Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to={"/"} />} />
				<Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to={"/auth"} />} />
				<Route path='/chat/:id' element={authUser ? <ChatPage /> : <Navigate to={"/auth"} />} />
				<Route path='/admin/dashboard' element={<AdminDashboard />} />
			</Routes>

			<Toaster />
		</div>
	);
}

export default App;

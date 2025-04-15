import { useState } from "react";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true);

	return (
		<div
			className='flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-red-500 to-pink-500 '
		>
			<div className='w-full max-w-md'>
				<h2 className='mb-8 text-3xl font-extrabold text-center text-white'>
					{isLogin ? "Sign in to Sparkr" : "Create a Sparkr account"}
				</h2>

				<div className='p-8 bg-white rounded-lg shadow-xl'>
					{isLogin ? <LoginForm /> : <SignUpForm />}

					<div className='mt-8 text-center'>
						<p className='text-sm text-gray-600'>
							{isLogin ? "New to Sparkr?" : "Already have an account?"}
						</p>

						<button
							onClick={() => setIsLogin((prevIsLogin) => !prevIsLogin)}
							className='mt-2 font-medium text-red-600 transition-colors duration-300 hover:text-red-800'
						>
							{isLogin ? "Create a new account" : "Sign in to your account"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default AuthPage;

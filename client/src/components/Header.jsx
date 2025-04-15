import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { User, LogOut, Menu } from "lucide-react";
import logo from "../../public/Sparkr.svg"

export const Header = () => {
	const { authUser, logout } = useAuthStore();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<header className='shadow-lg bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700'>
			<div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between py-4'>
					<div className='flex items-center'>
						<Link to='/' className='flex items-center space-x-2'>
							<img src={logo} alt="logo" className="h-8" />
						</Link>
					</div>

					<div className='items-center hidden space-x-4 md:flex'>
						{authUser ? (
							<div className='relative' ref={dropdownRef}>
								<button
									onClick={() => setDropdownOpen(!dropdownOpen)}
									className='flex items-center space-x-2 focus:outline-none'
								>
									<img
										src={authUser.image || "/avatar.png"}
										className='object-cover w-10 h-10 border-2 border-white rounded-full'
										alt='User image'
									/>
									<span className='font-medium text-white'>{authUser.name}</span>
								</button>
								{dropdownOpen && (
									<div className='absolute right-0 z-10 w-48 py-1 mt-2 bg-white rounded-md shadow-lg'>
										<Link
											to='/profile'
											className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
											onClick={() => setDropdownOpen(false)}
										>
											<User className='mr-2' size={16} />
											Profile
										</Link>
										<button
											onClick={logout}
											className='flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100'
										>
											<LogOut className='mr-2' size={16} />
											Logout
										</button>
									</div>
								)}
							</div>
						) : (
							<>
								<Link
									to='/auth'
									className='text-white transition duration-150 ease-in-out hover:text-pink-200'
								>
									Login
								</Link>
								<Link
									to='/auth'
									className='px-4 py-2 font-medium text-pink-600 transition duration-150 ease-in-out bg-white rounded-full hover:bg-pink-100'
								>
									Sign Up
								</Link>
							</>
						)}
					</div>

					<div className='md:hidden'>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className='text-white focus:otline-none'
						>
							<Menu className='size-6' />
						</button>
					</div>
				</div>
			</div>

			{/* MOBILE MENU */}

			{mobileMenuOpen && (
				<div className='bg-pink-600 md:hidden'>
					<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
						{authUser ? (
							<>
								<Link
									to='/profile'
									className='block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-pink-700'
									onClick={() => setMobileMenuOpen(false)}
								>
									Profile
								</Link>
								<button
									onClick={() => {
										logout();
										setMobileMenuOpen(false);
									}}
									className='block w-full px-3 py-2 text-base font-medium text-left text-white rounded-md hover:bg-pink-700'
								>
									Logout
								</button>
							</>
						) : (
							<>
								<Link
									to='/auth'
									className='block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-pink-700'
									onClick={() => setMobileMenuOpen(false)}
								>
									Login
								</Link>
								<Link
									to='/auth'
									className='block px-3 py-2 text-base font-medium text-white rounded-md hover:bg-pink-700'
									onClick={() => setMobileMenuOpen(false)}
								>
									Sign Up
								</Link>
							</>
						)}
					</div>
				</div>
			)}
		</header>
	);
};

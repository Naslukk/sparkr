import { useRef, useState } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";

const ProfilePage = () => {
	const { authUser } = useAuthStore();
	const [name, setName] = useState(authUser.name || "");
	const [bio, setBio] = useState(authUser.bio || "");
	const [age, setAge] = useState(authUser.age || "");
	const [gender, setGender] = useState(authUser.gender || "");
	const [genderPreference, setGenderPreference] = useState(authUser.genderPreference || []);
	const [image, setImage] = useState(authUser.image || null);

	const fileInputRef = useRef(null);

	const { loading, updateProfile } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		updateProfile({ name, bio, age, gender, genderPreference, image });
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result);
			};

			reader.readAsDataURL(file);
		}
	};


	return (
		<div className='flex flex-col min-h-screen bg-gray-50'>
			<Header />

			<div className='flex flex-col justify-center flex-grow px-4 py-12 sm:px-6 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-md'>
					<h2 className='mt-6 text-3xl font-extrabold text-center text-gray-900'>Your Profile</h2>
				</div>

				<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
					<div className='px-4 py-8 bg-white border border-gray-200 shadow sm:rounded-lg sm:px-10'>
						<form onSubmit={handleSubmit} className='space-y-6'>
							{/* NAME */}
							<div>
								<label htmlFor='name' className='block text-sm font-medium text-gray-700'>
									Name
								</label>
								<div className='mt-1'>
									<input
										id='name'
										name='name'
										type='text'
										required
										value={name}
										onChange={(e) => setName(e.target.value)}
										className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
									/>
								</div>
							</div>

							{/* AGE */}
							<div>
								<label htmlFor='age' className='block text-sm font-medium text-gray-700'>
									Age
								</label>
								<div className='mt-1'>
									<input
										id='age'
										name='age'
										type='number'
										required
										value={age}
										onChange={(e) => setAge(e.target.value)}
										className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
									/>
								</div>
							</div>

							{/* GENDER */}
							<div>
								<span className='block mb-2 text-sm font-medium text-gray-700'>Gender</span>
								<div className='flex space-x-4'>
									{["Male", "Female"].map((option) => (
										<label key={option} className='inline-flex items-center'>
											<input
												type='radio'
												className='text-pink-600 form-radio'
												name='gender'
												value={option.toLowerCase()}
												checked={gender === option.toLowerCase()}
												onChange={() => setGender(option.toLowerCase())}
											/>
											<span className='ml-2'>{option}</span>
										</label>
									))}
								</div>
							</div>

							{/* GENDER PREFERENCE */}
							<div>
								<span className='block mb-2 text-sm font-medium text-gray-700'>Gender Preference</span>
								<div className='flex space-x-4'>
									{["Male", "Female", "Both"].map((option) => (
										<label key={option} className='inline-flex items-center'>
											<input
												type='checkbox'
												className='text-pink-600 form-checkbox'
												checked={genderPreference.toLowerCase() === option.toLowerCase()}
												onChange={() => setGenderPreference(option.toLowerCase())}
											/>
											<span className='ml-2'>{option}</span>
										</label>
									))}
								</div>
							</div>

							{/* BIO */}

							<div>
								<label htmlFor='bio' className='block text-sm font-medium text-gray-700'>
									Bio
								</label>
								<div className='mt-1'>
									<textarea
										id='bio'
										name='bio'
										rows={3}
										value={bio}
										onChange={(e) => setBio(e.target.value)}
										className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm'
									/>
								</div>
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700'>Cover Image</label>
								<div className='flex items-center mt-1'>
									<button
										type='button'
										onClick={() => fileInputRef.current.click()}
										className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
									>
										Upload Image
									</button>
									<input
										ref={fileInputRef}
										type='file'
										accept='image/*'
										className='hidden'
										onChange={handleImageChange}
									/>
								</div>
							</div>

							{image && (
								<div className='mt-4'>
									<img src={image} alt='User Image' className='object-cover w-48 h-full rounded-md' />
								</div>
							)}

							<button
								type='submit'
								className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md shadow-sm hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
								disabled={loading}
							>
								{loading ? "Saving..." : "Save"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProfilePage;

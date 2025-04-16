import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import { useMatchStore } from "../store/useMatchStore";
import { Frown } from "lucide-react";

import SwipeArea from "../components/SwipeArea";
import SwipeFeedback from "../components/SwipeFeedback";
import { useAuthStore } from "../store/useAuthStore";
import VerificationNotice from "../components/VerificationNotice";

const HomePage = () => {
	const { isLoadingUserProfiles, getUserProfiles, userProfiles, subscribeToNewMatches, unsubscribeFromNewMatches } =
		useMatchStore();

	const { authUser } = useAuthStore();

	useEffect(() => {
		getUserProfiles();
	}, [getUserProfiles]);

	useEffect(() => {
		authUser && subscribeToNewMatches();

		return () => {
			unsubscribeFromNewMatches();
		};
	}, [subscribeToNewMatches, unsubscribeFromNewMatches, authUser]);

	return (
		<div>
			{(authUser.accountStatus === "pending") ? (
				<VerificationNotice/>
			):(
				
				<div
					className='flex flex-col min-h-screen overflow-hidden lg:flex-row bg-gradient-to-br from-pink-100 to-purple-100 '
				>
					<Sidebar />
					<div className='flex flex-col flex-grow overflow-hidden'>
						<Header />
						<main className='relative flex flex-col items-center justify-center flex-grow gap-10 p-4 overflow-hidden'>
							{userProfiles.length > 0 && !isLoadingUserProfiles && (
								<>
									<SwipeArea />
									<SwipeFeedback />
								</>
							)}
		
							{userProfiles.length === 0 && !isLoadingUserProfiles && <NoMoreProfiles />}
		
							{isLoadingUserProfiles && <LoadingUI />}
						</main>
					</div>
				</div>
			)}
			
		</div>
	);
};
export default HomePage;

const NoMoreProfiles = () => (
	<div className='flex flex-col items-center justify-center h-full p-8 text-center'>
		<Frown className='mb-6 text-pink-400' size={80} />
		<h2 className='mb-4 text-3xl font-bold text-gray-800'>Woah there, speedy fingers!</h2>
		<p className='mb-6 text-xl text-gray-600'>Bro are you OK? Maybe it&apos;s time to touch some grass.</p>
	</div>
);

const LoadingUI = () => {
	return (
		<div className='relative w-full max-w-sm h-[28rem]'>
			<div className='card bg-white w-96 h-[28rem] rounded-lg overflow-hidden border border-gray-200 shadow-sm'>
				<div className='px-4 pt-4 h-3/4'>
					<div className='w-full h-full bg-gray-200 rounded-lg' />
				</div>
				<div className='p-4 card-body bg-gradient-to-b from-white to-pink-50'>
					<div className='space-y-2'>
						<div className='w-3/4 h-6 bg-gray-200 rounded' />
						<div className='w-1/2 h-4 bg-gray-200 rounded' />
					</div>
				</div>
			</div>
		</div>
	);
};

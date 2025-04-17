import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useAuthStore } from "../store/useAuthStore";
import { useMatchStore } from "../store/useMatchStore";
import { useMessageStore } from "../store/useMessageStore";
import { Link, useParams } from "react-router-dom";
import { Loader, UserX } from "lucide-react";
import MessageInput from "../components/MessageInput";
import BlockButton from "../components/BlockButton";
import ChatBlockedNotice from "../components/ChatBlockedNotice ";

const ChatPage = () => {
	const { getMyMatches, matches, isLoadingMyMatches } = useMatchStore();
	const { messages, getMessages, subscribeToMessages, unsubscribeFromMessages } = useMessageStore();
	const { authUser } = useAuthStore();
	const [isBlockedUser, setIsBlockedUser] = useState(false);

	const { id } = useParams();

	const match = matches.find((m) => m?._id === id);
	
	const youBlockedThem = authUser?.blockedUsers?.includes(match?._id);
  	const theyBlockedYou = match?.blockedUsers?.includes(authUser?._id);

	useEffect(() => {
		if (authUser && id) {
			getMyMatches();
			getMessages(id);
			subscribeToMessages();
		}
		return () => {
			unsubscribeFromMessages();
		};
	}, [getMyMatches, authUser, getMessages, subscribeToMessages, unsubscribeFromMessages, id]);
	
	useEffect(() => {
		if (authUser && match != null ) {
			if (
				authUser.blockedUsers.includes(match._id) ||
				match.blockedUsers.includes(authUser._id)
			) { 
				setIsBlockedUser(true);
			} else {
				setIsBlockedUser(false);
			}
		}
	}, [authUser, match ]);

	if (isLoadingMyMatches) return <LoadingMessagesUI />;
	if (!match) return <MatchNotFound />;

	return (
		<div className='flex flex-col h-screen bg-gray-100 bg-opacity-50'>
			<Header />

			<div className='flex flex-col flex-grow w-full max-w-4xl p-4 mx-auto overflow-hidden md:p-6 lg:p-8'>
				<div className='flex items-center justify-between p-3 mb-4 bg-white rounded-lg shadow'>
					<div className="flex items-center">
						
					<img
						src={match.image || "/avatar.png"}
						className='object-cover w-12 h-12 mr-3 border-2 border-pink-300 rounded-full'
					/>
					<h2 className='text-xl font-semibold text-gray-800'>{match.name}</h2>
					</div>

					<BlockButton currentUser={authUser} user={match}  setIsBlockedUser={setIsBlockedUser} currentBlockStatus={isBlockedUser}/>
				</div>

				<div className='flex-grow p-4 mb-4 overflow-y-auto bg-white rounded-lg shadow'>
					{messages.length === 0 ? (
						<p className='py-8 text-center text-gray-500'>Start your conversation with {match.name}</p>
					) : (
						messages.map((msg) => (
							<div
								key={msg._id}
								className={`mb-2 ${msg.sender === authUser._id ? "text-right" : "text-left"}`}
							>
								<span
									className={`inline-block p-2 rounded-lg max-w-xs lg:max-w-md ${
										msg.sender === authUser._id
											? "bg-pink-500 text-white"
											: "bg-gray-200 text-gray-800"
									}`}
								>
									{msg.content}
								</span>
							</div>
						))
					)}
				</div>
				{isBlockedUser ? (
        <ChatBlockedNotice
          youBlockedThem={youBlockedThem}
        />
      ) : (
        <MessageInput match={match}/>
      )}
			</div>
		</div>
	);
};
export default ChatPage;

const MatchNotFound = () => (
	<div className='flex flex-col items-center justify-center h-screen bg-gray-100 bg-opacity-50 bg-dot-pattern'>
		<div className='p-8 text-center bg-white rounded-lg shadow-md'>
			<UserX size={64} className='mx-auto mb-4 text-pink-500' />
			<h2 className='mb-2 text-2xl font-semibold text-gray-800'>Match Not Found</h2>
			<p className='text-gray-600'>Oops! It seems this match doesn&apos;t exist or has been removed.</p>
			<Link
				to='/'
				className='inline-block px-4 py-2 mt-6 text-white transition-colors bg-pink-500 rounded hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-300'
			>
				Go Back To Home
			</Link>
		</div>
	</div>
);

const LoadingMessagesUI = () => (
	<div className='flex flex-col items-center justify-center h-screen bg-gray-100 bg-opacity-50'>
		<div className='p-8 text-center bg-white rounded-lg shadow-md'>
			<Loader size={48} className='mx-auto mb-4 text-pink-500 animate-spin' />
			<h2 className='mb-2 text-2xl font-semibold text-gray-800'>Loading Chat</h2>
			<p className='text-gray-600'>Please wait while we fetch your conversation...</p>
			<div className='flex justify-center mt-6 space-x-2'>
				<div className='w-3 h-3 bg-pink-500 rounded-full animate-bounce' style={{ animationDelay: "0s" }}></div>
				<div
					className='w-3 h-3 bg-pink-500 rounded-full animate-bounce'
					style={{ animationDelay: "0.2s" }}
				></div>
				<div
					className='w-3 h-3 bg-pink-500 rounded-full animate-bounce'
					style={{ animationDelay: "0.4s" }}
				></div>
			</div>
		</div>
	</div>
);

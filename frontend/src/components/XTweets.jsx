import React, { useContext } from 'react'
import Logo from '../assets/images/SMD.png'
import X from '../assets/images/X.png'
import { TweetsContext } from '../context/TweetsContext'
import Post from './Post'
import { FaPlus } from 'react-icons/fa'

const XTweets = () => {
     const { connectX, xConnected, xTweets, xLoading } = useContext(TweetsContext)

     const renderWelcomeSection = () => (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
               <h2 className="text-2xl font-bold mb-4">Welcome to Social Media Dashboard</h2>
               <p className="text-gray-600 mb-8">
                    Connect your social media accounts to get started. You'll be able to view and manage all your posts in one place.
               </p>
               <div className="space-y-4 max-w-md mx-auto">
                    <button
                         onClick={connectX}
                         className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                         <FaPlus className="mr-2" />
                         Connect Your First Account
                    </button>
                    <p className="text-sm text-gray-500">
                         Connect at least one social media account to get started
                    </p>
               </div>
          </div>
     );

     const renderLoadingIndicator = () => (
          <span className="rounded-full w-[2rem] h-[2rem] border-y-2 border-blue-800 animate-spin" />
     );

     const renderNoPostsMessage = () => <div>There are no posts available</div>;

     const renderTweets = () => (
          xTweets.map((tweet, index) => (
               <Post
                    platform={'X'}
                    image={tweet.image || X}
                    title={tweet.title}
                    text={tweet.text}
                    link={tweet.link}
                    created_at={tweet.created_at}
                    key={index}
               />
          ))
     );
     
     return (
          <div className="w-full h-full px-[.5rem] md:px-[2rem]">
               <h2 className="text-2xl font-bold mb-4">X Posts</h2>
               {!xConnected ? (
                    <>
                         {renderWelcomeSection()}
                    </>
               ) : xLoading ? (
                    renderLoadingIndicator()
               ) : xTweets.length === 0 ? (
                    renderNoPostsMessage()
               ) : (
                    renderTweets()
               )}
          </div>
     )
}

export default XTweets

import React, { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import X from '../assets/images/X.png';
import { TweetsContext } from '../context/TweetsContext';
import Post from '../components/Post';

const All = () => {
     const { connectX, xConnected, xTweets, xLoading } = useContext(TweetsContext);

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

     const renderInstructionsSection = () => (
          <div className="py-[2rem] md:py-[4rem]">
               <h2 className="text-2xl font-bold mb-4">How to connect</h2>
               <ul className="space-y-2 text-gray-600">
                    <li>Click on the Button "Connect your first account".</li>
                    <li>Note that the default account to connect to is <strong>X</strong>.</li>
                    <li>You will be redirected to X authorization page.</li>
                    <li>Click Continue and allow our platform to access your X account.</li>
               </ul>
          </div>
     );

     const renderFeaturesSection = () => (
          <div className="py-[2rem] md:py-[4rem]">
               <h2 className="text-2xl font-bold mb-4">What you can do</h2>
               <ul className="space-y-2 text-gray-600">
                    <li>View All your posts.</li>
                    <li>Edit your posts.</li>
                    <li>Add new Posts.</li>
                    <li>Delete posts.</li>
               </ul>
          </div>
     );

     const renderLoadingIndicator = () => (
          <span className="rounded-full w-[2rem] h-[2rem] border-y-2 border-blue-800 animate-spin" />
     );

     const renderNoPostsMessage = () => (
          <div>There are no posts available</div>
     );

     const renderTweets = () => (
          xTweets.map((tweet, index) => (
               <Post platform={'X'} image={tweet.image} title={tweet.title} text={tweet.text} link={tweet.link} created_at={tweet.created_at} key={index} />
          ))
     );

     return (
          <div className="w-full h-full px-[.5rem] md:px-[2rem]">
               {!xConnected ? (
                    <>
                         {renderWelcomeSection()}
                         {renderInstructionsSection()}
                         {renderFeaturesSection()}
                    </>
               ) : xLoading ? (
                    renderLoadingIndicator()
               ) : xTweets.length === 0 ? (
                    renderNoPostsMessage()
               ) : (
                    renderTweets()
               )}
          </div>
     );
};

export default All;

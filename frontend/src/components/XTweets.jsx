import React, { useContext } from 'react'
import Logo from '../assets/images/SMD.png'
import X from '../assets/images/X.png'
import { TweetsContext } from '../context/TweetsContext'
import Post from './Post'

const XTweets = () => {
     const { xTweets } = useContext(TweetsContext)
     
     return (
          <>
          <h2 className={`font-semibold text-lg px-[2rem]`}>X Posts</h2>
               {xTweets == [] || xTweets.length <= 0 ? (
               <div className={`flex flex-col gap-[1rem] font-semibold sm:px-[3rem] md:px-[10rem]`}>
                    <div className='flex px-[1rem] py-[2rem] items-center gap-[1rem] relative rounded-lg shadow-md'>
                         <div className={`h-16 w-20 rounded-full bg-gray-500 animate-pulse`}></div>
                         <div className={`flex flex-col w-full`}>
                              <h3 className={`text-md font-bold bg-gray-500 animate-pulse py-2 mb-1`}></h3>
                              <p className={`text-sm bg-gray-500 animate-pulse py-2`}></p>
                              <span className={`text-xs font-light mt-[1rem] bg-gray-500 animate-pulse py-1`}></span>
                              <p className={`absolute top-[.3rem] right-[.6rem] text-blue-700 h-6 w-6`}> <img src={Logo} alt="Logo" className={`w-full h-full`} /> </p>
                         </div>
                    </div>
                    <div className='flex px-[1rem] py-[2rem] items-center gap-[1rem] relative rounded-lg shadow-md'>
                         <div className={`h-16 w-20 rounded-full bg-gray-500 animate-pulse`}></div>
                         <div className={`flex flex-col w-full`}>
                              <h3 className={`text-md font-bold bg-gray-500 animate-pulse py-2 mb-1`}></h3>
                              <p className={`text-sm bg-gray-500 animate-pulse py-2`}></p>
                              <span className={`text-xs font-light mt-[1rem] bg-gray-500 animate-pulse py-1`}></span>
                              <p className={`absolute top-[.3rem] right-[.6rem] text-blue-700 h-6 w-6`}> <img src={Logo} alt="Logo" className={`w-full h-full`} /> </p>
                         </div>
                    </div>
                    <div className='flex px-[1rem] py-[2rem] items-center gap-[1rem] relative rounded-lg shadow-md'>
                         <div className={`h-16 w-20 rounded-full bg-gray-500 animate-pulse`}></div>
                         <div className={`flex flex-col w-full`}>
                              <h3 className={`text-md font-bold bg-gray-500 animate-pulse py-2 mb-1`}></h3>
                              <p className={`text-sm bg-gray-500 animate-pulse py-2`}></p>
                              <span className={`text-xs font-light mt-[1rem] bg-gray-500 animate-pulse py-1`}></span>
                              <p className={`absolute top-[.3rem] right-[.6rem] text-blue-700 h-6 w-6`}> <img src={Logo} alt="Logo" className={`w-full h-full`} /> </p>
                         </div>
                    </div>
                    <div className='flex px-[1rem] py-[2rem] items-center gap-[1rem] relative rounded-lg shadow-md'>
                         <div className={`h-16 w-20 rounded-full bg-gray-500 animate-pulse`}></div>
                         <div className={`flex flex-col w-full`}>
                              <h3 className={`text-md font-bold bg-gray-500 animate-pulse py-2 mb-1`}></h3>
                              <p className={`text-sm bg-gray-500 animate-pulse py-2`}></p>
                              <span className={`text-xs font-light mt-[1rem] bg-gray-500 animate-pulse py-1`}></span>
                              <p className={`absolute top-[.3rem] right-[.6rem] text-blue-700 h-6 w-6`}> <img src={Logo} alt="Logo" className={`w-full h-full`} /> </p>
                         </div>
                    </div>                    
               </div>) : (
                    <>
                    {xTweets.map((tweet, index) => {
                         return (
                              <Post platform={'X'} image={tweet.image || X} title={tweet.title} text={tweet.text} link={tweet.link} created_at={tweet.created_at} key={index} />
                         )
                    })}
                    </>
               )}
          </>
     )
}

export default XTweets

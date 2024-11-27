import React, { useContext } from 'react'
import Logo from '../assets/images/SMD.png'
import X from '../assets/images/X.png'
import { TweetsContext } from '../context/TweetsContext'

const XTweets = () => {
     const { xTweets } = useContext(TweetsContext)
     function formatTimestamp(timestamp) {
          const date = new Date(timestamp);
      
          const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
          const formattedDate = new Intl.DateTimeFormat('en-Br', options).format(date);
      
          return formattedDate;
     }
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
                              <div className={`flex bg-blue-50 px-[1rem] py-[1rem] items-center gap-[1rem] relative rounded-lg shadow-md sm:mx-[2rem] md:mx-[10rem] ${xTweets.length < 4 && "my-[.2rem]"}`} key={index}>
                                   <img src={tweet.image || X} alt="Image" onError={(e) => (e.target.src = X)} className={`h-16 w-16 rounded-lg`} />
                                   <div className={`flex flex-col w-full`}>
                                        <h3 className={`text-md font-bold`}>{tweet.title}</h3>
                                        <p className={`text-sm`}>{tweet.text}</p>
                                        <span className={`text-xs font-light mt-[1rem]`}>{formatTimestamp(tweet.created_at)}</span>
                                        <p className={`absolute top-[.3rem] right-[.6rem] text-black font-extrabold`}> X </p>
                                        <a href={tweet.link} target='_blank' className={`absolute bottom-1 right-1 text-sm font-semibold hover:text-blue-600 text-blue-900`}>View More</a>
                                   </div>
                              </div>
                         )
                    })}
                    </>
               )}
          </>
     )
}

export default XTweets

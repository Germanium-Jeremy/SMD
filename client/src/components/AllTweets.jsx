import React, { useContext } from 'react'
import Logo from '../assets/images/SMD.png'
import { FaFacebook, FaInstagram, FaTelegram, FaTwitter, FaXing } from 'react-icons/fa'
import { TweetsContext } from '../context/TweetsContext'

const AllTweets = () => {
     const { faceBookTweets, igTweets, xTweets, telegramTweets } = useContext(TweetsContext)
     return (
          <>
               {faceBookTweets == [] || faceBookTweets.length <= 0 || igTweets == [] || xTweets == [] || telegramTweets == [] ? (
               <div className={`flex flex-col px-[2rem] max-[330px]:px-[1rem] font-semibold`}>
                    Please connect your SMD account to your social media platforms
               </div>) : (
                    <>
                    <div className='flex bg-blue-50 px-[1rem] py-[1rem] items-center gap-[1rem] relative rounded-lg shadow-md'>
                         <img src={Logo} alt="Image" className={`h-16 w-16 rounded-lg`} />
                         <div className={`flex flex-col w-full`}>
                              <h3 className={`text-md font-bold`}>Tweet Title</h3>
                              <p className={`text-sm`}>Tweet Description</p>
                              <span className={`text-xs font-light mt-[1rem]`}>Tweet date</span>
                              <p className={`absolute top-[.3rem] right-[.6rem] text-blue-700`}> <FaFacebook /> </p>
                         </div>
                    </div>
                    <div className='flex bg-blue-50 px-[1rem] py-[1rem] items-center gap-[1rem] relative rounded-lg shadow-md'>
                         <img src={Logo} alt="Image" className={`h-16 w-16 rounded-lg`} />
                         <div className={`flex flex-col w-full`}>
                              <h3 className={`text-md font-bold`}>Tweet Title</h3>
                              <p className={`text-sm`}>Tweet Description</p>
                              <span className={`text-xs font-light mt-[1rem]`}>Tweet date</span>
                              <p className={`absolute top-[.3rem] right-[.6rem] text-blue-700`}> <FaFacebook /> </p>
                         </div>
                    </div>
                    <div className='flex bg-blue-100 px-[1rem] py-[1rem] items-center gap-[1rem] relative rounded-lg shadow-md'>
                         <img src={Logo} alt="Image" className={`h-16 w-16 rounded-lg`} />
                         <div className={`flex flex-col w-full`}>
                              <h3 className={`text-md font-bold`}>Tweet Title</h3>
                              <p className={`text-sm`}>Tweet Description</p>
                              <span className={`text-xs font-light mt-[1rem]`}>Tweet date</span>
                              <p className={`absolute top-[.3rem] right-[.6rem] text-blue-900`}> <FaTelegram /> </p>
                         </div>
                    </div>
                    <div className='flex bg-pink-50 px-[1rem] py-[1rem] items-center gap-[1rem] relative rounded-lg shadow-md'>
                         <img src={Logo} alt="Image" className={`h-16 w-16 rounded-lg`} />
                         <div className={`flex flex-col w-full`}>
                              <h3 className={`text-md font-bold`}>Tweet Title</h3>
                              <p className={`text-sm`}>Tweet Description</p>
                              <span className={`text-xs font-light mt-[1rem]`}>Tweet date</span>
                              <p className={`absolute top-[.3rem] right-[.6rem] text-pink-700`}> <FaInstagram /> </p>
                         </div>
                    </div>
                    <div className='flex bg-gray-200 px-[1rem] py-[1rem] items-center gap-[1rem] relative rounded-lg shadow-md'>
                         <img src={Logo} alt="Image" className={`h-16 w-16 rounded-lg`} />
                         <div className={`flex flex-col w-full`}>
                              <h3 className={`text-md font-bold`}>Tweet Title</h3>
                              <p className={`text-sm`}>Tweet Description</p>
                              <span className={`text-xs font-light mt-[1rem]`}>Tweet date</span>
                              <p className={`absolute top-[.3rem] right-[.6rem] text-black font-extrabold`}> X </p>
                         </div>
                    </div>
               </>
               )}
               
          </>
     )
}

export default AllTweets

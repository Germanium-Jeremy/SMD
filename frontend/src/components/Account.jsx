import React, { useContext, useEffect, useState } from 'react'
import { FaFacebook, FaInstagram, FaTelegram, FaTwitter } from 'react-icons/fa'
import { TweetsContext } from '../context/TweetsContext'
import { UserContext } from '../context/UserContext'

const Account = () => {
     const { userData } = useContext(UserContext)
     const { connectX , xLoading } = useContext(TweetsContext)

     return (
          <div className={`px-[1rem] sm:px-[3rem] md:px-[10rem] py-[3rem] bg-blue-50 max-[330px]:pb-[7rem]`}>
               <h1 className={`text-xl md:text-2xl font-semibold`}>SMD, {userData.username} Account</h1>
               <div className={`flex flex-col gap-[1rem]`}>
                    <p className={`text-sm md:text-lg mt-[1rem]`}>Your Email: {userData.email}</p>
               </div>
               <div className={`flex flex-col gap-[1rem] py-[2rem] mt-[5rem] w-full`}>
                    <h2 className={`text-lg md:text-xl font-semibold mb-[2rem]`}>Please Link your Account to view The Content</h2>
                    {/* <button className={`px-[2rem] py-[.6rem] flex justify-evenly items-center font-semibold text-lg bg-blue-800 hover:bg-blue-600 rounded-lg text-white`}>FaceBook <FaFacebook /> </button> */}
                    {/* <button className={`px-[2rem] py-[.6rem] flex justify-evenly items-center font-semibold text-lg bg-blue-800 hover:bg-blue-600 rounded-lg text-white`}>Instagram <FaInstagram /> </button> */}
                    {xLoading ? (<button className={`px-[2rem] py-[.6rem] text-lg bg-gray-500 rounded-lg text-white`}>Wait</button>) : (
                         <button className={`px-[2rem] py-[.6rem] flex justify-evenly items-center font-semibold text-lg bg-blue-800 hover:bg-blue-600 rounded-lg text-white`} onClick={connectX}>X (Twitter) <FaTwitter />  </button>
                    )}
                    {/* <button className={`px-[2rem] py-[.6rem] flex justify-evenly items-center font-semibold text-lg bg-blue-800 hover:bg-blue-600 rounded-lg text-white`}>Telegram <FaTelegram /> </button> */}
               </div>
          </div>
     )
}

export default Account

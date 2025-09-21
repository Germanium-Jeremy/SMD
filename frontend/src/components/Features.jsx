import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'

const Features = () => {
     return (
          <section className="px-[1rem] sm:px-[3rem] lg:px-[5rem] py-[5rem] bg-blue-50 mt-[2rem] rounded-lg shadow-md">
               <h2 className={`text-blue-900 font-bold text-3xl sm:text-4xl text-center mb-8`}>How It Works</h2>
               <ul className="flex flex-col gap-6 max-w-xl mx-auto">
                    <li className="flex items-center gap-4 text-lg sm:text-xl text-gray-800">
                         <FaCheckCircle className="text-blue-900 text-2xl" /> Register or Login to your account
                    </li>
                    <li className="flex items-center gap-4 text-lg sm:text-xl text-gray-800">
                         <FaCheckCircle className="text-blue-900 text-2xl" /> Authorize SMD to access your social media accounts
                    </li>
                    <li className="flex items-center gap-4 text-lg sm:text-xl text-gray-800">
                         <FaCheckCircle className="text-blue-900 text-2xl" /> View, edit, and delete your posts from multiple platforms
                    </li>
               </ul>
          </section>
     )
}

export default Features

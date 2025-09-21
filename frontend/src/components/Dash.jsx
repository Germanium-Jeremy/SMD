import React from 'react'
import { Link } from 'react-router-dom'

const Dash = () => {
     return (
          <div className="flex flex-col gap-4 px-[1rem] sm:px-[4rem] text-center">
               <h1 className={`text-5xl sm:text-6xl font-extrabold text-blue-900 mb-4`}>Welcome to SMD</h1>
               <p className={`text-xl sm:text-2xl font-semibold text-gray-700 max-w-3xl mx-auto`}>
                    Your all-in-one platform to seamlessly manage and organize your social media posts from X, Facebook, Instagram, Telegram, and more.
               </p>
               <p className={`text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mt-2`}>Stay connected, edit, and delete your posts across multiple platforms with ease.</p>
               <Link to={'/login'} className={`inline-block mt-8 bg-blue-900 text-white rounded-lg px-8 py-3 text-xl font-semibold hover:bg-blue-700 transition-colors duration-300`}>Get Started</Link>
          </div>
     )
}

export default Dash

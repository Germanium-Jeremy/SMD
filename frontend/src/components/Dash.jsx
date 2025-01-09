import React from 'react'
import { Link } from 'react-router-dom'

const Dash = () => {
     return (
          <section className="flex flex-col gap-3 px-[1rem] sm:px-[4rem]">
               <h2 className={`text-4xl sm:text-5xl font-semibold text-center my-[2rem]`}>Welcome to SMD.</h2>
               <p className={`text-xl sm:text-2xl text-center font-semibold`}>Be able to organise and view all your tweets here.</p>
               <p className={`text-xl sm:text-2xl text-center font-semibold`}>We help you to collect all your tweets from various sites and manage them here.</p>
               <Link to={'/login'} className={`text-white bg-blue-900 rounded-lg px-[2rem] py-[.8rem] sm:py-[1rem] mt-[3rem] text-center text-xl sm:text-2xl font-semibold hover:bg-blue-700`}>Get Started</Link>
          </section>
     )
}

export default Dash

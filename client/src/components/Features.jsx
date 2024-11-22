import React from 'react'
import { FaCheck } from 'react-icons/fa'

const Features = () => {
     return (
          <section className="px-[1rem] sm:px-[3rem] lg:px-[5rem] py-[5rem] bg-blue-50 mt-[2rem]">
               <h2 className={`text-blue-900 font-bold text-2xl sm:text-3xl md:text-4xl text-center`}>Here is how you do it.</h2>
               <ul className={`flex flex-col gap-[1rem] sm:gap-[1.3rem] md:gap-[2rem] pt-[1rem] sm:pt-[1.5rem] md:pt-[2rem]`}>
                    <li className={`text-left text-lg sm:text-2xl flex items-center gap-[1rem]`}> <FaCheck /> Register OR Login </li>
                    <li className={`text-left text-lg sm:text-2xl flex items-center gap-[1rem]`}> <FaCheck /> Authorize our App </li>
                    <li className={`text-left text-lg sm:text-2xl flex items-center gap-[1rem]`}> <FaCheck /> View Your Tweets </li>
               </ul>
          </section>
     )
}

export default Features

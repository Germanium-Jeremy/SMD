import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/SMD.png'
import { FaBars } from 'react-icons/fa'

const HeaderL = () => {
     return (
          <header className={`flex justify-between px-[2rem] sm:px-[4rem] lg:px-[3rem] py-[1rem] sm:py-[2rem] lg:py-[1rem] fixed top-0 left-0 right-0 items-center bg-white z-10`}>
               <Link to={'/'} className={`w-10 sm:w-14 h-10 sm:h-14`}> <img src={Logo} alt="SMD"/> </Link>
               <h1 className={`font-bold text-2xl sm:text-3xl hover:text-blue-900 transition`}>SMD</h1>
               {/* <FaBars className={`text-2xl`} /> */}
          </header>
     )
}

export default HeaderL

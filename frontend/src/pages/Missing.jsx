import React from 'react'
import Logo from '../assets/images/SMD.png'
import { Link } from 'react-router-dom'

const Missing = () => {
     return (
          <div className={`flex flex-col items-center justify-center h-screen w-full gap-[1rem]`}>
               <h2 className={`text-8xl font-semibold`}>404</h2>
               <div className={`relative w-full h-[10rem] flex justify-center`}> <img src={Logo} alt="Logo" className={`w-[3cm] h-[3cm]`} /> </div>
               <p className={`text-2xl font-semibold`}>Page Not Found. Return Home</p>
               <Link to={'/'} className={`text-blue-900 hover:text-blue-600 text-xl font-semibold`} >Home</Link>
          </div>
     )
}

export default Missing

import React from 'react'
import Dash from '../components/Dash'
import Features from '../components/Features'
import HeaderL from '../components/HeaderL'
import Footer from '../components/Footer'

const Landing = () => {
     return (
          <div className="bg-gray-100 text-gray-800 font-sans min-h-screen pt-[5rem] sm:pt-[10rem]">
               <HeaderL />
               <Dash />
               <Features />
               <Footer />
          </div>
     )
}

export default Landing

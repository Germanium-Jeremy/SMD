import React, { useContext } from 'react'
import { TweetsContext } from '../context/TweetsContext'
import ig from '../assets/images/ig.png'
import { Link } from 'react-router-dom'

const IGTweets = () => {
     const { igTweets } = useContext(TweetsContext)
     return (
          <div className={`flex flex-col items-center justify-center w-full gap-[1rem] px-[1rem]`}>
               <h2 className={`text-7xl font-semibold text-center`}>Page not Available</h2>
               <div className={`relative w-full h-[10rem] flex justify-center`}> <img src={ig} alt="Logo" className={`w-[3cm] h-[2cm]`} /> </div>
               <p className={`text-2xl font-semibold text-center`}>Instagram is not yet supported but will soon be.</p>
               <Link to={'/'} className={`text-blue-900 hover:text-blue-600 text-xl font-semibold`} >Home</Link>
          </div>
     )
}

export default IGTweets

import React, { useContext } from 'react'
import { TweetsContext } from '../context/TweetsContext'
import fb from '../assets/images/fb.png'
import { Link } from 'react-router-dom'

const FaceBooksTweets = () => {
     const { faceBookTweets } = useContext(TweetsContext)
     return (
          <div className={`flex flex-col items-center justify-center w-full gap-[1rem] px-[1rem]`}>
               <h2 className={`text-7xl font-semibold text-center`}>Page not Available</h2>
               <div className={`relative w-full h-[10rem] flex justify-center`}> <img src={fb} alt="Logo" className={`w-[3cm] h-[3cm]`} /> </div>
               <p className={`text-2xl font-semibold text-center`}>Facebook is not yet supported but will soon be.</p>
               <Link to={'/dashboard'} className={`text-blue-900 hover:text-blue-600 text-xl font-semibold`} >Home</Link>
          </div>
     )
}

export default FaceBooksTweets

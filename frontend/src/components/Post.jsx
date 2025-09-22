import React from 'react'
import X from "../assets/images/X.png";
import formatTimestamp from '../assets/data/formatTimestamp';

const Post = ({ platform, image, title, text, link, created_at }) => {
     return (
         <div className={`flex bg-white px-[1rem] py-[1rem] items-center gap-[1rem] relative rounded-lg shadow-md my-[.2rem] md:my-[1rem]`}>
               <img src={image || X} alt={title} onError={(e) => (e.target.src = X)} className={`h-16 w-16 rounded-lg`} loading='lazy' />
               <div className={`flex flex-col w-full`}>
                    <h3 className={`text-md font-bold`}>{title}</h3>
                    <p className={`text-sm`}>{text}</p>
                    <span className={`text-xs font-light mt-[1rem]`}>{formatTimestamp(created_at)}</span>
                    <p className={`absolute top-[.3rem] right-[.6rem] text-black font-extrabold`}> {platform} </p>
                    <a href={link} target='_blank' className={`absolute bottom-1 right-1 text-sm font-semibold hover:text-blue-600 text-blue-900`}>View More</a>
               </div>
          </div>
     )
}

export default Post
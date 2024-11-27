import React from 'react'
import { Link } from 'react-router-dom';

const HeaderMobile = () => {
     const headerOptions = [
          { id: 1, text: "All", color: "text-gray-950", link: "./" }, // Updated link
          { id: 2, text: "Facebook", color: "text-blue-900", link: "./facebook" },
          { id: 3, text: "X", color: "text-black", link: "./x" },
          { id: 4, text: "Instagram", color: "text-pink-800", link: "./ig" },
          // { id: 5, text: "Telegram", color: "text-blue-800", link: "./telegram" },
          { id: 6, text: "Account", color: "text-blue-700", link: "./account" },
     ];
     return (
          <div className={`flex flex-col gap-1 bg-white fixed top-0 left-0 right-0 shadow-lg shadow-gray-400 z-[1]`}>
               <h1 className={`text-2xl font-bold text-center py-[1rem]`}>Social Media</h1>
               <div className={`flex justify-between items-center px-[1rem] font-semibold overflow-x-auto pb-[.3rem]`}>
                    {headerOptions.map((btn) => {
                         return (<Link key={btn.id} to={btn.link} className={`${btn.color} px-[.5rem]`}>{btn.text}</Link>)
                    })}
               </div>
          </div>
     )
}

export default HeaderMobile

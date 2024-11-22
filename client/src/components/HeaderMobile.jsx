import React from 'react'

const HeaderMobile = ( { headerOptions, onButtonClick  } ) => {
     return (
          <div className={`flex flex-col gap-1 bg-white fixed top-0 left-0 right-0 shadow-lg shadow-gray-400 z-[1]`}>
               <h1 className={`text-2xl font-bold text-center py-[1rem]`}>Social Media</h1>
               <div className={`flex justify-between items-center px-[1rem] font-semibold overflow-x-auto pb-[.3rem]`}>
                    {headerOptions.map((btn) => {
                         return (<button key={btn.id} className={`${btn.color} px-[.5rem]`} onClick={() => onButtonClick(btn.component)}>{btn.text}</button>)
                    })}
               </div>
          </div>
     )
}

export default HeaderMobile

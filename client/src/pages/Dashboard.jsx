import React, { useState } from 'react'
import HeaderMobile from '../components/HeaderMobile'
import AllTweets from '../components/AllTweets'
import FaceBooksTweets from '../components/FaceBooksTweets'
import XTweets from '../components/XTweets'
import IGTweets from '../components/IGTweets'
import TelegramTweets from '../components/TelegramTweets'
import Account from '../components/Account'
import Footer from '../components/Footer'

const headerOptions = [
     { id: 1, text: "All", color: "text-gray-950", link: "./all", component: <AllTweets /> },
     { id: 2, text: "Facebook", color: "text-blue-900", link: "./facebook", component: <FaceBooksTweets /> },
     { id: 3, text: "X", color: "text-black", link: "./x", component: <XTweets /> },
     { id: 4, text: "Instagram", color: "text-pink-800", link: "./ig", component: <IGTweets /> },
     { id: 5, text: "Telegram", color: "text-blue-800", link: "./telegram", component: <TelegramTweets /> },
     { id: 6, text: "Account", color: "text-blue-700", link: "./account", component: <Account /> },
 ];

const Dashboard = () => {
     const [selectedComponent, setSelectedComponent] = useState(headerOptions[0].component)
     const handleButtonClick = (component) => {
          setSelectedComponent(component);
     };
     return (
          <div className={`pt-[8rem]`}>
               <HeaderMobile headerOptions={headerOptions} onButtonClick={handleButtonClick} />
               <div className={`flex flex-col gap-[1rem]`}>
                    {selectedComponent}
               </div>
               <Footer />
          </div>
     )
}

export default Dashboard

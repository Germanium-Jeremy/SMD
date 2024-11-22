import React, { useContext } from 'react'
import { TweetsContext } from '../context/TweetsContext'

const TelegramTweets = () => {
     const { telegramTweets } = useContext(TweetsContext)
     return (
          <div>
               {telegramTweets == [] || telegramTweets.length <= 0 ? (<div className={`flex flex-col px-[2rem] max-[330px]:px-[1rem] font-semibold`}>
                    Please Connect Your Telegram Account to your SMD Account.
               </div>) : (<div>Telegram Tweets</div>)}
          </div>
     )
}

export default TelegramTweets

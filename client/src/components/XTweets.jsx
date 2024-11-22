import React, { useContext } from 'react'
import { TweetsContext } from '../context/TweetsContext'

const XTweets = () => {
     const { xTweets } = useContext(TweetsContext)
     return (
          <div>
               {xTweets == [] || xTweets.length <= 0 ? (<div className={`flex flex-col px-[2rem] max-[330px]:px-[1rem] font-semibold`}>
                    Please Connect Your X Account to your SMD Account.
               </div>) : (<div>X Tweets</div>)}
          </div>
     )
}

export default XTweets

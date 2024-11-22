import React, { useContext } from 'react'
import { TweetsContext } from '../context/TweetsContext'

const IGTweets = () => {
     const { igTweets } = useContext(TweetsContext)
     return (
          <div>
               {igTweets == [] || igTweets.length <= 0 ? (<div className={`flex flex-col px-[2rem] max-[330px]:px-[1rem] font-semibold`}>
                    Please Connect Your Instagram Account to your SMD Account.
               </div>) : (<div>IG Tweets</div>)}
          </div>
     )
}

export default IGTweets

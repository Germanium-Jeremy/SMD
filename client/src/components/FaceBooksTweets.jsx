import React, { useContext } from 'react'
import { TweetsContext } from '../context/TweetsContext'

const FaceBooksTweets = () => {
     const { faceBookTweets } = useContext(TweetsContext)
     return (
          <div className={`flex flex-col gap-[.5rem]`}>
               {faceBookTweets == [] || faceBookTweets.length <= 0 ? (<div className={`flex flex-col px-[2rem] max-[330px]:px-[1rem] font-semibold`}>
                    Please Connect Your Facebook Account to your SMD Account.
               </div>) : (<div>Facebook Tweets</div>)}
               
          </div>
     )
}

export default FaceBooksTweets

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const serverUrl = import.meta.env.VITE_APP_SERVER_URL

export const TweetsContext = createContext(null)

export const TweetsProvider = ({ children }) => {
     const [faceBookTweets, setFaceBookTweets] = useState([])
     const [igTweets, setIgTweets] = useState([])
     const [xTweets, setXTweets] = useState([])
     const [telegramTweets, setTelegramTweets] = useState([])

     const [faceBookConnected, setFaceBookConnected] = useState(false)
     const [igConnected, setIgConnected] = useState(false)
     const [xConnected, setXConnected] = useState(false)
     const [telegramConnected, setTelegramConnected] = useState(false)
     
     const [faceBookLoading, setFaceBookLoading] = useState(false)
     const [igLoading, setIgLoading] = useState(false)
     const [xLoading, setXLoading] = useState(false)
     const [telegramLoading, setTelegramLoading] = useState(false)

     const navigate = useNavigate()
     const user = JSON.parse(localStorage.getItem("SMD_USER"))

     useEffect(() => {
          setXConnected(JSON.parse(localStorage.getItem("XConnected")) ? true : false)
     }, [])

     const connectX = async () => {
          setXLoading(true)
          const user = JSON.parse(localStorage.getItem("SMD_USER"))
          try {
               const response = await fetch(`${serverUrl}/auth/twitter/start`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.userId }),
               });
               setXLoading(false)
               const data = await response.json();
               if (data.url) {
                    window.location.href = data.url;
               } else {
                    toast.warn("Unable to redirect.")
                    console.error("Failed to fetch authorization URL.");
               }
          } catch (error) {
               setXLoading(false)
               toast.warn("Unable to authorize. Please try again")
               console.error("Failed to start Twitter authentication", error);
          }     
     }

     const fetchXTweets = async(userId) => {
          try {
               const response = await axios.get(`${serverUrl}/tweets/twitter/get`, {
                    params: { userId },
               });
               setXTweets(response.data)
               console.log("Tweets:", response.data);
          } catch (error) {
               setXTweets([])
               console.error("Error fetching tweets:", error.response);

               if (error.response?.status === 429) {
                    toast.warn("Rate limit exceeded. Please try again later.");
               } else if (error.response?.status === 401) {
                    toast.warn("Credintials changes. Please reauthorize.")
                    // connectX()
               } else {
                    toast.warn("Could not get your feeds.");
               }
          }
     }
     useEffect(() => {
          user ? fetchXTweets(user.userId) : navigate('/login')
     }, [])

     return (
          <TweetsContext.Provider value={{ faceBookTweets, igTweets, xTweets, telegramTweets, connectX, xLoading }}>
               {children}
          </TweetsContext.Provider>
     )
}
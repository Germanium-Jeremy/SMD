import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";
const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

export const TweetsContext = createContext(null)

export const TweetsProvider = ({ children }) => {
     const [activeTab, setActiveTab] = useState('all')
     const [loading, setLoading] = useState(true)
     const { userData, token } = useContext(UserContext)

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

     const connectX = async () => {
          setXLoading(true)
          try {
               console.log("REached the function")
               const response = await axios.get(`${serverUrl}/auth/twitter/authorize`, {
                    headers: {
                         'Authorization': `Bearer ${token}`
                    },
               });
               console.log("Called API")
               setXLoading(false)
               if (response.data.url) {
                    window.location.href = response.data.url;
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

     const fetchXTweets = async (userId) => {
          setXLoading(true)
          try {
               const response = await axios.get(`${serverUrl}/tweets/twitter/get`, {
                    headers: { 'Authorization': `Bearer ${token}` }
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
               } else {
                    toast.warn("Could not get your feeds.");
               }
          } finally {
               setXLoading(false)
          }
     }

     useEffect(() => {
          const getAccountsStatuses = async () => {
               setLoading(true)
               try {
                    const response = await axios.get(`${serverUrl}/tweets/twitter/status`, { headers: { 'Authorization': `Bearer ${token}` } })
                    console.log(response.data.connectObject)
                    if (response.data.connectObject.XConnect) {
                         setXConnected(true)
                    }
                    if (response.data.connectObject.IGConnect) {
                         setIgConnected(true)
                    }
                    if (response.data.connectObject.FBConnect) {
                         setFaceBookConnected(true)
                    }
                    if (response.data.connectObject.TConnect) {
                         setTelegramConnected(true)
                    }
               } catch (error) {
                    console.warn("Failed to get accounts statuses: ", error)
               } finally {
                    setLoading(false)
               }
          }

          getAccountsStatuses()
     }, [userData])

     useEffect(() => {
          fetchXTweets(userData._id)
     }, [xConnected])

     return (
          <TweetsContext.Provider value={{
               faceBookTweets, igTweets, xTweets, telegramTweets, connectX, xLoading,
               activeTab, setActiveTab, xConnected, faceBookConnected, igConnected, telegramConnected
          }}>
               {children}
          </TweetsContext.Provider>
     )
}
import axios from "axios";
import { createContext, useState } from "react";
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

     const navigate = useNavigate()

     const connectX = async () => {
          const user = JSON.parse(localStorage.getItem("SMD_USER"))
          try {
               const response = await fetch(`${serverUrl}/api/v1/auth/twitter/start`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.userId }),
               });
               const data = await response.json();
               if (data.url) {
                    window.location.href = data.url;
               } else {
                    console.error("Failed to fetch authorization URL.");
               }
          } catch (error) {
               console.error("Failed to start Twitter authentication", error);
          }     
     }

     return (
          <TweetsContext.Provider value={{ faceBookTweets, igTweets, xTweets, telegramTweets, faceBookConnected, igConnected, xConnected, telegramConnected, connectX }}>
               {children}
          </TweetsContext.Provider>
     )
}
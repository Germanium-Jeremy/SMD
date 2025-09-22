import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_SERVER_URL

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
     const [loginLoading, setLoginLoading] = useState(false)
     const [signupLoading, setSignupLoading] = useState(false)
     const [userLoading, setUserLoading] = useState(true)
     const [token, setToken] = useState(null)
     const [userData, setUserData] = useState({})
     const navigate = useNavigate()

     // Login
     const [emailL, setEmailL] = useState('')
     const [passwordL, setPasswordL] = useState('')

     // signup
     const [username, setUsername] = useState('')
     const [firstName, setFirstName] = useState('')
     const [lastName, setLastName] = useState('')
     const [emailR, setEmailR] = useState('')
     const [passwordR, setPasswordR] = useState('')
     const [phone, setPhone] = useState('')
     const [dob, setDob] = useState('')

     const getUserData = async (tokenLocal) => {
          try {
               const response = await axios.get(`${apiUrl}/auth/userData/user`, { headers: { 'Authorization': 'Bearer ' + tokenLocal } })
               setUserData(response.data)
          } catch (error) {
               console.error("Failed to get User Data ", error.response?.data)
               if (error.response.data.status.includes("Token Expired")) {
                    try {
                         const response = await axios.get(`${apiUrl}/auth/refreshToken/user`)
                         console.log(response.data)
                    } catch (erro) {
                         console.warn("Failed to get a new access token: ", erro)
                    }
               }
          }
     }

     const login = async (e) => {
          e.preventDefault()
          setLoginLoading(true)
          try {
               const response = await axios.post(`${apiUrl}/auth/signin/user`, { email: emailL, password: passwordL })
               setToken(response.data.token)
               sessionStorage.setItem("SMD_USER", JSON.stringify(response.data.token))
               setLoginLoading(false)
               await getUserData(response.data.token)
               navigate("/dashboard");
          } catch (error) {
               console.error("Error Login:", error);
               if (error.message && error.message.includes("Network Error")) {
                    toast.warn("Low Network");
               } else if (error.response) {
                    // Server responded with a status code outside the range of 2xx
                    if (error.response.data && error.response.data.error) {
                         toast.warn(error.response.data.error);
                    } else {
                         toast.warn("An error occurred");
                    }
               } else {
                    // Other types of errors
                    toast.warn("An unexpected error occurred");
               }
               setLoginLoading(false)
          }
     }

     const register = async (e) => {
          e.preventDefault()
          setSignupLoading(true)
          try {
               const response = await axios.post(`${apiUrl}/auth/register/user`, { username, firstName, lastName, email: emailR, phone, password: passwordR, birthDate: dob })
               sessionStorage.setItem("SMD_TOKEN", JSON.stringify(response.data.token))
               toast.success(response.data.message)
               setSignupLoading(false)
               await getUserData(response.data.token)
               navigate("/dashboard");  
          } catch (error) {
               console.error("Error: ", error);
               if (error.message && error.message.includes("Network Error")) {
                    toast.warn("Low Network");
               } else if (error.response) {
                    // Server responded with a status code outside the range of 2xx
                    if (error.response.data && error.response.data.error) {
                         toast.warn(error.response.data.error);
                    } else {
                         toast.warn("An error occurred");
                    }
               } else {
                    // Other types of errors
                    toast.warn("An unexpected error occurred");
               }
               setSignupLoading(false)
          }
     }

     useEffect(() => {
          const storedUserToken = JSON.parse(sessionStorage.getItem("SMD_USER"))
          if (storedUserToken) {
               setToken(storedUserToken)
               getUserData(storedUserToken).finally(() => setUserLoading(false))
               setUserLoading(false)
          } else {
               setUserLoading(false)
          }
     }, []) 

     return (
          <UserContext.Provider value={{login, emailL, setEmailL, passwordL, setPasswordL, loginLoading,  register, 
               username, setUsername, firstName, setFirstName, lastName, setLastName, emailR, setEmailR, passwordR, setPasswordR, 
               phone, setPhone, dob, setDob, signupLoading, token, userData
          }}>
               {userLoading ? (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw'}}>
                         <span className={`rounded-full w-[2rem] h-[2rem] border-y-2 border-blue-800 animate-spin`}></span>
                    </div>
               ) : (
                    children
               )}
          </UserContext.Provider>
     )
}

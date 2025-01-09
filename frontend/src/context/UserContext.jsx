import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_APP_SERVER_URL

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
     const [loginLoading, setLoginLoading] = useState(false)
     const [signupLoading, setSignupLoading] = useState(false)
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

     const login = (e) => {
          e.preventDefault()
          setLoginLoading(true)
          try {
               axios.post(`${apiUrl}/auth/signin/user`, { email: emailL, password: passwordL }).then(response => {
                    toast.success(response.data.message)
                    localStorage.setItem("SMD_USER", JSON.stringify(response.data.user))
                    setLoginLoading(false)
                    setTimeout(() => {
                         navigate('/')
                    }, 3000);
               }).catch(error => {
                    if (error.message && error.message.includes("Network Error")) {
                         toast.warn("Low Network");
                    } else if (error.response) {
                         // Server responded with a status code outside the range of 2xx
                         if (error.response.data && error.response.data.error) {
                             toast.warn(error.response.data.error);
                         } else {
                             toast.warn("An error occurred");
                         }
                         console.error("Error Status:", error.response.status);
                    } else {
                         // Other types of errors
                         toast.warn("An unexpected error occurred");
                         console.error("Error:", error);
                    }
                    setLoginLoading(false)
               })
          } catch (error) {
               toast.warn("Error in Login")
               console.log(error)
               setLoginLoading(false)
          }
     }

     const register = (e) => {
          e.preventDefault()
          setSignupLoading(true)
          try {
               axios.post(`${apiUrl}/auth/register/user`, { username, firstName, lastName, email: emailR, phone, password: passwordR, birthDate: dob }).then(response => {
                    localStorage.setItem("SMD_USER", JSON.stringify(response.data.newUser))
                    toast.success(response.data.message)
                    setSignupLoading(false)
                    setTimeout(() => {
                         navigate('/')
                    }, 3000);
               }).catch(error => {
                    if (error.message && error.message.includes("Network Error")) {
                         toast.warn("Low Network");
                    } else if (error.response) {
                         // Server responded with a status code outside the range of 2xx
                         if (error.response.data && error.response.data.error) {
                             toast.warn(error.response.data.error);
                         } else {
                             toast.warn("An error occurred");
                         }
                         console.error("Error Status:", error.response.status);
                    } else {
                         // Other types of errors
                         toast.warn("An unexpected error occurred");
                         console.error("Error:", error);
                    }
                    setSignupLoading(false)
               })
          } catch (error) {
               toast.warn("Error in Login")
               console.log(error)
               setSignupLoading(false)
          }
     }
     return (
          <UserContext.Provider value={{login, emailL, setEmailL, passwordL, setPasswordL, loginLoading,  register, 
               username, setUsername, firstName, setFirstName, lastName, setLastName, emailR, setEmailR, passwordR, setPasswordR, 
               phone, setPhone, dob, setDob, signupLoading}}>
               {children}
          </UserContext.Provider>
     )
}

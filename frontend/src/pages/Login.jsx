import React, { useContext } from 'react'
import Logo from '../assets/images/SMD.png'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Login = () => {
     const { login, emailL, setEmailL, passwordL, setPasswordL, loginLoading } = useContext(UserContext)
     return (
          <form className={`flex flex-col flex-1 justify-center items-center py-[3rem] max-[330px]:py-[1rem] sm:py-[6rem] lg:py-[5rem] px-[1rem] sm:px-[6rem] lg:px-[16rem]`} onSubmit={login}>
               <img src={Logo} alt="SMD" className={`w-20 max-[330px]:w-10 h-20 max-[330px]:h-10`} />
               <p className={`text-lg font-bold mt-[2rem] max-[330px]:mt-[1rem]`}>Please Login To SMD!</p>
               <p className={`text-sm`}>Organise your content.</p>
               <div className={`bg-blue-50 w-full mt-[3rem] max-[330px]:mt-[2rem] px-[2rem] max-[330px]:px-[1.5rem] py-[1rem] max-[330px]:py-[.5rem] flex flex-col`} style={{ borderRadius: "60px" }}>
                    <label htmlFor="emailLogin" className={`text-gray-700 font-light`}>Email</label>
                    <input type="email" id="emailLogin" className={`w-full border-none outline-none bg-transparent`} onChange={(e) => {
                         setEmailL(e.target.value)
                    }} value={emailL} placeholder='example@email.xxx' required />
               </div>
               <div className={`bg-blue-50 w-full mt-[1rem] max-[330px]:mt-[.5rem] px-[2rem] max-[330px]:px-[1.5rem] py-[1rem] max-[330px]:py-[.5rem] flex flex-col`} style={{ borderRadius: "60px" }}>
                    <label htmlFor="passLogin" className={`text-gray-700 font-light`}>Passowrd</label>
                    <input type="password" id="passLogin" className={`w-full border-none outline-none bg-transparent`} onChange={(e) => {
                         setPasswordL(e.target.value)
                    }} value={passwordL} placeholder='password' required />
               </div>
               <div className={`px-[1rem] w-full`}>
                    {loginLoading ? (<button disabled className={`text-white bg-gray-500 rounded-lg max-[330px]:text-sm py-[.8rem] max-[330px]:py-[.5rem] sm:py-[1rem] mt-[3rem] text-center text-xl sm:text-2xl w-full`}>Wait</button>) : (
                         <button type='submit' className={`text-white bg-blue-900 rounded-lg max-[330px]:text-sm py-[.8rem] max-[330px]:py-[.5rem] sm:py-[1rem] mt-[3rem] text-center text-xl sm:text-2xl font-semibold hover:bg-blue-700 w-full`}>Login</button>
                    )}
                    <p className={`text-center font-semibold text-sm mt-[1rem]`}>Don't Have Account? <Link to={'/signup'} className={`text-blue-900`}>Register</Link></p>
               </div>
          </form>
     )
}

export default Login

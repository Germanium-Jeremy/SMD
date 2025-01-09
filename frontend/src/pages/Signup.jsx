import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/SMD.png'
import { UserContext } from '../context/UserContext'

const Signup = () => {
     const [firstPhase, setFirstPhase] = useState(true)
     const [secondPhase, setSecondPhase] = useState(false)
     const [finalPhase, setFinalPhase] = useState(false)
     const { register, username, setUsername, firstName, setFirstName, lastName, setLastName, emailR, setEmailR, passwordR, setPasswordR, phone, setPhone, dob, setDob, signupLoading } = useContext(UserContext)
     return (
          <form className={`flex flex-col flex-1 justify-center items-center py-[3rem] max-[330px]:py-[1rem] sm:py-[6rem] lg:py-[4rem] px-[1rem] sm:px-[6rem] lg:px-[16rem]`} onSubmit={register}>
               <img src={Logo} alt="SMD" className={`w-20 max-[330px]:w-10 h-20 max-[330px]:h-10`} />
               <p className={`text-lg font-bold mt-[2rem] max-[330px]:mt-[1rem]`}>Please Register To SMD!</p>
               <p className={`text-sm`}>Organise your content.</p>
               <div className={`flex w-full relative`}>
                    <div className={`flex flex-col w-full px-0 py-0 absolute pb-[3rem] ${firstPhase ? "left-0 right-0" : "right-[200%] left-[-200%]"}`}>
                         <div className={`bg-blue-50 w-full mt-[3rem] max-[330px]:mt-[2rem] px-[2rem] max-[330px]:px-[1.5rem] py-[1rem] max-[330px]:py-[.5rem] flex flex-col`} style={{ borderRadius: "60px" }}>
                              <label htmlFor="firstName" className={`text-gray-700 font-light`}>First Name</label>
                              <input type="text" id="firstName" className={`w-full border-none outline-none bg-transparent`} placeholder='John' required onChange={(e) => {
                                   setFirstName(e.target.value)
                              }} value={firstName} />
                         </div>
                         <div className={`bg-blue-50 w-full mt-[1rem] max-[330px]:mt-[.5rem] px-[2rem] max-[330px]:px-[1.5rem] py-[1rem] max-[330px]:py-[.5rem] flex flex-col`} style={{ borderRadius: "60px" }}>
                              <label htmlFor="lastName" className={`text-gray-700 font-light`}>Last Name</label>
                              <input type="text" id="lastName" className={`w-full border-none outline-none bg-transparent`} placeholder='Doe' required onChange={(e) => {
                                   setLastName(e.target.value)
                              }} value={lastName} />
                         </div>
                         <div className={`bg-blue-50 w-full mt-[1rem] max-[330px]:mt-[.5rem] px-[2rem] max-[330px]:px-[1.5rem] py-[1rem] max-[330px]:py-[.5rem] flex flex-col`} style={{ borderRadius: "60px" }}>
                              <label htmlFor="username" className={`text-gray-700 font-light`}>User Name</label>
                              <input type="text" id="username" className={`w-full border-none outline-none bg-transparent`} placeholder='John250' required onChange={(e) => {
                                   setUsername(e.target.value)
                              }} value={username} />
                         </div>
                         <div className={`px-[1rem] w-full`}>
                              <div className={`flex w-full gap-[2rem]`}>
                                   <button type='button' className={`text-white bg-blue-900 rounded-lg max-[330px]:text-sm py-[.8rem] max-[330px]:py-[.5rem] sm:py-[1rem] mt-[3rem] max-[330px]:mt-[1.5rem] text-center text-xl sm:text-2xl font-semibold hover:bg-blue-700 w-full`} onClick={() => {
                                        setFirstPhase(false)
                                        setSecondPhase(true)
                                   }}>Continue</button>
                              </div>
                              <p className={`text-center font-semibold text-sm mt-[1rem]`}>Have Account? <Link to={'/login'} className={`text-blue-900`}>Signin</Link></p>
                         </div>
                    </div>
                    <div className={`flex flex-col w-full px-0 py-0 absolute ${secondPhase ? "left-0 right-0" : "right-[200%] left-[-200%]"}`}>
                         <div className={`bg-blue-50 w-full mt-[3rem] max-[330px]:mt-[2rem] px-[2rem] max-[330px]:px-[1.5rem] py-[1rem] max-[330px]:py-[.5rem] flex flex-col`} style={{ borderRadius: "60px" }}>
                              <label htmlFor="emailSignup" className={`text-gray-700 font-light`}>Email</label>
                              <input type="email" id="emailSignup" className={`w-full border-none outline-none bg-transparent`} placeholder='example@email.xxx' required onChange={(e) => {
                                   setEmailR(e.target.value)
                              }} value={emailR} />
                         </div>
                         <div className={`bg-blue-50 w-full mt-[1rem] max-[330px]:mt-[.5rem] px-[2rem] max-[330px]:px-[1.5rem] py-[1rem] max-[330px]:py-[.5rem] flex flex-col`} style={{ borderRadius: "60px" }}>
                              <label htmlFor="passSignup" className={`text-gray-700 font-light`}>Passowrd</label>
                              <input type="password" id="passSignup" className={`w-full border-none outline-none bg-transparent`} placeholder='password' required onChange={(e) => {
                                   setPasswordR(e.target.value)
                              }} value={passwordR} />
                         </div>
                         <div className={`px-[1rem] w-full`}>
                              <div className={`w-full flex gap-[1rem]`}>
                                   <button className={`text-white bg-blue-900 rounded-lg max-[330px]:text-sm py-[.8rem] max-[330px]:py-[.5rem] sm:py-[1rem] mt-[3rem] max-[330px]:mt-[1.5rem] text-center text-xl sm:text-2xl font-semibold hover:bg-blue-700 w-full`} onClick={() => {
                                        setSecondPhase(false)
                                        setFirstPhase(true)
                                   }} type='button'>Back</button>
                                   <button className={`text-white bg-blue-900 rounded-lg max-[330px]:text-sm py-[.8rem] max-[330px]:py-[.5rem] sm:py-[1rem] mt-[3rem] max-[330px]:mt-[1.5rem] text-center text-xl sm:text-2xl font-semibold hover:bg-blue-700 w-full`} onClick={() => {
                                        setSecondPhase(false)
                                        setFinalPhase(true)
                                   }} type='button'>Continue</button>
                              </div>
                              <p className={`text-center font-semibold text-sm mt-[1rem]`}>Have Account? <Link to={'/login'} className={`text-blue-900`}>Signin</Link></p>
                         </div>
                    </div>
                    <div className={`flex flex-col w-full px-0 py-0 absolute ${finalPhase ? "left-0 right-0" : "right-[200%] left-[-200%]"}`}>
                         <div className={`bg-blue-50 w-full mt-[3rem] max-[330px]:mt-[2rem] px-[2rem] max-[330px]:px-[1.5rem] py-[1rem] max-[330px]:py-[.5rem] flex flex-col`} style={{ borderRadius: "60px" }}>
                              <label htmlFor="phone" className={`text-gray-700 font-light`}>Phone Number</label>
                              <input type="text" id="phone" className={`w-full border-none outline-none bg-transparent`} placeholder='250 790 000 000' required onChange={(e) => {
                                   setPhone(e.target.value)
                              }} value={phone} />
                         </div>
                         <div className={`bg-blue-50 w-full mt-[1rem] max-[330px]:mt-[.5rem] px-[2rem] max-[330px]:px-[1.5rem] py-[1rem] max-[330px]:py-[.5rem] flex flex-col`} style={{ borderRadius: "60px" }}>
                              <label htmlFor="dob" className={`text-gray-700 font-light`}>Birth Date</label>
                              <input type="date" id="dob" className={`w-full border-none outline-none bg-transparent`} required onChange={(e) => {
                                   setDob(e.target.value)
                              }} value={dob} />
                         </div>
                         <div className={`px-[1rem] w-full`}>
                              <div className={`w-full flex gap-[1rem]`}>
                                   <button className={`text-white bg-blue-900 rounded-lg max-[330px]:text-sm py-[.8rem] max-[330px]:py-[.5rem] sm:py-[1rem] mt-[3rem] max-[330px]:mt-[1.5rem] text-center text-xl sm:text-2xl font-semibold hover:bg-blue-700 w-full`} onClick={() => {
                                        setSecondPhase(true)
                                        setFinalPhase(false)
                                   }} type='button'>Back</button>
                                   {signupLoading ? (<button disabled className={`text-white bg-gray-500 rounded-lg max-[330px]:text-sm py-[.8rem] max-[330px]:py-[.5rem] sm:py-[1rem] mt-[3rem] text-center text-xl sm:text-2xl w-full`}>Wait</button>) : (
                                   <button type='submit' className={`text-white bg-blue-900 rounded-lg max-[330px]:text-sm py-[.8rem] max-[330px]:py-[.5rem] sm:py-[1rem] mt-[3rem] max-[330px]:mt-[1.5rem] text-center text-xl sm:text-2xl font-semibold hover:bg-blue-700 w-full`}>Register</button>
                                   )}
                              </div>
                              <p className={`text-center font-semibold text-sm mt-[1rem]`}>Have Account? <Link to={'/login'} className={`text-blue-900`}>Signin</Link></p>
                         </div>
                    </div>
               </div>
          </form>
     )
}

export default Signup

import { useContext, useEffect } from 'react'
import socialMedia from '../assets/data/socialMedia'
import Logo from '../assets/images/SMD.png'
import { TweetsContext } from '../context/TweetsContext'
import { FaUserCog } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const SideMenuDashboard = () => {
     const { activeTab, setActiveTab } = useContext(TweetsContext)
     const navigate = useNavigate()

     useEffect(() => {
          navigate(`/dashboard/${activeTab}`)
          console.log("Active tab: ", activeTab)
     }, [activeTab])

     return (
          <div className={`fixed left-0 top-0 h-full w-16 md:w-[14rem] bg-gray-800 text-white flex flex-col z-[1] pt-[1rem]`}>
               <div className={`px-[1rem] border-b border-gray-700 pb-[1rem]`}>
                    <h1 className={`text-xl font-bold hidden md:block`}>SMD</h1>
                    <img src={Logo} alt="SMD" className={`w-10 h-10 md:hidden`} loading='lazy' />
               </div>

               <nav className={`flex-1 mt-6`}>
                    {socialMedia.map(({ id, icon, name, color }) => (
                         <button key={id} onClick={() => setActiveTab(id)} className={`flex items-center w-full px-[1rem]
                              py-[.75rem] text-left transition-colors ${activeTab === id ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                         }>
                              <span className={color}>{icon}</span>
                              <span className={`hidden md:inline`}>{ name }</span>
                         </button>
                    ))}

                    <button
                         className={`flex items-center w-full px-[1rem] py-[.75rem] text-left ${activeTab === 'account' ? 'bg-gray-700' : 'hover:bg-gray-700'} transition-colors mt-auto`}
                         onClick={() => setActiveTab('account')}
                    >
                         <FaUserCog className={`mr-2 text-2xl`} />
                         <span className={`hidden md:inline`}>Account</span>
                    </button>
               </nav>
          </div>
     )
}

export default SideMenuDashboard
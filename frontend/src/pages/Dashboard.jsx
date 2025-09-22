import Footer from '../components/Footer'
import { Outlet, useSearchParams } from 'react-router-dom'
import SideMenuDashboard from '../components/SideMenuDashboard'

const Dashboard = () => {
     // const [searchParams] = useSearchParams()
     // const status = searchParams.get('status')
     // if (status == "success") {
     //      toast.success("Connected to X")
     // }
     return (
          <div className={`pt-[1rem] lg:pt-[2rem] bg-gray-100 min-h-screen`}>
               <SideMenuDashboard />
               <div className={`ml-[4rem] md:ml-[14rem]`}>
                    <Outlet />
               </div>
               {/* <Footer /> */}
          </div>
     )
}

export default Dashboard

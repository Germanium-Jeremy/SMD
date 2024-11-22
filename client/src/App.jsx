import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
import { UserProvider } from './context/UserContext'
import 'react-toastify/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import { TweetsProvider } from './context/TweetsContext'
import { useEffect, useState } from 'react'

function App() {
  const [logedInUser, setLogedInUser] = useState(null)
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("SMD_USER"))) {
      setLogedInUser(JSON.parse(localStorage.getItem("SMD_USER")))
    } 
  }, [])

  return (
    <>
    
      <Router>
        <div>
          <UserProvider>
            <TweetsProvider>
              <Routes>
                <Route path='/' element={ !logedInUser ? <Landing /> : <Dashboard /> } />
                <Route path='/dashboard' element={ logedInUser ? <Dashboard /> : <Login /> } />
                <Route path='/login' element={ !logedInUser ? <Login /> : <Dashboard /> } />
                <Route path='/signup' element={ !logedInUser ? <Signup /> : <Dashboard /> } />
              </Routes>
            </TweetsProvider>
          </UserProvider>
        </div>
      </Router>
    
    <ToastContainer hideProgressBar />
    </>
  )
}

export default App

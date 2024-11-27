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
import AllTweets from './components/AllTweets'
import FaceBooksTweets from './components/FaceBooksTweets'
import XTweets from './components/XTweets'
import IGTweets from './components/IGTweets'
import TelegramTweets from './components/TelegramTweets'
import Account from './components/Account'
import Missing from './pages/Missing'

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
                {/* <Route path='/landing' element={ !logedInUser ? <Landing /> : <Dashboard /> } /> */}
                <Route path='/' element={ logedInUser ? <Dashboard /> : <Landing /> }>
                  <Route path='' element={ <AllTweets /> } />
                  <Route path='facebook' element={ <FaceBooksTweets /> } />
                  <Route path='x' element={ <XTweets /> } />
                  <Route path='ig' element={ <IGTweets /> } />
                  <Route path='telegram' element={ <TelegramTweets /> } />
                  <Route path='account' element={ <Account /> } />
                </Route>
                <Route path='/login' element={ !logedInUser ? <Login /> : <Dashboard /> } />
                <Route path='/signup' element={ !logedInUser ? <Signup /> : <Dashboard /> } />
                <Route path='*' element={ <Missing /> } />
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

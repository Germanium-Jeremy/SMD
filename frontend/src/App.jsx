import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";
import "react-toastify/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import { TweetsProvider } from "./context/TweetsContext";
import FaceBooksTweets from "./components/FaceBooksTweets";
import XTweets from "./components/XTweets";
import IGTweets from "./components/IGTweets";
import TelegramTweets from "./components/TelegramTweets";
import Account from "./components/Account";
import Missing from "./pages/Missing";
import All from "./Dashboard/All";

function App() {
     return (
          <>
               <Router>
                    <UserProvider>
                         <TweetsProvider>
                              <Routes>
                                   <Route path="/" element={ <Landing />} />
                                   <Route path="/dashboard" element={<Dashboard />}>
                                        <Route index element={ <All /> } />
                                        <Route path='all' element={ <All /> } />
                                        <Route path="facebook" element={<FaceBooksTweets />} />
                                        <Route path="x" element={<XTweets />} />
                                        <Route path="instagram" element={<IGTweets />} />
                                        <Route path="telegram" element={<TelegramTweets />} />
                                        <Route path="account" element={<Account />} />
                                   </Route>
                                   <Route path="/login" element={ <Login /> } />
                                   <Route path="/signup" element={ <Signup /> } />
                                   <Route path="*" element={<Missing />} />
                              </Routes>
                         </TweetsProvider>
                    </UserProvider>
               </Router>

               <ToastContainer hideProgressBar />
          </>
     );
}

export default App;

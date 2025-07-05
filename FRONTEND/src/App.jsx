import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignUp'
import UserHome from './pages/UserHome'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import CaptainLogout from './pages/CaptainLogout'
import CaptainRiding from './components/CaptainRiding'
Routes

const App = () => {
  return (

    <div >
   <div>
   <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/captain-login' element={<CaptainLogin />} />
      <Route path='/captain-signup' element={<CaptainSignup />} />
      <Route path='/captain-riding' element={<CaptainRiding/>} />
      <Route path='/login' element={<UserLogin/>} />
      <Route path='/signup' element={<UserSignUp/>} />
      <Route path ='/userHome' element={<UserProtectWrapper><UserHome/></UserProtectWrapper>} />
      <Route path = '/userHome/logout' element={<UserProtectWrapper><UserLogout/></UserProtectWrapper>} />
      <Route path='/captainHome' element={<CaptainProtectedWrapper><CaptainHome/></CaptainProtectedWrapper>} />
      <Route path = '/captainHome/logout' element={<UserProtectWrapper><CaptainLogout/></UserProtectWrapper>} />

    </Routes>
    
   </div>
    </div>
  )
}

export default App
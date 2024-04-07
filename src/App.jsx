import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import { GoogleLogin } from '@react-oauth/google'
import Profile from './pages/Profile'
// import Home from './pages/Home'



function App() {
 

  return (
    <>
  
    <Routes>
      <Route path='/' element={<Auth/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth insideRegister/>}/>
      <Route path='/profile' element={<Profile/>}/>

    
      <Route path='/*' element={<Navigate to={'/'} />}/>
    </Routes>
 
    </>
  )
}

export default App

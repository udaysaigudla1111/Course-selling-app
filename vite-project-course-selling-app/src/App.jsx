import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import AppBar from './Components/AppBar';
const App = () => {
  return (
   <>
  
   <Router>
     <AppBar />
    <Routes>
      <Route path='/admin/login' element={<SignIn/>} />
      <Route path='/admin/signup' element={<SignUp/>} />
    </Routes>
   </Router>
   </>
  )
}

export default App
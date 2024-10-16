import React,{useState,useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import AppBar from './Components/AppBar';
import AddCourse from './Components/AddCourse';
import AdminCourses from './Components/AdminCourses';
const App = () => {

    let [isAuthenticated,setIsAuthenticated] = useState(false)

    useEffect(()=>{

      const token = localStorage.getItem("token")
      token?setIsAuthenticated(true):setIsAuthenticated(false)      

    },[])   // call only at component mounts

    console.log(isAuthenticated);
    
  return (
   <>
  
   <Router>
     <AppBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    <Routes>
      <Route path='/' element={isAuthenticated? <AddCourse />: <Navigate to="/admin/signup" /> }/>
      <Route path='/admin/signin'  element={isAuthenticated? <Navigate to="/admin/addcourse" /> :<SignIn setIsAuthenticated={setIsAuthenticated}/>} />
      <Route path='/admin/signup' element={isAuthenticated? <Navigate to="/admin/addcourse" /> :<SignUp/>} />
       <Route path='/admin/courses' element={isAuthenticated?<AdminCourses />: <Navigate to="/admin/signup" /> } /> 
      <Route path="/admin/addcourse" element={isAuthenticated?<AddCourse />:<Navigate to="/admin/signup" />} />
     
    </Routes>
   </Router>
   </>
  )
}

export default App
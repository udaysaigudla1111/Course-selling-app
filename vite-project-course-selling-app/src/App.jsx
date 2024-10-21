import React,{useState,useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from './Components/SignUp'
import SignIn from './Components/SignIn'
import AppBar from './Components/AppBar';
import AddCourse from './Components/AddCourse';
import AdminCourses from './Components/AdminCourses';
import UserSignUp from './Components/UserSignUp';
import UserSignIn from './Components/UserSignIn';
import Preview from './Components/Preview'
import PurchasesCourses from './Components/PurchasesCourses';
const App = () => {

  console.log("app component");


  
    let [authStatus,setAuthStatus] = useState('none')  // 'admin' 'user'
    let [authMode,setAuthMode] = useState('') // 'user' 'admin'

    useEffect(()=>{

      const userToken = localStorage.getItem("user-token")
      const adminToken = localStorage.getItem("admin-token")
      if(adminToken)
      {
          setAuthStatus('admin')
          setAuthMode('admin')
      }
      else if(userToken)
      {
          setAuthStatus('user')
          setAuthMode('user')
      }
         

    },[])   // call only at component mounts

   
    
  return (
   <>
  
   <Router>
     <AppBar  authStatus={authStatus} setAuthStatus={setAuthStatus} authMode={authMode} setAuthMode={setAuthMode} />
    <Routes>
      <Route path='/' element={authStatus==='none'||authStatus==='user'? <Navigate to="/preview" />: authStatus==='admin'? <Navigate to="/admin/addcourse" />:<></>} />
      <Route path='/admin/signin'  element={authStatus==='none'&&authMode==='admin'? <SignIn setAuthStatus={setAuthStatus} setAuthMode={setAuthMode} /> : authStatus==='admin'?  <Navigate to="/admin/addcourse" />:<></>} />
      <Route path='/admin/signup' element={authStatus==='none'&&authMode==='admin'? <SignUp/> :authStatus==='admin'?<Navigate to="/admin/addcourse"/>:authStatus==='none'&&authMode===''?<Navigate to="/preview"  />:<></>} />
       <Route path='/admin/courses' element={authStatus==='admin'&&authMode==='admin'?<AdminCourses />: <Navigate to="/admin/signup" /> } /> 
      <Route path="/admin/addcourse" element={authStatus==='admin'?<AddCourse />:authStatus==='none'&&authMode===''?<Navigate to="/preview"></Navigate>:<Navigate to="/admin/signup" />} />

        
       <Route path="/user/signup" element={authStatus==='none'&&authMode==='user'?<UserSignUp/>:authStatus==='user'&&<Navigate to="/preview" />} /> 
       <Route path='/user/signin' element={authStatus==='none'&&authMode==='user'?<UserSignIn setAuthStatus={setAuthStatus} setAuthMode={setAuthMode}  />:<Navigate to="/preview" />} /> 
        <Route path="/user/purchased" element={authStatus==='none'&&authMode===''?<Navigate to="/preview"/>:authStatus==='user'&&<PurchasesCourses />}  />
        <Route path='/preview' element={authStatus==='none'||authStatus==='user'?<Preview authStatus={authStatus} setAuthMode={setAuthMode} />:authStatus==='admin'?<Navigate to="/admin/addcourse" />:<></> } />

    </Routes>
   </Router>
   </>
  )
}

export default App
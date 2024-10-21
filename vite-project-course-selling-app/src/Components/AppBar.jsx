import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { useLocation } from 'react-router-dom'

const AppBar = ({authStatus,setAuthStatus,authMode,setAuthMode}) => {

  
  
  let [email,setEmail] = useState("")

  const location = useLocation();
  
  console.log(location.pathname);
  

  useEffect(()=>{
    const getAdmin = async ()=>{
        if(authStatus!=='none'&&authMode!=='')
        {
          console.log(authMode);
          
          try{
            const response = await axios.get(`http://localhost:3000/api/v1/${authMode}/me`,{
              headers:{
                token:localStorage.getItem(`${authMode}-token`)
              }
            })

            console.log(response.data.email);
           
              setEmail(response.data.email)
          }
          catch(error)
          {
            console.log(error);
            
          }

        }else{
          console.log("in the appbar use effect");
          
        }
    }

    getAdmin();
  },[authStatus,authMode])

  
 

  const navigate = useNavigate()
  return (
    <div className=' bg-blue-500 flex h-[10vh] justify-between items-center p-4'>
        <div className='text-xl font-medium text-white'>
            Coursera
        </div>
         <div className="text-2xl font-medium text-white">
          A GREAT LEARNING PLACE
        </div>
        <div className='flex justify-center items-center gap-3'>
          
            {(location.pathname==='/preview')&&authStatus==='none'&&<>
             <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75' onClick={()=>{setAuthMode("admin"); navigate("/admin/signup") }} >ADMIN</button>
          <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75' onClick={()=>{setAuthMode("user"); navigate("/user/signup")}} >USER</button>
          </>}

          {
            authMode==='admin'&&authStatus==='none'&&location.pathname!=='/preview'&&<>
            <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75' onClick={()=>{navigate("/admin/signup")}}>ADMIN SIGNUP</button>
          <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75'  onClick={()=>{navigate("/admin/signin")}} >ADMIN SIGNIN</button>
            </>}
          

           {
            authMode==='user'&&authStatus==='none'&&location.pathname!=="/preview"&&<>
            <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75' onClick={()=>{navigate("/user/signup")}}  >USER SIGNUP</button>
          <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75' onClick={()=>{navigate("/user/signin")}} >USER SIGNIN</button>
            </>
          }

          {
            authStatus==='admin'&&authMode==='admin'&&<>
             <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75'  >{email}</button>
          <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75' onClick={()=>{navigate("/admin/courses")}}  >ADMIN courses</button>
           <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75' onClick={()=>{localStorage.setItem("admin-token",""); setAuthStatus('none'); setAuthMode('') }} >LogOut</button>
        
            </>

          }

           {
            authStatus==='user'&&<>
             <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75'  >{email}</button>
          <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75'  >PURCHASED COURSES</button>
           <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75' onClick={()=>{localStorage.setItem("user-token",""); setAuthMode(''); setAuthStatus('none') }} >LogOut</button>
        
            </>

          }
            

        </div>
        </div>
  )
}

export default AppBar
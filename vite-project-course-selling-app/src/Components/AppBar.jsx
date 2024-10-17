import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const AppBar = ({isAuthenticated,setIsAuthenticated}) => {

  let [email,setEmail] = useState("")
  let [loading,setLoading] = useState(false)

  useEffect(()=>{
    const getAdmin = async ()=>{
        if(isAuthenticated)
        {
          setLoading(true)
          try{
            const response = await axios.get("http://localhost:3000/api/v1/admin/me",{
              headers:{
                token:localStorage.getItem("token")
              }
            })

            console.log(response.data.email);
            setLoading(false)
              setEmail(response.data.email)
          }
          catch(error)
          {
            console.log(error);
            
          }

        }else{
          setEmail("")
        }
    }

    getAdmin();
  },[isAuthenticated])

  const Logout = ()=>{
      localStorage.setItem("token","")
      setIsAuthenticated(false)
  }

  const navigate = useNavigate()
  return (
    <div className=' bg-violet-500 flex h-[10vh] justify-between items-center p-4'>
        <div className='text-xl font-medium text-white'>
            Coursera
        </div>
        <div className='flex justify-center items-center gap-3'>
           {!email? <> <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75' onClick={()=>{navigate("/admin/signup")}}>SignUp</button>
            <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75' onClick={()=>{navigate("/admin/signin")}}>SignIn</button> </>  : <>
            <h1 className='text-white bg-black px-4 py-2 rounded-xl  font-bold mr-2 text-2xl  '>{loading?<svg className="animate-spin h-7 w-7 mr-3  text-white-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>:email}</h1>
            <button className='bg-red-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75' onClick={Logout} >{loading?<svg className="animate-spin h-7 w-7 mr-3  text-white-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>:'Logout'}</button>
            <button onClick={()=>{navigate("/admin/courses")}}>All Courses of {email}</button>
            </> }
        </div>
        </div>
  )
}

export default AppBar
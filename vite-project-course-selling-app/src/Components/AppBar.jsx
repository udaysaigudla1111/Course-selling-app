import React from 'react'
import { useNavigate } from 'react-router-dom'

const AppBar = () => {
  const navigate = useNavigate()
  return (
    <div className=' bg-blue-500 flex h-[10vh] justify-between items-center p-4'>
        <div className='text-xl font-medium text-white'>
            Coursera
        </div>
        <div className='flex justify-center items-center gap-3'>
            <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75' onClick={()=>{navigate("/admin/signup")}}>SignUp</button>
            <button className='bg-orange-500 px-4 py-2 rounded-xl text-xl font-medium text-white hover:bg-orange-400 active:scale-[0.98] hover:scale-[1.01] active:duration-75' onClick={()=>{navigate("/admin/login")}}>SignIn</button>
        </div>
        </div>
  )
}

export default AppBar
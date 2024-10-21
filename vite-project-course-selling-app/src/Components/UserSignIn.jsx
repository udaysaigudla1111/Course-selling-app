import React,{useState} from 'react'
import axios from 'axios'

const UserSignIn = ({setAuthMode,setAuthStatus}) => {
   let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  console.log("in the signin component");
  
  const submitSignIn = async ()=>{

      try {

        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
          email,
          password
        })

        if(response.data.message)
        {
            alert("PLEASE ENTER THE DETAILS PROPERLY")
            return;
        }
     
        console.log(response.data.token);
        localStorage.setItem("user-token",response.data.token)
       setAuthMode('user')
       setAuthStatus('user')
        setEmail("")
        setPassword("")


      } catch (error) {
        console.log(error); 
      }

  }

  return (
    <div className='h-[90vh] overflow-hidden w-full flex flex-col items-center justify-start bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]'>
        <h1 className='text-2xl mb-4 mt-24 font-medium'>Welcome back to Coursera. SignIn below</h1>
    <div className='flex flex-col justify-center gap-3 rounded-xl shadow-lg w-[520px] h-[39vh] p-8 bg-white'>
        <div>
        <input type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="email" className='w-full p-4 border-2 border-gray-100 rounded-xl bg-transparent' placeholder='Enter Email' />
        </div>
         <div>
        <input type="password" name="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className='w-full p-4 border-2 border-gray-100 rounded-xl mt-4 bg-transparent' placeholder='Enter Password'/>
        </div> 
        <div>
            <button className='mt-5 text-xl rounded-xl px-4 py-2 text-white bg-blue-500 hover:bg-blue-400 active:scale-[0.98] hover:scale-[1.01] ease-in-out transition-all active:duration-75' onClick={submitSignIn}>
                SignIn
            </button>
        </div>
    </div>
  </div>
  )
}

export default UserSignIn
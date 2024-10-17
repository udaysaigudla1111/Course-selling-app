import React,{useState} from 'react'
import AppBar from './AppBar'
import axios from 'axios'

const SignUp = () => {

  let [email,setEmail] = useState("");
  let [password,setPassword] = useState("")
  let [firstName,setFirstName] = useState("")
  let [lastName,setLastName] = useState("")

  console.log("In the signup component");
  

   const submitSignUp = async()=>{
    try
    {
      const response = await axios.post("http://localhost:3000/api/v1/admin/signup",{
        email,
        password,
        firstName,
        lastName
    })

      console.log(response.data);
      
      alert(response.data.message)

      console.log("In the signup");
      

    }
    catch(error)
    {
        console.log(error);
        
    }
    
    setEmail("")
    setPassword("")
    setFirstName("")
    setLastName("")

   }

  return (
    <>
      {/* <AppBar />  THIS APPBAR COMPONENT IS COMMON FOR BOTH THE SIGNIN AND SIGNUP SO WE PUT ABOVE THE ROUTER */}
  <div className='h-[90vh] min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]'>
        <h1 className='text-2xl mb-4 mt-24 font-medium'>Welcome back to Coursera. SignUp below</h1>
    <div className='flex flex-col justify-center gap-2 rounded-xl shadow-lg w-[520px] h-[59vh] p-8 bg-white'>
        <div>
        <input type="email" name="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className='w-full p-4 border-2 border-gray-100 rounded-xl bg-transparent' placeholder='Enter Email' />
        </div>
         <div>
        <input type="password" name="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className='w-full p-4 border-2 border-gray-100 rounded-xl mt-4 bg-transparent' placeholder='Enter Password'/>
        </div>
            <div>
        <input type="firstName" name="firstName" id="firstName" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} className='w-full p-4 border-2 border-gray-100 rounded-xl mt-4 bg-transparent' placeholder='Enter FirstName'/>
        </div>
          <div>
        <input type="lastName" name="lastName" id="lastName" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} className='w-full p-4 border-2 border-gray-100 rounded-xl mt-4 bg-transparent' placeholder='Enter LastName'/>
        </div>
        <div>
            <button className='mt-5 text-xl rounded-xl px-4 py-2 text-white bg-blue-500 hover:bg-blue-400 active:scale-[0.98] hover:scale-[1.01] ease-in-out transition-all active:duration-75' onClick={submitSignUp} >
                SignUp
            </button>
        </div>
    </div>
  </div>
  </>
  )
}

export default SignUp
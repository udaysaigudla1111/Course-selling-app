import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const AllCoursesCards = ({course,authStatus,setAuthMode}) => {

    const navigate = useNavigate();
    const CourseBuy = async ()=>{

        if(authStatus==='none')
        {   
            setAuthMode('user')
            navigate("/user/signup")
        }else
        {
            let courseId = course._id;
            console.log(courseId);
            
            try {
                 const response = await axios.post("http://localhost:3000/api/v1/course/purchase",{
                courseId
            },{
                headers:{
                    token:localStorage.getItem("user-token")
                }
            })
            console.log(response.data.message);
            alert(response.data.message)

            }
             catch (error) {
                alert("USER ALREADY PURCHASED THE COURSE")
                console.log(error);
                
            }
           
            
        }
    }

  return (
    <div className='bg-white rounded-2xl shadow-lg px-3 pt-3 hover:scale-105 duration-1000'>      
       <div className='overflow-hidden'>
        <img src={course.imageUrl} alt="" className='w-full object-cover h-44 hover:scale-125 duration-1000 rounded-t-xl' />
       </div>
       <div>
        <div className='text-center text-xl font-semibold py-2'>
            {course.title}
        </div>
        <div className='text-xl font-mono mb-2'>
            Author: {course.createrId.firstName} {course.createrId.lastName} 
        </div>
        <div className='text-gray-600 text-lg mb-2'>
            {course.description}
        </div>
        <div className='text-xl pb-2'>
            {course.price}
        </div>
        <button className='px-4 py-2 bg-green-500 rounded-xl mb-2 text-white hover:bg-green-600 hover:scale-[1.01] active:scale-[0.98] active:duration-75' onClick={CourseBuy} >Buy Now!!</button>
       </div>
    </div>
  )
}

export default AllCoursesCards
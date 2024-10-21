import React,{useState,useEffect} from 'react'
import AllCoursesCards from './AllCoursesCards'
import axios from 'axios'

const Preview = ({authStatus,setAuthMode}) => {

    let [allCourses,setAllCourses] = useState([])
    let [loading,setLoading] = useState(false)
    console.log("in the preview component");
    
    useEffect(()=>{
        const getAllCourses = async ()=>{
            setLoading(true)
            const response = await axios.get("http://localhost:3000/api/v1/course/preview")

            setLoading(false)
            setAllCourses(response.data.AllCourses)

        }

        getAllCourses();
    },[])

  return (

    <div className='h-auto min-h-[90vh]  bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]'>
        <div className='flex justify-center items-center text-2xl font-mono pt-4'> Total Courses We Provide </div>
        <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-3 p-4  '>
           {!loading?    
            allCourses.map((course)=>{
                return <AllCoursesCards key={course._id} course={course} authStatus={authStatus} setAuthMode={setAuthMode} />
            })
            :
            <>
            <div className='flex justify-center items-center h-[60vh] w-[1620px]'>
                <div className="flex justify-center items-center ">
                 <div className="animate-spin rounded-full h-60 w-60 border-4 border-t-4 border-gray-200 border-t-blue-500"></div>
                </div>
            </div>
            </>

           }
        </div>  
    </div>
  )
}

export default Preview
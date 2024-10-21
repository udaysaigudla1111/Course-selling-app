import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import CourseCard from './CourseCard';
import Modal from './Modal';

const AdminCourses = () => {

    console.log("in the admin courses component");
    let [courses,setCourses] = useState([])
    let [showModal,setShowModal] = useState(false)
    let [loading,setLoading] = useState(false)
    let courseId = useRef("")

    useEffect(()=>{

      const getCourses = async ()=>{

        try {
          setLoading(true)
          const response = await axios.get("http://localhost:3000/api/v1/admin/bulk/course",{
            headers:{
              token:localStorage.getItem("admin-token")
            }
          })

          setLoading(false)
          setCourses(response.data.Courses)

        } catch (error) {
            console.log(error);
            
        }

      }

      getCourses();

    },[])

  return (
   <>
    <div className='h-auto min-h-[90vh]  bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]'>
        
        <div className='flex justify-center text-2xl font-mono pt-4 items-center'>
                All Courses Of The Admin
        </div>
        <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-3 p-4'>
       {!loading? courses.map((course)=>{

            return <CourseCard key={course._id} course={course} courseId={courseId} setShowModal={setShowModal} />

        }):
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
    <Modal visible={showModal} setCourses={setCourses} courseId={courseId} onClose={()=>{setShowModal(false)}} />
   </>
  )
}

export default AdminCourses
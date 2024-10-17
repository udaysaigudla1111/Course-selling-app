import React,{useState,useEffect,useRef} from 'react'
import axios from 'axios'
import CourseCard from './CourseCard';
import Modal from './Modal';

const AdminCourses = () => {

    console.log("in the admin course component");
    let [courses,setCourses] = useState([])
    let [showModal,setShowModal] = useState(false)

    let courseId = useRef("")

    useEffect(()=>{

      const getCourses = async ()=>{

        try {

          const response = await axios.get("http://localhost:3000/api/v1/admin/bulk/course",{
            headers:{
              token:localStorage.getItem("token")
            }
          })

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
        {courses.map((course)=>{

            return <CourseCard key={course._id} course={course} courseId={courseId} setShowModal={setShowModal} />

        })}

        </div>

    </div>
    <Modal visible={showModal} setCourses={setCourses} courseId={courseId} onClose={()=>{setShowModal(false)}} />
   </>
  )
}

export default AdminCourses
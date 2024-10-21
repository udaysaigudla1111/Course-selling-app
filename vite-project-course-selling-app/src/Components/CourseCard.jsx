import React from 'react'
import courseImage from '../images/online-course.png'

const CourseCard = ({course,setShowModal,courseId}) => {
  
  console.log("In the Course Card component");
  
  return (
    <>
   <div className='bg-white rounded-2xl shadow-lg hover:scale-105 duration-1000 pt-3 pl-3 pr-3 '>
    <div className='overflow-hidden bg-black'>
    <img src={course.imageUrl} alt="" className='w-full object-cover h-44 rounded-t-xl hover:scale-125 duration-1000' />
    </div>
        <div className='py-2 text-xl font-semibold text-center '>{course.title}</div>
        <div className='text-lg text-gray-600 pb-2 '>{course.description}</div>
        <div className='pb-2 text-xl'>{course.price}/-</div>
        <button className='px-4 py-2 bg-green-500 mb-2 rounded-xl hover:bg-green-400 active:scale-[0.98] hover:scale-[1.01] duration-75 transition-all ease-in-out' onClick={()=>{ courseId.current = course._id; setShowModal(true)}}>Edit Course!!</button>
        

   </div>
    </>
  )
}

export default CourseCard
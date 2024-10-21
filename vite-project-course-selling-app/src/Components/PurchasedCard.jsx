import React from 'react'

const PurchasedCard = ({course}) => {
    
  return (
    <div className='bg-white rounded-2xl shadow-lg hover:scale-105 duration-1000 px-3 pt-3'>
        <div className='overflow-hidden'>
            <img src={course.courseId.imageUrl} alt="" className='w-full object-cover h-44 rounded-t-xl hover:scale-125 duration-1000' />
        </div>
      <div className='text-center text-xl py-2 font-semibold'>{course.courseId.title}</div>
      <div className='font-mono text-xl mb-2'>Author: {course.courseId.createrId.firstName} {course.courseId.createrId.lastName}</div>
      <div className='text-lg text-gray-600 pb-2'>{course.courseId.description}</div>
      <div className='text-xl pb-2'>{course.courseId.price}</div>
      <button className='bg-green-500  text-white font-semibold px-4 py-2 rounded-xl mb-2 hover:scale-[1.01] hover:bg-green-400 active:scale-[0.98] active:duration-75'>Watch Now</button>
     
    </div>
  )
}

export default PurchasedCard

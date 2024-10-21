import React,{useState,useEffect} from 'react'
import axios from 'axios';
import PurchasedCard from './PurchasedCard';

const PurchasesCourses = () => {

    let [Courses,setCourses] = useState([]);
    console.log("In the purchased course component");
    
    useEffect(()=>{
        const getPurchasedCourses = async()=>{

            const response = await axios.get("http://localhost:3000/api/v1/user/purchases",{
                headers:{
                    token:localStorage.getItem("user-token")
                }
            })

            setCourses(response.data.purchasedCourses)
           
        }
        getPurchasedCourses();
    },[])
    console.log(`The length of the courses was ${Courses.length}`);

    
  return (
    <div className='h-auto min-h-[90vh] bg-gradient-to-br from-green-400 to-blue-400'>
      <div className='font-mono text-2xl flex justify-center items-center pt-4'>All Purchased Courses</div>
      <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 p-4 gap-3'>
        {Courses.map((course)=>{
           return <PurchasedCard key={course._id} course={course} />
        })}
      </div>
    </div>
  )
}

export default PurchasesCourses
